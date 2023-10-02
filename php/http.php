<?php

/*
 * Make http request and return result
 */
function http_request($method, $url, $headers=null, $body=null, $debug=null) {
  // keep same curl handler for connection reuse
  static $curl = null;
  if(empty($curl)) {
    if(!function_exists('curl_init')) {
      error_log('It seems curl is not installed.');
      return false;
    }
    $curl = curl_init();
    if($curl === false) {
      error_log('Error initiating curl.');
      return false;
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($curl, CURLOPT_TIMEOUT, 5);
  }
  
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HEADER, !!$debug);
  curl_setopt($curl, CURLOPT_POST, $method == 'POST');
  if(isset($headers)) curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  if(isset($body)) curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
  
  $response = curl_exec($curl);
  
  if($response === false) {
    error_log('Curl error : '.curl_error($curl));
    return false;
  }
  //* return response even if code != 2xx
  $code = intval(curl_getinfo($curl, CURLINFO_HTTP_CODE));
  if($code < 200 || $code > 299) {
    error_log('HTTP error : '.$code);
    return false;
  }
  //*/
  return $response;
}
