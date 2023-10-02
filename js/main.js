var AIRBOX = AIRBOX || {};
var g_data_obj = g_data_obj || {};


var MACRO_SIM_LOCK_ENABLE = "1";
var MACRO_SIM_REMAIN_TIMES = "10";
var MACRO_SIM_PLOCK_ENABLE = "0";

var UI_REFRESH_LOOP_INTERVAL = 6000;
//var UI_REFRESH_CONNECTION_STATUS_

var CONNECTED_UI_REFRESH_INTERVAL = 6000;
var DISCONNECTED_UI_REFRESH_INTERVAL = 6000;

var UPDATE_DELAY_INTERVAL_MS = 50;
var current_language_home = "";

//Default language selected by user or not
var default_language_flag = 0;

var AJAX_ERROR_LIMIT = 10;
var REFRESH_FUNC = REFRESH_FUNC || null;

//URL to home page
var HOME_PAGE_URL = 'index.html';
var sub_Language_menu = false;
var home_auto_update = false;
var g_scarm_login = false;

var home_auto_update_leftmenu = true;
var home_update_alert = false;
var current_href = window.location.href;
//In ATPv2, Default Logout Timer is 5 mins
var HOME_LOGOUT_TIMEOUT_MAIN = 600000;
var g_logoutTimer = '';
//getajaxrequest no respose timeout
var MACRO_OFFLOAD_DELAY_TIME = 2000;

var g_lang_edit = -1;
var g_convert_type = '';
var g_initialPinCount = '';

/*BEIGN Cancel Logout time */
function home_cancelLogoutTimer() {
    clearTimeout(g_logoutTimer);
}
/*END Cancel Logout time */

/*BEGIN Logout timer */
function startLogoutTimer() {
    clearTimeout(g_logoutTimer);
    g_logoutTimer = setTimeout(function () {
        userOut();
    }, HOME_LOGOUT_TIMEOUT_MAIN);
}
/*END Logout timer */

/* [Begin] [Modified for]:Update the Autoupdate status    */
function home_checkUpdateNeedLogin() {
    getAjaxData('api/webserver/white_list_switch', function ($xml) {
        var ret = xml2object($xml);
        if (ret.type == 'response') {
            home_auto_update_leftmenu = true;
            if (ret.response.whitelist_enable == '1') { //open auto update
                home_auto_update = true;
            } else {
                home_auto_update = false;
            }
        } else {
            home_auto_update = false;
            home_auto_update_leftmenu = false;
        }
    }, {
            errorCB: function () {
                home_auto_update = false;
                home_auto_update_leftmenu = false;
            },
            sync: true
        });
}
/* [END] [Modified for]:Update the Autoupdate status    */

/* [Begin] [Modified for]:Check Supported SMS type    */
function check_lang_edit() {
    getAjaxData("api/sms/splitinfo-sms", function ($xml) {
        var ret = xml2object($xml);
        if (ret.type == "response") {
            g_lang_edit = ret.response.splitinfo;
            g_convert_type = ret.response.convert_type;
        }
    }, {
            sync: false
        });
}
/* [END] [Modified for]:Check Supported SMS type    */

/* [BEGIN] [Modified for]:Check if language is set by user    */
function home_check_defaultLang_flag() {
    getAjaxData('api/deviceinfo/default-language-flag', function ($xml) {
        var ret = xml2object($xml);
        if (ret.type == 'response') {
            default_language_flag = ret.response.default_language_flag;
        }
    }, {
            sync: true
        });
}
/* [END] [Modified for]:Check if language is set by user    */

/* [END] [Modified for]:Get the Current Langauge    */
function home_check_currentHref() {
    getAjaxData('api/monitoring/converged-status', function ($xml) {
        var ret = xml2object($xml);
        if (ret.type == 'response') {
            current_language_home = ret.response.CurrentLanguage;
        }
    }, {
            sync: true
        });
}
/* [BEGIN] [Modified for]:Get the Current Langauge    */

var click_Params_default = {
	$clickable : null,
	adminEffect : function(){},
	guestEffect : function(){},
	authOptions : {}
}

function gotoPageWithoutHistory(url) {
	AIRBOX.popinSpin.show();
	window.location.replace(url);
}

function reloadWithoutHistory() {
	AIRBOX.popinSpin.show();
	window.location.reload(true);
}

function gotoPageWithoutHistoryNewTab(url) {
	//AIRBOX.popinSpin.show();
	window.open(url, "_tab");
}
/* [BEGIN] [Modified for]:Open the page in the same tab in case of mobile    */
function gotoPageWithoutHistoryNewTab_isphone(url) {
    //AIRBOX.popinSpin.show();
    window.open(url, "_self");
}
/* [END] [Modified for]:Open the page in the same tab in case of mobile    */

/* [BEGIN] [Modified for]:Open the Help Page in the New  tab in case of mobile    */
function gotoPageWithoutHistoryNewTab_help(url) {
    //AIRBOX.popinSpin.show();
    window.open(url, "_blank");
}
/* [END] [Modified for]:Open the Help Page in the New  tab in case of mobile    */

function loggedClickEffect(params) {
    var _params = params || click_Params_default;
    //detatch default effect
    setTimeout(
        function () { _params.$clickable.off("touchstart click", AIRBOX.auth.clickFunction) },
        100);

    //attatch new effect
    _params.$clickable.on("touchstart click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (airboxRegistry.loggedAsGuest === true && typeof (_params.guestEffect) === 'function') {
            _params.guestEffect();
        } else if (airboxRegistry.logged === true && typeof (_params.adminEffect) === 'function') {
            _params.adminEffect();
        } else {
            var lngArray = AIRBOX.core.settings.currentLanguages.translations;
            var options = _params.authOptions || {};
            if (options.title) {
                options.title = lngArray[options.title];
            }
            options.message =  /*IF*/ options.message ?
                               /*THEN*/ lngArray[options.message] :
                               /*ELSE*/ _params.$clickable.attr('title');

			options.message = options.message || _params.$clickable.attr('title');
			options.adminAction = options.adminAction || _params.adminEffect;
			options.guestAction = options.guestAction || _params.guestEffect;

			AIRBOX.popinAuth.show(options);
		}
	});
}

