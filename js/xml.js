var g_set_cookie_flag = false;
var AIRBOX = AIRBOX || {};
var g_data_obj = g_data_obj || {};

var ERROR_SYSTEM_NO_SUPPORT = "100002";
var ERROR_SYSTEM_NO_RIGHTS = "100003";
var ERROR_SYSTEM_BUSY = "100004";
var ERROR_LOGIN_USERNAME_WRONG = "108001";
var ERROR_LOGIN_PASSWORD_WRONG = "108002";
var ERROR_LOGIN_ALREADY_LOGIN = "108003";
var ERROR_LOGIN_USERNAME_PWD_WRONG = "108006";
var ERROR_LOGIN_USERNAME_PWD_ORERRUN = "108007";
var ERROR_LOGIN_SSID2_FORBIDEN = "108008";
var ERROR_LOGIN_USERNAME_PWD_WRONG_ONE_TIME = "108901";
var ERROR_LOGIN_USERNAME_PWD_WRONG_TWO_TIME = "108902";
var ERROR_VOICE_BUSY = "120001";
var ERROR_WRONG_TOKEN = "125001";
var ERROR_WRONG_SESSION_ID = "125002";
var ERROR_WRONG_SESSION_TOKEN = "125003";
var MACRO_LOGIN = '1';
var MACRO_LOGOUT = '2';

var g_main_CurrentLanguage = "";
var MACRO_PASSWORD_LOW = 1;
var MACRO_PASSWORD_MID = 2;
var MACRO_PASSWORD_HIG = 3;
var g_moduleswitch = g_moduleswitch || {};
var g_restore_default_status = '';
var g_stateChange = -1;
//For My Content in Homepage
var g_dlna = false;
var g_sambaData = false;
//For SimLock Version 5
var g_new_simlock = false;
var basic_infos = "";
var g_login_state = '';
var g_default_password_status = -1;

var g_currentPassword = '';

var LANGUAGE_DATA = {
    current_language: 'en_us',
};
var get_request_valid_url = [
    'api/wlan/liveboxmode',
    'api/sms/config',
    'config/webuicfg/config.xml',
    'api/wlan/station-information',
    'api/wlan/multi-basic-settings',
    'api/wlan/multi-switch-settings',
    'api/wlan/host-list',
    'api/wlan/basic-settings',
    'api/wlan/handover-setting',
    'api/wlan/status-switch-settings',
    'api/sdcard/sdcard',
    'api/sdcard/sdcapacity',
    'api/sdcard/sdfile',
    'api/sdcard/uploadflag',
    'api/sdcard/Check_file_exist',
    'api/sdcard/sdfilestate',
    'api/monitoring/status',
    'api/monitoring/statusex',
    'api/monitoring/traffic-statistics',
    'api/monitoring/month_statistics',
    'api/monitoring/start_date',
    'api/monitoring/converged-status',
    'api/net/current-plmn',
    'api/dialup/profiles',
    'api/device/information',
    'api/sms/sms-count',
    'api/sms/send-status',
    'api/sms/send-sms',
    'api/sms/cancel-send',
    'api/pin/status',
    'api/pin/save-pin',
    'api/pin/simlock',
    'api/user/remind',
    'api/user/state-login',
    'api/ussd/get',
    'api/ussd/release',
    'api/global/module-switch',
    'api/online-update/upgrade-messagebox',
    'api/monitoring/check-notifications',
    'api/online-update/configuration',
    'api/online-update/url-list',
    'api/prsite/getrandurl',
    'api/online-update/ack-newversion',
    'api/online-update/upgrade_redirction',
    'api/webserver/publickey',
    'api/webserver/token',
    'api/language/current-language',
    'api/device/basic_information',
    'api/usbstorage/fsstatus',
    'api/sdcard/dlna-setting',
    'api/dialup/connection',
    'api/online-update/autoupdate-config',
    'api/online-update/redirect_cancel',
    'api/deviceinfo/default-language-flag',
    'api/sms/splitinfo-sms',
    'api/wlan/status-switch-settings',
    'api/user/password',
    'api/user/password_scram',
    'api/app/privacynotice',
    'api/app/privacypolicy',
    'api/prsite/upgrade_redirction'
];

var post_request_valid_url = [
    'api/user/login',
    'api/sdcard/sdcard',
    'api/sdcard/fileupload',
    'api/sms/config',
    'api/sdcard/deletefile',
    'api/sdcard/createdir',
    'api/sdcard/sdfile',
    'api/dialup/mobile-dataswitch',
    'api/dialup/dial',
    'api/sms/sms-list',
    'api/sms/delete-sms',
    'api/sms/set-read',
    'api/sms/save-sms',
    'api/sms/send-sms',
    'api/sms/cancel-send',
    'api/sms/sms-list-phone',
    'api/sms/copy-sms',
    'api/sms/move-sms',
    'api/pb/pb-match',
    'api/pin/operate',
    'api/pin/save-pin',
    'api/user/remind',
    'api/user/login',
    'api/user/logout',
    'api/ussd/send',
    'api/monitoring/clear-traffic',
    'api/wlan/multi-basic-settings',
    'api/wlan/multi-switch-settings',
    'api/wlan/handover-setting',
    'api/wlan/status-switch-settings',
    'api/language/current-language',
    'api/sdcard/Check_file_exist',
    'api/prsite/getrandurl',
    'api/online-update/ack-newversion',
    'api/webserver/publickey',
    'api/pin/verify-simlock',
    'api/user/challenge_login',
    'api/user/authentication_login',
    'api/usbstorage/fsstatus',
    'api/sdcard/dlna-setting',
    'api/online-update/autoupdate-config',
    'api/deviceinfo/default-language-flag',
    'api/app/privacypolicy',
    'api/device/basic_information',
    'api/user/password',
    'api/user/password_scram',
    'api/app/privacynotice',
    'api/dialup/connection'
];


 // internal use only
function _recursiveXml2Object($xml) {
    if ($xml.children().size() > 0) {
        var _obj = {};
        $xml.children().each(function() {
            var _childObj = ($(this).children().size() > 0) ? _recursiveXml2Object($(this)) : $(this).text();
            if ($(this).siblings().size() > 0 && $(this).siblings().get(0).tagName === this.tagName) {
                if (_obj[this.tagName] == null) {
                    _obj[this.tagName] = [];
                }
                _obj[this.tagName].push(_childObj);
            }
            else {
                _obj[this.tagName] = _childObj;
            }
        });
        return _obj;
    }
    else {
        return $xml.text();
    }
}

// convert XML string to an Object.
// $xml, which is an jQuery xml object.
function xml2object($xml) {
    var obj = {};
    if ($xml.find('response').size() > 0) {
        var _response = _recursiveXml2Object($xml.find('response'));
        obj.type = 'response';
        obj.response = _response;
    }
    else if ($xml.find('error').size() > 0) {
        var _code = $xml.find('code').text();
        var _message = $xml.find('message').text();
        obj.type = 'error';
        obj.error = {
            code: _code,
            message: _message
        };
    }
    else if ($xml.find('config').size() > 0) {
        var _config = _recursiveXml2Object($xml.find('config'));
        obj.type = 'config';
        obj.config = _config;
    }
    else {
        obj.type = 'unknown';
    }
    return obj;
}

