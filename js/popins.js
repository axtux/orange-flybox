var AIRBOX = AIRBOX || {};
var g_data_obj = g_data_obj || {}

/*var g_moduleswitch = g_moduleswitch || {};*/

var get_monitoring_status = null;
var MACRO_PASSWORD_REMIND_ON = "0";
var MACRO_PASSWORD_REMIND_OFF = "1";

var MACRO_KEYCODE_ENTER = 13;
var home_auto_update = false;
var home_auto_update_leftmenu = true;

var RSA_LOGIN_MODE = '1';
var g_username_default = "admin";
var MODIFYPASSWORD_SHOW = 108008;
/* var g_quicksetup_saveDataOK = true; */
var g_quicksetup_savePasswordOK = true;
//update
var g_auto_update_ret = "";
/* [Begin] [Modified for]:Create an ARRAY from the Object    */
function CreateArray(obj) {
    var tempArray = [];
    if ($.isArray(obj)) {
        return obj;
    } else {
        if (typeof (obj) != 'undefined') {
            tempArray.push(obj);
        }
        return tempArray;
    }
}
/* [END] [Modified for]:Create an ARRAY from the Object    */
/* -------------------------------------------------------------------------
 class - popins init
 ----------------------------------------------------------------------------- */
AIRBOX.popins = (function()
{
    var s = {
            $container : $("#main").find("#container"),
            $list: [
                "Auth",
                "Pin",
                "Puk",
                "Simlock",                // Added Simlock Popup 
                "Roaming",
                "Update",
                "Lng",
                "MessageAlert",
                "NewMessage",
                "Generic",
                "PWStrength",
                "Example",                //Added GDPR POPUP
                "Modify"                  //Added Modify Password PoPUP
                /*
                "Spin",
                "Example",
                "ExtenderOn",
                "ExtenderOff",
                "WifiOn",
                "WifiOff",
                "NetworkExtender",
                "ExtenderNetwork",
                */
            ]
        },
        cs= {};

    function init(options) {

        $.extend(s, options);
        cs = AIRBOX.core.settings;
        buildPopins();

        s.$container.find('.config a').on('mouseup', function() {
            var popinID = 'popin' + this.rel;
           AIRBOX[popinID].show();
        });
    }
    var buildPopins = function () {

        var popinConfig = s.$list;

        $.each(popinConfig, function (i, popin) {
            _buildPopin(popin);
        });

        return {
            popinConfig: popinConfig
        }
    };

    var _buildPopin = function (popin) {
        var popinID = "popin" + popin;

        if($('#'+popinID).length > 0) return;

        $.ajax({url: "js/popins/" + popinID + ".html", success: function (data) {
            $("div#popins_div").append(getPopinsHTMLCode(data, popinID));
        }, async: false})
        AIRBOX[popinID].init();
    };

    var getPopinsHTMLCode = function(data, popinID) {

        // Wrapper containing popin elements
        var popinWrapper = $("<div>", {'class': 'popin-wrapper'});
        popinWrapper.html(data);

        // Container that vertically center wrapper
        var popinContainer = $("<div>", {'class': 'popin-container'});
        popinContainer.append(popinWrapper);
        popinContainer.append("<!--[if lte ie 7]><div class='popin-wrapper-fix'></div><![endif]-->");

        // Outter element with popinID
        var popinElement = $("<div>", {'id': popinID, 'class': 'hidden'});
        popinElement.append($("<div>", {'class': "cache"}));
        popinElement.append(popinContainer);

        return popinElement;
    };

    function _addPopin( popin ){
        var popinID = "popin" + popin;
        if( AIRBOX[popinID] ){
            s.$list.unshift( popin );
            _buildPopin( popin )
            //AIRBOX[popinID].init();
            AIRBOX[popinID].UItranslate();
        }
    }

    function _hide(){
        $.each(s.$list, function (i, popin) {
            var popinID = "popin" + popin;
            $('#'+popinID).addClass('hidden');
        });
    }

    function _translate(lngArray){
        $.each(s.$list, function (i, popin) {
            var popinID = "popin" + popin;
            AIRBOX[popinID].UItranslate(lngArray);
        });
    }
    function _popinOnLoad() {

        var popinConfig = AIRBOX.config.popin;

        $.each(popinConfig, function(i, v) {
            if (v.isActive) {
                AIRBOX.popinLng.show();
            }
        });
   }
    return {
        init: init,
        hide: _hide,
        addPopin: _addPopin,
        popinOnLoad: _popinOnLoad,
        UItranslate: _translate
    }
}())

/* -------------------------------------------------------------------------
 class - popin simlock
 ----------------------------------------------------------------------------- */

AIRBOX.popinSimlock = (function () {
    var s = {
        URL_SUBMIT: '',
        message: '',
        callback: null,
        request: { CurrentSimlock: '' }
    },
        cs = {};

/* [Begin] [Modified for]:simlock POPUP Initialization    */
    function _init(options) {
        s.$content = $('#popinSimlock');
        s.$cache = $('.cache', s.$content);

        s.$simlock = $('.simlock', s.$content);

        s.$error = $('p.error', s.$simlock);
        s.$form = $('form', s.$content);

        s.simlockPatern = /^[0-9]{8}$/;
        s.simlockPatern_new = /^[A-Za-z0-9]{16}$/;

        if (options) {
            $.extend(s, options);
        }
        cs = AIRBOX.core.settings;
        if (g_new_simlock == true) {
            $('input', s.$simlock).attr('maxlength', '16');
        } else {
            $('input', s.$simlock).attr('maxlength', '8');
        }
        _initButtons();
        _resetForm();
    };
/* [END] [Modified for]:simlock POPUP Initialization    */

/* [Begin] [Modified for]:simlock POPUP Buttons Operations    */
    function _initButtons() {
        $('a.close', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
            //Added action for CANCEL/CLOSE button of SIMLock Popup only when quick setup is not executed
            if ((typeof (s.action) == 'function') && ("1" == g_restore_default_status)) {
                s.action();
            }
        });

        $('#f_simlock').bind('keyup change input paste cut keydown', function () {

            if (($(this).val()).length >= 16) {
                button_enable('submit', '1');
            } else {
                button_enable('submit', '0');
            }
        });

        s.$form.on("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $button = $("#f_submit").parent();
            if ($button.hasClass('disable_btn')) {
                return;
            }


            var complete = true;

            $("input", s.$form).each(function (i) {
                var $el = $(this);
                $el.removeClass("red");
                $el.attr('aria-invalid', 'false');

                if ($el.hasClass('required') && $el.val() == "") {
                    $el.addClass("red");
                    $el.attr('aria-invalid', 'true');
                    complete = false;
                }
            });
            var pattern;
            if (g_new_simlock == true)
                pattern = s.simlockPatern_new;
            else
                pattern = s.simlockPatern;
            if (_checkPasswordInput(s.$simlock, pattern) == true && complete == true) {
                _submitForm();
            }
        });
    };
/* [END] [Modified for]:simlock POPUP Buttons Operations    */

/* [Begin] [Modified for]:simlock POPUP Display    */
    function _show(options) {
        AIRBOX.core.clearTimerUI();
        AIRBOX.popins.hide();

        $.extend(s, options);
        s.$content.removeClass("hidden");
        button_enable('submit', '0');

        // set ARIA focus
        s.$content.tabIndex = 0;
        $('input', s.$simlock).first().focus();
        _resetForm();

        if (simlock_status.SimLockRemainTimes < 10) {
            s.$error.removeClass('hidden').text(s.lngArray.dialup_label_simlock_error);
        }
        $('label', s.$simlock).text(s.lngArray.dialup_label_simlock_code_des.replace('d%', simlock_status.SimLockRemainTimes));
    };
/* [END] [Modified for]:simlock POPUP Display    */

/* [Begin] [Modified for]:simlock POPUP Hide    */
    function _hide() {
        s.$content.addClass("hidden");
        document.body.focus();
        AIRBOX.core.launchTimerUI();
    };
/* [END] [Modified for]:simlock POPUP Hide    */

/* [Begin] [Modified for]:simlock POPUP Data Post    */
    function _submitForm() {
        _hide();

        s.request.SimLockCode = $('input', s.$simlock).val();

        setSimlockStatus(s.request, function () {
            reloadWithoutHistory();
        });

        _resetForm();

        var getType = {};
        if (s.callback && getType.toString.call(s.callback) === '[object Function]') {
            s.callback();
        }
    }
/* [END] [Modified for]:simlock POPUP Data Post    */

/* [Begin] [Modified for]:simlock POPUP Data Validation    */
    function _checkPasswordInput($target, patern) {
        if (!patern.exec($('input', $target).val())) {
            if (g_new_simlock != true)
                $('p.error', $target).removeClass('hidden').text(s.lngArray.dialup_hint_simlock_code_valid_type);
            else
                $('p.error', $target).removeClass('hidden').text(s.lngArray.dialup_hint_simlock_code_valid_type_1);
            $('input', $target).val('');
            return false;
        } else {
            $('p.error', $target).addClass('hidden');
            return true;
        }
    }
/* [END] [Modified for]:simlock POPUP Data Validation    */

/* [Begin] [Modified for]:simlock POPUP Buttons Status    */
function button_enable(button_id, enable) {
    var my = $('.' + button_id);
    if (enable == '1') {
        my.removeClass('disable_btn');
        my.removeClass('button_dialog');
        my.removeClass('clr_gray_disable_btn_center');
        my.addClass('button_dialog');
    } else if (enable == '0') {
        my.removeClass('disable_btn');
        my.removeClass('clr_gray_disable_btn_center');
        my.removeClass('button_dialog');
        my.addClass('disable_btn');
        my.addClass('clr_gray_disable_btn_center');
    }
}
/* [END] [Modified for]:simlock POPUP Buttons Status    */

/* [Begin] [Modified for]:simlock POPUP Reset    */
    function _resetForm() {
        $('input', s.$simlock).val('');
        $('p.error', s.$simlock).addClass('hidden');
    }
/* [END] [Modified for]:simlock POPUP Reset    */

/* [Begin] [Modified for]:simlock POPUP Language Object creation    */
    function _translate(lngArray) {
        s.lngArray = lngArray;
    }
/* [END] [Modified for]:simlock POPUP Language Object creation    */

    return {
        init: _init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}())
/* -------------------------------------------------------------------------
 class - popin auth
 ----------------------------------------------------------------------------- */