var LanguageButtonEffect = function(event, languageLabel) {
		event.preventDefault();

    var lang = getTranslationId(languageLabel);
    var idx = getTranslationIndex(lang);
    easyTranslate(lang);
    var lng_code; //= lang + '_' + (lang == 'en'? 'us':lang);
    if (lang == 'en') {
        lng_code = lang + '_' + 'us';
    } else if (lang == 'ar') {
        lng_code = lang + '_' + 'sa';
    } else {
        lng_code = lang + '_' + lang;
    }
    $("html body.others div.useful.support div.info").attr("lang", lang);
    changeLang(lng_code);
	};


function showInfoDialog( text_info ){
	//TODO : realiser une methode de popup generique
	var el = 4;
}

/*--------------------------------------------------------------------------
*
* AIRBOX.core
* ----------
* AIRBOX.scripts
* AIRBOX.menu
* AIRBOX.slide
* ----------
* AIRBOX.connection
* AIRBOX.usage
* AIRBOX.messages
* AIRBOX.cloud
* AIRBOX.wifi
* ----------
* AIRBOX.popins
* AIRBOX.popinAuth
* AIRBOX.popinPin
* AIRBOX.popinRoaming
* AIRBOX.popinLng
* AIRBOX.popinUpdate
* AIRBOX.popinMessageAlert
* AIRBOX.popinNewMessage
* AIRBOX.popinSpin
* ----------
* AIRBOX.faq
* ----------
* document.ready
*
------------------------------------------------------------------------ */

var externals = {};

/* -------------------------------------------------------------------------
 class - core
 ------------------------------------------------------------------------ */
