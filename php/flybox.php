<?php

require_once(dirname(__FILE__).'/http.php');
require_once(dirname(__FILE__).'/crypto.php');


function my_log($message) {
  $date = date('Y-m-d H-i-s');
  error_log("$date: $message");
}

function xml_to_array($xml) {
  // check XML extension
  if(!function_exists('simplexml_load_string')) {
    my_log('PHP XML parser is not installed');
    return false;
  }
  
  $parser = simplexml_load_string($xml, null, LIBXML_NOCDATA);
  $json = json_encode($parser);
  return json_decode($json, true);
}


class Flybox {
  private $base;
  private $pass;
  private $sessid;

  function __construct($admin_password, $base_url='http://flybox.home') {
    $this->pass = $admin_password;
    $this->base = $base_url;
    
    if(empty($this->pass)) {
      throw new Exception('Flybox admin password cannot be empty');
    }
    
    if(empty($this->base)) {
      throw new Exception('Flybox base URL cannot be empty');
    }
    
    if(!$this->tryLogin()) {
      throw new Exception('Error logging in');
    }
  }

  function api($path, $data=null, $auth=true, $reset_cookie=false) {
    // if auth needed, login
    // false for login/token requests
    if($auth && !$this->is_logged_in() && !$this->tryLogin()) {
      my_log('Unable to login');
      return false;
    }
    
    $method = 'GET';
    $headers = array();
    // POST request
    if(!empty($data)) {
      $method = 'POST';
      $token = $this->get_token();
      if($token === false) {
        my_log('Unable to get token');
        return false;
      }
      array_push($headers, '__RequestVerificationToken: '.$token);
    }
    
    // SessionID cookie
    if(!empty($this->sessid)) {
      array_push($headers, 'Cookie: SessionID='.$this->sessid);
    }
    
    $path = $this->base.'/api'.$path;
    $res = http_request($method, $path, $headers, $data, true);
    if($res === false) {
      my_log('error on API path '.$path);
      return false;
    }
    
    // save if new SessionID
    if(preg_match('#Set-Cookie: SessionID=([^;]+);#', $res, $matches)) {
      $this->sessid = $matches[1];
      my_log('new SessionID: '.$this->sessid);
    }
    
    // remove HTTP headers to parse XML
    $xml = substr($res, strpos($res, "\r\n\r\n")+4);
    $data = xml_to_array($xml);
    if(isset($data['code'])) {
      my_log('error '.$data['code'].' on API path '.$path);
      return false;
    }
    return $data;
  }
  
  function tryLogin($tries=3) {
    // often fails so try 3 times by default
    while($tries-- >= 0) {
      if($this->login()) {
        return true;
      }
      error_log('failed login attempt');
    }
    return false;
  }

  function login() {
    // see popins.js & xml.js & main.js
    $cnonce = bin2hex(random_bytes(32));
    $data = '<?xml version="1.0" encoding="UTF-8"?><request>';
    $data .= '<username>admin</username>';
    $data .= '<firstnonce>'.$cnonce.'</firstnonce>';
    $data .= '<mode>1</mode></request>';
    // POST data requests get_token, which create a SessionID
    $res = $this->api('/user/challenge_login', $data, false, true);
    if($res === false) return false;
    
    if(empty($res['salt']) || empty($res['servernonce']) || empty($res['iterations'])) {
      error_log('no salt or servernonce or iterations: '.$res);
      return false;
    }
    
    // compute proof
    $salt = hex2bin($res['salt']);
    $msg = $cnonce.','.$res['servernonce'].','.$res['servernonce'];
    $client_proof = client_proof($this->pass, $salt, $res['iterations'], $msg);
    $server_proof = server_proof($this->pass, $salt, $res['iterations'], $msg);
    
    // login
    $data = '<?xml version="1.0" encoding="UTF-8"?><request>';
    $data .= '<clientproof>'.$client_proof.'</clientproof>';
    $data .= '<finalnonce>'.$res['servernonce'].'</finalnonce></request>';
    $res = $this->api('/user/authentication_login', $data, false);
    if($res === false) return false;
    
    return $res['serversignature'] == $server_proof;
  }

  function is_logged_in() {
    $res = $this->api('/user/state-login', null, false);
    // State: -1 logout, 0 logged in; username string if logged in
    return isset($res['State']) && $res['State'] == 0;
  }

  function get_token() {
    $res = $this->api('/webserver/token', null, false);
    return substr($res['token'], 32);
  }

  function get_hosts() {
    $hosts = $this->api('/wlan/host-list');
    if($hosts === false) return false;
    
    return $hosts['Hosts']['Host'];
  }

  function is_device_connected($name) {
    $hosts = $this->get_hosts();
    if($hosts === false) return null;

    foreach($hosts as $host) {
      if(stripos($host['HostName'], $name) !== false
        || stripos($host['ActualName'], $name) !== false) {
        return true;
      }
    }
    return false;
  }

  function get_logs() {
    $logs = $this->api('/log/loginfo');
    if($logs === false) return false;

    return explode('\r\n', $logs['LogContent']);
  }

  function heartbeat() {
    $hb = $this->api('/user/heartbeat');
    if($hb === false) return false;
    
    // level is 0 if invalid/expired SessionID
    return $hb['userlevel'] == 2;
  }

  function check_notifications() {
    $notifs = $this->api('/monitoring/check-notifications');
    if($notifs === false) return false;
    
    return $notifs;
  }

  function get_info() {
    $info = $this->api('/device/information');
    if($info === false) return false;
    
    return $info;
  }

  function get_smses_info() {
    $info = $this->api('/sms/sms-count');
    if($info === false) return false;
    
    return $info;
  }

  function get_smses() {
    $data = '<?xml version="1.0" encoding="UTF-8"?><request><PageIndex>1</PageIndex><ReadCount>20</ReadCount><BoxType>1</BoxType><SortType>0</SortType><Ascending>0</Ascending><UnreadPreferred>0</UnreadPreferred></request>';
    $info = $this->api('/sms/sms-list', $data);
    if($info === false) return false;
    
    $smses = $info['Messages']['Message'];
    // if unique sms -> create array
    if(!empty($smses['Date'])) {
      return array($smses);
    }
    
    return $smses;
  }

  function set_sms_read($index) {
    $data = '<?xml version="1.0" encoding="UTF-8"?><request><Index>'.$index.'</Index></request>';
    $info = $this->api('/sms/set-read', $data);
    if($info === false) return false;
    
    return $info[0] === 'OK';
  }

  function delete_sms($index) {
    $data = '<?xml version="1.0" encoding="UTF-8"?><request><Index>'.$index.'</Index></request>';
    $info = $this->api('/sms/delete-sms', $data);
    if($info === false) return false;
    
    return $info[0] === 'OK';
  }

}