AIRBOX.popinAuth = (function () {
    var s = {
        URL_SUBMIT: '',
        message: ''
    },
        cs = {};

    function init(options) {
        s.$content = $('#popinAuth');
        s.$error = $('p.error', s.$content);
        s.$cache = $('.cache', s.$content);
        s.$login = $('input#f_username', s.$content);
        s.$password = $('input#f_password', s.$content)
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initForm();
    };

    function _initClose() {
        $('a.close', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
        });
        /* [Begin] [Modified for]:Hide the close button In case of factory restore default (i.e. password not modified)    */
        if (typeof g_restore_default_status !== 'undefined' && g_restore_default_status == '1') {
            $('a.close', s.$content).hide();
        }
        /* [END] [Modified for]:Hide the close button In case of factory restore default (i.e. password not modified)    */
    };

    function _initForm() {
        var $form = $("form", s.$content);

        var initSubmitForm = function (event) {
            event.preventDefault();

			if(_checkFilled(s.$login, s.lngArray.settings_hint_user_name_empty ) &&
				_checkFilled(s.$password, s.lngArray.dialup_hint_password_empty)) {
				_submitForm();
			}else {
				s.$error.attr('role','alert');
			}
		}

        if ($('html').is('.lt-ie10')) {

            $("#f_password").keydown(function (e) {

                if (e.keyCode == MACRO_KEYCODE_ENTER) {
                    initSubmitForm(e);
                }
            });
        }

        $form.on("submit", initSubmitForm);

        s.$error.text('');
    };

    function _show(options) {
        AIRBOX.core.clearTimerUI();
        /* [Begin] [Modified for]:Removed the localStorage.removeItem code    */
        _reset();

        $.extend(s, options);

        $(".message h4", s.$content).text(s.title || s.lngArray.feature_only_available_to_administrator);
        $(".message p", s.$content).text(s.message || '');

        s.$content.removeClass("hidden");
        s.$content.fadeIn(150);

        s.$content.tabIndex = -1;
        if (s.$login.valueOf("#f_username").val() != "") {
            s.$password.focus();
        }
        else {
            s.$login.focus();
        }
        // This code is for checking if the user logged in as admin
        /* [Begin] [Modified for]:To resolve the login issue we removed the code ...
        it was storiing the username and password in the local storage    */
    };

    function _reset() {
        s.title = null;
        s.message = null;

        s.loginCallback = null;
        s.errorCallback = null;
        s.callback = null;
        s.adminAction = null;
        s.guestAction = null;

        s.$password.val('');
    }

    function _hide() {
        s.$content.fadeOut(150);
        s.$content.addClass("hidden");
        s.$error.text('');

        if (typeof (Storage) !== "undefined" && g_data_obj.Username !== 'admin') {
            localStorage.setItem("orange.airbox.logout", "guest");
            localStorage.setItem("orange.airbox.loggedIn", "false");

        }

        // restore focus
        s.$content.find('a, input, textarea').attr("tabindex",-1);
        document.body.focus();
        if(g_restore_default_status == '0') {		//IF the device not in factory restore state 
            AIRBOX.core.launchTimerUI();
        }
    };

    function _checkFilled($input, errorMessage) {
        if ($input == null || !$input.val()) {
            s.$error.text(errorMessage);
            $input.focus();
            $input.val('');
            $input.addClass("red")
            $input.attr('aria-invalid', 'true');
            return false;
        } else {
            $input.removeClass("red");
            $input.attr('aria-invalid', 'false');
            s.$error.text('');
            return true;
        }
    }

    function _submitForm() {
        var lastLoginCallback = s.loginCallback;
        var lastErrorCallback = s.errorCallback;

        s.$error.text('');

        s.loginCallback = function (ret) {
            _loginCallback(ret);
            $(document).trigger('login');
            if (jQuery.isFunction(lastLoginCallback))
                lastLoginCallback(ret);
                _hide();
        }

        s.errorCallback = function (ret) {
            _errorCallback(ret);
            if (jQuery.isFunction(lastErrorCallback))
                lastErrorCallback(ret);
        }

        login(s);

        if (typeof(s.callback) === 'function')
            s.callback();
            _hide();
    }

/* [Begin] [Modified for]:Mainline Login Functionality    */
    function login(options) {
        if ('' == g_requestVerificationToken) {
            getAjaxToken();
            login(options);
            return;
        }
        refreshToken();
        var _options = options || {};
        g_data_obj.Username = _options.$login.val();
        g_currentPassword = _options.$password.val();
        if (g_scarm_login) {
            $.ajaxSetup({ async: false });
            $.ajaxSetup({ async: true });

            var scram = CryptoJS.SCRAM();
            var firstNonce = scram.nonce().toString();
            var firstPostData = {
                username: _options.$login.val(),
                firstnonce: firstNonce,
                mode: RSA_LOGIN_MODE
            };
            //var firstXml = object2xml('request', firstPostData);
            var psd = _options.$password.val();

            var _options = options || {};
            var params = {
                ajax_url: 'api/user/challenge_login',
                request: firstPostData,
                func_response: function (ret) {
                    if (ret.type == 'response') {
                        g_scarm_salt = CryptoJS.enc.Hex.parse(ret.response.salt);
                        var iter = ret.response.iterations;
                        var finalNonce = ret.response.servernonce;
                        var authMsg = firstNonce + "," + finalNonce + "," + finalNonce;
                        var saltPassword = scram.saltedPassword(psd, g_scarm_salt, iter);
                        saltPassword = saltPassword.toString();
                        var clientKey = scram.clientKey(CryptoJS.enc.Hex.parse(saltPassword));
                        clientKey = clientKey.toString();
                        var serverKey = scram.serverKey(CryptoJS.enc.Hex.parse(saltPassword));
                        serverKey = serverKey.toString();
                        var clientProof = scram.clientProof(psd, g_scarm_salt, iter, authMsg);
                        clientProof = clientProof.toString();
                        var finalPostData = {
                            clientproof: clientProof,
                            finalnonce: finalNonce
                        };
                        if (ret['response']['newType'] && ret['response']['newType'] == '1') {
                            var newSalt = CryptoJS.enc.Hex.parse(ret['response']['newSalt']);
                            var newIter = ret['response']['newIterations'];
                            var newSaltPassword = scram.saltedPassword(psd,newSalt,newIter).toString();
                            var newStoredKey = scram.storedKey(scram.clientKey(CryptoJS.enc.Hex.parse(newSaltPassword))).toString();
                            var newServerKey = scram.serverKey(CryptoJS.enc.Hex.parse(newSaltPassword)).toString();
                            var hashOldNewPwd = self.SHA256(newStoredKey + newServerKey + clientProof);
                            finalPostData = {
                                clientproof: clientProof,
                                finalnonce: finalNonce,
                                hashOldNewPwd: hashOldNewPwd,
                                newStoredKey: newStoredKey,
                                newServerKey: newServerKey
                            }
                        }
                        //var finalXml = object2xml('request', finalPostData);

                        var _options = options || {};
                        var params = {
                            ajax_url: 'api/user/authentication_login',
                            request: finalPostData,
                            func_response: function (ret) {
                                if (ret.type == 'response') {
                                    var serverProof = scram.serverProof(psd, g_scarm_salt, iter, authMsg);
                                    serverProof = serverProof.toString();
                                    if (ret.response.serversignature == serverProof) {
                                        var publicKey = ret.response.rsan;
                                        var publicKeySignature = scram.signature(CryptoJS.enc.Hex.parse(publicKey), CryptoJS.enc.Hex.parse(serverKey));
                                        publicKeySignature = publicKeySignature.toString();
                                        if (ret.response.rsapubkeysignature == publicKeySignature) {
                                            g_encPublickey.e = ret.response.rsae;
                                            g_encPublickey.n = ret.response.rsan;
                                            storagePubkey(g_encPublickey.n, g_encPublickey.e);
                                            UpdateAuthenticationDisplay(function () {
                                                if (g_data_obj.Username == 'admin') {
                                                    AIRBOX.logged.login();
                                                    if (jQuery.isFunction(_options.adminAction)) {
                                                        _options.adminAction();
                                                    }
                                                } else {
                                                    AIRBOX.logged.loginAsGuest();
                                                    if (jQuery.isFunction(_options.guestAction)) {
                                                        _options.guestAction();
                                                    }
                                                }
                                            });


                                            if (typeof (_options.loginCallback) == 'function') {
                                                _options.loginCallback();
                                            }
                                        } else {
                                            console.log(IDS_login_fialed_prompt);
                                        }
                                    } else {
                                        console.log(IDS_login_fialed_prompt);
                                    }
                                } else {
                                    if (ret.error.code == ERROR_LOGIN_USERNAME_PWD_ORERRUN) {
                                        console.log(IDS_login_username_password_input_overrun);
                                    } else if (ret.error.code == ERROR_LOGIN_USERNAME_PWD_WRONG) {
                                        console.log(IDS_login_username_password_wrong);
                                    }
                                }
                            },
                            func_error: _options.errorCallback,
                            options: {
                                enc: false,
                                sync: false
                            }
                        };
                        AIRBOX.core.setAjaxRequest(params);

                    } else {
                        if (ret.error.code == ERROR_LOGIN_USERNAME_PWD_ORERRUN) {
                            console.log(IDS_login_username_password_input_overrun);
                        } else if (ret.error.code == ERROR_LOGIN_USERNAME_PWD_WRONG) {
                            console.log(IDS_login_username_password_wrong);
                        } else if (ret.error.code == ERROR_LOGIN_ALREADY_LOGIN) {
                            console.log(IDS_touch_user_login_repeat);
                        }
                    }
                },
                func_error: _options.errorCallback,
                options: {
                    enc: false,
                    sync: false
                }
            };
            AIRBOX.core.setAjaxRequest(params);
        } else {

            var params = {
                ajax_url: 'api/user/login',
                request: {
                    Username: _options.$login.val(),
                    Password: base64encode(SHA256(_options.$login.val() + base64encode(SHA256(_options.$password.val())) + g_requestVerificationToken[0])),
                    password_type: 4
                },
                func_response: function (ret) {
                    g_data_obj.Username = _options.$login.val();
                    var isPwStrengthLow = _getPWStrength(_options.$password.val()) == MACRO_PASSWORD_LOW;

                    if (g_data_obj.Username == 'admin') {
                        AIRBOX.logged.login();
                        if (isPwStrengthLow) {
                            AIRBOX.popinPWStrength.show({ action: _options.adminAction })
                        } else {
                            if (jQuery.isFunction(_options.adminAction)) {
                                _options.adminAction();
                            }
                        }
                    } else {
                        AIRBOX.logged.loginAsGuest();
                        if (isPwStrengthLow) {
                            AIRBOX.popinPWStrength.show({ action: _options.guestAction })
                        } else {
                            if (jQuery.isFunction(_options.guestAction)) {
                                _options.guestAction();
                            }
                        }
                    }

                    if (typeof (_options.loginCallback) == 'function') {
                        _options.loginCallback();
                    }
                },
                func_error: _options.errorCallback,
                options: {
                    enc: true,
                    sync: false
                }
            };
            AIRBOX.core.setAjaxRequest(params);
        }
        startLogoutTimer();
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("orange.airbox.loggedIn", "true");
            localStorage.setItem("orange.airbox.logout", "false");
            localStorage.setItem("orange.airbox.pin.close", "true");
        }
    }