AIRBOX.core = (function()
{
    var settings = {
        overEvent: (Modernizr.touch) ? 'click' : 'mouseover focusin',
        clickEvent: (Modernizr.touch) ? 'touchstart' : 'click',
        downEvent: (Modernizr.touch) ? 'touchstart' : 'mousedown',
        upEvent: (Modernizr.touch) ? 'touchend' : 'mouseup',
        moveEvent: (Modernizr.touch) ? 'touchmove' : 'mousemove',
        isTouch: Modernizr.touch,
        isIos: (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) != null) ? true : false,
        isMobile: _mobile_detection(),
        isPad: _pad_detection(),
        $body: $("body"),
        $header: $("header"),
        $main: $("#main"),
        currentLanguages: null
    };
    var ajax_error_occurence = 0;
    var timer_ui_refresh = null;
    var freeze_ui_refresh = false;
    
    function _mobile_detection() {
        var result = false;

        if (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            if (!( ((screen.width >= 480) && (screen.height >= 800)) || ((screen.width >= 800) && (screen.height >= 480)) || navigator.userAgent.match(/ipad/gi) )) {
                result = true;
            }
        }
        return result;
    }

    function _pad_detection() {
        var result = false;
        
        if (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
            result = true;
        }
        return result;
    }
/* [BEGIN] [Modified for]:Get the values from the config file    */
    function _readXmlLinking(callback){
        getConfigData('linking.xml', function($xml) {
            var xml_linking = xml2object($xml);
        
        if(xml_linking) {
            getConfigData(
                xml_linking.config.home.xml.config_global_config,
                function ($xml) { externals.feature_global = _xml2feature($xml); },
                { sync: true });

            getConfigData(
                xml_linking.config.home.xml.config_product_config,
                function ($xml) { externals.config_airbox = xml2object($xml); },
                { sync: true });
            getConfigData(
                xml_linking.config.home.xml.config_update_redirect,
                function ($xml) { externals.feature_webuicfg = _xml2feature($xml); },
                { sync: true });

            getConfigData(
                xml_linking.config.home.xml.config_sms_config,
                function($xml) {
                    externals.config_sms = xml2object($xml);
                    externals.feature_sms = _xml2feature($xml);
                },
                { sync: true });

            getConfigData(
                xml_linking.config.home.xml.config_global_net_type,
                function($xml) {
                    var ret =  xml2object($xml);
                    externals.networkTypes = [];
                    
                    if( $.isArray( ret.config.networktypes ) ){
                        $.each( ret.config.networktypes , function(i, v){
                            externals.networkTypes[ parseInt( v.index,10 ) ] =  v.networktype;
                        })
                    }
                },
                { sync: true });

            /*BEGIN Online update popup config*/
            getConfigData(
                xml_linking.config.home.xml.config_update_redirect,
                function ($xml) {
                    externals.config_updateRedirection = xml2object($xml);
                },
                { sync: true });
            /*END Online update popup config*/

                //HTML EXTERNALS
                $.extend(externals, xml_linking.config.home.html);
            }

			if(typeof(callback) === 'function'){
				callback();
			}

	    }, {
	        sync: true
	    });
	}
/* [END] [Modified for]:Get the values from the config file    */

	function _refresh_ui(){
		if(jQuery.isFunction(REFRESH_FUNC)) REFRESH_FUNC();
	}

	function _launchTimerUI(){
		//set refresh function
		if(timer_ui_refresh == null){
			timer_ui_refresh = setInterval( function()
				{
					_refresh_ui();
					_update();
				},
				UI_REFRESH_LOOP_INTERVAL);
		}
	}

	function _clearTimerUI()
	{
		if (timer_ui_refresh !=null)
		{
			clearInterval(timer_ui_refresh);
			timer_ui_refresh = null;
		}
	}

	function _updateActivity( activityName ){

	}

    function init(options) {
        getAjaxToken();
        checkRedirectEnableQuicksetup();
        get_GlobalFeatures();
        getPrivacyNoticeInfo();
        $.extend(settings, options);
            _readXmlLinking(function(){
                AIRBOX.scripts.init(options);
                AIRBOX.popins.init(options);
                AIRBOX.slide.init(options);
                AIRBOX.themes.init(options);
                initTranslator();
                /*[BEGIN]Customer Code  */
                g_isCDMA = externals.feature_sms.cdma_enabled == "1" ? true : false;
                g_charlang = externals.feature_sms.smscharlang;

                //WEB ACCESS Settings
                var $wa_settings = $('div#connectedHomepageContainer a.settings.externals');
                $wa_settings.attr('href', '');

                /*loggedClickEffect({$clickable :  $wa_settings, // menu
                    adminEffect : function(){ gotoPageWithoutHistory('../' + externals.wa_settings); }
                });*/
        });
    }

/* [BEGIN] [Modified for]:Initialize All block,Help,FaQ page    */
    function _initAfterConfig() {
        var lng;

        AIRBOX.menu.init({});
        AIRBOX.popinSpin.hide();



        UpdateAuthenticationDisplay(AIRBOX.menu.showMsisdn);
        AIRBOX.logged.loginCallback(AIRBOX.menu.showMsisdn);

        if (settings.$body.hasClass('others')) {
            if (settings.$body.hasClass('help')) {
                AIRBOX.help.init();
            }
            if (settings.$body.hasClass('faq')) {
                AIRBOX.faq.init();
            }
        } else {
            //block inits
            $.each(AIRBOX.config.blocks, function (index, block) {
                if( block.isActive ){
                    AIRBOX[block.className].init();
                }
            });
        }

        AIRBOX.logged.init();
        AIRBOX.auth.init();
        if (default_language_flag == 0) {

            AIRBOX.popins.popinOnLoad();

            $("#popinLng .cache").on("touchstart click", function () {
                if(!airboxRegistry.logged) {
                    AIRBOX.logged.loginCallback(function () {
                        checkUpdateState();
                    });
                } else {
                    checkUpdateState();
                }
                getPinStatus(checkSimState);
            });

            $("#popinLng .popin-container .popin.languages-list ul li a").on("touchstart click", function () {
                if(!airboxRegistry.logged) {
                    AIRBOX.logged.loginCallback(function () {
                        checkUpdateState();
                    });
                } else {
                    checkUpdateState();
                }
                getPinStatus(checkSimState);
            });
        }
        else {
            if(!airboxRegistry.logged) {
                AIRBOX.logged.loginCallback(function () {
                    checkUpdateState();
                });
            } else {
                checkUpdateState();
            }
            getPinStatus(checkSimState);
        }
        _refresh_ui();
        _update();

        if (timer_ui_refresh == null) {
            _launchTimerUI();
        }
    };
/* [END] [Modified for]:Initialize All block,Help,FaQ page    */

    var ajax_params_default = {
        ajax_url: '',
        request: {},
        func_response: function () { },
        func_error: function () { },
        func_callback: function () { },
        options: {
            sync: false,
            errorCB: function (XMLHttpRequest, textStatus) { }
        }
    };

/* [BEGIN] [Modified for]:MAinlne Get Method    */
    function _getAjaxRequest(params) {
        var _params = params || ajax_params_default;
        if (_params.ajax_url) {
            _params.options = params.options || { options: {} };
            _params.options.errorCB = (function (_super) {
                return function () {
                    setNewAjaxError(_params.ajax_url);
                    return _super.apply(this);
                }
            })(_params.options.errorCB);

            //$("cachebypass").val(new Date().getTime());

            getAjaxData(_params.ajax_url, function ($xml) {
                if (_params.ajax_url == 'api/app/privacypolicy') {
                    var ret = $xml;
                } else {
                    var ret = xml2object($xml);
                }
                if (ret.type == 'response') {
                    _resetAjaxError();

                    //RESPONSE FUNCTION
                    if (jQuery.isFunction(_params.func_response)) { _params.func_response(ret); }

                } else {
                    if (ret.error) {
                        switch (ret.error.code) {
                            case ERROR_SYSTEM_BUSY:
                                setTimeout(function () { _getAjaxRequest(params); }, MACRO_OFFLOAD_DELAY_TIME);
                                break;
                            case ERROR_WRONG_SESSION_ID:
                            case ERROR_WRONG_SESSION_TOKEN:
                                reloadWithoutHistory();
                                //gotoPageWithoutHistory( window.location.href /*HOME_PAGE_URL*/ );
                                break;
                        }

                        //ERROR FUNCTION CALLBACK
                        if (jQuery.isFunction(_params.func_error)) { _params.func_error(ret); }
                    } else {
                        setTimeout(function () { _getAjaxRequest(params); }, MACRO_OFFLOAD_DELAY_TIME);
                    }

                    setNewAjaxError(_params.ajax_url);
                }
                //CALLBACK FUNCTION
                if (jQuery.isFunction(_params.func_callback)) { _params.func_callback(ret); }

            }, _params.options);
        }
        
    }
/* [END] [Modified for]:MAinlne Get Method    */

/* [BEGIN] [Modified for]:MAinlne Post Method    */
    function _setAjaxRequest( params )
	{
		//send a POST request
                var _params = params || ajax_params_default;
        if (_params.ajax_url) {
            _params.options = params.options || { options: {} };

            //processData == false AND contentType == false are needed to use form data
            //in this case, there is no xml transformation
                if (_params.ajax_url == 'api/app/privacypolicy') {
                    var req_xml = JSON.stringify(_params.request);
                } else {
                    var req_xml =
                /*IF*/ _params.options.processData == false && _params.options.contentType == false ?
                /*THEN*/ _params.request :
                /*ELSE*/ object2xml('request', _params.request);
                }

            _params.options.errorCB = (function (_super) {
                return function () {
                    setNewAjaxError(_params.ajax_url);
                    return _super.apply(this);
                }
            })(_params.options.errorCB);

            //$("cachebypass").val(new Date().getTime());

            saveAjaxData(_params.ajax_url, req_xml, function ($xml) {
                var ret = xml2object($xml);
                if (isAjaxReturnOK(ret) || ret.type == 'response') {
                    _resetAjaxError();

                    //RESPONSE FUNCTION
                    if (jQuery.isFunction(_params.func_response)) { _params.func_response(ret); }

                } else {
                    if (_params.ajax_url == 'api/app/privacypolicy') {
                        getPrivacyNoticeInfo();
                    } else {
                        if (ret.error) {
                            switch (ret.error.code) {
                                case ERROR_SYSTEM_BUSY:
                                    setTimeout(function () { _getAjaxRequest(params); }, MACRO_OFFLOAD_DELAY_TIME);
                                    break;
                                case ERROR_WRONG_SESSION_ID:
                                case ERROR_WRONG_SESSION_TOKEN:
                                    reloadWithoutHistory();
                                    //gotoPageWithoutHistory( window.location.href );
                                    break;
                            }

                            //ERROR FUNCTION CALLBACK
                            if (jQuery.isFunction(_params.func_error)) { _params.func_error(ret); }
                        } else {
                            setTimeout(function () { _getAjaxRequest(params); }, MACRO_OFFLOAD_DELAY_TIME);
                        }
                    }

                    setNewAjaxError(_params.ajax_url);
                }
                //CALLBACK FUNCTION
                if (jQuery.isFunction(_params.func_callback)) { _params.func_callback(ret); }

            }, _params.options);
        }
    }
/* [END] [Modified for]:MAinlne Post Method    */

    function setNewAjaxError(url) {
        if (url != "api/ussd/get") {            //USSD API can give the empty response any number of time
            ajax_error_occurence++;

            if (ajax_error_occurence >= AJAX_ERROR_LIMIT) {

                AIRBOX.popinGeneric.show({
                    type: 'alert',
                    message: settings.currentLanguages.translations.dialup_lost_device || "device connection is lost",
                    action: _resetAjaxError,
                    callback: function () { setInterval(getGMonitoringStatus, 5000); }
                });
            }
        }
    }

    function _resetAjaxError() {
        if (ajax_error_occurence >= AJAX_ERROR_LIMIT) {
            setTimeout(function () { gotoPageWithoutHistory(HOME_PAGE_URL); }, 2000);
        }

        ajax_error_occurence = 0;
    }


    function executeGenericMethod(methodName, param, callback) {
        if (settings.$body.hasClass('others') == false) {
            $.each(AIRBOX.config.blocks, function (index, block) {
                if( block.isActive ){				// Verifying if the Block is enable then only it should load.
                AIRBOX[block.className][methodName](param);
                }
            });
        }

        if (settings.$body.hasClass('help')) {
            AIRBOX.help[methodName](param);
        }

        if (settings.$body.hasClass('faq')) {
            AIRBOX.faq[methodName](param);
        }

        if (jQuery.isFunction(callback)) {
            callback();
        }
    }

/* [BEGIN] [Modified for]:Spain Orange Requirement To Hide the logo for Spain Orange    */
    function _check_homelogo_display() {
        $('#logo_header').removeClass("hide").addClass("logo_header");
        return;
    }
/* [END] [Modified for]:Spain Orange Requirement To Hide the logo for Spain Orange    */

    function _translate(lngArray) {
        executeGenericMethod('UItranslate', lngArray, _refresh);
    };

    function _refresh() {
        executeGenericMethod('UIrefresh');
    }

/* [Begin] [Modified for]:Update the content of page    */
    function _update() {
        if (settings.$body.hasClass('others') == false) {
            UpdateAuthenticationDisplay();
            $.each(AIRBOX.config.blocks, function(index, block){
                if( block.isActive ){			// Verifying if the Block is enable then only it should load.
                    AIRBOX[block.className].Update( (index+1)* UPDATE_DELAY_INTERVAL_MS);
                }
            });


        }

        if (settings.$body.hasClass('help') == true) {
            AIRBOX.help.Update();
        }

        if (settings.$body.hasClass('faq') == true) {
            AIRBOX.faq.Update();
        }
	}
/* [END] [Modified for]:Update the content of page    */
	return {
            init : init,
            initAfterConfig : _initAfterConfig,
            settings : settings,
            launchTimerUI : _launchTimerUI,
            clearTimerUI : _clearTimerUI,
            getAjaxRequest : _getAjaxRequest,
            setAjaxRequest : _setAjaxRequest,
            UItranslate : _translate,
            UIrefresh : _refresh_ui,
            Update: _update,
            check_homelogo_display: _check_homelogo_display
    };
}());