// convert XML string to an Object.
// $xml, which is an jQuery xml object.
function _xml2feature($xml) {
    var obj = null;
    if ($xml.find('config').size() > 0) {
        obj = _recursiveXml2Feature($xml.find('config'));
    }
    return obj;
}

function _recursiveXml2Feature($xml) {
    if ($xml.children().size() > 0) {
        var _obj = {};
        $xml.children().each(function() {
            var _childObj = ($(this).children().size() > 0) ? _recursiveXml2Feature($(this)) : _createFeatureNode($(this).text());
            if ($(this).siblings().size() > 0 && $(this).siblings().get(0).tagName === this.tagName) {
                if (_obj[this.tagName] == null) {
                    _obj[this.tagName] = [];
                }
                _obj[this.tagName].push(_childObj);
            }
            else {
                _obj[this.tagName] = _childObj;
            }
        });
        return _obj;
    }
    else {
        return _createFeatureNode($xml.text());
    }
}

function _createFeatureNode(str) {
    if (typeof (str) === 'undefined' || str == null) {
        return null;
    }
	
    var isEmpt = $.trim(str);
    if(isEmpt === "")
    {
        return isEmpt;
    }
    if (isNaN(str)) {
        // not a number
            return str;
    }
    else {
        // is a number
        return parseInt(str, 10);
    }
}



function sendAjaxRequest(url, type, options){
    var nTimeout = AJAX_TIMEOUT;
    var _options = options || {};
	
	if (_options.timeout) { 
		nTimeout = parseInt(_options.timeout, 10); 
		if (isNaN(nTimeout)) { 
			nTimeout = AJAX_TIMEOUT; 
		}
	}

	var AJAX_PARAMS = {
		async : !(_options.sync === true),
        //cache: false,
        type: type,
        timeout: nTimeout,
        url: url,
        //dataType: ($.browser.msie) ? "text" : "xml",
        error: function(XMLHttpRequest, textStatus) {
        	try{
        		if (jQuery.isFunction(_options.errorCB)) {
					_options.errorCB(XMLHttpRequest, textStatus);
				}
        	}catch(e){}
			
        }
	};
	
	//We do not extend AJAX_PARAMS to control it content, and to avoid any unwanted override
	//$.extend(AJAX_PARAMS, _options);
	//*
	if(_options.headers !== null)	{ AJAX_PARAMS.headers =		_options.headers;				}
        if(url == '/api/app/privacypolicy'){
            AJAX_PARAMS.headers['_ResponseFormat'] = 'JSON';
        } 
	if(_options.data !== null)		{ AJAX_PARAMS.data =		_options.data;					}
	if(_options.success !== null)	{ AJAX_PARAMS.success = 	_options.success; 				}
	if(_options.complete !== null)	{ AJAX_PARAMS.complete = 	_options.complete; 				}

	if(_options.contentType !== null){ AJAX_PARAMS.contentType = _options.contentType; 			}
        if(url == '/api/app/privacypolicy'){
            AJAX_PARAMS.contentType = "application/json; charset=UTF-8";
        }
	if(_options.processData !== null){ AJAX_PARAMS.processData = (_options.processData !== false);}
	if(_options.xhrFields !== null)	{ AJAX_PARAMS.xhrFields = 	_options.xhrFields; 			}
	if(_options.dataTyp !== null)	{ AJAX_PARAMS.dataType = 	_options.dataType; 				}
	if(_options.xh !== null)			{ AJAX_PARAMS.xhr = 		_options.xhr; 					}
	if(_options.beforeSend !== null)	{ AJAX_PARAMS.beforeSend = 	_options.beforeSend; 			}
	//*/

    var _request = $.ajax( AJAX_PARAMS );

    _request.onreadystatechange = null; 
	_request.abord= null; 
	_request = null;
}

function getConfigData(urlstr, callback_func, options) {
    var myurl = '../' + urlstr + '';
	var _options = options || {};

    _options.success = function(data) {
        var xml;
        if (typeof data === 'string' || typeof data === 'number') {
            if (!window.ActiveXObject) {
                var parser = new DOMParser();
                xml = parser.parseFromString(data, 'text/xml');
            }
            else {
                //IE
                xml = new ActiveXObject('Microsoft.XMLDOM');
                xml.async = false;
                xml.loadXML(data);
            }
        }
        else {
            xml = data;
        }
        if (typeof callback_func === 'function') {
            callback_func($(xml));
        }
    };
	
	sendAjaxRequest(myurl, 'GET', _options);
}

var AIRBOX = AIRBOX || {};
var AJAX_HEADER = "/";
var AJAX_TAIL = "";
var AJAX_TIMEOUT = 30000;
/* [END] [Modified for]:Mainline  Get Request to the API   */

function getAjaxData(urlstr, callback_func, options) {
    var myurl = AJAX_HEADER + urlstr + AJAX_TAIL;
    var _options = options || {};
    _options.headers = {};
    if (g_set_cookie_flag && urlstr == 'api/monitoring/status') {
        g_set_cookie_flag = false;
        _options.headers['Update-Cookie'] = 'UpdateCookie';
    }
    
    _options.success = function(data) {
            var xml;
            if ((typeof data == 'string' || typeof data == 'number') && this.url.indexOf('/api/app/privacypolicy') == -1) {
                if (-1 != this.url.indexOf('http://192.168.1.1/api/sdcard/sdcard')) {
                    data = sdResolveCannotParseChar(data);
                }
                if (!window.ActiveXObject) {
                    var parser = new DOMParser();
                    xml = parser.parseFromString(data, 'text/xml');
                }
                else {
                    //IE
                    xml = new ActiveXObject('Microsoft.XMLDOM');
                    xml.async = false;
                    xml.loadXML(data);
                }
            }
            else {
                xml = data;
            }
            if (typeof callback_func == 'function') {
                if(this.url.indexOf('/api/app/privacypolicy') == -1) {
                    callback_func($(xml));
                } else {
                    callback_func(xml);
                }
                
            }
        };
        if(urlstr.indexOf('?') > -1){
            urlstr = urlstr.split('?')[0];
        }
        if( $.inArray( urlstr, get_request_valid_url ) > -1 ){
            sendAjaxRequest(myurl, 'GET', _options);
        } else{
            alert(myurl + ' is not an authorized url');
        }
}
/* [END] [Modified for]:Mainline  Get Request to the API   */

var g_requestVerificationToken = [];


/* [BEGIN] [Modified for]:  Get the Token from Meta Tag    */
function getAjaxToken() {
    var meta = $("meta[name=csrf_token]");
    var i = 0;

    if(meta.length > 0) {
        g_requestVerificationToken = [];
        for(i; i < meta.length; i++) {
            g_requestVerificationToken.push(meta[i].content);
        }
    } else {
        refreshToken();
    }
}
/* [END] [Modified for]:  Get the Token from Meta Tag    */