/* [END] [Modified for]:Mainline Login Functionality    */

    function _getPWStrength(passValue) {
        function charMode(iN) {
            if (iN >= 48 && iN <= 57) { return 1; }
            else if (iN >= 65 && iN <= 90) { return 2; }
            else if (iN >= 97 && iN <= 122) { return 2; }
            else { return 4; }
        }
        function bitTotal(num) {
            var modes = 0;
            var i = 0;
            for (i = 0; i < 3; i++) {
                if (num & 1) { modes++; }
                num >>>= 1;
            }
            return modes;
        }

        var sPWLength = passValue.length;
        var sPWModes = 0;
        var i = 0;
        for (i = 0; i < sPWLength; i++) {
            sPWModes |= charMode(passValue.charCodeAt(i));
        }
        sPWModes = bitTotal(sPWModes);

        if (sPWLength < 6) {
            return MACRO_PASSWORD_LOW;
        } else {
            switch (sPWModes) {
                case 1: return /*IF*/ sPWLength >= 10 ?
                                   /*THEN*/ MACRO_PASSWORD_MID :
                                   /*ELSE*/ MACRO_PASSWORD_LOW; break;
                case 2: return MACRO_PASSWORD_MID; break;
                case 3: return MACRO_PASSWORD_HIG; break;
                default: return MACRO_PASSWORD_LOW; break;
            }
        }
    }


    function _loginCallback(ret) {
        s.$login.attr('value', s.$login.val());
        s.$password.val('');
    }

/* [Begin] [Modified for]:To verify the Entered password is correct or not ...and made focus to the Input fields    */
    function _errorCallback(ret){
        //TODO : recupérer les erreurs et les afficher en popup avec le nouveau systeme de popup générique
        var error_message = s.lngArray.ids_failed_login;

        switch (ret.error.code) {
            case ERROR_LOGIN_PASSWORD_WRONG:
                error_message = s.lngArray.system_hint_wrong_password;
                $('#f_password').val('');
                $('#f_password').focus();
                break;
            case ERROR_LOGIN_ALREADY_LOGIN:
                error_message = s.lngArray.common_user_login_repeat;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_USERNAME_WRONG:
                error_message = s.lngArray.settings_hint_user_name_not_exist;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_USERNAME_PWD_WRONG:
                error_message = s.lngArray.ids_login_username_password_wrong;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_USERNAME_PWD_WRONG_ONE_TIME:
                error_message = s.lngArray.ids_login_username_password_wrong_one_time;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_USERNAME_PWD_WRONG_TWO_TIME:
                error_message = s.lngArray.ids_login_username_password_wrong_two_time;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_USERNAME_PWD_ORERRUN:
                error_message = s.lngArray.ids_login_username_password_input_overrun;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            case ERROR_LOGIN_SSID2_FORBIDEN:
                error_message = s.lngArray.wifi_guest_login_error;
                $('#f_username').focus();
                $('#f_username').val('');
                $('#f_password').val('');
                break;
            default: break;
        }

        s.$error.text(error_message);

        var options = {};
        $.extend(options, s);

        if (s.$content.hasClass("hidden") && ret.error.code != ERROR_LOGIN_SSID2_FORBIDEN) {
            _show(options);
        }

        if (ret.error.code == ERROR_LOGIN_SSID2_FORBIDEN) {

            AIRBOX.popinGeneric.show({
                type: 'alert',
                message: s.lngArray.wifi_guest_login_error || "You cannot login as Admin on WiFi Guest",
                action: function () {
                    _hide();
                }
            });
        }
    }
/* [END] [Modified for]:To verify the Entered password is correct or not ...and made focus to the Input fields    */

    function _translate(lngArray) {
        s.lngArray = lngArray;
    }

    return {
        init: init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin pin
 ----------------------------------------------------------------------------- */
AIRBOX.popinPin = (function()
{
    var s = {
            URL_SUBMIT : '',
            message: '',
            callback: null,
            request: { OperateType : '',  CurrentPin : '', NewPin : '', PukCode : '' }
        },
        cs={};

    function _init(options)
    {
        s.$content = $('#popinPin');
        s.$cache = $('.cache', s.$content);

        s.$pin = $('.pin', s.$content);
        s.$remember = $('.remember', s.$content);
        s.$error = $('p.error', s.$pin);
        s.$form = $('form', s.$content);

        s.pinPatern = /^[0-9]{4,8}$/;

        if(options){
            $.extend(s, options);
        }
        cs = AIRBOX.core.settings;
        s.request.OperateType = MACRO_PIN_OPERATE_VALIDATE;

        _initButtons();
        _resetForm();
    }
    function _initButtons()
    {
        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
            //ON close, need to redirect to Quicksetup only if password not modified
            if ((typeof (s.action) == 'function') && ("1" == g_restore_default_status)) {
                s.action();
            }
        });

        s.$form.on("submit",function(event)
            {
                event.preventDefault();
                event.stopPropagation();
                var complete = true;

                $("input", s.$form).each(function(i)
                {
                    var $el = $(this);
                    $el.removeClass("red");
                    $el.attr('aria-invalid','false');

                    if ($el.hasClass('required') && $el.val()=="")
                    {
                        $el.addClass("red");
                        $el.attr('aria-invalid','true');
                        complete = false;
                    }
                });

                if (_checkPasswordInput( s.$pin, s.pinPatern) && complete) {
                    _submitForm();
                }
            });
    }

/* [Begin] [Modified for]:Displaying the PIN Code Popup as well as enter attempts out of three    */
    function _show(options)
    {


        AIRBOX.core.clearTimerUI();
        AIRBOX.popins.hide();


        $.extend(s, options);
        s.$content.removeClass("hidden");
        //set ARIA focus
        s.$content.tabIndex = 0;
        $('input', s.$pin).first().focus();
        _resetForm();
        if (pin_status.SimPinTimes < g_initialPinCount) {
            s.$error.removeClass('hidden').text(s.lngArray.dialup_label_pin_error);
        }
        $('label', s.$pin).text( s.lngArray.enter_your_pin_code.replace('d%', pin_status.SimPinTimes));

        // set ARIA focus
       s.$content.find('a, input, textarea').attr("tabindex",-1);


    }
/* [END] [Modified for]:Displaying the PIN Code Popup as well as enter attempts out of three    */

    function _hide()
    {
        s.$content.addClass("hidden");

        localStorage.setItem("orange.airbox.pin.close","true");
        // restore focus
        s.$content.find('a, input, textarea').removeAttr("tabindex");
        document.body.focus();
        AIRBOX.core.launchTimerUI();
    };

/* [Begin] [Modified for]:Submit the PIN Code data by the User    */
    function _submitForm() {
        _hide();

        s.request.CurrentPin = $('input', s.$pin).val();
        s.request.NewPin = $('input', s.$pin).val();
        s.request.PukCode = '';
        setPinOperate(s.request, function () {
            getSavePin(function (ret) {
                var req = {
                    SimSavepinStatus: ($('input', s.$remember).get(0).checked == true ? 1 : 0),
                    SimSavepinPIN: s.request.CurrentPin,
                    simsavepinenable: ret.response.simsavepinenable
                }
                setSavePin(req, function () {
                    //HOME_PAGE_URL ne transmets pas la redirection
                    //gotoPageWithoutHistory( window.location.href );
                    reloadWithoutHistory();
                });
            });
        });

        _resetForm();

        var getType = {};
        if (s.callback && getType.toString.call(s.callback) === '[object Function]') {
            s.callback();
        }


    }
/* [END] [Modified for]:Submit the PIN Code data by the User    */

    function _checkPasswordInput($target, patern)
    {
        if (!patern.exec($('input', $target).val()) ) {
            $('p.error', $target).removeClass('hidden').text(s.lngArray.dialup_hint_pin_code_valid_type);
            $('input', $target).addClass('red');
            $('input', $target).val('');
            return false;
        } else {
            $('p.error', $target).addClass('hidden');
            $('input', $target).removeClass('red');
            return true;
        }
    }

    function _resetForm()
    {
        $('input', s.$pin).val('');
        $('p.error', s.$pin).addClass('hidden');
        s.$remember.checked = false;
    }

    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init : _init,
        show : _show,
        hide : _hide,
        UItranslate : _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin puk
 ----------------------------------------------------------------------------- */
AIRBOX.popinPuk = (function()
{
    var s = {
            URL_SUBMIT : '',
            message: '',
            callback: null,
            request: { OperateType : '',  CurrentPin : '', NewPin : '', PukCode : '' }
        },
        cs={};

    function _init(options)
    {
        s.$content = $('#popinPuk');
        s.$cache = $('.cache', s.$content);

        s.$puk = $('.puk', s.$content);
        s.$pin = $('.pin', s.$content);
        s.$pin_confirm = $('.pin_confirm', s.$content);
        s.$error = $('p.error', s.$puk);
        s.$form = $('form', s.$content);

        s.pinPatern = /^[0-9]{4,8}$/;
        s.pukPatern = /^[0-9]{8}$/;
        if(options){
            $.extend(s, options);
        }
        cs = AIRBOX.core.settings;
        s.request.OperateType = MACRO_PUK_OPERATE_UNLOCK;

        _initButtons();
        _resetForm();
    }
    function _initButtons()
    {
        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

        s.$form.on("submit", function(event)
            {
                event.preventDefault();
                event.stopPropagation();
                var complete = true;

                $("input", s.$form).each(function(i)
                    {
                        var $el = $(this);
                        $el.removeClass("red");
                        $el.attr('aria-invalid','false');

                        if ($el.hasClass('required') && $el.val()=="")
                        {
                            $el.addClass("red");
                            $el.attr('aria-invalid','true');
                            complete = false;
                        }
                    });

                if ( _checkPukInput() && complete) {
                    _submitForm();
                }
            });
    }
    function _show(options)
    {
        AIRBOX.core.clearTimerUI();
        AIRBOX.popins.hide();

        $.extend(s, options);

        s.$content.removeClass("hidden");
        $('input', s.$puk).first().focus();

        //s.$content.find('a, input, textarea').attr("tabindex",-1);

        _resetForm();

        if(pin_status.SimPukTimes < 10){
            s.$error.removeClass('hidden').text(s.lngArray.dialup_label_puk_error);
        }

        $('label', s.$puk).text( s.lngArray.dialup_label_puk_code.replace('d%', pin_status.SimPukTimes) );
    }
    function _checkPukInput(){
        var check = true;

        //the 3 tests have to be runned each time => one 'if' for each condition
        //contrary to any 'OR.||'/'AND.&&' condition which stops the test at the first true/false value

        if( _checkPasswordInput( s.$puk, s.pukPatern, s.lngArray.dialup_hint_puk_code_valid_type) == false )    { check = false; }
        if( _checkPasswordInput( s.$pin, s.pinPatern) == false )    { check = false; }
        if( _checkSameInputValue( s.$pin_confirm, s.$pin) == false ){ check = false; }

        return 	check;
    }

    function _hide()
    {
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a, input, textarea').removeAttr("tabindex");
        document.body.focus();
        AIRBOX.core.launchTimerUI();
    }
    function _submitForm()
    {
        _hide();

        s.request.CurrentPin = $('input',s.$pin).val();
        s.request.NewPin = $('input',s.$pin).val();
        s.request.PukCode = $('input',s.$puk).val();

        setPinOperate(s.request, function(){
                getSavePin( function(ret) {
                        var req = {
                            SimSavepinStatus: 0,
                            SimSavepinPIN: s.request.CurrentPin,
                            simsavepinenable: ret.response.simsavepinenable
                        }
                        setSavePin(req, function(){
                            //HOME_PAGE_URL ne transmets pas la redirection
                            gotoPageWithoutHistory( window.location.href );
                        });
                });

                //s.request.OperateType = MACRO_PIN_OPERATE_DISABLE;
                //setPinOperate(s.request, {});
            });



        var getType = {};
        if (s.callback && getType.toString.call(s.callback) === '[object Function]') {
            s.callback();
        }
    }

    function _resetForm(){
        $('input',s.$puk).val('').removeClass('red');
        $('input',s.$pin).val('').removeClass('red');
        $('input',s.$pin_confirm).val('').removeClass('red');

        $('p.error',s.$content).addClass('hidden');
    }

    function _checkPasswordInput($target, patern, errorText)
    {
        if (patern && !patern.exec($('input', $target).val()) ) {
            if(errorText){
                $('p.error', $target).text(errorText);
            }
            $('p.error', $target).removeClass('hidden');
            $('input', $target).val('');
            $('input', $target).addClass("red");
            $('input', $target).attr('aria-invalid','true');
            return false;
        } else {
            $('p.error', $target).addClass('hidden');
            return true;
        }
    }

    function _checkSameInputValue($target, $reference)
    {
        val = $('input', $target).val();
        refVal = $('input', $reference).val();
        if(	!val || !refVal || val != refVal){
            $('p.error', $target).removeClass('hidden');
            $('input', $target).val('');
            $('input', $reference).val('');
            return false;
        }else{
            $('p.error', $target).addClass('hidden');
            return true;
        }
    }

    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init : _init,
        show : _show,
        hide : _hide,
        UItranslate : _translate
    };
}())