/* -------------------------------------------------------------------------
 class - scripts
 ----------------------------------------------------------------------------- */
AIRBOX.scripts = (function()
{
    var s = {
        $lastScript         : $('#last-script'),
        $jsPath             : 'js/',
        $scriptsPath        : 'scripts/',
        $translationsPath   : 'translations/',
        $helpPath	    : AIRBOX.config.product.faqTranslationsPath
    };

    function init(options)
    {

			  // adjust product title to be dynamically intialized
				if( $.type(AIRBOX.config.product.title) === "string"){

					var title =  AIRBOX.config.product.title;
					AIRBOX.config.product.title={};

					$.each(AIRBOX.config.languages,function(i,e){
						AIRBOX.config.product.title[e.language] = title;
					});

				}else if(AIRBOX.config.product.title['default'] != null){

					$.each(AIRBOX.config.languages,function(i,e){
						if(AIRBOX.config.product.title[e.language] == null)
							AIRBOX.config.product.title[e.language] = AIRBOX.config.product.title['default'];
					});

				}else{
					$.each(AIRBOX.config.languages,function(i,e){
						if(AIRBOX.config.product.title[e.language] == null)
						    AIRBOX.config.product.title[e.language] = 'Flybox';

					});
				}


        // load translations scripts
        $.each(AIRBOX.config.languages, function (index, script) {
            _addScriptBeforeMainScript(s.$translationsPath + script.language);
            if (AIRBOX.core.settings.$body.hasClass('help') ||
                AIRBOX.core.settings.$body.hasClass('faq')) {
                _addScriptBeforeMainScript(s.$translationsPath + s.$helpPath + script.language);
            }
        });

        // load translator
        _addScriptBeforeMainScript(s.$scriptsPath + 'jquery.easyTranslator');


        if (AIRBOX.core.settings.$body.hasClass('others') == false) {
            $.each(AIRBOX.config.blocks, function (index, block) {
                if( block.isActive ){                //Verifying if the Block is enable then only it should load.
                    _addScriptBeforeMainScript( s.$scriptsPath + block.fileName );
                }

            });
        }

        if (AIRBOX.core.settings.$body.hasClass('help') == true) {
            _addScriptBeforeMainScript(s.$scriptsPath + 'help');
        }

        if (AIRBOX.core.settings.$body.hasClass('faq') == true) {
            _addScriptBeforeMainScript(s.$scriptsPath + 'faq');
        }
    };

    function _addScriptBeforeMainScript(url) {
        s.$lastScript.before('<script src="' + s.$jsPath + url + '.js"></script>');
    };

    return {
        init: init,
       _addScriptBeforeMainScript: _addScriptBeforeMainScript
    }
}());