/* [BEGIN] [Modified for]: get the Token as Response from the Webserver    */
function refreshToken() {
    getAjaxData('api/webserver/token', function($xml) {
        var ret = xml2object($xml);
        if ('response' == ret.type) {
            g_requestVerificationToken.length = 0;
            g_requestVerificationToken.push(ret.response.token.substr(32));
        }
    }, {
        sync: true
    });
}
/* [END] [Modified for]: get the Token as Response from the Webserver    */

getAjaxToken();

/* [BEGIN] [Modified for]: Get the token from the Post request header    */
function getTokenFromHeader(headers, tokenHeader) {
    var tokenindex = headers.indexOf(tokenHeader) + tokenHeader.length + 1;
    while(headers.substring(tokenindex, tokenindex + 1) == ' ') {
        tokenindex++;
    }
    return headers.substring(tokenindex, tokenindex + 32);
}
/* [END] [Modified for]: Get the token from the Post request header    */

var current_href = window.location.href;
// urlstr : URL of the Restful interface.
// xml: xml string to be submit to server.
// callback_func : Callback function to handle response, this callback function
// have one parameter
// callback_func($xml) - $xml : a jQuery XML object which is successfully get
// from getAjaxData.
// options.sync
// options.timout
// options.errorCB

/* [BEGIN] [Modified for]:Mainline Post Request to the API    */
function saveAjaxData(urlstr, xml, callback_func, options) {
    var myurl = AJAX_HEADER + urlstr + AJAX_TAIL;
    var _options = options || {};
    _options.headers = {
        "_ResponseSource":"Broswer"
    };

    if(!options.no_token){
        if(g_requestVerificationToken.length > 0) {
             _options.headers['__RequestVerificationToken'] = g_requestVerificationToken[0];
             g_requestVerificationToken.splice(0, 1);
        } else {
            setTimeout( function () {
                saveAjaxData(urlstr, xml, callback_func, options);
            }, 50);
            return;
        }
    }
    get_GlobalFeatures();
    if (_options) {
        if (_options.sync) {
            isAsync = (_options.sync == true) ? false : true;
        }
        if (_options.timeout) {
            nTimeout = parseInt(_options.timeout, 10);
            if (isNaN(nTimeout)) {
                nTimeout = AJAX_TIMEOUT;
            }
        }
        errorCallback = _options.errorCB;
        if (_options.enc && g_moduleswitch.encrypt_enabled == 1) {
            //_options.headers['encrypt_transmit'] = 'encrypt_transmit';
            _options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;enc';
            xml = doRSAEncrypt(xml);
        } else if(_options.enp && g_moduleswitch.encrypt_enabled == 1) {
            //_options.headers['part_encrypt_transmit'] = _options.enpstring;
            _options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;enp';
        }
    }
    _options.data = xml;
    _options.success = function(data) {
            var self = this;
            var xml;
            if (self.contentType.indexOf('json') !== -1){
                xmlRet = JSON.parse(data);
                if (xmlRet.errcode !== 0) {
                    xmlRet.error = {};
                    xmlRet.error.code = xmlRet.errcode;
                }
            } else {
                if (typeof data == 'string') {
                    if (-1 != this.url.indexOf('/api/sms/sms-list') && -1 != data.indexOf('Messages')) {
                        data = smsContentDeleteWrongChar(data);
                    }
                    if(-1 != this.url.indexOf('/api/user/login')) {
                        if($.isArray(g_requestVerificationToken)) {
                            g_requestVerificationToken = [];
                        }
                    }
                    if (!window.ActiveXObject) {
                        var parser = new DOMParser();
                        xml = parser.parseFromString(data, 'text/xml');
                    }
                    else {
                        //IE
                        xml = new ActiveXObject('Microsoft.XMLDOM');
                        xml.async = false;
                        xml.loadXML(data);
                    }
                } else {
                    xml = data;
                }
            }
            var xml_ret = xml2object($(xml));
            if(typeof xml_ret.error != 'undefined' && -1 == this.url.indexOf('/api/user/session')) {
                if(xml_ret.error.code == ERROR_SYSTEM_NO_RIGHTS && current_href.indexOf("index.html") == 0) {
                    //gotoPageWithoutHistory(HOME_PAGE_URL);
                    return;
                }
                if(ERROR_VOICE_BUSY == xml_ret.error.code)
                {
                    //VOICE_BUSY_URL meme pas defini dans le code officiel
                    //gotoPageWithoutHistory(VOICE_BUSY_URL);
                    return;
                }
                if(ERROR_WRONG_TOKEN == xml_ret.error.code) {
                    alert(myurl + ' cause a wrong token error (' + ERROR_WRONG_TOKEN + ')');
                    getAjaxToken();
                }
                else if (-1 != this.url.indexOf('/api/user/challenge_login') || -1 != this.url.indexOf('/api/user/authentication_login') || -1 != this.url.indexOf('/api/user/password_scram')) {
                    if ($.isArray(g_requestVerificationToken)) {
                        g_requestVerificationToken = [];
                    }
                }
            }
            if (typeof callback_func == 'function') {
                callback_func($(xml));
            }
        };
        _options.complete = function(XMLHttpRequest, textStatus) {
            if(!options.no_token) {
                var headers = XMLHttpRequest.getAllResponseHeaders();
                if(headers.indexOf('__RequestVerificationTokenone') >= 0) {
                g_requestVerificationToken.push(getTokenFromHeader(headers, '__RequestVerificationTokenone'));
                if(headers.indexOf('__RequestVerificationTokentwo') >=0) {
                    g_requestVerificationToken.push(getTokenFromHeader(headers, '__RequestVerificationTokentwo'));
                }
            } else if(headers.indexOf('__requestverificationtokenone') >= 0) {
                g_requestVerificationToken.push(getTokenFromHeader(headers, '__requestverificationtokenone'));
                if(headers.indexOf('__requestverificationtokentwo') >= 0) {
                    g_requestVerificationToken.push(getTokenFromHeader(headers, '__requestverificationtokentwo'));
                }
            } else if(headers.indexOf('__RequestVerificationToken') >= 0) {
                g_requestVerificationToken.push(getTokenFromHeader(headers, '__RequestVerificationToken'));
            } else if(headers.indexOf('__requestverificationtoken') >= 0) {
                g_requestVerificationToken.push(getTokenFromHeader(headers, '__requestverificationtoken'));
            }
        }
    };
    
    if( $.inArray( urlstr, post_request_valid_url ) > -1 ){
        sendAjaxRequest(myurl, 'POST', _options);
    }else{
        alert(myurl + ' is not an authorized url');
    }
}
/* [END] [Modified for]:Mainline Post Request to the API    */