/* -------------------------------------------------------------------------
 class - popin roaming
 ----------------------------------------------------------------------------- */
AIRBOX.popinRoaming = (function()
{
    var s = {
        },
        cs={};

    function init(options)
    {
        s.$content = $('#popinRoaming');
        s.$cache = $('#popinRoaming .cache');
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initButtons();
    }
    function _initClose()
    {
        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

        s.$cache.on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

    }
    function _show(options)
    {
        $.extend(s, options);
        s.$content.removeClass("hidden");

        // set ARIA focus
        s.$content.find('a').attr("tabindex",-1);
        s.$content.find('.close').focus();
    }
    function _hide()
    {
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a, input, textarea').removeAttr("tabindex");
        document.body.focus();

    }

/* [Begin] [Modified for]:Roaming POPUP Button initilization and Operations    */
    function _initButtons()
    {
        s.$content.find('.ok').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            _hide();
        });
        var $link = $('.later', s.$content)[0];
        loggedClickEffect({ 
            $clickable : $('.later', s.$content),
            adminEffect : function(){
                _hide();
                gotoPageWithoutHistory('../'+externals.popin_set_roaming);
            } 
        });

        s.$content.find('.later').on(cs.clickEvent, function (event) {
            event.preventDefault();
            _hide();
        });
    };
/* [END] [Modified for]:Roaming POPUP Button initilization and Operations    */

    function _translate(lngArray) {
        s.lngArray = lngArray;
    }

    return {
        init: init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}())


/* -------------------------------------------------------------------------
 class - popin Generic
 ----------------------------------------------------------------------------- */
AIRBOX.popinGeneric = (function()
{
    var s = {
        },
        cs={},
        init_Options={},
        currentlyRunning = false;


    function init(options)
    {
        s.$content = $('#popinGeneric');
        s.$cache = $('.cache', s.$content);
        s.type = 'info';
        s.$title = $('h3#popin_generic span.custom', s.$content);
        s.$info = $('div.info h4', s.$content);

        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initButtons();

        $.extend(init_Options, s);
    };

    function _initClose(cacheenable) {

        cacheenable = typeof cacheenable !== 'undefined' ? cacheenable : true;

        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
            //ON close, need to redirect to Quicksetup only if password not modified
            if ((typeof (s.action) == 'function') && ("1" == g_restore_default_status)) {
                s.action();
            }
            if(typeof(s.cancel) === 'function'){
                s.cancel();
            }
        });

        if (cacheenable) {

            s.$cache.on('click',function(event)
            {
                event.preventDefault();
                _hide();
            });
        }
        else {
            s.$cache.off();
        }
    }
    function _initButtons() {

        $('a.ok', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
            if(typeof(s.action) === 'function'){
                s.action();
            }
        });

        $('a.later', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
        });
        $('a.update_enable', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
            if (typeof (s.action) == 'function') {
                s.action();
            }
        });
        $('a.update_cancel', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
            if(typeof(s.cancel) === 'function'){
                s.cancel();
            }
        });

        /*s.$content.find('.ok').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            _hide();
            if(typeof(s.action) === 'function'){
                s.action();
            }
        });

        s.$content.find('.later').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            _hide();
        });*/
    }

/* [Begin] [Modified for]:To Reset the Previous POPUP values enterd by the user    */
    function _reset(){
        $('a.close', s.$content).removeClass('hidden');
        $('div.info h4', s.$content).removeClass('hidden');
        $('span.title', s.$content).addClass('hidden');
        $('a.bt', s.$content).addClass('hidden');
        $('.popin_message').addClass('hidden');
        $('.title.alert', s.$content).text(s.lngArray.common_alert || 'alert');
        $('.title.confirm', s.$content).text(s.lngArray.common_confirm || 'confirm');
        $('.title.information', s.$content).text(s.lngArray.common_note || 'information');
        $('.title.update', s.$content).text(s.lngArray.common_update || 'update');
        $('.bt.validate', s.$content).text(s.lngArray.ok || 'ok');
        $('.bt.confirm', s.$content).text(s.lngArray.common_confirm || 'confirm');
        $('.bt.cancel', s.$content).text(s.lngArray.cancel || 'cancel');
        $('.bt.update_enable', s.$content).text(s.lngArray.update_enable || 'enable');
        $('.bt.update_cancel', s.$content).text(s.lngArray.update_cancel || 'cancel');
        _initClose();
    }
/* [END] [Modified for]:To Reset the Previous POPUP values enterd by the user    */

        function _initAlert(){
        AIRBOX.popins.hide();
        _reset();
        $('.title.alert', s.$content).removeClass('hidden');
        $('.bt.validate', s.$content).removeClass('hidden');
    }

    function _initConfirm(){
        _reset();
        $('.title.confirm', s.$content).removeClass('hidden');
        $('.bt.confirm', s.$content).removeClass('hidden');
        $('.bt.cancel', s.$content).removeClass('hidden');
    }

    function _initInfo(){
        _reset();
        $('.title.information', s.$content).removeClass('hidden');
        $('.bt.validate', s.$content).removeClass('hidden');
    }

/* [Begin] [Modified for]:Display the Generic POPUP Content    */
    function _initUpdate() {
        _reset();
        _initClose(false);
        $('a.close', s.$content).addClass('hidden');
        $('div.info h4', s.$content).addClass('hidden');
        $('.popin_message').removeClass('hidden');
        $('.title.update', s.$content).removeClass('hidden');
        $('.bt.update_enable', s.$content).removeClass('hidden');
        $('.bt.update_cancel', s.$content).removeClass('hidden');
    }
/* [END] [Modified for]:Display the Generic POPUP Content    */

    function _show(options) {
        AIRBOX.core.clearTimerUI();

        if(currentlyRunning){

            var prevAction = s.action;
            s.action = function(){
                if(typeof(prevAction) === 'function')
                    prevAction();

                setTimeout(function(){_show(options);},100);
            }
        }else{
            s = {};
            $.extend(s, init_Options);
            $.extend(s, options);
            currentlyRunning = true;

            cs = AIRBOX.core.settings;

            switch(s.type)
            {
                case 'alert' : _initAlert(); break;
                case 'information' : _initInfo(); break;
                case 'confirm' : _initConfirm() ; break;
                /* [Begin] [Modified for]:Adding the auto Update type Poup during GDPR    */
                case 'update':
                    _initUpdate();
                    break;
                default : _reset();  break;
            }

            s.$content.removeClass("hidden");
            s.$content.fadeIn(150);

            if(AIRBOX.core.settings.currentLanguages == null)
            {
                _initAlert();
                $('.title.alert', s.$content).text('Alert');
                s.$info.text('translation problem : please refresh the page');
                $('.bt.validate', s.$content).test('OK');
            }

            if(options.title){
                s.$title.removeClass('hidden').text(options.title);
            }

            if(options.message){
                s.$info.text(options.message);
            }

            // set ARIA focus
           s.$content.find('a').attr("tabindex",-1);
            s.$content.find('.close').focus();

            if(typeof(s.callback) === 'function')
            {
                s.callback();
            }
        }
    }
    function _hide(options)
    {
        $.extend(s, options);
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a').removeAttr("tabindex");
        document.body.focus();
        currentlyRunning = false;

        AIRBOX.core.launchTimerUI();
    }
    function _translate(lngArray){
        s.lngArray = lngArray;
        init_Options.lngArray = lngArray;
    }

    return {
        init : init,
        initClose : _initClose,
        show : _show,
        hide : _hide,
        reset : _reset,
        UItranslate : _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin update
 ----------------------------------------------------------------------------- */
AIRBOX.popinUpdate = (function()
{
    var s = {
        },
        cs={};

    function init(options)
    {
        s.$content = $('#popinUpdate');
        s.$cache = $('#popinUpdate .cache');
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initForm();
    }
    function _initClose()
    {
        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

        s.$cache.on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });
    };

/* [Begin] [Modified for]:Update the monitoring parameters form the API    */
    function getGMonitoringStatus(callback) {
        var params = {
            ajax_url: 'api/monitoring/status',
            func_response: function (ret) {
                if (ret.type == 'response') {
                    get_monitoring_status = ret.response;
                }
                if (typeof (callback) == 'function') {
                    callback();
                }
            },
            options: {
                sync: true
            }
        };
        AIRBOX.core.getAjaxRequest(params);
    }
/* [END] [Modified for]:Update the monitoring parameters form the API    */

/* [Begin] [Modified for]:update the value fo updatedWithout logging feature    */
    function home_checkUpdateNeedLogin(callback) {
        var params = {
            ajax_url: 'api/online-update/configuration',
            func_response: function (ret) {
                if (ret.type == 'response') {
                    home_auto_update_leftmenu = true;
                    if (ret.response.not_need_login == '1') { //open auto update
                        home_auto_update = true;
                    } else {
                        home_auto_update = false;
                    }
                } else {
                    home_auto_update = false;
                    home_auto_update_leftmenu = false;
                }
                if (typeof (callback) == 'function') {
                    callback();
                }
            }, func_error: function () {
                home_auto_update = false;
                home_auto_update_leftmenu = false;
            },
            options: {
                sync: true
            }
        };
        AIRBOX.core.getAjaxRequest(params);
    }
/* [END] [Modified for]:update the value fo updatedWithout logging feature    */

/* [Begin] [Modified for]:Diaplay the Online Update POPUP    */
    function _show(options) {
        home_checkUpdateNeedLogin();
        getGMonitoringStatus();
        AIRBOX.popins.hide();
        home_update_displayNewVersionFoundInfo();
        $('#update_popin').hide();
        $('#upgrade_label').hide();
        $('#auto_update_popin').show();
        $('#auto_upgrade_label').show();
        $('#auto_upgrade_info').show();
        $('.popin').show();
        $.extend(s, options);
        s.$content.removeClass("hidden");

        // set ARIA focus
        s.$content.find('a').attr("tabindex",-1);
        s.$content.find('.close').focus();
    }
/* [END] [Modified for]:Diaplay the Online Update POPUP    */

    function _hide()
    {
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a, input, textarea').removeAttr("tabindex");
        document.body.focus();
    }

/* [Begin] [Modified for]:Initilize the Online Update POPUP    */
    function _initForm()
    {
        var $form = $("form",s.$content);

        s.$content.find('.later').on(cs.clickEvent,function(event)
        {
            event.preventDefault();

            var remember = $("#remember_update").attr("checked");
            if(remember) {
                newCookie('remember_update','true',{expires:1});
            }


            _hide();
        });

        s.$content.find('#newVersion_Cancel,#newVersion_close_btn').on(cs.clickEvent, function (event) {
            getAjaxData('api/online-update/redirect_cancel', function ($xml) {
            });
            var randid = getQueryStringByName("randid");
            if (randid != null && randid.length > 0) {
                getAjaxData("api/prsite/getrandurl", function ($xml) {
                    var ret = xml2object($xml);
                    if (ret.type == 'response') {
                        var randinfos = CreateArray(ret.response.randinfos.randinfo);
                        var i = 0;
                        var newUrl = '';
                        for (i = 0; i < randinfos.length; i++) {
                            if (randinfos[i].id == randid) {
                                newUrl = randinfos[i].url;
                                break;
                            }
                        }
                        var post_data = {
                            "randid": randid
                        }
                        var post_xml = object2xml('request', post_data);
                        saveAjaxData('api/prsite/getrandurl', post_xml, function ($xml) {
                            if ('' != newUrl) {
                                newUrl = 'http://' + newUrl;
                                window.location.replace(newUrl);
                            }
                        }, {
                                sync: true
                            });
                    }
                }, {
                        sync: true
                    }
                );
            }
        });

        s.$content.find('#f_submit_update').on(cs.clickEvent, function (event) {
            var destnation = "/html/content.html#upgrade";
            gotoPageWithoutHistory(destnation);

            $form.on("submit", function (event) {
                event.preventDefault();
                _submitForm();
            });
        });
    }
/* [END] [Modified for]:Initilize the Online Update POPUP    */

    function _submitForm()
    {
        //the function is not implemented yet
        //TODO : uncomment the event when it is done

        _hide();
    }

    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init : init,
        show : _show,
        hide : _hide,
        UItranslate : _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin Languages
 ----------------------------------------------------------------------------- */
AIRBOX.popinLng = (function()
{
    var s = {
        },
        cs={};

    function init(options)
    {
        s.$content = $('#popinLng');
        s.$cache = $('#popinLng .cache');
        $.extend(s, options);
        cs = AIRBOX.core.settings;
    }
    function _show(options)
    {
        $.extend(s, options);
        s.$content.removeClass("hidden");

        _initClose();

        // set ARIA focus
        s.$content.find('a').attr("tabindex",-1);
        s.$content.find('.on').focus();

    }
    function _hide()
    {
        s.$content.addClass("hidden");
        s.$cache.off();

        if (typeof(Storage) !== "undefined"){
          localStorage.setItem("orange.airbox.language","alreadyasked");
        }
        // restore focus
        s.$content.find('a, input, textarea').attr("tabindex",-1);
        document.body.focus();
    }
    function _initClose()
    {
        s.$cache.off();
        s.$cache.on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

        $("li a", s.$content).off();
        $("li a", s.$content).on(cs.clickEvent, function(event)
        {
            $("li a.on", s.$content).removeClass('on');
            $(this).addClass('on');
            LanguageButtonEffect(event, $(this).text() );
            _hide();
        });
    }
    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init : init,
        show : _show,
        hide : _hide,
        UItranslate : _translate
    };
}());