/* -------------------------------------------------------------------------
 class - menu
 ----------------------------------------------------------------------------- */
AIRBOX.menu = (function() {
    var s = {},
    cs={},
    $_win = $(window);

    function init(options) {
        s.$main = $('#main');
        s.$navigationContainer = $("ul.navigation");
        s.$btnLng = $('#linkLanguages');
        s.$btnMenuContainer = $('.menu.navigation');
        s.$btnMenu = $('#linkMenu');
        s.$btnStart = $('header nav li.start, #mobile-menu ul.navigation li.start');
        s.$subLng = $('#languages');
        s.$subMenu = $('#menu');
        s.$mobileMenu = $('#mobile-menu');
        s.$mobileLng = $('#mobile-menu li.lng');
        s.$mobileClose = $('#mobile-menu .close');
        
        $("span.msisdn").addClass('hidden');
        
        $.extend(s, options);
        cs = AIRBOX.core.settings;
        $_win.on("resize.menu",_resize);

        var navID = navigator.userAgent;

        $("#menu a.help, #mobile-menu a.help").on("touchstart click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (navID.indexOf("IEMobile") >= 0) {
                gotoPageWithoutHistory('../' + externals.menu_help);
            }
            else {
	    //Customer Code
                var hardwarePlatform = navigator.platform.toLowerCase();
                var isphone = hardwarePlatform.indexOf("iphone") != -1;
                var ispad = hardwarePlatform.indexOf("ipad") != -1;
                if (isphone || ispad) {
                    gotoPageWithoutHistoryNewTab_isphone('../' + externals.menu_help);
                } else {
                    gotoPageWithoutHistoryNewTab_help('../' + externals.menu_help);
                }
            }
            _hideSubMenu();

        });

        $("#menu a.settings, #mobile-menu a.settings").on("touchstart click", function(event){

        });
        home_check_currentHref();
        loggedClickEffect({
            $clickable: $("#menu a.settings, #mobile-menu a.settings"), // menu
            adminEffect: function () { gotoPageWithoutHistory('../' + externals.menu_settings); },
            guestEffect: function () { gotoPageWithoutHistory('../' + externals.menu_settings); },
            authOptions: {
                'title': 'feature_only_available_to_administrator',
                'message': ''
            }
        });

        $("#menu li.guest a, #mobile-menu li.guest a").on("touchstart click", function (event) {

        });

        loggedClickEffect({
            $clickable: $("#menu li.guest a, #mobile-menu li.guest a"),
            authOptions: { 'title': 'feature_only_available_to_administrator' }
        });

        // Events
        $("li a", s.$subLng).on("touchend mouseup keydown", function(event){
            if(event.type === 'keydown' && event.keyCode !== 13) return;
            sub_Language_menu = true;
            $("li a.on").removeClass("on");
            LanguageButtonEffect(event, $(this).text() );
            _hideSubMenu();
        });

        $("li a", s.$mobileLng).on("touchend mouseup", function(event){
            sub_Language_menu = true;
            $("li a.on").removeClass("on");
            LanguageButtonEffect(event, $(this).text() );
            _hideSubMenu();
        });

        _resize();
        _initStartToNaviguateLink();
        if (cs.isMobile)
            _initTouchMenu();
        else {
            _initOver();
            _initClickPopinLng();
            
            if (!cs.isTouch) _initOut();
        }
    }

    function _initStartToNaviguateLink(){
        //$('ul.navigation li.start.navigation').addClass('hidden');
        
        var href = '';
        try {
            href = window.location.href;
        }
        catch(exception) {
            href = AJAX_HEADER;
        }
        if(href.indexOf("?url=") > -1){
            // get incoming url from querystring
            var incoming_url = href.substring(href.indexOf("?url=") + 5);
            // truncate *// if existing
            if (incoming_url.indexOf("//") > -1) {
                incoming_url = incoming_url.substring(incoming_url.indexOf("//") + 2);
            }

            s.$btnStart.removeClass('hidden').on("touchstart click",function(e){
                window.open('http://' + incoming_url);
                    gotoPageWithoutHistory(HOME_PAGE_URL);
            });
            //$('ul.navigation li.start.navigation a').attr('href', incoming_url);
        }else{
            s.$btnStart.addClass('hidden');
        }
    }
/* [Begin] [Modified for]:Get the MSISDN from the API    */
    function _showMsisdn() {
        if (typeof g_restore_default_status !== 'undefined' && g_restore_default_status == '0') {
            var $el = $('span.msisdn');
            if (airboxRegistry.logged && $el.hasClass('hidden')) {
                getDeviceInformation(
                    function (ret) {
                        var _response = ret.response || {};
                        if (_response.Msisdn != "") {
                            $('span.msisdn_num', $el).text(_response.Msisdn);
                            if (airboxRegistry.logged == true) {
                                $el.removeClass('hidden');
                            }

                        }
                        else {
                            if (AIRBOX.core.settings.simState == "pin_ready") {
                                switch (_response.Imsi.substring(0, 3)) {
                                    case '206': /*BELGIQUE*/            console.log('be-nl'); break;
                                    case '208': /*FRANCE*/              console.log('fr'); break;
                                    case '214': /*ESPAGNE*/             console.log('es'); break;
                                    case '226': /*ROUMANIE*/            console.log('ro'); break;
                                    case '231': /*SLOVAQUIE*/           console.log('sk'); break;
                                    case '234': /*ANGLETERRE*/ default: console.log('en'); break;
                                    case '260': /*POLOGNE*/             console.log('pl'); break;
                                    case '262': /*ALLEMAGNE*/           console.log('de'); break;
                                    case '268': /*PORTUGAL*/            console.log('pt'); break;
                                    case '350': /*RUSSIE*/              console.log('ru'); break;
                                    case '374': /*ARMENIE*/             console.log('am'); break;
                                }
                            }
                        }


                        if (AIRBOX.ussd) {
                            AIRBOX.ussd.initCodes();
                        }
                    });
            }
        }
    };