/* [BEGIN] [Modified for]:Mainline XML Endraption    */
var g_encPublickey = {
    e: '',
    n: ''
};
getEncpubkey(false);
function getEncpubkey(issync) {
    if(typeof(g_moduleswitch.encrypt_enabled) == 'undefined' || g_moduleswitch.encrypt_enabled != 1){
        return;
    }
    
    var syncs =  true;
    if(typeof(issync) != 'undefined') {
        syncs = issync;
    }
    getAjaxData('api/webserver/publickey', function($xml) {
        var ret = xml2object($xml);
        if (ret.type == 'response') {
            g_encPublickey.e = ret.response.encpubkeye;
            g_encPublickey.n = ret.response.encpubkeyn;
            if(g_encPublickey.e == '') {
                getEncpubkey(syncs);
            }
        } else {
            getEncpubkey(syncs);
        }
    }, {
        sync: syncs
    }, {
        errorCB: function() {
            getEncpubkey(syncs);
        }
    });
}

function storagePubkey(rsa_n,rsa_e) {
    var storage = window.localStorage;
    if(rsa_e == "" || rsa_n == "") {
        return;
    }
    try {
        storage.setItem("atp", 'atp');
        storage.getItem("atp");
        storage.removeItem("atp");
        storage.removeItem("n");
        storage.removeItem("e");
        storage.setItem("n", rsa_n);
        storage.setItem("e", rsa_e);
    } catch (error) {
        var pubkey = "[rsa_n="+rsa_n+"&rsa_e="+rsa_e+"]";
        var namebk = window.name;
        var keylocation = namebk.indexOf("[rsa_n=");
        var defaultvalue = namebk;
        if(keylocation > 0) {
            defaultvalue = namebk.substr(0,keylocation);
        }
        window.name =  defaultvalue + pubkey;
    }
}

function getPubkey() {
    var storage = window.localStorage;
    try {
        storage.setItem("atp", 'atp');
        storage.getItem("atp");
        storage.removeItem("atp");
        return [storage.getItem("n"),storage.getItem("e")];
    } catch (error) {
        var namebk = window.name;
        var keylocation = namebk.indexOf("[rsa_n=");
        if(keylocation>=0) {
            var pubkey = namebk.substr(keylocation);
            var local_e = pubkey.indexOf("&rsa_e=");
            if(local_e > 0) {
                var e= pubkey.substring(local_e+7,pubkey.length-1);
                var n= pubkey.substring(7,local_e);
                return [n,e];
            }
        }
    }
    return ["",""];
}

function doRSAEncrypt(encstring) {
    if(encstring == '') {
        return '';
    }
    get_GlobalFeatures();
    if(typeof(g_moduleswitch.encrypt_enabled) == 'undefined' || g_moduleswitch.encrypt_enabled != 1){
        return encstring;
    }
    
    if(g_encPublickey.e == '') {
        if (g_scarm_login) {
            var pubkeyArray = getPubkey();
            g_encPublickey.e = pubkeyArray[1];
            g_encPublickey.n = pubkeyArray[0];
        } else {
            getEncpubkey();
        }
    }
    var rsa = new RSAKey();
    rsa.setPublic(g_encPublickey.n, g_encPublickey.e);
    encstring = base64_encode(encstring);
    var num = encstring.length / 245;
    var restotal = '';
    for (i = 0; i < num; i++) {
        var encdata = encstring.substr(i * 245, 245);
        var res = rsa.encrypt(encdata);
        restotal += res;
    }
    return restotal;
}
/* [END] [Modified for]:Mainline XML Endraption    */

function smsContentDeleteWrongChar(smsStr) {
    return smsStr.replace(/([\x00-\x08]|\x0b|\x0c|[\x0e-\x1f])/g, ' ');
}

// return true if the AJAX response from server is <response>OK</response>
// obj: object came from $xml
function isAjaxReturnOK(obj) {
    var ret = false;
    if (obj) {
        if (typeof (obj.response) === 'string') {
            if (obj.response.toLowerCase() === 'ok') {
                ret = true;
            }
        }
    }
    return ret;
}

/*************************Function for current connection time in connection
 * page******************************/
function getCurrentTime(time) {
    var final_time = '';
    var times = parseInt(time, 10);

    //format time like : 02:15:38

    var hours = parseInt((times / 3600), 10);
    if (hours > 9) {
        final_time += hours + ':';
    }
    else if (hours >= 0) {
        final_time += '0' + hours + ':';
    }

    times = times - hours * 3600;

    var minutes = parseInt(times / 60, 10);
    if (minutes > 9) {
        final_time += minutes + ':';
    }
    else if (minutes > 0) {
        final_time += '0' + minutes + ':';
    }
    else if (minutes === 0) {
        final_time += '00' + ':';
    }
    times = times - minutes * 60;

    //handle second display
    if (times > 9) {
        final_time += times;
    }
    else if (times > 0) {
        final_time += '0' + times;
    }
    else if (times === 0) {
        final_time += '00';
    }

    return final_time;
}

var g_monitoring_dumeter_kb = 1024;
var g_monitoring_dumeter_mb = 1024 * 1024;
var g_monitoring_dumeter_gb = 1024 * 1024 * 1024;
var g_monitoring_dumeter_tb = 1024 * 1024 * 1024 * 1024;

function getFormatedTextVolume(byte_volume) {
    var text_volume = "0 MB";

    if (byte_volume > g_monitoring_dumeter_tb) {
        text_volume = formatFloat(parseFloat(byte_volume) / g_monitoring_dumeter_tb, 1) + ' TB';
    }else if (byte_volume > g_monitoring_dumeter_gb) {
        text_volume = formatFloat(parseFloat(byte_volume) / g_monitoring_dumeter_gb, 1) + ' GB';
    }else if (byte_volume > g_monitoring_dumeter_mb) {
        text_volume = formatFloat(parseFloat(byte_volume) / g_monitoring_dumeter_mb, 0) + ' MB';
    }else if (byte_volume > g_monitoring_dumeter_kb) {
        text_volume = formatFloat(parseFloat(byte_volume) / g_monitoring_dumeter_kb, 0) + ' KB';
    }else if (byte_volume > 1) {
        text_volume = formatFloat(parseFloat(byte_volume), 0) + ' B';
    }

    //text_volume = replace_Mo(text_volume);
    return text_volume;
}

function _getByteVolume(englishVolumeText){
	var byte_volume = parseFloat(englishVolumeText);
	if( /TB/.test(englishVolumeText) )	{ byte_volume *= g_monitoring_dumeter_tb; }else 
	if( /GB/.test(englishVolumeText) )	{ byte_volume *= g_monitoring_dumeter_gb; }else 
	if( /MB/.test(englishVolumeText) )	{ byte_volume *= g_monitoring_dumeter_mb; }else 
	if( /KB/.test(englishVolumeText) )	{ byte_volume *= g_monitoring_dumeter_kb; }

	return byte_volume;
}

/********************Function formatFloat*********************/
function formatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}


//function replace_Mo(str) {
//    if(LANGUAGE_DATA.current_language == 'fr_fr') {
//        str = str.replace('MB','Mo');
//        str = str.replace('GB','Go');
//    }
//
//    return str;
//}
var g_base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += g_base64EncodeChars.charAt(c1 >> 2);
            out += g_base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
            out += g_base64EncodeChars.charAt(c1 >> 2);
            out += g_base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += g_base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += '=';
            break;
        }
        c3 = str.charCodeAt(i++);
        out += g_base64EncodeChars.charAt(c1 >> 2);
        out += g_base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += g_base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += g_base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