/* -------------------------------------------------------------------------
 class - popin new messsage alert
 ----------------------------------------------------------------------------- */
AIRBOX.popinMessageAlert = (function()
{
    var s = {
            targetBlockName : "messages",
            targetBlockIndex : null
        },
        cs={};

    function init(options)
    {
        s.$content = $('#popinMessageAlert');
        s.$cache = $('#popinMessageAlert').find('.cache');
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initButtons();
        _initTargetBlock();
    }
    function _initTargetBlock(){
        $.each(AIRBOX.config.blocks, function(i, v){
            if(v.block == s.targetBlockName){
                s.targetBlockIndex = i;
            }
        });
    }

    function _initClose()
    {
        $('a.close',s.$content).on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

        s.$cache.on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });

    }
    function _show(options)
    {
        AIRBOX.core.clearTimerUI();
        $.extend(s, options);
        s.$content.removeClass("hidden");

        // set ARIA focus
        s.$content.find('a').attr("tabindex",-1);
        s.$content.find('.bt').focus();

        if(airboxRegistry.logged){
            getSmsList( AIRBOX.messages.UIRefresh_SmsList );
        }

    }
    function _hide()
    {
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a').removeAttr("tabindex");
        document.body.focus();
        AIRBOX.core.launchTimerUI();
    }
    function _initButtons()
    {
        s.$content.find('.ok').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            AIRBOX.slide.reachArticle(s.targetBlockIndex);
            _hide();

            if(!airboxRegistry.logged){
                AIRBOX.popinAuth.show({});
            }
        });

        s.$content.find('.later').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            _hide();
        });

    }
    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init : init,
        show : _show,
        hide : _hide,
        UItranslate : _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin write new messsage
 ----------------------------------------------------------------------------- */
AIRBOX.popinNewMessage = (function()
{
    var s = {
            $phone:null,
            $message:null,
            callback:null,
            action:null
        },
        cs={};

    function init(options)
    {
        s.$content = $('#popinNewMessage');
        s.$cache = $('#popinNewMessage').find('.cache');

        s.$phone = $('input#f_receiver', s.$content);
        s.$message = $('textArea#f_message', s.$content);
        $('p.error', s.$content).text('');

        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initButtons();
        _initForm();

        s.$message.live("keydown keypress keyup focus change input", function(event) {

            switch(event.keyCode){
                case 37 : case 38 : case 39 : case 40 :
                    switch(event.type){
                        case 'keydown' : case 'keypress' : case 'keyup':
                            return;
                    }
                    break;
            }
            sms_contentChange( s.$message.val() );
        });

        //place this popin under others
        $('div.popin-container div.popin',s.$content).css( 'z-index' , 900 );
        s.$cache.css( 'z-index' , 899 );
    }
    function _show(options)
    {
        AIRBOX.core.clearTimerUI();
        g_content = null; //pas tres generique mais necessaire pour IE8
        $.extend(s, options);

        s.$content.removeClass("hidden");

        var $el = $('input', s.$content);
        $el.removeClass("red");
        $el.attr('aria-invalid','false');

        // set ARIA focus
        s.$content.find('a, input, textarea').attr("tabindex",-1);


        var $form = $("form",s.$content);

        s.$phone.val(s.values.phone || '');
        s.$message.val(s.values.message || '');

        //sms_phoneCheck(s.$phone.val());
        _setLabel('phoneError', '');
        sms_contentChange(s.$message.val());
    }
    function _hide()
    {
        s.$content.addClass("hidden");

        // restore focus
        s.$content.find('a, input, textarea').removeAttr("tabindex");
        $('#messages').find(':focusable:first').focus();

        AIRBOX.core.launchTimerUI();
    }
    function _getCharLimitMsg( type, value){
        return s.lngArray.sms_hint_max_t_characters_d
                    .replace('t%', type.toString())
                    .replace('d%', value.toString());
    }

    function _getPhoneLimitMsg(){
        return s.lngArray.sms_hint_maximum_number.replace('%d', max_phone_size);
    }

    function _setLabel(type, msg)
    {
        switch(type){
            case 'phoneError':
                //$('p.receiver.error',  s.$content).text(msg);
                $('p.error',  s.$phone.parent('div.border')).text(msg);
                break;
            case 'contentCharNumber' :
                $('#message_label', s.$content).text( s.lngArray.message + ' ' + msg);
                break;
            case 'contentError':
                //$('p.message.error', s.$content).text(msg);
                $('p.error',  s.$message.parent('div.border')).text(msg);
                break;
        }

    }

    function _initButtons()
    {
        s.$content.find('.ok').on(cs.clickEvent,function(event)
        {
            event.preventDefault();
            event.stopPropagation();
            if (isValidInputValuesForDraft() == true) {
                AIRBOX.popinGeneric.show({
                    type: 'confirm',
                    message: s.lngArray.dialup_confirm_save_to_draft || "confirm save to draft",
                    action: function () {
                        saveMessage(s.$phone.val(), s.$message.val(), s.callback);
                        _hide();
                    },
                    cancel : function(){
                       s.$content.find('.ok').focus();
                    }
                });
            }
        });

        var close_func = function(event){
            event.preventDefault();

            if(s.$phone.val() || s.$message.val())
            {
                AIRBOX.popinGeneric.show({
                    type : 'confirm',
                    message : s.lngArray.dialup_confirm_close_popin || "confirm close message window",
                    action : _hide,
                    cancel : function(){
                       s.$content.find('.ok').focus();
                    }
                });
            }else{
                _hide();
            }
        }

        $('a.close',s.$content).on('click', close_func );

        s.$cache.on('click', close_func );

        s.$content.find('.cancel').on(cs.clickEvent, close_func );
    }
    function _initForm()
    {
        var $form = $("form",s.$content);

        setTimeout(function() { $("input", $form).first().focus(); }, 10);

        $form.on("submit",function(event)
        {
            event.preventDefault();

            var complete = true;

            //test if required input are not empty
            $('input', $form).each(function()
            {
                var $el = $(this);
                $el.removeClass("red");
                $el.attr('aria-invalid','false');
                if ($el.hasClass('required') && $el.val()=="")
                {
                    $el.addClass("red");
                    $el.attr('aria-invalid','true');
                    complete = false;
                }

                if ($el.hasClass('phone') && sms_phoneCheck($el.val()))
                {
                    $el.addClass("red");
                    $el.attr('aria-invalid','true');
                    complete = false;
                }

            });

            if(!isValidInputValues())
                complete = false;


            //check input content format
            if (complete && isValidInputValues())
            {
                AIRBOX.popinGeneric.show({
                    type : 'confirm',
                    message : s.lngArray.dialup_confirm_send_message || "confirm send message",
                    action : _submitForm
                });
            }
        });

    }
    function _submitForm()
    {
        _hide();

        var getType = {};
        if (s.action != null && getType.toString.call(s.action) === '[object Function]') {
            if(s.values.index){
                s.action(s.$phone.attr('value'), s.$message.attr('value'), s.values.index, s.callback);
            } else {
                s.action(s.$phone.attr('value'), s.$message.attr('value'), null, s.callback);
            }
        }
    }

    function isValidInputValues(){

        _setLabel('phoneError', sms_phoneCheck(s.$phone.val()) || '');
        sms_contentCheck(s.$message.val());

        return  ($('p.error',  s.$phone.parent('div.border')).text() == '' ) &&
                ($('p.error',  s.$message.parent('div.border')).text() == '' );

    }
    function isValidInputValuesForDraft() {

        _setLabel('phoneError', sms_phoneCheck(s.$phone.val()) || '');
        sms_numberCheck(s.$message.val());
        return ($('p.error', s.$phone.parent('div.border')).text() == '') &&
            ($('p.error', s.$message.parent('div.border')).text() == '');

    }
    function _translate(lngArray) {
        s.lngArray = lngArray;
    }

    return {
        init : init,
        show : _show,
        hide : _hide,
        getCharLimitMsg: _getCharLimitMsg,
        getPhoneLimitMsg : _getPhoneLimitMsg,
        setLabel : _setLabel,
        UItranslate : _translate
    };
}())