/* [END] [Modified for]:Get the MSISDN from the API    */

    function _initOver() {
        var hideMenu = function (e) {
            if (!cs.isTouch) {
                e.preventDefault();
            }
            _hideSubMenu();
        }

		var trigEvent = /*IF*/cs.isTouch ? /*THEN*/cs.clickEvent : /*ELSE*/cs.overEvent;

		s.$btnLng.on( trigEvent, function(e)
			{
				e.preventDefault();

				if (!s.$btnLng.hasClass("on"))
				{
					e.stopPropagation();
					_hideSubMenu();
					s.$btnLng.addClass("on");
					s.$subLng.removeClass('hidden').hide().fadeIn(100);
				}
			});

		s.$btnMenu.on( trigEvent,  function(e)
			{
				e.preventDefault();

				if (!s.$btnMenu.hasClass("on"))
				{
					e.stopPropagation();
					_hideSubMenu();
					cs.$header.css({'z-index':99});
					s.$btnMenu.addClass("on");
					s.$subMenu.removeClass('hidden').hide().fadeIn(100);
				}
			});

		if(!cs.isTouch){
			s.$btnStart.on(cs.overEvent,hideMenu);
			$("ul.navigation").on(cs.overEvent, function(e){ e.stopPropagation(); })
		}
	}

    function _initOut()
	{
		if(!cs.isTouch)
		{
			s.$subLng.on("mouseleave",function(e)
			{
				e.preventDefault();
				_hideSubMenu();
			});

			s.$subMenu.on("mouseleave",function(e)
			{
				e.preventDefault();
				_hideSubMenu();
			});

			$(document).on("click", function(e)
			{
				_hideSubMenu();

			});

			$(document).on ( "focusin", function(e)
			{
				if (s.$navigationContainer.has(document.activeElement).length == 0)
				{
					_hideSubMenu();
				}
			});

                        $("ul li a",s.$subLng).on("click", function(){

//                            $("header h1 a").text(cs.currentLanguages.translations[AIRBOX.config.product.translationLabel]);

                        });
		}
		else
		{
			$(document).on("touchstart", function(e)
			{
				_hideSubMenu();
			});

			$(document).on("touchend", function(e){

			});
		}
    }

    function _initClickPopinLng()
	{
		$("li.lng a",s.$subMenu).on(cs.clickEvent,function(event)
		{
			event.preventDefault();
			_hideSubMenu();
			AIRBOX.popinLng.show();
		});
    }

    function _initTouchMenu()
	{
		s.$btnMenu.on('touchend', function(e)
		{
			e.preventDefault();
			s.$main.css({display:'none'});
			s.$mobileMenu.css({display: 'block'});
		});

        s.$mobileClose.on('touchend', function (e) {
            e.preventDefault();
            s.$main.css({ display: 'block' });
            s.$mobileMenu.css({ display: 'none' });
            AIRBOX.slide.resize();
        });

		s.$mobileLng.on('touchend', function(e)
		{
			e.preventDefault();
			if (s.$mobileLng.hasClass('on'))
			{
				$("html, body").animate({ scrollTop: 0 }, 800, function(event)
				{
					$('.dropdown', s.$mobileLng).css({display: 'none'});
					s.$mobileLng.removeClass('on');
				});
			}
			else
			{
				$('.dropdown', s.$mobileLng).css({display: 'block'});
				$("html, body").animate({ scrollTop: $(document).height() }, 800);
				s.$mobileLng.addClass('on');
			}
		});
	}

	function _hideSubMenu()
	{
		s.$subMenu.addClass('hidden');
		s.$subLng.addClass('hidden');
		s.$btnMenu.removeClass("on");
		s.$btnLng.removeClass("on");
		cs.$header.css({'z-index':10});
    }

    function _resize()
	{
		if(cs.$body.hasClass("home"))
		{
			// var h = $_win.height()*0.05;
			// cs.$header.css({height:h+"px"});
        }
    }
    function _translate(lngArray){
		s.lngArray = lngArray;
    }
    return {
		init : init,
		hide : _hideSubMenu,
		showMsisdn : _showMsisdn,
		UItranslate : _translate
    };
}());


/* -------------------------------------------------------------------------
 class - slide
 ----------------------------------------------------------------------------- */