/* [BEGIN] [Modified for]:Mainline XML Endraption    */
function base64_encode (input) {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
}
function  _utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
/* [END] [Modified for]:Mainline XML Endraption    */

function SHA256(s) {

    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) {
        return ( X >>> n ) | (X << (32 - n));
    }

    function R (X, n) {
        return ( X >>> n );
    }

    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    }

    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }

    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }

    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }

    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }

    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }

    function core_sha256 (m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16)
                    W[j] = m[j + i];
                else
                    W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        var bin = [];
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

}

/***********Get and save data (begin)**********/
// internal use only
function _createNodeStr(nodeName, nodeValue) {
    return 	/*IF*/ nodeName === 'Content' ? 
    		/*THEN*/'<' + nodeName + '>' + nodeValue.toString().replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + '</' + nodeName + '>':
    		/*ELSE*/ '<' + nodeName + '>' + nodeValue + '</' + nodeName + '>';
}

// internal use only
function _recursiveObject2Xml(name, obj) {
    var xmlstr = '';
    if (typeof (obj) === 'string' || typeof (obj) === 'number') {
        xmlstr = _createNodeStr(name, obj);
    }
    else if (jQuery.isArray(obj)) {
        jQuery.each(obj, function(idx, item) {
            xmlstr += _recursiveObject2Xml(name, item);
        });
    }
    else if (typeof (obj) === 'object') {
        xmlstr += '<' + name + '>';
        jQuery.each(obj, function(propName, propVal) {
            xmlstr += _recursiveObject2Xml(propName, propVal);
        });
        xmlstr += '</' + name + '>';
    }
    return xmlstr;
}

// convert an object to xml string.
// name: root tag name of XML
// obj:  object which is to be convert to XML
function object2xml(name, obj) {
    var xmlstr = '<?xml version="1.0" encoding="UTF-8"?>';
    xmlstr += _recursiveObject2Xml(name, obj);
    return xmlstr;
}


function display_SIMtoUIM(str)
{
	if (g_data_obj.ProductCDMA && str.indexOf('SIMLOCK')<=-1)
   		str = str.replace(/SIM/g, "UIM");

	return str;
}

function enableTabKey() {
    $('a').attr('tabindex', '');
    $('input').attr('tabindex', '');
    $('select').attr('tabindex', '');
}

function clearAirboxDialog($content)
{
    if(typeof($content.addClass) === 'function')
    {
        $content.addClass('hidden');

        hiddenSelect(false);
        enableTabKey();
        if (g_is_login_opened) {
            g_is_login_opened = false;
            getDeviceStatus();
        }
    }
}

//If remove when show confirm dialog
var DIALOG_UNREMOVE = 0;
// Aim to take all the prompt displaying on a page as a stack.
var g_main_displayingPromptStack = [];

function showConfirmDialog(content, okFunc, cancelFunc, removeable) {
    content = display_SIMtoUIM(content);

    if (DIALOG_UNREMOVE !== removeable) {
        $('#div_wrapper').remove();
        $('.dialog').remove();
    }

    var $content = $("#popinConfirm");
    $(".content a",$content).remove();
    $(".info h4",$content).text( content );
    
    var lngArray = AIRBOX.core.settings.currentLanguages.translations;
	
	var $node = $('<a class="bt ok" id="pop_confirm" href="#"></a>');
	$node.text( lngArray.common_confirm );
    $(".content", $content).append( $node );
    if (cancelFunc !== '' && cancelFunc !== ' ' && cancelFunc !== null) {
    	$node = $('<a class="bt cancel later" id="pop_Cancel" href="#"></a>');
		$node.text( lngArray.cancel );
        $(".content", $content).append( $node );
    }


    $('#pop_confirm').live('click', function() {
        //clearAirboxDialog($content);
		$(this).parent('div').parent('div.popin').addClass('hidden');
		
        if (typeof (okFunc) === 'function') {
            okFunc();
        }
        okFunc = null;
        cancelFunc = null;
        g_main_displayingPromptStack.pop();
        hiddenSelect(false);
        return false;
    });
    $('#pop_Cancel').live('click', function() {
        clearAirboxDialog($content);
        
        if (typeof (cancelFunc) === 'function') {
            cancelFunc();
        }
        okFunc = null;
        cancelFunc = null;
        g_main_displayingPromptStack.pop();
        hiddenSelect(false);
        return false;
    });
    $(".dialog_close_btn").live("click",function(){
        clearAirboxDialog($content);
        okFunc = null;
        cancelFunc = null;
    });
	


    $content.removeClass("hidden");


    setTimeout(function() {
        $(".popinBkg",$content).css("height",$(".content",$content).outerHeight() + 14);
    },50);
    
    $(window).resize(function() {
        $(".popinBkg",$content).css("height",$(".content",$content).outerHeight() + 14);
    });
    hiddenSelect(true);

    g_main_displayingPromptStack.push('pop_confirm');

    disableTabKey();
}


var tabKeyflag = false;

function disableTabKey() {
    $('a').attr('tabindex', '-1');
    $('input').attr('tabindex', '-1');
    $('select').attr('tabindex', '-1');
    
    $("#username").attr('tabindex','1');
    $("#password").attr('tabindex','2');    
    if(!tabKeyflag) {
        $("#username").focusout(function() {
            disableTabKey();
        });
        $("#username").focusin(function() {
            enableTabKey();
        });
        tabKeyflag = true;
    }
}

function hiddenSelect(flag)
{
    if ($.browser.msie && ($.browser.version === 6.0))
    {
        if (flag) {
            $("select").css("display","none");
        } else {
            $("select").css("display","inline");
        	$("#select_WifiCountry_for_Idevice").css("display","none");
        }
    }
}

var MACRO_NET_MODE_C = 1;
var MACRO_NET_MODE_W = 2;
var MACRO_NET_SINGLE_MODE = 1;
var MACRO_NET_DUAL_MODE = 2;
/* [BEGIN] [Modified for]:Get deviceinformation    */
function getDeviceInformation(callback) {
    var params = {
        ajax_url : 'api/device/information',
        func_response : function(ret){ 
            var g_device_info = ret.response;
            g_data_obj.ProductCDMA = 
            /*IF*/ g_device_info.ProductFamily == "CDMA"? 
            /*THEN*/ true:
            /*ELSE*/ false; 
            g_data_obj.net_mode_status = 
            /*IF*/ g_data_obj.ProductCDMA ?
            /*THEN*/ MACRO_NET_MODE_C:
            /*ELSE*/ MACRO_NET_MODE_W;
            g_data_obj.net_mode_type = 
            /*IF*/ g_device_info.MultiMode == '1' ?
            /*THEN*/ MACRO_NET_DUAL_MODE:
            /*ELSE*/ MACRO_NET_SINGLE_MODE; 
            g_data_obj.msisdn = g_device_info.Msisdn;
            g_data_obj.mccmnc = g_device_info.Imsi.substring(0,5);
            },
            func_callback : callback,
                options : {
                    sync : true
                }
        };
        AIRBOX.core.getAjaxRequest( params );
}
/* [END] [Modified for]:Get deviceinformation    */