/* -------------------------------------------------------------------------
 class - popin spin
 ----------------------------------------------------------------------------- */
AIRBOX.popinSpin = (function()
{

    var s = {
        /*$opts : {
            lines: 12, // The number of lines to draw
            length: 12, // The length of each line
            width: 6, // The line thickness
            radius: 18, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#aaa', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
            }
        }*/
        $opts : {
              lines: 12 // The number of lines to draw
            , length: 12 // The length of each line
            , width: 6 // The line thickness
            , radius: 18 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#aaa' // #rgb or #rrggbb or array of colors
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
            }
        },
        cs={};

    function init(options)
    {
        s.$popin = $('#popinSpin');
        s.$cache = $('#popinSpin').find('.cache');
        s.$spinner = $('#spinner', s.$popin);
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        var spinnerObject = new Spinner(s.$opts).spin();
        s.$spinner.html(spinnerObject.el);

        _initClose();
    }
    function _show(options)
    {
        s.$popin.removeClass("hidden");
    }
    function _hide()
    {
        s.$popin.addClass("hidden");
        s.$cache.off();

        // restore focus
        //document.body.focus();

    }
    function _initClose()
    {
        s.$cache.off();
        s.$cache.on('click',function(event)
        {
            event.preventDefault();
            _hide();
        });
    }
    return {
        init : init,
        show : _show,
        hide : _hide,
        UItranslate: function(){}
    };
}())

/* -------------------------------------------------------------------------
 class - popin Extender alert with Network On
 ----------------------------------------------------------------------------- */
