<?php

require_once(dirname(__FILE__).'/flybox.php');

$argv = $_SERVER['argv'];
if(empty($argv[1]) || empty($argv[2])) {
  error_log('usage: '.$argv[0].' ADMIN_PASSWORD API_PATH [POST_DATA]');
  exit();
}
if(empty($argv[3])) {
  $argv[3] = null;
}

$box = new Flybox($argv[1]);
print_r($box->api($argv[2], $argv[3]));