function getMonitoringConvergedStatus() {
    var params = {
        ajax_url : 'api/language/current-language',
        func_response : function(ret){ 
            var current_lang = ret.response.CurrentLanguage;
            var langtag = '';
            langtag = current_lang.substr(0,2).toLowerCase();
            $.each(AIRBOX.config.languages, function(i, o) {
                if (o.isActive && o.language == langtag) {
                    AIRBOX.config.languages.sim = langtag;
                }
            });
        },
        options : {
            sync : true
        }
    };
    AIRBOX.core.getAjaxRequest( params );
}

function get_GlobalFeatures() {    
    getAjaxData('api/global/module-switch', function($xml) {
        var ret = xml2object($xml);
        if (ret.type == 'response') {
            g_moduleswitch = ret.response;
            
        }
    }, {
        sync: true
    });    
}

/* [BEGIN] [Modified for]:Get the Privacy Policy Status    */
function getPrivacyNoticeInfo() {
    if (g_moduleswitch.gdpr_enabled) {
        var requestData = {
            language: LANGUAGE_DATA.current_language
        }
        var xmlStr = object2xml('request', requestData);
        getAjaxData('api/app/privacypolicy?lang=' + requestData.language, function ($xml) {
            var ret = JSON.parse($xml) ;
            g_privacypolicy_update = ret.IsPrivacyPolicyUpdate;
            if (ret.IsEULAUpdate == '1' || ret.IsPrivacyPolicyUpdate == '1') {
                g_privacyUrl = ret.PrivacyPolicyUrl;
                if (g_privacypolicy_update == '1') {
                    g_restore_default_status = '1';
                }
            }
        }, {
                sync: true
            });
    }
}
/* [END] [Modified for]:Get the Privacy Policy Status    */
// change lang
function changeLang(val) {

    var params = {
        ajax_url : 'api/language/current-language',
        request : { CurrentLanguage: val.replace(/_/, '-') },
        func_callback : function(){
            var params2 = {
                ajax_url : 'api/deviceinfo/default-language-flag',
                request : { default_language_flag: 1 },
                options : {
                    sync : false
                }
            };
            AIRBOX.core.setAjaxRequest( params2 );
            //Set default language flag to prevent language popup from showing on clearing browser cache
        },
        options : {
            sync : false
        }
    };
    AIRBOX.core.setAjaxRequest( params );
}


function login( options ) {
    //send POST login request

    // if success, 
    // => if admin, call the method AIRBOX.logged.login 		AND options.adminAction
    // => if guest, call the method AIRBOX.logged.loginAsGuest 	AND options.guestAction

    g_data_obj.Username = 'admin';
    g_data_obj.LoginState = '0';

    AIRBOX.popinPWStrength.show({
        isPwStrengthLow : ( getPWStrength(options.$password.val()) == MACRO_PASSWORD_LOW ) ,
        action : function(){
        UpdateAuthenticationDisplay( function(){
            if(g_data_obj.Username == 'admin'){
                if(jQuery.isFunction(options.adminAction)){
                    options.adminAction();
                }
            }else{
                if(jQuery.isFunction(options.guestAction)){
                    options.guestAction();
                }
            }
        });
    }
});

    if(jQuery.isFunction(options.loginCallback)){
        options.loginCallback();
    }
}

function getPWStrength(passValue) 
{
	function charMode(iN){
		if 			( iN>=48 && iN <=57 )	{ return 1; }
		else if 	( iN>=65 && iN <=90 )	{ return 2; }
		else if 	( iN>=97 && iN <=122)	{ return 2; }
		else 								{ return 4; }
	}
	function bitTotal(num){
		var modes=0;
		for (var i=0;i<3;i++){
			if (num & 1) { modes++; }
			num>>>=1;
		}
		return modes;
	}

	var sPWLength = passValue.length;
	var sPWModes = 0;
	for (var i= 0; i < sPWLength; i++){
		sPWModes|=charMode(passValue.charCodeAt(i));
	}
	sPWModes = bitTotal(sPWModes);

	if( sPWLength < 6 ){
		return MACRO_PASSWORD_LOW;
	}else{
		switch(sPWModes){
			case 1: 	return /*IF*/ sPWLength >= 10 ?
					/*THEN*/ MACRO_PASSWORD_MID :
					/*ELSE*/ MACRO_PASSWORD_LOW; break;
			case 2: 	return MACRO_PASSWORD_MID; break;
			case 3: 	return MACRO_PASSWORD_HIG; break;
			default: 	return MACRO_PASSWORD_LOW ;break;
		}
	}
}

/*not support char*/
var MACRO_SUPPORT_CHAR_MIN = 32;
var MACRO_SUPPORT_CHAR_MAX = 127;
var MACRO_NOT_SUPPORT_CHAR_COMMA = 44; //,
var MACRO_NOT_SUPPORT_CHAR_QUOTATION_MARK = 34; //"
var MACRO_NOT_SUPPORT_CHAR_COLON = 58; //:
var MACRO_NOT_SUPPORT_CHAR_SEMICOLON = 59; //;
var MACRO_NOT_SUPPORT_BACKSLASH_MARK = 92; //\
var MACRO_NOT_SUPPORT_CHAR_38 = 38; //&
var MACRO_NOT_SUPPORT_CHAR_37 = 37; //%
var MACRO_NOT_SUPPORT_CHAR_43 = 43; //+
var MACRO_NOT_SUPPORT_CHAR_39 = 39; //'
var MACRO_NOT_SUPPORT_CHAR_60 = 60; //<
var MACRO_NOT_SUPPORT_CHAR_62 = 62; //>
var MACRO_NOT_SUPPORT_CHAR_63 = 63; //?

function checkInputChar(str){
    var i;
    var char_i;
    var num_char_i;

    if (str === "")
    {
        return true;
    }

    for (i = 0; i < str.length; i++)
    {
        char_i = str.charAt(i);
        num_char_i = char_i.charCodeAt();
        if ((num_char_i > MACRO_SUPPORT_CHAR_MAX) || (num_char_i < MACRO_SUPPORT_CHAR_MIN))
        {
            return false;
        }
        else if ((MACRO_NOT_SUPPORT_CHAR_COMMA === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_QUOTATION_MARK === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_COLON === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_SEMICOLON === num_char_i) ||
        (MACRO_NOT_SUPPORT_BACKSLASH_MARK === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_38 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_37 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_43 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_39 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_60 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_62 === num_char_i) ||
        (MACRO_NOT_SUPPORT_CHAR_63 === num_char_i))
        {
            return false;
        }
        else 
        {
            continue;
        }
    }
    return true;
}


function sdResolveCannotParseChar(xmlStr) {
    return xmlStr.replace(/(\&|\')/g, function($0, $1) {
        return {
            '&' : '&amp;' ,
            "'" : '&#39;'
        }[$1];
    }
    );
}