AIRBOX.slide = (function()
{
    var s = {
        $container: $("#main #container"),
        $shadow: $("#shadow"),
        $content: $("#main #content"),
        $btnLeft: $("footer .btnSlide.left"),
        $btnRight: $("footer .btnSlide.right"),
        $footer: $("footer"),
        $nav: $("footer ul.nav"),
        widthArticle: 0,
        nbArticles: 0,
        articlesPerPage: 0,
        numPage: 0,
        nbPages: 0,
        moving: false,
        ARTICLE_MARGIN: 26,
        ARTICLE_BORDER: 2,
        EASING: 'easeOutSine',
        SPEED: 350,
        HEIGHT: $("#main #container").height(),
        HEIGHT_BUTTON: $("footer .btnSlide.left").height()
    },
        cs = {},
        $_win = $(window);

    function init(options) {
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        $_win.on("resize.slide", _resize);

        var content = [];
        content = _initContent();
        _configContent(content);
    }
    function _initContent()
	{
        var htmlContent = [];
        var contentConfig = AIRBOX.config.blocks;

        // for each block
        $.each(contentConfig, function(i, v) {
            if( v.isActive ){

                $.ajax({url: "js/blocks/" + v.fileName + ".html", success: function (data) {
                    var content = $("<object>", {type: "type/html", data: "js/blocks/" + v.fileName + ".html"});
                    htmlContent.push($("<article>", {id: v.block, role: 'group'}).append(data));
                    //var navElement = "<li><a href='#'><span class='hide'>{{" + v.block + "}}</span></a></li>";
                    //$("#main ul.nav").append(navElement);
                }, async: false});
            }

        });
        return htmlContent;
    }

    function _configContent(content)
    {
        var htmlContent = $("<div>", {id: "content"});
        htmlContent.append(content);
        s.$content = htmlContent;
        $('#content', s.$container).replaceWith(htmlContent);
        s.widthArticle = $("article",s.$content).outerWidth() + s.ARTICLE_MARGIN;
        s.nbArticles = $("article",s.$content).length;
        s.$content.css({width:(s.widthArticle*s.nbArticles+s.ARTICLE_MARGIN)+"px"});
        _initWindow();
    }

    function _reachArticle(index){
    	if (s.moving) return;

    	s.numPage = Math.floor(index / s.articlesPerPage);


    	_slide();
    }

    function _initTouch()
    {
    	cs.$body.swipe({
    		tap:function(event, target){
    			console.log("Test : " + target);
    		},
            swipeStatus:function(event, phase, direction, distance, duration){
            	if (direction == "left" && phase == "end"){
            		if (s.numPage < s.nbPages-1) {
                    	s.$btnRight.trigger(cs.clickEvent);
            		}
            	}
            	if (direction == "right" && phase == "end"){
            		if (s.numPage > 0) {
                    	s.$btnLeft.trigger(cs.clickEvent);
            		}
            	}
            },
            allowPageScroll:"vertical",
            threshold:40
        });
    }

	function _initWindow() {
            _resize();
            _initBtn();

            if (cs.isPad) _initTouch();
        }

    function _initPagination() {
        // reset pagination
        s.articlesPerPage = Math.floor((s.$container.width() + s.ARTICLE_MARGIN + s.ARTICLE_BORDER) / s.widthArticle);

        if (s.articlesPerPage == 0) {
            s.articlesPerPage = 1;
        }
        s.nbPages = Math.ceil(s.nbArticles / s.articlesPerPage);
        s.$nav.empty();

		// creates pagination elements
		for (var i = 0 ; i < s.nbPages; i++)
		{
			var block = $("article",s.$content).eq(i * s.articlesPerPage),
				navElement = "<li><a href='#'>" + ( i + 1 ) + "<span class='hide'>{{" + block.attr('id') + "}}</span></a></li>";
			s.$nav.append(navElement);
		}

		// center pagination
		var nw = s.nbPages * 44,
			fw = nw + 120;
		s.$footer.width(fw + "px").css('margin-left', - fw/2 + "px");
		s.$nav.width(nw + "px").css('margin-left', - nw/2 + "px");

		_initNav();

	}

	function _initNav()
	{
		s.numPage = Math.min($("li:eq("+s.numPage+")",s.$nav).length, s.numPage);

		$("li:eq("+s.numPage+")",s.$nav).addClass("on");

		$("li",s.$nav).each(function(i)
		{
			$(this).on(cs.clickEvent,{index:i},function(event)
			{
				event.preventDefault();
				var data = event.data;

				s.numPage = data.index;
				_slide();
			});
		})
    }
    function _initBtn()
	{
		s.$btnLeft.on(cs.clickEvent,function(e)
		{
			e.preventDefault();
			if (s.moving) return;

			s.numPage--;
			_slide();
		});

		s.$btnRight.on(cs.clickEvent,function(e)
		{
			e.preventDefault();
			if (s.moving) return;

			s.numPage++;
			_slide();
		});
    }
    function _slide()
	{
		var l = - s.numPage * s.widthArticle * s.articlesPerPage;
		_checkArrows(l);

		s.moving=true;
		s.$content.stop().animate({left:l+"px"},s.SPEED,s.EASING,
			function(){
				s.moving=false;
			}
		);

		$("li",s.$nav).removeClass("on");
		$("li:eq("+s.numPage+")",s.$nav).addClass("on");
    }
    function _checkArrows(l)
	{
		if (l==0)
			s.$btnLeft.addClass("hidden");
		else
			s.$btnLeft.removeClass("hidden");

		if (s.$content.width() - s.ARTICLE_MARGIN + l < s.$container.width())
		{
			s.$btnRight.addClass("hidden");
			s.$shadow.hide();
		}
		else
		{
			s.$btnRight.removeClass("hidden");
			log(s.$container.width(),s.widthArticle);
			if(s.$nav.css("display")!="block") s.$shadow.fadeIn(150);
		}
	}
	
    function _resize()
	{
		var l = s.$content.position().left;

		if (cs.isTouch)
		{
			s.widthArticle = $("article",s.$content).outerWidth() + s.ARTICLE_MARGIN;
			s.nbArticles = $("article",s.$content).length;
            s.$content.css({width:(s.widthArticle*s.nbArticles+s.ARTICLE_MARGIN)+"px"});

			_initPagination();
			_checkArrows(l);
			s.$container.css({height:s.$content.css('height')});
		}
		else
		{
			// resize content
			s.widthArticle = $("article",s.$content).outerWidth() + s.ARTICLE_MARGIN;
			s.nbArticles = $("article",s.$content).length;
			s.$content.css({width:(s.widthArticle*s.nbArticles+s.ARTICLE_MARGIN)+"px"});

			_initPagination();
			_checkArrows(l);
			s.$container.css({left:Math.floor(s.$container.offset().left+"px")});
		 }
    }
    return {
		init : init,
		reachArticle : _reachArticle,
		resize: _resize
    };
}());

/* -------------------------------------------------------------------------
 class - airbox login links
 ----------------------------------------------------------------------------- */
AIRBOX.auth = (function()
{
    var s = {
    	LOGIN_LINK_NAME : "#login",
    	LOGOUT_LINK_NAME : "#logout"
	},
	cs={};

	var _authClickfunction = function(event)
		{
			if(airboxRegistry.logged == false)
			{
				event.preventDefault();
				AIRBOX.popinAuth.show({ 'message' : $(this).attr('title') });

			}
		};

	function init(options)
	{
		$.extend(s, options);
		cs = AIRBOX.core.settings;
		$.extend(s, {lngArray:cs.currentLanguages.translations});

		var $el = $("a[href=" + s.LOGIN_LINK_NAME + "]");
		$el.on("touchstart click", _authClickfunction);

		$(window).on('unload',function(event){
			if (typeof(Storage) !== "undefined") {
					// localStorage.clear();
					if(localStorage.getItem("orange.airbox.pin.close") === "true"){
							localStorage.setItem("orange.airbox.pin.firstLoad" , "true");
					}
				}
		});

		$("a[href=" + s.LOGOUT_LINK_NAME + "]").on("touchstart click",function(event)
		{
			event.preventDefault();


			userOut();
			$(document).trigger('logout');


			// This code is for saving the status of logging in
      if (typeof(Storage) !== "undefined") {
          localStorage.setItem("orange.airbox.loggedIn", "false");
					localStorage.setItem("orange.airbox.pinReady", "false");
					localStorage.setItem("orange.airbox.MessageAlert","false");
					localStorage.setItem("orange.airbox.logout","true");
					getPinStatus(checkSimState);
					AIRBOX.popinAuth.hide();

      }
		});
    }
    return {
		init : init,
		clickFunction : _authClickfunction
    };
}());

