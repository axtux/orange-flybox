<?php

function client_proof($pass, $salt, $iter, $msg) {
  // https://github.com/vzakharchenko/huawei-hilink/blob/master/jslib/public.js#L84
  // saltedPassword
  $spwd = hash_pbkdf2('sha256', $pass, $salt, $iter, 0, true);
  // clientKey
  $ckey = hash_hmac('sha256', $spwd, "Client Key", true);
  // storedKey
  $skey = hash('sha256', $ckey, true);
  // signature
  $csig = hash_hmac('sha256', $skey, $msg, true);
  
  return bin2hex($ckey ^ $csig);
}

function server_proof($pass, $salt, $iter, $msg) {
  // https://github.com/vzakharchenko/huawei-hilink/blob/master/jslib/public.js#L98
  // saltedPassword
  $spwd = hash_pbkdf2('sha256', $pass, $salt, $iter, 0, true);
  // serverKey
  $skey = hash_hmac('sha256', $spwd, "Server Key", true);
  // signature
  $csig = hash_hmac('sha256', $skey, $msg, true);
  
  return bin2hex($csig);
}