function UpdateAuthenticationDisplay( callback) 
{
    var params = {
        ajax_url : 'api/user/state-login',
        func_response : function(ret){
            g_data_obj.Username = ret.response.Username;
            /*Modified for fixing auto logout issue while opening WebUI in  different browser tabs -START-*/
            g_login_state = ret.response.State;
            g_default_password_status = parseInt(ret.response.firstlogin, 10);
            if(g_stateChange!=ret.response.State){
                if(g_stateChange==-1)
                    refreshToken();
                    g_stateChange=ret.response.State;
                }
                /*Modified for fixing auto logout issue while opening WebUI in  different browser tabs -END-*/
                if (typeof(ret.response.extern_password_type) != 'undefined' && ret.response.extern_password_type == '1') {
                    g_scarm_login = true;
                }
                if(ret.response.State == '0') // '0' == admin
                {
                    if(g_logoutTimer == ''){
                        startLogoutTimer();
                    }
                    if(!airboxRegistry.logged)
                        AIRBOX.logged.login();
                    } else {
                        if(airboxRegistry.logged === true)
                            AIRBOX.logged.logout();
                        }

                        if(typeof(callback) === 'function') {
                            callback();
                        }
                    },
                    options : {
                        sync : true
                    }
                };
                AIRBOX.core.getAjaxRequest( params );
    }

function userOut() {

    var params = {
        ajax_url : 'api/user/logout',
        request : { Logout: 1 },
            func_callback : AIRBOX.logged.logout,
            options : {
                sync : false
            }
    };
    AIRBOX.core.setAjaxRequest( params );
}

// jquery  cookie
function newCookie(name, value, options) {
    if (typeof value !== 'undefined') {// name and value given, set cookie
        options = options || {};
        if (value == null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
            // use expires
            // attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
    else {// only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

//Array indexOf definition
//for IE8-like browsers
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/* [BEGIN] [Modified for]:The jsbn library Code is a fast, portable implementation of large-number math in pure JavaScript, enabling public-key crypto and other applications on desktop and mobile browsers.    */

// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;

// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if(rng_pptr >= rng_psize)
        rng_pptr -= rng_psize;
}

// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
    rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if(rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        // Extract entropy (256 bits) from NS4 RNG if available
        var z = window.crypto.random(32);
        for(t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
    }
    while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
    //rng_seed_int(window.screenX);
    //rng_seed_int(window.screenY);
}

function rng_get_byte() {
    if(rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0;
        //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
}

function rng_get_bytes(ba) {
    var i;
    for(i = 0; i < ba.length; ++i)
        ba[i] = rng_get_byte();
}

function SecureRandom() {
}

SecureRandom.prototype.nextBytes = rng_get_bytes;

// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
    var i, j, t;
    for(i = 0; i < 256; ++i)
        this.S[i] = i;
    j = 0;
    for(i = 0; i < 256; ++i) {
        j = (j + this.S[i] + key[i % key.length]) & 255;
        t = this.S[i];
        this.S[i] = this.S[j];
        this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
}

function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
    return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
    return new BigInteger(str,r);
}

function linebrk(s,n) {
    var ret = "";
    var i = 0;
    while(i + n < s.length) {
        ret += s.substring(i,i+n) + "\n";
        i += n;
    }
    return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
    if(b < 0x10)
        return "0" + b.toString(16);
    else
        return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
    if(n < s.length + 11) { // TODO: fix for utf-8
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while(i >= 0 && n > 0) {
        var c = s.charCodeAt(i--);
        if(c < 128) { // encode using utf-8
            ba[--n] = c;
        } else if((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        } else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while(n > 2) { // random non-zero pad
        x[0] = 0;
        while(x[0] == 0)
            rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N,16);
        this.e = parseInt(E,16);
    } else
        alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
    var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
    if(m == null)
        return null;
    var c = this.doPublic(m);
    if(c == null)
        return null;
    var h = c.toString(16);
    if((h.length & 1) == 0)
        return h;
    else
        return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
function RSAEncryptB64(text) {
    var h = this.encrypt(text);
    if(h)
        return hex2b64(h);
    else
        return null;
}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

//my encrypt function, using fixed mudulus
var modulus = "BEB90F8AF5D8A7C7DA8CA74AC43E1EE8A48E6860C0D46A5D690BEA082E3A74E1"
+"571F2C58E94EE339862A49A811A31BB4A48F41B3BCDFD054C3443BB610B5418B"
+"3CBAFAE7936E1BE2AFD2E0DF865A6E59C2B8DF1E8D5702567D0A9650CB07A43D"
+"E39020969DF0997FCA587D9A8AE4627CF18477EC06765DF3AA8FB459DD4C9AF3";
var publicExponent = "10001";
function MyRSAEncryptB64(text) {
    var rsa = new RSAKey();
    rsa.setPublic(modulus, publicExponent);
    return rsa.encrypt_b64(text);
}

// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
    if(a != null)
        if("number" == typeof a)
            this.fromNumber(a,b,c);
        else if(b == null && "string" != typeof a)
            this.fromString(a,256);
        else
            this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() {
    return new BigInteger(null);
}

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
        var v = x*this[i++]+w[j]+c;
        c = Math.floor(v/0x4000000);
        w[j++] = v&0x3ffffff;
    }
    return c;
}

// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
        var l = this[i]&0x7fff;
        var h = this[i++]>>15;
        var m = xh*l+h*xl;
        l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
        c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
        w[j++] = l&0x3fffffff;
    }
    return c;
}

// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
        var l = this[i]&0x3fff;
        var h = this[i++]>>14;
        var m = xh*l+h*xl;
        l = xl*l+((m&0x3fff)<<14)+w[j]+c;
        c = (l>>28)+(m>>14)+xh*h;
        w[j++] = l&0xfffffff;
    }
    return c;
}

if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
} else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
} else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;

function int2char(n) {
    return BI_RM.charAt(n);
}

function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i)
        r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0)
        this[0] = x;
    else if(x < -1)
        this[0] = x+DV;
    else
        this.t = 0;
}

// return bigint initialized to value
function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
}