/* -------------------------------------------------------------------------
 class - airbox when logged
 ----------------------------------------------------------------------------- */
AIRBOX.logged = (function()
{
    var s = {
    	callbackList : [],
    	guestCallbackList : [],
		logoutCallbackList: []
	},
	cs={};

	function init(options)
	{
		$.extend(s, options);
		cs = AIRBOX.core.settings;
    }
    function _login()
	{
		airboxRegistry.logged = true;
		airboxRegistry.loggedAsGuest = false;

		$('.guest').addClass('hidden');
		$('.logged').removeClass('hidden');

		$(document).trigger('login');
        $.each(s.callbackList,function(i,cb) {
			cb();
		});
	}

	function _loginAsGuest()
	{
		airboxRegistry.logged = false;
		airboxRegistry.loggedAsGuest = true;

		var guest_ids = [
				"article#cloud",
				"#menu ul"
			];

		$.each(guest_ids, function(i,v){
				$(v + ' .logged').removeClass('hidden');
				$(v + ' .guest').addClass('hidden');
			});

		$.each(s.guestCallbackList,function(i,cb) {
			cb();
		});
	}

	function _logout()
	{
		airboxRegistry.logged = false;
		airboxRegistry.loggedAsGuest = false;

		$('.guest').removeClass('hidden');
		$('.logged').addClass('hidden');

		$(document).trigger('logout');

        $.each(s.logoutCallbackList,function(i,cb) {
            cb();
        });
	}

	function _loginCallback(cb)
	{
		if(typeof(cb) === "function") {
			s.callbackList.push(cb);
		}
	}

	function _loginAsGuestCallback(cb)
	{
		if(typeof(cb) === "function") {
			s.guestCallbackList.push(cb);
		}
	}

	function _logoutCallback(cb) {
        if(typeof(cb) === "function") {
            s.logoutCallbackList.push(cb);
        }
	}

	return {
		init : init,
		logout: _logout,
		login: _login,
		loginAsGuest : _loginAsGuest,
		loginCallback : _loginCallback,
		loginAsGuestCallback: _loginAsGuestCallback,
        logoutCallback: _logoutCallback
    };
}());

/* -------------------------------------------------------------------------
 class - airbox themes
 ----------------------------------------------------------------------------- */

AIRBOX.themes = (function() {

    function UrlExists(url)
    {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }

    function addCSS(filename) {
        if(UrlExists(filename)) {
            var cssId = 'theme-' + filename;  // you could encode the css path itself to generate id..
            if (!document.getElementById(cssId))
            {
                var head  = document.getElementsByTagName('head')[0];
                var link  = document.createElement('link');
                link.id   = cssId;
                link.rel  = 'stylesheet';
                link.type = 'text/css';
                link.href = filename;
                link.media = 'all';
                head.appendChild(link);
            }
        }
    }

    function init() {
        if(AIRBOX.config.product && AIRBOX.config.product.UITheme){
            var theme = AIRBOX.config.product.UITheme;
            if (theme) {
                addCSS('themes/' + theme + '/main.css');
                addCSS('themes/' + theme + '/webaccess.css');
            }
        }
    }

    return {
        init: init
    }
}());

/* -------------------------------------------------------------------------
 ON LOAD
 ----------------------------------------------------------------------------- */

$(document).ready(function () {
    home_check_defaultLang_flag();
    home_check_currentHref();
    check_lang_edit();

    if (document.cookie != "" && (navigator.userAgent.indexOf("MSIE") < 0) && (navigator.userAgent.indexOf("IEMobile") < 0) && (navigator.userAgent.indexOf("Edge/") < 0) && (navigator.userAgent.indexOf("Trident/") < 0)) {
        var cookies = document.cookie.split('; ');

		for (var i = 0 ; i < cookies.length ; i++){
			var cookie = cookies[i];
			var eqPos = cookie.indexOf('=');
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

            document.cookie = name + '=; domain=' + window.location.host + '; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        window.location.reload(true);
    }
    $("#help_url").click(function () {
        if (!sub_Language_menu) {
            var help_href = window.location.href;
            var help_url = help_href.substring(0, help_href.lastIndexOf("home"));
            var language_url = current_language_home;
            var help_common = "usermanual/" + language_url + "/usermanual/web_content_concept_00001.html";
            help_href = help_url + help_common;
            gotoPageWithoutHistory(help_href);
        }
    });
});

/* -------------------------------------------------------------------------
 READY
 ----------------------------------------------------------------------------- */

if($("#all_content").length == 0) {
	AIRBOX.popins.addPopin('Spin');
	AIRBOX.popinSpin.show();
}

$(window).ready(function()
{
	//jQuery.support.cors = true;
	//$.ajaxSetup({ cache: false });

	if ($(window).width()<320)
		$('head').append('<meta name="viewport" content="initial-scale=0.75, minimum-scale=0.75, maximum-scale=0.75, user-scalable=no">');

	$('header').load( 'header.html', function(){
			var $onglets = $('header div.onglets');
			$onglets.hide();

			if($('body').hasClass('help')){
				$onglets.show();
				$('li#tab_help', $onglets).addClass('on');
			}

			if($('body').hasClass('faq')){
				$onglets.show();
				$('li#tab_faq', $onglets).addClass('on');
			}
                        $("li#tab_faq a").attr("href",AIRBOX.config.product.faqPath);
			AIRBOX.core.init({});
		});
});

//# sourceURL=main.js