AIRBOX.popinPWStrength = (function()
{
    var s = {},
        cs = {};

    function _init(options)
    {
        s.$content = $('#popinPWStrength');
        s.$cache = $('.cache', s.$content);
        s.$remindCB = $('input', s.$content);

        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initClose();
        _initButtons();

        _checkPasswordSecurityReminded();
    }
    function _initClose()
    {
        $('a.close',s.$content).on('click',function(event) {
            event.preventDefault();
            _hide();
        });

        s.$cache.on('click',function(event) {
            event.preventDefault();
            _hide();
        });

    }
    function _initButtons()
    {
        loggedClickEffect({	$clickable : $(".ok", s.$content) , // menu
                            adminEffect : function(){
                                    _hide();
                                    gotoPageWithoutHistory('../'+externals.popin_change_pw_now);
                                } });

        $(".later", s.$content).on(cs.clickEvent,function(event)
        {
            event.preventDefault();

            _submitForm();
            _hide();
        });
    }
    function _show(options)
    {
        AIRBOX.core.clearTimerUI();
        //reset values to initial
        s.action = null;
        s.callback = null;
        s.isPwStrengthLow = null;

        $.extend(s, options);

        if(s.remindState)
        {
            s.$content.removeClass("hidden");
            s.$content.fadeIn(150);
            $(".bt.ok", s.$content).focus();

        }else{
            //_setPWRemindStatus(MACRO_PASSWORD_REMIND_ON, _checkPasswordSecurityReminded);
            if(jQuery.isFunction(s.action)){
                s.action();
            }
        }

        // set ARIA focus
       s.$content.find('a, input, textarea').attr("tabindex",-1);


        if(jQuery.isFunction(s.callback))
            s.callback();
    }

    function _hide() {
        s.$content.fadeOut(150);
        s.$content.addClass("hidden");

        // restore focus
       s.$content.find('a, input, textarea').removeAttr("tabindex");
        document.body.focus();

        //special popin : action callback is executed any time when closed
        if(typeof(s.action) === 'function'){
            s.action();
        }

        AIRBOX.core.launchTimerUI();
    }


    function _submitForm()
    {
        if(s.$remindCB.get(0).checked){
            _setPWRemindStatus(MACRO_PASSWORD_REMIND_OFF,
                                _checkPasswordSecurityReminded);
        }
    }

/* [Begin] [Modified for]:Remind the user that the password is not secure enough    */
    function _checkPasswordSecurityReminded() {
        var params = {
            ajax_url: 'api/user/remind',
            func_response: function (ret) {
                s.remindState = ret.response.remindstate == '0' ? true : false;
            },
            options: {
                sync: true
            }
        };

        AIRBOX.core.getAjaxRequest(params);
    }
/* [END] [Modified for]:Remind the user that the password is not secure enough    */

/* [BEGIN] [Modified for]:update the Remind password from the API    */
    function _setPWRemindStatus(setStatus, callback) {
        var params = {
            ajax_url: 'api/user/remind',
            request: { remindstate: setStatus },
            func_callback: callback,
            options: {
                sync: true
            }
        };

        AIRBOX.core.setAjaxRequest(params);
    }
/* [END] [Modified for]:update the Remind password from the API    */

    function _translate(lngArray){
        s.lngArray = lngArray;
    }

    return {
        init: _init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}())

/* -----------------------------------------------------------------------------
 Javascript for additional popins
 Duplicate and complete the popin example to fill the desired functions
 ---------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 class - popin example
 ---------------------------------------------------------------------------- */
AIRBOX.popinExample = (function () {
    var s = {},
        cs = {};

    function _init(options) {
        s.$content = $('#popinExample');
        s.$cache = $('.cache', s.$content);
        s.$form = $('form', s.$content);
        $.extend(s, options);
        cs = AIRBOX.core.settings;

        _initButtons();

    };

/* [Begin] [Modified for]:To Innitilize the GDPR POPUP Buttons and respective Operation    */
    function _initButtons() {
        $('a.close', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
        });
        $('#privacy_notice').click(function () {
            if (g_login_state != '0') {
                return;
            }
            if ($(this).is(':checked') && $('#protocol_notice').is(':checked')) {
                button_enable('sumbit_update', '1');
                button_enable('sumbit_update', '1');
            } else {
                button_enable('sumbit_update', '0');
                button_enable('sumbit_update', '0');
            }
        });
        $('#protocol_notice').click(function () {
            if (g_login_state != '0') {
                return;
            }
            if ($(this).is(':checked') && $('#privacy_notice').is(':checked')) {
                button_enable('sumbit_update', '1');
                button_enable('sumbit_update', '1');
            } else {
                button_enable('sumbit_update', '0');
                button_enable('sumbit_update', '0');
            }
        });
        $('#update_apply').click(function () {

            var $button = $("#update_apply").parent();
            if ($button.hasClass('disable_btn')) {
                return;
            }

            if ($('#auto_update').is(':visible') && !$('#auto_update').is(':checked')) {
                s.$content.addClass("hidden");
                document.body.focus();
                AIRBOX.popinGeneric.show({
                    type: 'update',
                    message: s.lngArray.dialup_confirm_save_to_draft,
                    action: function () {
                        $('#auto_update').get(0).checked = true;
                        quicksetup_postData();
                    },
                    cancel: function () {
                        $('#auto_update').get(0).checked = false;
                        quicksetup_postData();
                        AIRBOX.popinSpin.show();
                    }
                });
            } else {
                _hide();
                quicksetup_postData();
            }
        });

    };
/* [END] [Modified for]:To Innitilize the GDPR POPUP Buttons and respective Operation    */

/* [Begin] [Modified for]:Post the values of GDPR PopUp data    */
    function quicksetup_postData() {
        if (g_moduleswitch.bbou_enabled && g_auto_update_ret.auto_update != '1') {
            var update_switch = $('#auto_update').is(':checked') ? 1 : 0;
            var req = {
                auto_update: update_switch,
                ui_download: g_auto_update_ret.ui_download
            };
            var params = {
                ajax_url: 'api/online-update/autoupdate-config',
                request: req,
                func_callback: function (ret) {
                    if (!isAjaxReturnOK(ret)) {
                        g_quicksetup_saveDataOK = false;
                    }
                },
                options: {
                    sync: true
                }
            };
            AIRBOX.core.setAjaxRequest(params);
        }
        //if (g_moduleswitch.gdpr_enabled) {
        if (g_privacypolicy_update == '1') {
            var request_privacy = {
                /* approve: 2 */
                data:{
                    Approve: '2',
                    Liscence: '0'
                }
            }
        };
        if (request_privacy) {
            var params = {
                ajax_url: 'api/app/privacypolicy',
                request: request_privacy,
                func_callback: function (ret) {
                    if (!isAjaxReturnOK(ret)) {
                        g_quicksetup_saveDataOK = false;
                        g_restore_default_status = 0;
                    }
                },
                options: {
                    sync: true
                }
            };
            AIRBOX.core.setAjaxRequest(params);
        }
        //}
        if (basic_infos && basic_infos.restore_default_status == '1') {
            var request_info = {
                restore_default_status: 0
            };
            var params = {
                ajax_url: 'api/device/basic_information',
                request: request_info,
                func_callback: function (ret) {
                    g_restore_default_status = 0;
                    AIRBOX.popinSpin.hide();
                    if (!isAjaxReturnOK(ret)) {
                        g_quicksetup_saveDataOK = false;
                        getAjaxToken();
                        AIRBOX.popinExample.show();
                    }
                },
                options: {
                    sync: true
                }
            };
            AIRBOX.core.setAjaxRequest(params);
        }

        setTimeout(function () {
            checkSimState();
            AIRBOX.menu.showMsisdn();
        }, 500);
        AIRBOX.core.launchTimerUI();
    }
/* [END] [Modified for]:Post the values of GDPR PopUp data    */

/* [Begin] [Modified for]:Display the GDPR POPUP    */
    function _show(options) {
        $('#update_apply').val(s.lngArray.common_finish);
        button_enable('sumbit_update', '0');
        AIRBOX.core.clearTimerUI();
        AIRBOX.popins.hide();
        $.extend(s, options);
        s.$content.removeClass("hidden");

        function get_restful_data() {
            if (g_moduleswitch.bbou_enabled) {
                getAjaxData('api/online-update/autoupdate-config', function ($xml) {
                    var ret = xml2object($xml);
                    if (ret.type == 'response') {
                        g_auto_update_ret = ret.response;
                        //Always visible privacy policy checkbox
                        home_check_currentHref();
                        var current_language = current_language_home.split('-').join('_');
                        var link = '<a href="../html/privacystatement.html" target="_blank" style="text-decoration:underline;color:#12a5d6;" rel="noopener noreferrer">' + s.lngArray.ids_common_privacy_policy + '</a>';
                        link = link + '&nbsp&nbsp<a href="../policy/html/privacy/privacyPolicy-' + current_language + '.html?region=0&r=' + Math.random() + '" target="_blank" style="text-decoration:underline;color:#12a5d6;" rel="noopener noreferrer">' + s.lngArray.device_privacy_statement_title + '</a>';
                        $('#privacy_policy_td').html(s.lngArray.privacy_note.replace('%s', link));
                        $('#privacy_policy_tr').show();
                        var link1 = '<a href="../policy/html/protocol/protocol-'+ current_language +'.html?region=0&r=' + Math.random() + '" target="_blank" style="text-decoration:underline;color:#12a5d6;" rel="noopener noreferrer">' + s.lngArray.ids_common_protocol + '</a>';
                        $('#protocol_td').html(s.lngArray.protocol_note.replace('%s', link1));
                        $('#protocol_tr').show();
                        button_enable('sumbit_update', '0');
                    }
                }, {
                    sync: true
                });
            }
        }
        get_restful_data();
    };
/* [END] [Modified for]:Display the GDPR POPUP    */

    function _hide() {
        s.$content.addClass("hidden");
        document.body.focus();
    };

    function _translate(lngArray) {
        s.lngArray = lngArray;
        language_arr = lngArray;
    }
/* [BEGIN] [Modified for]:Update the GDPR POPUP Button Status    */
    function button_enable(button_id, enable) {
        var my = $('#' + button_id);
        if (enable == '1') {
            my.removeClass('disable_btn');
            my.removeClass('button_dialog');
            my.removeClass('clr_gray_disable_btn_center');
            my.addClass('button_dialog');
        } else if (enable == '0') {
            my.removeClass('disable_btn');
            my.removeClass('clr_gray_disable_btn_center');
            my.removeClass('button_dialog');
            my.addClass('disable_btn');
            my.addClass('clr_gray_disable_btn_center');
        }

    }
/* [END] [Modified for]:Update the  GDPR POPUP Button Status    */

    return {
        init: _init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}());
AIRBOX.popinModify = (function () {
    var s = {
        URL_SUBMIT: '',
        message: '',
        callback: null,
        request: { OperateType: '', CurrentPin: '', NewPin: '', PukCode: '' }
    },
        cs = {};

/* [Begin] [Modified for]:Initialize the Password Mofify POPUP    */
    function _init(options) {
        s.$content = $('#popinModify');
        s.$cache = $('.cache', s.$content);
        s.$pin = $('.pin', s.$content);
        s.$remember = $('.remember', s.$content);
        s.$error = $('p.error', s.$pin);
        s.$form = $('form', s.$content);
        s.pinPatern = /^[0-9]{4,8}$/;
        if (options) {
            $.extend(s, options);
        }
        cs = AIRBOX.core.settings;
        s.request.OperateType = MACRO_PIN_OPERATE_VALIDATE;
        _initButtons();
        _resetForm();
    };
/* [END] [Modified for]:Initialize the PAssword Mofify POPUP    */

/* [Begin] [Modified for]:Initialize the Password Mofify POPUP Buttons and the Operation    */
    function _initButtons() {
        $('a.close', s.$content).on('click', function (event) {
            event.preventDefault();
            _hide();
            if ((typeof (s.action) == 'function') && ("1" == g_restore_default_status)) {
                s.action();
            }
        });
        $("#new_password").live("keydown keypress keyup focus change blur", function (event) {
            if (("keydown" == event.type || "keypress" == event.type || "keyup" == event.type) && (37 == event.keyCode || 38 == event.keyCode || 39 == event.keyCode || 40 == event.keyCode)) {
                return;
            }
            if ($("#new_password").val().length > 0) {
                setPWStrengthColor(checkPWStrength($.trim($("#new_password").val()), g_username_default, g_currentPassword));
            } else {
                setPWStrengthColor(0);
            }
        });
        $('#new_password, #confirm_password').bind('keydown', function (e) {
            if (e.which == 13) {
                quicksetup_finish();
            }
        });
        $('#submit_passwork').live('click', function () {
            quicksetup_finish();
        });
    };
/* [END] [Modified for]:Initialize the Password Mofify POPUP Buttons and the Operation    */

/* [BEGIN] [Modified for]:Clearing all the error messages of Password Mofify POPUP    */
    function clearAllErrorLabel() {
        $('.error_message').remove();
    }
/* [END] [Modified for]:Clearing all the error messages of Password Mofify POPUP    */

/* [BEGIN] [Modified for]:VAlidating the Modify Password    */
    function vilidatePassword() {
        clearAllErrorLabel();
        /*   var currenPassword = $('#current_password').val(); */
        var newPassword = $('#new_password').val();
        var confirmPassword = $('#confirm_password').val();
        if ('' == newPassword) {
            showErrorUnderTextbox('new_password', s.lngArray.system_hint_new_password_empty);
            setTimeout(function () {
                $('#new_password').focus();
            }, 10);
            return false;
        } else if ('' == confirmPassword) {
            showErrorUnderTextbox('confirm_password', s.lngArray.system_hint_new_confirm_password_empty);
            setTimeout(function () {
                $('#confirm_password').focus();
            }, 10);
            return false;
        } else if (checkPasswordChar(newPassword) == false) {
            showErrorUnderTextbox('new_password', s.lngArray.ids_password_type_notes);
            setTimeout(function () {
                $('#new_password').focus();
            }, 10);
            return false;
        } else if (true == hasSpaceOrTabAtHead(newPassword)) {
            showErrorUnderTextbox('new_password', s.lngArray.input_cannot_begin_with_space);
            setTimeout(function () {
                $('#new_password').focus();
            }, 10);
            return false;
        } else if (newPassword != confirmPassword) {
            showErrorUnderTextbox('confirm_password', s.lngArray.ids_modify_password_wrong_msg);
            $('#new_password').val('');
            $('#confirm_password').val('');
            setTimeout(function () {
                $('#new_password').focus();
            }, 10);
            return false;
        }
        if (true) {
            if (newPassword == g_currentPassword) {
                showErrorUnderTextbox('new_password', s.lngArray.ids_common_same_password_error);
                setTimeout(function () {
                    $('#new_password').focus();
                }, 10);
                return false;
            }
            if (passWordStrength == MACRO_PASSWORD_LOW) {
                showErrorUnderTextbox('new_password', s.lngArray.ids_psw_login_remind);
                setTimeout(function () {
                    $('#new_password').focus();
                }, 10);
                return false;
            }
            if (newPassword.length < 8) {
                // setErrorMessageColor('new_pwd_message');
                showErrorUnderTextbox('new_password', s.lngArray.IDS_simple_password_length_prompt);
                setTimeout(function () {
                    $('#new_password').focus();
                }, 10);
                return false;
            }
        } else {
            if (newPassword.length < 8) {
                showErrorUnderTextbox('new_password', s.lngArray.IDS_simple_password_length_prompt);
                setTimeout(function () {
                    $('#new_password').focus();
                }, 10);
                return false;
            }
        }
        return true;
    }
/* [END] [Modified for]:Validating the Modified Password    */

/* [BEGIN] [Modified for]:Post the Modified password from the modify password POPUP   */
    function quicksetup_first_postPassword() {
        var currentPassword = $('#current_password').val();
        var newPassword = $('#new_password').val();
        if (g_scarm_login) {
            var req = {
                username: g_username_default,
                currentpassword: XSSResolveCannotParseChar(g_currentPassword),
                newpassword: XSSResolveCannotParseChar(newPassword)
            };
            var params = {
                ajax_url: 'api/user/password_scram',
                request: req,
                func_callback: function (ret) {
                    if (isAjaxReturnOK(ret)) {
                        quicksetup_login();
                    } else if ('error' == ret.type) {
                        g_quicksetup_savePasswordOK = false;
                        /* closeWaitingDialog(); */
                        clearAllErrorLabel();
                        if (ret.error.code == MODIFYPASSWORD_SHOW) {
                            showErrorUnderTextbox('current_password', s.lngArray.ids_current_password_inputshow);
                            $('#new_password').val('');
                            $('#confirm_password').val('');
                            $('#new_password').focus();
                        } else {
                            showErrorUnderTextbox('current_password', s.lngArray.system_hint_wrong_password);
                            $('#new_password').val('');
                            $('#confirm_password').val('');
                            $('#new_password').focus();
                        }
                    }
                },
                options: {
                    enc: true,
                    sync: true
                }
            };
            AIRBOX.core.setAjaxRequest(params);


        } else {
            currentPEncryption();
            if (encryption_mode == 1 && $.isArray(g_requestVerificationToken) && g_requestVerificationToken.length > 0) {
                g_currentPassword = base64encode(SHA256(g_username_default + base64encode(SHA256(g_currentPassword)) + g_requestVerificationToken[0]));
            } else {
                g_currentPassword = base64encode(g_currentPassword);
            }
            newPassword = base64encode(newPassword);
            var request = {
                Username: g_username_default,
                CurrentPassword: XSSResolveCannotParseChar(g_currentPassword),
                NewPassword: XSSResolveCannotParseChar(newPassword),
                encryption_enable: encryption_mode
            };
            var xmlstr = object2xml('request', request);
            clearTimeout(g_decive_timer);
            saveAjaxData('api/user/password', xmlstr, function ($xml) {
                var ret = xml2object($xml);
                if (isAjaxReturnOK(ret)) {
                    quicksetup_login();
                }
            }, {
                    enc: true,
                    sync: true
                });

        }
    }
/* [END] [Modified for]:Post the Modified password from the modify password POPUP   */

/* [BEGIN] [Modified for]:Update the Cookies value    */
    function updateCookie() {
        g_set_cookie_flag = true;
        var params = {
            ajax_url: 'api/monitoring/status',
            func_response: function (ret) { },
            options: {
                sync: true
            }
        };
        AIRBOX.core.getAjaxRequest(params);
    }
/* [END] [Modified for]:Update the Cookies value    */

/* [BEGIN] [Modified for]:To login after factory restore the device    */
    function quicksetup_login() {

        updateCookie();
        var psd = $('#new_password').val();
        g_currentPassword = $('#new_password').val();
        setTimeout(function () {
            refreshToken();
            if (g_scarm_login) {
                var scram = CryptoJS.SCRAM();
                var firstNonce = scram.nonce().toString();
                var firstPostData = {
                    username: g_username_default,
                    firstnonce: firstNonce,
                    mode: RSA_LOGIN_MODE
                };
                var params = {
                    ajax_url: 'api/user/challenge_login',
                    request: firstPostData,
                    func_callback: function (ret) {

                        if (ret.type == 'response') {
                            var salt = CryptoJS.enc.Hex.parse(ret.response.salt);
                            var iter = ret.response.iterations;
                            var finalNonce = ret.response.servernonce;
                            var authMsg = firstNonce + "," + finalNonce + "," + finalNonce;
                            var saltPassword = scram.saltedPassword(psd, salt, iter).toString();
                            var clientProof = scram.clientProof(psd, salt, iter, authMsg);
                            var serverKey = scram.serverKey(CryptoJS.enc.Hex.parse(saltPassword)).toString();
                            var finalPostData = {
                                clientproof: clientProof,
                                finalnonce: finalNonce
                            };
                            //g_requestVerificationToken = [];
                            var params = {
                                ajax_url: 'api/user/authentication_login',
                                request: finalPostData,
                                func_callback: function (ret) {
                                    if (ret.type == 'response') {
                                        var serverProof = scram.serverProof(psd, salt, iter, authMsg);
                                        if (ret.response.serversignature == serverProof) {
                                            var publicKeySignature = scram.signature(CryptoJS.enc.Hex.parse(ret.response.rsan), CryptoJS.enc.Hex.parse(serverKey)).toString();
                                            if (ret.response.rsapubkeysignature == publicKeySignature) {
                                                g_encPublickey.e = ret.response.rsae;
                                                g_encPublickey.n = ret.response.rsan;
                                                storagePubkey(g_encPublickey.n, g_encPublickey.e);
                                            } else {
                                                g_quicksetup_savePasswordOK = false;
                                            }
                                        } else {
                                            g_quicksetup_savePasswordOK = false;
                                        }
                                    } else {
                                        g_quicksetup_savePasswordOK = false;
                                    }
                                },
                                options: {
                                    sync: true
                                }
                            };
                            AIRBOX.core.setAjaxRequest(params);
                        } else {
                            g_quicksetup_saveDataOK = false;
                        }
                    },
                    options: {
                        sync: true
                    }
                };
                AIRBOX.core.setAjaxRequest(params);
            } else {
                if (g_password_type == '4' && $.isArray(g_requestVerificationToken) && g_requestVerificationToken.length > 0) {
                    psd = base64encode(SHA256(g_username_default + base64encode(SHA256(psd)) + g_requestVerificationToken[0]));
                } else {
                    psd = base64encode(psd);
                }
                var request = {
                    Username: g_username_default,
                    Password: psd,
                    password_type: g_password_type
                };
                var xmlstr = object2xml('request', request);
                saveAjaxData('api/user/login', xmlstr, function ($xml) {
                    var ret = xml2object($xml);
                    if (isAjaxReturnOK(ret)) { } else {
                        g_quicksetup_saveDataOK = false;
                    }
                });
            }
        }, 1000);

    }
/* [END] [Modified for]:To login after factory restore the device    */

/* [BEGIN] [Modified for]:To Display the Error String during Input    */
    function showErrorUnderTextbox(idOfTextbox, errormsg, label_id) {
        var errorLabel = '';
        if (label_id != null && label_id != '' && label_id != ' ') {
            errorLabel = "<div class='error_message'><label id='" + label_id + "'>" + errormsg + '</label><div>';
        } else {
            errorLabel = "<div class='error_message'><label>" + errormsg + '</label><div>';
        }
        if (0 == $('#' + idOfTextbox).parent().children('.error_message').length) {
            $('#' + idOfTextbox).after(errorLabel);
        }
    }
/* [END] [Modified for]:To Display the Error String during Input    */

/* [BEGIN] [Modified for]:To verify whether password is having space tab    */
    function hasSpaceOrTabAtHead(str) {
        if (0 == str.indexOf(" ") || 0 == str.indexOf("\t")) {
            return true;
        } else {
            return false;
        }
    }
/* [END] [Modified for]:To verify whether password is having space tab    */

/* [BEGIN] [Modified for]:To verify the length of the password    */
    function checkPasswordChar(str) {
        var i;
        var char_i;
        var num_char_i;
        if (str == "") {
            return true;
        }
        for (i = 0; i < str.length; i++) {
            char_i = str.charAt(i);
            num_char_i = char_i.charCodeAt();
            if ((num_char_i > MACRO_SUPPORT_CHAR_MAX) || (num_char_i < MACRO_SUPPORT_CHAR_MIN)) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
/* [END] [Modified for]:To verify the length of the password    */

/* [BEGIN] [Modified for]:Finish the Quicksetup POPUP    */
    function quicksetup_finish() {
        clearAllErrorLabel();
        $('#new_password,#confirm_password').blur();
        var bValid = vilidatePassword();
        if (!bValid) {
            return;
        }
        $('#popinModify').hide();
        AIRBOX.popinGeneric.show({
            type: 'information',
            message: s.lngArray.please_wait_a_few_moments || 'Please wait a few moments',
            cacheenable: false
        });
        $("#popinGeneric .submit a.validate").addClass("hidden");
        $("#popinGeneric .content .info h4").prepend('<img src="img/waiting.gif" />');
        $("#popinGeneric .close").hide();
        setTimeout(function () {
            quicksetup_first_postPassword();
            setTimeout(function () {
                if (!g_quicksetup_savePasswordOK) {
                    AIRBOX.popinGeneric.hide();
                    $('#popinModify').show();
                    return;
                } else {
                    AIRBOX.popinGeneric.hide();
                    AIRBOX.popinExample.show();
                }
            }, 5000);
        }, 1000);
    }
/* [END] [Modified for]:Finish the Quicksetup POPUP    */

/* [BEGIN] [Modified for]:Verify the Password strength    */
    function checkPWStrength(passValue, userName, currentPwd) {
        var nameSame = false;
        var pwdSame = false;
        if (userName != "" && (userName != null)) {
            if (userName == passValue || userName.split("").reverse().join("") == passValue) {
                nameSame = true;
            }
        }
        if (currentPwd != "" && (currentPwd != null)) {
            if (currentPwd == passValue) {
                pwdSame = true;
            }
        }
        var repeat_pass = 0;
        var tempArray = passValue.split("");
        var n = 0
        for (var i = 0; i < tempArray.length; i++) {
            var sliceArray = [];
            if (tempArray[i] != tempArray[i + 1]) {
                sliceArray = tempArray.slice(n, i + 1);
                if (sliceArray.length > 1) {
                    repeat_pass += sliceArray.length;
                }
                n = i + 1;
            }
        }
/* [END] [Modified for]:Verify the Password strength    */

    function charMode(iN) {
        if (iN >= 48 && iN <= 57) {
            return 1;
        } else if (iN >= 65 && iN <= 90) {
            return 2;
        } else if (iN >= 97 && iN <= 122) {
            return 4;
        } else {
            return 8;
        }
    }
    function bitTotal(num) {
        var modes = 0;
        var i = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) {
                modes++;
            }
            num >>>= 1;
        }
        return modes;
        }
        var ret = 0;
        var sPWLength = passValue.length;
        var sPWModes = 0;
        var i = 0;
        for (i = 0; i < sPWLength; i++) {
            sPWModes |= charMode(passValue.charCodeAt(i));
        }
        sPWModes = bitTotal(sPWModes);
        if (sPWLength < 6 || sPWModes == 1 || nameSame == true || pwdSame == true) {
            ret = MACRO_PASSWORD_LOW;
        } else if ((sPWModes == 2 && (sPWLength >= 6) && (sPWLength <= 10))) {
            if (parseFloat((repeat_pass / parseInt(sPWLength, 10)).toString()) > 0.667) {
                ret = MACRO_PASSWORD_LOW;
            } else {
                ret = MACRO_PASSWORD_MID;
            }
        } else if ((sPWModes >= 3 && (sPWLength >= 6)) || (sPWModes == 2 && (sPWLength > 10))) {
            if (parseFloat((repeat_pass / parseInt(sPWLength, 10)).toString()) > 0.334 && (parseFloat((repeat_pass / parseInt(sPWLength, 10)).toString()) <= 0.667)) {
                ret = MACRO_PASSWORD_MID;
            } else if (parseFloat((repeat_pass / parseInt(sPWLength, 10)).toString()) > 0.667) {
                ret = MACRO_PASSWORD_LOW;
            } else {
                ret = MACRO_PASSWORD_HIG;
            }
        } else {
            ret = MACRO_PASSWORD_LOW;
        }
        return ret;
    }
/* [BEGIN] [Modified for]:Change the string color according to the Password strength    */
    function setPWStrengthColor(PWStrength) {
        passWordStrength = PWStrength;
        if (MACRO_PASSWORD_LOW == PWStrength) {
            $('#psw_strength_low').css({
                "background-color": "red"
            });
            $('#psw_strength_mid, #psw_strength_hig').css({
                "background-color": "gray"
            });
        } else if (MACRO_PASSWORD_MID == PWStrength) {
            $('#psw_strength_mid').css({
                "background-color": "red"
            });
            $('#psw_strength_low, #psw_strength_hig').css({
                "background-color": "gray"
            });
        } else if (MACRO_PASSWORD_HIG == PWStrength) {
            $('#psw_strength_hig').css({
                "background-color": "red"
            });
            $('#psw_strength_mid, #psw_strength_low').css({
                "background-color": "gray"
            });
        } else {
            $('#psw_strength_low, #psw_strength_mid, #psw_strength_hig').css({
                "background-color": "gray"
            });
        }
    }
/* [END] [Modified for]:Change the string color according to the Password strength    */

/* [BEGIN] [Modified for]:Update the value of Encrption value whether it is enable or Disable    */
    function currentPEncryption() {
        getAjaxData("api/user/password", function ($xml) {
            var password_ret = xml2object($xml);
            if (password_ret.type == "response") {
                encryption_mode = password_ret.response.encryption_enable;
            }
        }, {
                sync: true
        });
    }
/* [END] [Modified for]:Update the value of Encrption value whether it is enable or Disable    */

/* [BEGIN] [Modified for]:To display the modify password POPUP    */
    function _show(options) {
        $('#submit_passwork').val(s.lngArray.common_next);
        AIRBOX.core.clearTimerUI();
        AIRBOX.popins.hide();
        currentPEncryption();
        $.extend(s, options);
        s.$content.removeClass("hidden");
        s.$content.tabIndex = 0;
        $('input', s.$pin).first().focus();
        _resetForm();
        
        if (pin_status.SimPinTimes < 3) {
            s.$error.removeClass('hidden').text(s.lngArray.dialup_label_pin_error);
        }

        $('label', s.$pin).text(s.lngArray.enter_your_pin_code.replace('d%', pin_status.SimPinTimes));
        if (localStorage.getItem("orange.airbox.pinReady") === "true") {
            getPinStatus(checkSimState);
            $(document).trigger('pinReady');
            return;
        }
    };
/* [END] [Modified for]:To display the modify password POPUP    */

/* [BEGIN] [Modified for]:To Hide the modify password POPUP    */
    function _hide() {
        s.$content.addClass("hidden");
        localStorage.setItem("orange.airbox.pin.close", "true");
        document.body.focus();
        AIRBOX.core.launchTimerUI();
    };
/* [END] [Modified for]:To Hide the modify password POPUP    */

/* [BEGIN] [Modified for]:Sim card Pin VAlidation    */
    function _checkPasswordInput($target, patern) {
        if (!patern.exec($('input', $target).val())) {
            $('p.error', $target).removeClass('hidden').text(s.lngArray.dialup_hint_pin_code_valid_type);;
            $('input', $target).addClass('red');
            $('input', $target).val('');
            return false;
        } else {
            $('p.error', $target).addClass('hidden');
            $('input', $target).removeClass('red');
            return true;
        }
    }
/* [END] [Modified for]:Sim card Pin VAlidation    */

/* [Begin] [Modified for]:Reset the Modify password POPUP   */
    function _resetForm() {
        $('input', s.$pin).val('');
        $('p.error', s.$pin).addClass('hidden');
        s.$remember.checked = false;
    }
/* [END] [Modified for]:Reset the Modify password POPUP   */

/* [Begin] [Modified for]:Add all the language string into object    */
    function _translate(lngArray) {
        s.lngArray = lngArray;
    }
/* [END] [Modified for]:Add all the language string into object    */

    return {
        init: _init,
        show: _show,
        hide: _hide,
        UItranslate: _translate
    };
}());
/* END Modify Password PopUp */
//# sourceURL=popins.js