// (protected) set from string and radix
function bnpFromString(s,b) {
    var k;
    if(b == 16)
        k = 4;
    else if(b == 8)
        k = 3;
    else if(b == 256)
        k = 8; // byte array
    else if(b == 2)
        k = 1;
    else if(b == 32)
        k = 5;
    else if(b == 4)
        k = 2;
    else {
        this.fromRadix(s,b);
        return;
    }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
        var x = (k==8)?s[i]&0xff:intAt(s,i);
        if(x < 0) {
            if(s.charAt(i) == "-")
                mi = true;
            continue;
        }
        mi = false;
        if(sh == 0)
            this[this.t++] = x;
        else if(sh+k > this.DB) {
            this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
            this[this.t++] = (x>>(this.DB-sh));
        } else
            this[this.t-1] |= x<<sh;
        sh += k;
        if(sh >= this.DB)
            sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
        this.s = -1;
        if(sh > 0)
            this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi)
        BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c)
        --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
    if(this.s < 0)
        return "-"+this.negate().toString(b);
    var k;
    if(b == 16)
        k = 4;
    else if(b == 8)
        k = 3;
    else if(b == 2)
        k = 1;
    else if(b == 32)
        k = 5;
    else if(b == 4)
        k = 2;
    else
        return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
        if(p < this.DB && (d = this[i]>>p) > 0) {
            m = true;
            r = int2char(d);
        }
        while(i >= 0) {
            if(p < k) {
                d = (this[i]&((1<<p)-1))<<(k-p);
                d |= this[--i]>>(p+=this.DB-k);
            } else {
                d = (this[i]>>(p-=k))&km;
                if(p <= 0) {
                    p += this.DB;
                    --i;
                }
            }
            if(d > 0)
                m = true;
            if(m)
                r += int2char(d);
        }
    }
    return m?r:"0";
}

// (public) -this
function bnNegate() {
    var r = nbi();
    BigInteger.ZERO.subTo(this,r);
    return r;
}

// (public) |this|
function bnAbs() {
    return (this.s<0)?this.negate():this;
}

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0)
        return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0)
        return (this.s<0)?-r:r;
    while(--i >= 0)
        if((r=this[i]-a[i]) != 0)
            return r;
    return 0;
}

// returns bit length of the integer x
function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) {
        x = t;
        r += 16;
    }
    if((t=x>>8) != 0) {
        x = t;
        r += 8;
    }
    if((t=x>>4) != 0) {
        x = t;
        r += 4;
    }
    if((t=x>>2) != 0) {
        x = t;
        r += 2;
    }
    if((t=x>>1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
    if(this.t <= 0)
        return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i)
        r[i+n] = this[i];
    for(i = n-1; i >= 0; --i)
        r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i)
        r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
        r[i+ds+1] = (this[i]>>cbs)|c;
        c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i)
        r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) {
        r.t = 0;
        return;
    }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
        r[i-ds-1] |= (this[i]&bm)<<cbs;
        r[i-ds] = this[i]>>bs;
    }
    if(bs > 0)
        r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
        c += this[i]-a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
    }
    if(a.t < this.t) {
        c -= a.s;
        while(i < this.t) {
            c += this[i];
            r[i++] = c&this.DM;
            c >>= this.DB;
        }
        c += this.s;
    } else {
        c += this.s;
        while(i < a.t) {
            c -= a[i];
            r[i++] = c&this.DM;
            c >>= this.DB;
        }
        c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1)
        r[i++] = this.DV+c;
    else if(c > 0)
        r[i++] = c;
    r.t = i;
    r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0)
        r[i] = 0;
    for(i = 0; i < y.t; ++i)
        r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s)
        BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0)
        r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
        var c = x.am(i,x[i],r,2*i,0,1);
        if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
            r[i+x.t] -= x.DV;
            r[i+x.t+1] = 1;
        }
    }
    if(r.t > 0)
        r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0)
        return;
    var pt = this.abs();
    if(pt.t < pm.t) {
        if(q != null)
            q.fromInt(0);
        if(r != null)
            this.copyTo(r);
        return;
    }
    if(r == null)
        r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);  // normalize modulus
    if(nsh > 0) {
        pm.lShiftTo(nsh,y);
        pt.lShiftTo(nsh,r);
    } else {
        pm.copyTo(y);
        pt.copyTo(r);
    }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0)
        return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
        r[r.t++] = 1;
        r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y); // "negative" y so we can replace sub with am later
    while(y.t < ys)
        y[y.t++] = 0;
    while(--j >= 0) {
        // Estimate quotient digit
        var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
        if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {  // Try it out
            y.dlShiftTo(j,t);
            r.subTo(t,r);
            while(r[i] < --qd)
                r.subTo(t,r);
        }
    }
    if(q != null) {
        r.drShiftTo(ys,q);
        if(ts != ms)
            BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0)
        r.rShiftTo(nsh,r);    // Denormalize remainder
    if(ts < 0)
        BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        a.subTo(r,r);
    return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) {
    this.m = m;
}

function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
    else
        return x;
}

function cRevert(x) {
    return x;
}

function cReduce(x) {
    x.divRemTo(this.m,null,x);
}

function cMulTo(x,y,r) {
    x.multiplyTo(y,r);
    this.reduce(r);
}

function cSqrTo(x,r) {
    x.squareTo(r);
    this.reduce(r);
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
    if(this.t < 1)
        return 0;
    var x = this[0];
    if((x&1) == 0)
        return 0;
    var y = x&3;      // y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;    // y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;  // y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;   // y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;      // y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(r,r);
    return r;
}

// x/R mod m
function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
    while(x.t <= this.mt2)    // pad x so am has enough room later
        x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
        // faster way of calculating u0 = x[i]*mp mod DV
        var j = x[i]&0x7fff;
        var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
        // use am to combine the multiply-shift-add into one call
        j = i+this.m.t;
        x[j] += this.m.am(0,u0,x,i,0,this.m.t);
        // propagate carry
        while(x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
        }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0)
        x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) {
    x.squareTo(r);
    this.reduce(r);
}

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) {
    x.multiplyTo(y,r);
    this.reduce(r);
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() {
    return ((this.t>0)?(this[0]&1):this.s) == 0;
}

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1)
        return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
        z.sqrTo(r,r2);
        if((e&(1<<i)) > 0)
            z.mulTo(r2,g,r);
        else {
            var t = r;
            r = r2;
            r2 = t;
        }
    }
    return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven())
        z = new Classic(m);
    else
        z = new Montgomery(m);
    return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
/* [END] [Modified for]:The jsbn library Code is a fast, portable implementation of large-number math in pure JavaScript, enabling public-key crypto and other applications on desktop and mobile browsers.    */

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
//# sourceURL=xml.js

/* [Begin] [Modified for]:update the value of restore default    */
function checkRedirectEnableQuicksetup() {
    var params = {
        ajax_url : 'api/device/basic_information',
        func_response : function(ret) {
            g_restore_default_status=ret.response.restore_default_status;
            basic_infos = ret.response;
        },
        options : {
            sync : true
        }
    };
    AIRBOX.core.getAjaxRequest( params );
}
/* [END] [Modified for]:update the value of restore default    */

/* [Begin] [Modified for]:resolve the Cross Scripting    */
function XSSResolveCannotParseChar(xmlStr) {
    if (typeof(xmlStr) != 'undefined' && xmlStr != null && xmlStr != '') {
        return xmlStr.replace(/(\&|\'|\"|\>|\<|\/|\(|\))/g, function($0, $1) {
            return {
                '&' : '&amp;',
                "'" : '&#39;',
                '"' : '&quot;',
                '<' : '&lt;',
                '>' : '&gt;',
                '/' : '&#x2F;',
                '(' : '&#40;',
                ')' : '&#41;'
            }[$1];
        }
        );
    }
    return '';
}
/* [END] [Modified for]:resolve the Cross Scripting    */
