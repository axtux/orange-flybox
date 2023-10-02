function smsGenPage(){
var page = '<div id="sms_page"><div class="maintitlewithhelp">\<div class="guestwifi_menu_text"><span lang-id="menu.sms" style="display:inline-block;"></span><span id="sms_total_count"></span></div>\<div class="page_description_text" lang-id="sms.descript"></div>\<div class="page_help pull-left" onclick="toggleHelpInfo(this)">\<div class="ic_help pull-left"></div>\<div class="page_help_title" lang-id="common_page_help"></div>\</div>\<div class="page_help_info hide">\<div lang-id="sms.help.info"></div>\</div>\</div>\<div class="pin_unuseable hide" align="center">\</div>\<div id="sms_display" class="hide">\<div id="sms_full_noSave" class="hide padding-left-10" style="padding-top:30px;margin-bottom:-22px;">\<div class="ic_upgrade_failed"></div>\<div lang-id="sms.sms_full_noSave"></div>\</div>\<div id="sms_main_page" class="clearboth list_shared" style="width:680px;">\<div class="table_top">\<div class="icon_settings">\<div lang-id="sms.newmessage" lang-id-set="title" class="btn_new pull-left sms_btn_new"\id="sms_message_new" onclick="EMUI.smsSendAndSaveController.showNewSendPage();"></div>\<div lang-id="sms.delete" lang-id-set="title" class="btn_delete pull-left hide" id="sms_message_delete"\onclick="EMUI.deleteContractController.deleteContract();"></div>\</div>\</div>\<div class="border_left border_right">\<div class="border_bottom" style="height:30px;background-color:#F3F3F3;">\<div class="pull-left" style="width:20px;">&nbsp;</div>\<div class="pull-left" style="width:120px;">\<div lang-id="sms.contract" style="line-height:30px;line-height:30px\9;"></div>\</div>\<div class="pull-left" style="width:400px">\<div lang-id="sms.content" style="line-height:30px;line-height:30px\9;"\class="padding-left-10"></div>\</div>\<div class="pull-left" style="width:90px;">\<div lang-id="sms.date" style="line-height:30px;line-height:30px\9;" class="padding-left-10"></div>\</div>\<div class="pull-left margin-left-10" style="width:35px;margin-top:6px;">\<div id="sms_list_contract_input_select_all_label" class="check_off"\onclick="EMUI.getCurrentSmsListController.selectAll();"></div>\</div>\</div>\<div style="height:407px;overflow:hidden;" id="sms_message_list"></div>\<div style="height:40px;" class="border_top">&nbsp;\<div class="pull-right margin-right-20" style="margin-top:9px">\<table cellpadding="0" cellspacing="0" frame=void rules=none>\<tr>\<td>\<table cellpadding="0" cellspacing="0" frame=void rules=none style="font-size:12px;">\<tr>\<td class="pointer hide" id="sms_page_first_arrow"\onclick="EMUI.getCurrentSmsListController.smsGoPageFirst();">&lt;&lt;\</td>\<td class="sms_page_location_normal hide" id="sms_page_before_arrow"\onclick="EMUI.getCurrentSmsListController.smsGoPageBefore()">&lt;\</td>\<td class="sms_page_location_normal hide" id="sms_page_before_more">...</td>\</tr>\</table>\</td>\<td>\<table cellpadding="0" cellspacing="0" frame=void rules=none style="font-size:12px;">\<tr id="table_sms_page_index_table"></tr>\</table>\</td>\<td>\<table>\<tr>\<td class="sms_page_location_normal hide" id="sms_page_after_more">...</td>\<td class="sms_page_location_normal hide" id="sms_page_after_arrow"\onclick="EMUI.getCurrentSmsListController.smsGoPageAfter()">&gt;\</td>\<td class="sms_page_location_normal hide" id="sms_page_last_arrow"\onclick="EMUI.getCurrentSmsListController.smsGoPageLast();">&gt;&gt;\</td>\<td class="sms_page_location_normal hide" id="sms_current_page_total_page"\style="font-size:12px;"></td>\<td class="padding-left-20" style="font-size:14px">\<table cellpadding="0" cellspacing="0" frame=void rules=none id="sms_hand_jump_page" class="hide">\<tr>\<td lang-id="sms.goto"></td>\<td class="sms_page_left">\<div id="sms_page_input_block" class="sms_page_input"\align="center">\<input onfocus="EMUI.getActiveItemSmsCountController.showShortInputBorder(this)"\onblur="EMUI.getActiveItemSmsCountController.hideShortInputBorder(this)"\style="width:16px;height:24px;text-align:center;"\type="text" id="sms_go_page_index"/>\</div>\</td>\<td class="sms_page_left" style="font-size:14px;"\lang-id="sms.page"></td>\<td class="padding-left-20">\<button class="short_btn"\onclick="EMUI.getCurrentSmsListController.smsGoIndexPage();"\lang-id="btn.cofirm"></button>\</td>\</tr>\</table>\</td>\</tr>\</table>\</td>\</tr>\</table>\</div>\</div>\<div class="clearboth"></div>\</div>\<div class="table_bottom"></div>\</div>\<div class="color_background_white topmenuselect" style="height:0px;overflow:hidden;max-width:680px;"><span id="sms_phone_list_length_test"></span></div>\<textarea class="topmenuselect" id="sms_resend_input_contract_shadow"\style="position: absolute;border-width:0px;padding:0px;visibility:hidden;font-size:14px;overflow:hidden;height:20px;width:474px;"></textarea>\<div id="sms_resend_message_page" class="list_shared clearboth" style="width:680px;">\<div class="table_top_lower"></div>\<div class="border_left border_right border_bottom">\<div style="padding-top:3px; width:100%;" class="border_bottom">\<div class="pull-left margin-left-20" style="margin-top:8px;">\<div lang-id-set="title" lang-id="sms.return" class="sms_back_arrow" id="sms_resend_message_back"\onclick="EMUI.smsSendAndSaveController.reSendBack();">&nbsp;\</div>\</div>\<div class="pull-left margin-left-20">\<div id="sms_resend_user_input_area" class="hide pull-left">\<div class="pull-left" style="width:15px;">\<div class="round_top_left">&nbsp;</div>\<div id="sms_resend_user_input_middle_left" style="background-color:#F3F3F3;"></div>\<div class="round_bottom_left">&nbsp;</div>\</div>\<div id="sms_resend_user_input_block" class="pull-left"\style="min-height:32px;background-color:#F3F3F3;">\<textarea class="color_Darkgray" id="sms_resend_user_input" lang-id="sms.receivermultiinfo"\lang-id-set="placeholder"\style="font-size:14px;width:480px;margin-top:7px;height:24px;overflow:auto;resize:none;line-height:18px;"\onblur="EMUI.smsSendAndSaveController.showResendListItems();"></textarea>\</div>\<div class="pull-left" style="width:15px;">\<div class="round_top_right">&nbsp;</div>\<div id="sms_resend_user_input_middle_right" style="background-color:#F3F3F3;"></div>\<div class="round_bottom_right">&nbsp;</div>\</div>\<div class="clearboth"></div>\</div>\<div id="sms_resend_list"\onclick="EMUI.smsSendAndSaveController.showResendSendInput();">\<table cellpadding="0" cellspacing="0" frame=void rules=none id="sms_resend_user_input_list"\class="sms_resend_user_input">\<tr>\<td align="left">\<div class="pull-left" style="overflow:hidden;">\<div id="send_back_phone_number"\style="overflow:hidden; text-overflow:ellipsis; max-width:390px;"\class="margin-left-15"></div>\</div>\</td>\<td style="width:6px;">&nbsp;</td>\<td>\<div id="sms_resend_phone_more_notice"\lang-id="sms.phonemore.notice" class="pointer keepline hide"\onclick="EMUI.smsSendAndSaveController.showResendSendInput();"></div>\</td>\<td style="width:15px;">&nbsp;</td>\</tr>\</table>\</div>\</div>\<div class="pull-left margin-left-20" style="margin-top:4px;">\<div lang-id-set="title" lang-id="sms.forward" id="sms_resend_phone_smses"\class="pull-left sms_resend" onclick="EMUI.getActiveItemSmsController.toReSendPage();">&nbsp;\</div>\<div lang-id-set="title" lang-id="sms.delete" id="sms_delete_phone_smses"\class="pull-left btn_delete" onclick="EMUI.setChatSmsDeleteController.deleteSms();">&nbsp;\</div>\</div>\<div class="clearboth" style="height:15px;"></div>\</div>\<div style="height:420px;overflow:hidden;" id="current_phone_sms_list_items"></div>\</div>\<div class="clearboth"></div>\<div class="border_left border_right">\<div style="margin:0 auto;width:640px;padding-top:10px;">\<div lang-id="sms.inputmessageinit" class="pull-left" id="sms_reinput_dynamic_info"></div>\<div class="pull-right">\<div lang-id-set="title" lang-id="sms.sendback" class="sms_send_normal"\onclick="EMUI.smsSendAndSaveController.reSendPagesendMessage();"></div>\</div>\</div>\<div class="clearboth hide padding-left-20 onekey_red" id="sms_resend_error_info" style=""\lang-id="sms.maxlengtherr"></div>\<div class="clearboth hide padding-left-20 onekey_red" id="sms_resend_null_error_info" style=""\lang-id="sms.nullerr"></div>\<div class="clearboth"></div>\<div style="margin:0 auto;width:640px;margin-top:10px;">\<div>\<div style="height:10px;">&nbsp;</div>\<div id="sms_resend_current_content_top" class="sms_textarea_top">&nbsp;</div>\<textarea id="sms_resend_current_content" onpropertychange="this.style.height=this.scrollHeight+&quot;px&quot;;" oninput= "this.style.height=this.scrollHeight+&quot;px&quot;;" class="sms_send_content_textarea" style="margin-top:-1px;"></textarea>\<div id="sms_resend_current_content_bootom" class="sms_textarea_bootom" style="margin-top:-5px;">&nbsp;</div>\<div style="height:10px;">&nbsp;</div>\</div>\</div>\</div>\<div class="table_bottom"></div>\<div class="clearboth"></div>\</div>\<div class="color_background_white topmenuselect" style="height:0px;max-width:680px;overflow:hidden;"><span id="sms_send_user_input_length_test"></span></div>\<textarea id="sms_input_contract_shadow"\style="position: absolute; border-width:0px;padding:0px;visibility:hidden;font-size:14px;overflow:hidden;height:20px;width:520px;"></textarea>\<div id="sms_send_new_message_page" class="list_shared clearboth" style="width:680px;display:none;">\<div class="table_top_lower"></div>\<div class="border_left border_right border_bottom">\<div style="padding-top:3px; width:100%;" class="border_bottom">\<div class="pull-left margin-left-20" style="margin-top:8px;">\<div lang-id-set="title" lang-id="sms.return" class="sms_back_arrow" id="sms_new_message_back"\onclick="EMUI.smsSendAndSaveController.sendNewBack();">&nbsp;\</div>\</div>\<div class="pull-left margin-left-20">\<div id="sms_new_user_input_area" class="pull-left">\<div class="pull-left" style="width:15px;">\<div class="round_top_left">&nbsp;</div>\<div id="sms_user_input_middle_left" style="background-color:#F3F3F3;"></div>\<div class="round_bottom_left">&nbsp;</div>\</div>\<div id="sms_send_user_input_block" class="pull-left"\style="min-height:32px;background-color:#F3F3F3;">\<textarea id="sms_send_user_input" lang-id="sms.receivermultiinfo" lang-id-set="placeholder"\style="font-size:14px;width:520px;margin-top:7px;height:20px;overflow:auto;resize:none;line-height:18px;"\onblur="EMUI.smsSendAndSaveController.showNewSendListItems();"></textarea>\</div>\<div class="pull-left" style="width:15px;">\<div class="round_top_right">&nbsp;</div>\<div id="sms_user_input_middle_right" style="background-color:#F3F3F3;"></div>\<div class="round_bottom_right">&nbsp;</div>\</div>\<div class="clearboth"></div>\</div>\<table cellpadding="0" cellspacing="0" frame=void rules=none id="sms_new_send_list"\class="hide pull-left sms_add_person_input">\<tr>\<td>\<div onclick="EMUI.smsSendAndSaveController.showNewSendInput();">\<table cellpadding="0" cellspacing="0" frame=void rules=none style="width:100%;">\<tr>\<td align="left">\<div class="pull-left" style="overflow:hidden;">\<div id="sms_send_new_phone_number" class="margin-left-15"\style="overflow:hidden; text-overflow: ellipsis; max-width:410px;"></div>\</div>\</td>\<td style="width:6px;">&nbsp;</td>\<td>\<div id="sms_send_new_phone_more_notice" lang-id="sms.phonemore.notice"\class="pointer keepline hide"\onclick="EMUI.smsSendAndSaveController.showNewSendInput();"></div>\</td>\</tr>\</table>\</div>\</td>\<td style="width:15px;">&nbsp;</td>\</tr>\</table>\<div class="pull-left margin-left-20" style="margin-top:6px;">\<div lang-id-set="title" lang-id="sms.phonebook" id="sms_choose_contract_form_pb"\class="sms_add_person">&nbsp;\</div>\</div>\<div class="clearboth"></div>\</div>\<div class="clearboth" style="height:15px;">&nbsp;</div>\</div>\<div style="height:420px;overflow:hidden;" id="current_sms_list_items">&nbsp;</div>\</div>\<div class="clearboth"></div>\<div class="border_left border_right">\<div style="margin:0 auto;width:640px;padding-top:10px;">\<div lang-id="sms.inputmessageinit" class="pull-left" id="sms_input_dynamic_info"></div>\<div class="pull-right">\<div lang-id-set="title" lang-id="sms.send.new" class="sms_send_normal"\onclick="EMUI.smsSendAndSaveController.sendMessage();"></div>\</div>\</div>\<div class="clearboth hide padding-left-20 onekey_red" id="sms_error_null_info" style=""\lang-id="sms.nullerr"></div>\<div class="clearboth hide padding-left-20 onekey_red" id="sms_error_info" style=""\lang-id="sms.maxlengtherr"></div>\<div class="clearboth"></div>\<div style="margin:0 auto;width:640px;margin-top:10px;">\<div>\<div style="height:10px;">&nbsp;</div>\<div id="sms_current_content_top" class="sms_textarea_top">&nbsp;</div>\<textarea id="sms_current_content" onpropertychange="this.style.height=this.scrollHeight+&quot;px&quot;;" oninput="this.style.height=this.scrollHeight+&quot;px&quot;;" class="sms_send_content_textarea" style="margin-top:-1px;"></textarea>\<div id="sms_current_content_bootom" class="sms_textarea_bootom" style="margin-top:-5px;">&nbsp;</div>\<div style="height:10px;">&nbsp;</div>\</div>\</div>\</div>\<div class="table_bottom"></div>\<div class="clearboth"></div>\</div>\</div>\<div id="select_pb_page" class="hide clearboth list_shared" style="width:680px">\<div class="table_top_lower"></div>\<div class="border_left border_right border_bottom">\<div style="padding-top:3px; width:100%;" class="border_bottom">\<div class="pull-left margin-left-20" style="margin-top:8px;">\<div lang-id-set="title" lang-id="sms.return" class="sms_back_arrow" id="cancel_select_pb">&nbsp;\</div>\</div>\<div class="pull-left margin-left-20">\<div id="pb_info_list" class="pull-left sms_add_person_input">\<input class="margin-left-15" id="person_simple_info_input" style="width:520px" type="text"\maxlength="64">\</div>\<div class="pull-left margin-left-15" style="margin-top:6px;">\<div lang-id-set="title" lang-id="btn.cofirm" id="confirm_choose_contract_form_pb"\class="pb_btn_complete_contact margin-right-20">&nbsp;\</div>\</div>\<div class="clearboth"></div>\</div>\<div class="clearboth" style="height:15px;">&nbsp;</div>\</div>\<div style="height:426px;overflow:hidden;" id="current_pb_list_items">&nbsp;</div>\</div>\<div class="border_left border_right" style="height:40px;">&nbsp;</div>\<div class="table_bottom"></div>\</div><div style="height:40px;">&nbsp;</div></div>';
$("#rightpagearea").prepend(page);
setTimeout(function(){
showNationalLang();
},100);
if(typeof smsRenderPage == "function"){
beforeRenderPage("sms");
smsRenderPage();
afterRenderPage("sms");
}
}
﻿
var smsObj = (function () {
var SMS_TEXT_MODE_UCS2 = 0;
var SMS_TEXT_MODE_7BIT = 1;
var SMS_TEXT_MODE_8BIT = 2;
var g_SMS_UCS2_MAX_SIZE;
var g_SMS_8BIT_MAX_SIZE;
var g_SMS_7BIT_MAX_SIZE;
var gTextMode = 1;
var g_smsFeature = null;
var g_sms_importenabled = null;
var g_sms_urlenabled = null;
var g_sms_notemptyenabled = null;
var SMS_BOXTYPE_LOCAL_INBOX = 1;
var SMS_BOXTYPE_LOCAL_SENT = 2;
var SMS_BOXTYPE_LOCAL_DRAFT = 3;
var SMS_BOXTYPE_LOCAL_TRASH = 4;
var SMS_BOXTYPE_SIM_INBOX = 5;
var SMS_BOXTYPE_SIM_SENT = 6;
var SMS_BOXTYPE_SIM_DRAFT = 7;
var SMS_BOXTYPE_MIX_INBOX = 8;
var SMS_BOXTYPE_MIX_SENT = 9;
var SMS_BOXTYPE_MIX_DRAFT = 10;
var SMS_MAXPHONESIZE = 50;
var SMS_BOXTYPE_INBOX = SMS_BOXTYPE_LOCAL_INBOX;
var SMS_BOXTYPE_SENT = SMS_BOXTYPE_INBOX + 1;
var SMS_BOXTYPE_DRAFT = SMS_BOXTYPE_INBOX + 2;
var pb_start = 0;
var pb_end = 0;
var g_sms_boxType = SMS_BOXTYPE_INBOX;
var gSmsPageIndex = 1;
var gSmsReadCount = '';
var g_sms_maxphonesize = '';
var g_sms_sortType = 0;
var g_sms_ascending = 0;
var g_sms_unreadPreferred = 0;
var g_sms_recordMsgSum = 0;
var g_sms_simSum = 0;
var g_sms_localSum = 0;
var g_sms_Level = 4; 
var SMS_IS_CDMA = false;
var g_ext_7bit_tab = [
[20, 0x005E],
[40, 0x007B],
[41, 0x007D],
[47, 0x005C],
[60, 0x005B],
[61, 0x007E],
[62, 0x005D],
[64, 0x007C],
[101, 0x20AC]
];
var g_ext_7bit_tab_turkish = [
[13, 0x001D],
[20, 0x005E],
[40, 0x007B],
[41, 0x007D],
[47, 0x005C],
[60, 0x005B],
[61, 0x007E],
[62, 0x005D],
[64, 0x007C],
[71, 0x011E],
[73, 0x0130],
[83, 0x015E],
[99, 0x00E7],
[101, 0x20AC],
[103, 0x011F],
[105, 0x0131],
[115, 0x015F]
];
var g_ext_7bit_tab_spanish = [
[9, 0x00E7],
[20, 0x005E],
[40, 0x007B],
[41, 0x007D],
[47, 0x005C],
[60, 0x005B],
[61, 0x007E],
[62, 0x005D],
[64, 0x007C],
[65, 0x00C1],
[73, 0x00CD],
[79, 0x00D3],
[85, 0x00DA],
[97, 0x00E1],
[101, 0x20AC],
[105, 0x00ED],
[111, 0x00F3],
[117, 0x00FA]
];
var g_ext_7bit_tab_Portuguese = [
[5, 0x00EA],
[9, 0x00E7],
[11, 0x00D4],
[12, 0x00F4],
[14, 0x00C1],
[15, 0x00E1],
[18, 0x03A6],
[19, 0x0393],
[20, 0x005E],
[21, 0x03A9],
[22, 0x03A0],
[23, 0x03A8],
[24, 0x03A3],
[25, 0x0398],
[31, 0x00CA],
[40, 0x007B],
[41, 0x007D],
[47, 0x005C],
[60, 0x005B],
[61, 0x007E],
[62, 0x005D],
[64, 0x007C],
[65, 0x00C0],
[73, 0x00CD],
[79, 0x00D3],
[85, 0x00DA],
[91, 0x00C3],
[92, 0x00D5],
[97, 0x00C2],
[101, 0x20AC],
[105, 0x00ED],
[111, 0x00F3],
[117, 0x00FA],
[123, 0x00E3],
[124, 0x00F5],
[127, 0x00E2]
];
var extension_char = 27;
var ENTER_CHAR = 10;
var CR_CHAR = 13;
var GSM_7BIT_NUM = 128;
var SMS_STR_NUM = 620;
var EXTENSION_ASCII = 9;
var g_lang_edit = '-1';
var g_sms_length = 0;
var g_sms_num = 1;
var g_ucs2_num = 0;
var g_convert_type = '';
var smsCurrentContent = '';
var gTimeout = 5 * 60 * 1000;
var arrayGSM_7bit = [
0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F,
0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F,
0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, 0x4E, 0x4F,
0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x5B, 0x5C, 0x5D, 0x5E, 0x5F,
0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6A, 0x6B, 0x6C, 0x6D, 0x6E, 0x6F,
0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x7B, 0x7C, 0x7D, 0x7E, 0x7F
];
var arrayGSM_7DefaultTable = [
0x0040, 0x00A3, 0x0024, 0x00A5, 0x00E8, 0x00E9, 0x00F9, 0x00EC, 0x00F2, 0x00C7, 0x000A, 0x00D8, 0x00F8, 0x000D, 0x00C5, 0x00E5,
0x0394, 0x005F, 0x03A6, 0x0393, 0x039B, 0x03A9, 0x03A0, 0x03A8, 0x03A3, 0x0398, 0x039E, 0x001B, 0x00C6, 0x00E6, 0x00DF, 0x00C9,
0x0020, 0x0021, 0x0022, 0x0023, 0x00A4, 0x0025, 0x0026, 0x0027, 0x0028, 0x0029, 0x002A, 0x002B, 0x002C, 0x002D, 0x002E, 0x002F,
0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039, 0x003A, 0x003B, 0x003C, 0x003D, 0x003E, 0x003F,
0x00A1, 0x0041, 0x0042, 0x0043, 0x0044, 0x0045, 0x0046, 0x0047, 0x0048, 0x0049, 0x004A, 0x004B, 0x004C, 0x004D, 0x004E, 0x004F,
0x0050, 0x0051, 0x0052, 0x0053, 0x0054, 0x0055, 0x0056, 0x0057, 0x0058, 0x0059, 0x005A, 0x00C4, 0x00D6, 0x00D1, 0x00DC, 0x00A7,
0x00BF, 0x0061, 0x0062, 0x0063, 0x0064, 0x0065, 0x0066, 0x0067, 0x0068, 0x0069, 0x006A, 0x006B, 0x006C, 0x006D, 0x006E, 0x006F,
0x0070, 0x0071, 0x0072, 0x0073, 0x0074, 0x0075, 0x0076, 0x0077, 0x0078, 0x0079, 0x007A, 0x00E4, 0x00F6, 0x00F1, 0x00FC, 0x00E0
];
var arrayGSM_7ExtTable = [
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0x000A, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005E, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0x0020, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0x007B, 0x007D, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005C,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005B, 0x007E, 0x005D, 0xFFFF,
0x007C, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x20AC, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF
];
var arrayGSM_7TurkishExtTable = [
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x000A, 0xFFFF, 0xFFFF, 0x001D, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005E, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x0020, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x007B, 0x007D, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005C,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005B, 0x007E, 0x005D, 0xFFFF,
0x007C, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x011E, 0xFFFF, 0x0130, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0x015E, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0x00E7, 0xFFFF, 0x20AC, 0xFFFF, 0x011F, 0xFFFF, 0x0131, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0x015F, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF
];
var arrayGSM_7PortugueseExtTable = [
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00EA, 0xFFFF, 0xFFFF, 0xFFFF, 0x00E7, 0x000A, 0x00D4, 0x00F4, 0xFFFF, 0x00C1, 0x00E1,
0xFFFF, 0xFFFF, 0x03A6, 0x0393, 0x005E, 0x03A9, 0x03A0, 0x03A8, 0x03A3, 0x0398, 0xFFFF, 0x0020, 0xFFFF, 0xFFFF, 0xFFFF, 0x00CA,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x007B, 0x007D, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005C,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005B, 0x007E, 0x005D, 0xFFFF,
0x007C, 0x00C0, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00CD, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00D3,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00DA, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00C3, 0x00D5, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0x00C2, 0xFFFF, 0xFFFF, 0xFFFF, 0x20AC, 0xFFFF, 0xFFFF, 0xFFFF, 0x00ED, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00F3,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00FA, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00E3, 0x00F5, 0xFFFF, 0xFFFF, 0x00E2
];
var arrayGSM_7SpanishExtTable = [
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00E7, 0x000A, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005E, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x0020, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x007B, 0x007D, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005C,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x005B, 0x007E, 0x005D, 0xFFFF,
0x007C, 0x00C1, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00CD, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00D3,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00DA, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0x00E1, 0xFFFF, 0xFFFF, 0xFFFF, 0x20AC, 0xFFFF, 0xFFFF, 0xFFFF, 0x00ED, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00F3,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0x00FA, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF
];
var arrayGSM_7SpanishSpecialTable = [
0x00A2, 0x00C0, 0x00C1, 0x00C2, 0x00C3, 0x00C8, 0x00CA, 0x00CB, 0x00CC, 0x00CD, 0x00CE, 0x00CF, 0x00D0, 0x00D2, 0x00D3, 0x00D4,
0x00D5, 0x00D6, 0x00D9, 0x00DA, 0x00DB, 0x00DD, 0x00DE, 0x00E1, 0x00E2, 0x00E3, 0x00E7, 0x00EA, 0x00EB, 0x00ED, 0x00EE, 0x00EF,
0x00F0, 0x00F3, 0x00F4, 0x00F5, 0x00F6, 0x00FA, 0x00FB, 0x00FD, 0x00FE, 0x00FF, 0x0102, 0x0104, 0x0105, 0x0106, 0x0107, 0x010C,
0x010D, 0x010E, 0x010F, 0x0111, 0x0114, 0x0118, 0x0119, 0x011B, 0x0132, 0x0133, 0x0139, 0x013D, 0x0141, 0x0142, 0x0143, 0x0144,
0x0147, 0x0148, 0x0154, 0x0155, 0x0158, 0x0159, 0x015A, 0x015B, 0x015E, 0x015F, 0x0160, 0x0161, 0x0162, 0x0163, 0x0164, 0x0165,
0x0168, 0x016E, 0x016F, 0x0179, 0x017A, 0x017B, 0x017C, 0x017D, 0x017E, 0x01CE, 0x01D4, 0x0490, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF,
0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF
];
function CDMATextModeCheck(str) {
var numChar;
var codeFormat = SMS_TEXT_MODE_7BIT;
if (str.length === 0) {
return SMS_TEXT_MODE_7BIT;
}
for (var i = 0; i < str.length; i++) {
numChar = str.charCodeAt(i);
if ((SMS_TEXT_MODE_7BIT === codeFormat) && (  numChar >= 0 && numChar <= 0x7F)) {
codeFormat = SMS_TEXT_MODE_7BIT;
} else if ((SMS_TEXT_MODE_7BIT === codeFormat || SMS_TEXT_MODE_8BIT === codeFormat) && ( numChar > 0x7F && numChar <= 0xFF )) {
codeFormat = SMS_TEXT_MODE_8BIT;
} else if (numChar > 0xFF) {
codeFormat = SMS_TEXT_MODE_UCS2;
break;
}
}
return codeFormat;
}
function ucs2NumberCheck(str) {
var num_char_i;
var flag;
var ucs2_num_temp = 0;
var ext_Table = arrayGSM_7ExtTable;
if (str.length === 0) {
return 0;
}
switch (g_smsFeature.smscharlang) {
case '0':
if (g_convert_type === '2') {
ext_Table = arrayGSM_7SpanishExtTable;
} else {
ext_Table = arrayGSM_7ExtTable;
}
break;
case '1':
ext_Table = arrayGSM_7TurkishExtTable;
break;
case '2':
ext_Table = arrayGSM_7SpanishExtTable;
break;
case '3':
ext_Table = arrayGSM_7PortugueseExtTable;
break;
default:
break;
}
for (var i = 0; i < str.length; i++) {
flag = 0;
num_char_i = str.charCodeAt(i);
for (var j = 0; j < GSM_7BIT_NUM; j++) {
if (g_convert_type === '2') {
if (num_char_i == arrayGSM_7DefaultTable[j] || (num_char_i === ext_Table[j] || (num_char_i === arrayGSM_7SpanishSpecialTable[j]))) {
flag = 1;
break;
}
} else if (num_char_i === arrayGSM_7DefaultTable[j] || (num_char_i === ext_Table[j] )) {
flag = 1;
break;
}
}
if (flag === 0) {
ucs2_num_temp++;
}
}
return ucs2_num_temp;
}
EMUI.smsSplitInfoController = EMUI.ObjController.extend({
objName: 'sms/splitinfo-sms',
getsuccessProc: function (data) {
var responceData = data['response'];
g_lang_edit = responceData['splitinfo'];
g_convert_type = responceData['convert_type'];
}
});
function mouseEvent() {
$('#sms_current_content_top, #sms_current_content, #sms_current_content_bootom').live('mouseover foucs click', function() {
$('#sms_current_content_top').attr('class', 'sms_textarea_tophover');
$('#sms_current_content_bootom').attr('class', 'sms_textarea_bootomhover');
$('#sms_current_content').attr('class', 'sms_send_content_textareahover');
});
$('#sms_current_content_top, #sms_current_content, #sms_current_content_bootom').live('mouseout blur', function() {
if ($('#sms_current_content').is(':focus')) {
return;
}
$('#sms_current_content_top').attr('class', 'sms_textarea_top');
$('#sms_current_content_bootom').attr('class', 'sms_textarea_bootom');
$('#sms_current_content').attr('class', 'sms_send_content_textarea');
});
$('#sms_resend_current_content_top, #sms_resend_current_content, #sms_resend_current_content_bootom').live('mouseover foucs click', function() {
$('#sms_resend_current_content_top').attr('class', 'sms_textarea_tophover');
$('#sms_resend_current_content_bootom').attr('class', 'sms_textarea_bootomhover');
$('#sms_resend_current_content').attr('class', 'sms_send_content_textareahover');
});
$('#sms_current_content_top, #sms_resend_current_content, #sms_current_content_bootom').live('mouseout blur', function() {
if ($('#sms_resend_current_content').is(':focus')) {
return;
}
$('#sms_resend_current_content_top').attr('class', 'sms_textarea_top');
$('#sms_resend_current_content_bootom').attr('class', 'sms_textarea_bootom');
$('#sms_resend_current_content').attr('class', 'sms_send_content_textarea');
});
}
function smsContentDiffUCS2Num(str) {
var idx = 0;
var oldEndPos = 0;
var newEndPos = 0;
var minLen = 0;
var diffLen = 0;
var diffPos = 0;
var diffNum = 0;
var diffOldNum = 0;
var diffNewNum = 0;
if (smsCurrentContent === null || smsCurrentContent.length === 0) {
g_ucs2_num = ucs2NumberCheck(str);
return;
}
if (str === null || str.length === 0) {
g_ucs2_num = 0;
return;
}
minLen = Math.min(str.length, smsCurrentContent.length);
for (diffPos = 0; diffPos < minLen; ++diffPos) {
if (str.charCodeAt(diffPos) !== smsCurrentContent.charCodeAt(diffPos)) {
break;
}
}
if (diffPos === minLen) { 
diffLen = str.length - smsCurrentContent.length;
if (diffLen > 0) { 
diffNum = ucs2NumberCheck(str.substring(diffPos));
} else if (diffLen < 0) {
diffNum = (-1) * ucs2NumberCheck(smsCurrentContent.substring(diffPos));
}
} else {
for (idx = 0, oldEndPos = smsCurrentContent.length - 1, newEndPos = str.length - 1; idx < minLen && oldEndPos > diffPos && newEndPos > diffPos; ++idx, --oldEndPos, --newEndPos) {
if (str.charCodeAt(newEndPos) !== smsCurrentContent.charCodeAt(newEndPos)) {
break;
}
}
diffOldNum = ucs2NumberCheck(smsCurrentContent.substring(diffPos, oldEndPos + 1));
diffNewNum = ucs2NumberCheck(str.substring(diffPos, newEndPos + 1));
diffNum = diffNewNum - diffOldNum;
}
g_ucs2_num += diffNum;
}
function check_extension_ascii_for_char_number(str) {
var char_i_code;
var extension_ascii_num = 0;
var charLenAtFirstSMSEnd = 1;
var k = 0;
var ext_tab = g_ext_7bit_tab;
var normal_max_len = 160;
var long_max_len = 153;
switch (g_smsFeature.smscharlang) {
case '0':
ext_tab = g_ext_7bit_tab;
break;
case '1':
ext_tab = g_ext_7bit_tab_turkish;
break;
case '2':
ext_tab = g_ext_7bit_tab_spanish;
break;
case '3':
ext_tab = g_ext_7bit_tab_Portuguese;
break;
default:
break;
}
if (g_smsFeature.smscharlang === '0' || typeof g_smsFeature.smscharlang === 'undefined') {
normal_max_len = 160;
long_max_len = 153;
} else {
normal_max_len = 155;
long_max_len = 149;
}
for (var i = 0; i < str.length; i++) {
var charLen = 1;
char_i_code = str.charCodeAt(i);
for (charLen = 1, k = 0; k < ext_tab.length; k++) {
if (char_i_code === ext_tab[k][1]) {
charLen = 2;
break;
}
}
if (charLen === 1) {
extension_ascii_num++;
} else if (charLenAtFirstSMSEnd === 1) {
if ((long_max_len - 1) === extension_ascii_num) {
extension_ascii_num += 2;
charLenAtFirstSMSEnd = 2;
} else if ( computerAscii(long_max_len,extension_ascii_num, 1) ) {
extension_ascii_num += 3;
} else {
extension_ascii_num += 2;
}
} else if ( computerAscii(long_max_len, extension_ascii_num, 2) ) {
extension_ascii_num += 3;
} else {
extension_ascii_num += 2;
}
}
if (extension_ascii_num > normal_max_len && charLenAtFirstSMSEnd === 2) {
extension_ascii_num++;
}
return extension_ascii_num;
}
function check_extension_ascii_for_char_number_new(str) {
var char_i;
var char_i_code;
var k = 0;
var extension_ascii_num = 0;
var charLenAtFirstSMSEnd = 1;
var ext_tab = g_ext_7bit_tab;
var normal_max_len = 160;
var long_max_len = 153;
var ext_tab_ = '';
var tab_7bit_ext = true;
switch (g_smsFeature.smscharlang) {
case '0':
ext_tab_ = g_ext_7bit_tab;
break;
case '1':
ext_tab_ = g_ext_7bit_tab_turkish;
break;
case '2':
ext_tab_ = g_ext_7bit_tab_spanish;
break;
case '3':
ext_tab_ = g_ext_7bit_tab_Portuguese;
break;
default:
break;
}
g_sms_smscharlang = false;
for (var i = 0; i < str.length; i++) {
tab_7bit_ext = true;
var charLen = 1;
char_i = str.charAt(i);
char_i_code = char_i.charCodeAt();
for (charLen = 1, k = 0; k < ext_tab.length; k++) {
if (char_i_code == ext_tab[k][1]) {
charLen = 2;
normal_max_len = 160;
long_max_len = 153;
tab_7bit_ext = false;
break;
}
}
if (tab_7bit_ext) {
for (charLen = 1, k = 0; k < ext_tab_.length; k++) {
if (char_i_code === ext_tab_[k][1]) {
charLen = 2;
normal_max_len = 155;
long_max_len = 149;
g_sms_smscharlang = true;
break;
}
}
}
if (charLen === 1) {
extension_ascii_num++;
} else if (charLenAtFirstSMSEnd === 1) {
if ((long_max_len - 1) === extension_ascii_num) {
extension_ascii_num += 2;
charLenAtFirstSMSEnd = 2;
} else if ( computerAscii(long_max_len, extension_ascii_num, 1) ) {
extension_ascii_num += 3;
} else {
extension_ascii_num += 2;
}
} else if (computerAscii(long_max_len, extension_ascii_num, 2)) {
extension_ascii_num += 3;
} else {
extension_ascii_num += 2;
}
}
if (extension_ascii_num > normal_max_len && charLenAtFirstSMSEnd === 2) {
extension_ascii_num++;
}
return extension_ascii_num;
}
function computerAscii (long_max_len, extension_ascii_num, num) {
for ( var i=2;i<g_sms_Level+1;i++) {
if ( (long_max_len * i - num) === extension_ascii_num) {
return true;
}
}
return false;
}
EMUI.getActiveItemSmsCountController = EMUI.ObjController.extend({
objName: 'sms/sms-count-contact',
pageCount: 0, 
isSupportSaveInfo: false,
oneContractPageCount: 0,
oldCount: 0,
refreshCount: 0,
showShortInputBorder: function (obj) {
var curElement = $(obj);
if (curElement && curElement.parent()) {
curElement.parent().attr('class', 'sms_page_input_selected');
}
},
hideShortInputBorder: function (obj) {
var curElement = $(obj);
if (curElement && curElement.parent()) {
curElement.parent().attr('class', 'sms_page_input');
}
},
getOneNewContractCount: function () {
var self = this;
var phoneNumber = EMUI.getActiveItemSmsController.currentNumber;
var postObj = {
phone: xss(phoneNumber)
};
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
if (result && result['response']) {
var smsCount = parseInt(result['response']['count'], 10);
$('#sms_total_count').text(' (' + smsCount + ')');
self.refreshCount = smsCount;
self.oneContractPageCount = Math.ceil(smsCount / gSmsReadCount);
if (self.refreshCount !== self.oldCount) {
self.oldCount = smsCount;
EMUI.getActiveItemSmsController.currentPage = 1;
EMUI.getActiveItemSmsCountController.getOneContractSmsCount(phoneNumber, function () {
EMUI.getActiveItemSmsController.getsmsListContent();
setTimeout(function () {
$('#current_phone_sms_list_items').mCustomScrollbar('scrollTo', 'bottom', {
scrollInertia: 1000
});
}, 500);
});
} else {
var smsListArray = {
phone: xss(phoneNumber),
pageindex: 1,
readcount: gSmsReadCount
};
EMUI.getActiveItemSmsController.postData(smsListArray, function (result) {
comeInStartTime = new Date().getTime();
if (typeof result.response !== 'undefined') {
var smsResult = result['response']['messages'];
var smsChatList = [];
if ($.isArray(smsResult['message'])) {
smsChatList = smsResult['message'];
} else {
smsChatList.push(smsResult['message']);
}
if (smsChatList[smsChatList.length - 1]['smstat'] === '0') {
self.oldCount = smsCount;
EMUI.getActiveItemSmsController.currentPage = 1;
EMUI.getActiveItemSmsCountController.getOneContractSmsCount(phoneNumber, function () {
EMUI.getActiveItemSmsController.getsmsListContent();
setTimeout(function () {
$('#current_phone_sms_list_items').mCustomScrollbar('scrollTo', 'bottom', {
scrollInertia: 1000
});
}, 500);
});
}
}
});
}
}
});
},
getOneContractSmsCount: function (phone, callback) {
var self = this;
var postObj = {
phone:  xss(phone)
};
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
if (result && result['response']) {
var smsCount = parseInt(result['response']['count'], 10);
$('#sms_total_count').text(' (' + smsCount + ')');
self.oldCount = smsCount;
self.oneContractPageCount = Math.ceil(smsCount / gSmsReadCount);
if (callback) {
callback();
}
}
});
},
getsuccessProc: function (data) {
var responseData = data['response'];
var smsCount = parseInt(responseData['count'], 10);
var smsPageArray = [];
this.pageCount = Math.ceil(smsCount / gSmsReadCount);
if (smsCount > 0) {
$('#sms_message_delete').show();
if (this.pageCount > 1) {
for (var i = 1; i <= this.pageCount; i++) {
var item = '<td class="sms_page_location_normal hide" id="sms_page_index_{{i}}" name="{{i}}" onclick="EMUI.getCurrentSmsListController.smsGotoClickPage(this)">{{i}}</td>';
$('#table_sms_page_index_table').secureAppend(item, {i: i});
}
}
EMUI.getCurrentSmsListController.initSmsPageStatus();
EMUI.getCurrentSmsListController.getSmsList();
EMUI.getCurrentSmsListController.showPageInCurrent();
} else {
$('#sms_message_delete').hide();
$($('#sms_message_list > div > div')[0]).empty();
}
$('#sms_total_count').text(' (' + smsCount + ')');
}
});
EMUI.setChatSmsDeleteController = EMUI.ObjController.extend({
objName: 'sms/delete-sms',
getDeleteItems: function () {
var intemLen = $('[id^=check_sms_list_resend_phone_]').length;
var deleteSmsArray = [];
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=check_sms_list_resend_phone_]')[i];
var classVal = $(item).attr('class');
if (classVal) {
if (classVal.indexOf('check_on') >= 0) {
var phoneNum = $(item).attr('name');
if (phoneNum !== '') {
deleteSmsArray.push(phoneNum);
}
}
}
}
return deleteSmsArray;
},
deleteSms: function () {
EMUI.setChatSmsDeleteController.isSupportSaveInfo = true;
var self = this;
var deleteArray = this.getDeleteItems();
if (deleteArray.length === 0) {
utilShowToast(publicLang['sms.deletesms.error']);
return;
}
var postObj = {
Index: deleteArray
};
utilStartConfirmDialog(publicLang['sms.deleteinfo'], function () {
utilStopConfirmDialog();
utilStartSubmitDialog(publicLang['sms.deleteing']);
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
utilStopSubmitDialog();
EMUI.getActiveItemSmsController.currentPage = 1;
EMUI.getActiveItemSmsCountController.getOneContractSmsCount(EMUI.getActiveItemSmsController.currentNumber, function() {
if (EMUI.getActiveItemSmsCountController.oldCount === 0) {
EMUI.smsSendAndSaveController.reSendBack();
EMUI.getCurrentSmsListController.initSmsPageStatus();
return;
}
EMUI.getActiveItemSmsController.getsmsListContent();
setTimeout(function() {
$('#current_phone_sms_list_items').mCustomScrollbar('scrollTo', 'bottom', {
scrollInertia: 1000
});
}, 500);
});
});
}, function () {
utilStopConfirmDialog();
EMUI.getActiveItemSmsController.getsmsListContent();
});
}
});
EMUI.setChatSmsReadController = EMUI.ObjController.extend({
objName: 'sms/set-read',
isSupportSaveInfo: false,
setChatSmsRead: function (smsList) {
var self = this;
var smsListLen = smsList.length;
if (smsListLen === 0) {
return;
}
var sendArray = [];
for (var i = 0; i < smsListLen; i++) {
var smsItem = smsList[i];
if (smsItem['smstat'] === '0') {
sendArray.push(smsItem['index']);
}
}
if (sendArray.length === 0) {
return;
}
var postObj = {
Index: sendArray
};
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
});
}
});
EMUI.getActiveItemSmsController = EMUI.ObjController.extend({
objName: 'sms/sms-list-phone',
currentPage: 1,
isSupportSaveInfo: false,
currentNumber: '', 
draftItem: '',
increacePage: function () {
this.currentPage = this.currentPage + 1;
if (this.currentPage > EMUI.getActiveItemSmsCountController.oneContractPageCount) {
this.currentPage = EMUI.getActiveItemSmsCountController.oneContractPageCount;
return false;
}
return true;
},
showScroll: function () {
var self = this;
$('#current_phone_sms_list_items').mCustomScrollbar({
theme: 'minimal-dark',
scrollButtons: {
enable: true
},
mouseWheel: {
enable: true,
scrollAmount: 50
},
autoHideScrollbar: false,
scrollInertia: 0,
alwaysShowScrollbar: 1,
horizontalScroll: false,
callbacks: {
onScroll: function () {
},
onTotalScrollBack: function () {
var isNeedLoad = self.increacePage();
if (isNeedLoad) {
var scrollHeightOld = $($('#current_phone_sms_list_items > div > div')[0]).height();
self.getsmsListContent(function () {
setTimeout(function () {
var scrollHeightSum = $($('#current_phone_sms_list_items > div > div')[0]).height();
var scrollHeight = scrollHeightSum - scrollHeightOld;
if (scrollHeight > 0) {
$('#current_phone_sms_list_items').mCustomScrollbar('scrollTo', scrollHeight);
}
}, 30);
}, 'needConcat');
}
},
onTotalScroll: function () {
}
}
});
},
registerSmsMouseEvent: function (ismouseOver, elementId, isself) {
if (ismouseOver) {
if (isself) {
$('#' + elementId + '_left_top').addClass('sms_blue_left_top_selected').removeClass('sms_blue_left_top');
$('#' + elementId + '_left_middle').addClass('sms_blue_normal_selected').removeClass('sms_blue_normal');
$('#' + elementId + '_left_bottom').addClass('sms_blue_left_bottom_selected').removeClass('sms_blue_left_bottom');
$('#content_' + elementId + '_middle').addClass('sms_blue_normal_selected').removeClass('sms_blue_normal');
$('#' + elementId + '_right_top').addClass('sms_blue_right_top_selected').removeClass('sms_blue_right_top');
$('#' + elementId + '_right_middle').addClass('sms_blue_normal_selected').removeClass('sms_blue_normal');
$('#' + elementId + '_right_bottom').addClass('sms_blue_right_bottom_selected').removeClass('sms_blue_right_bottom');
} else {
$('#' + elementId + '_left_top').addClass('sms_gray_left_top_selected').removeClass('sms_gray_left_top');
$('#' + elementId + '_left_middle').addClass('sms_gray_normal_selected').removeClass('sms_gray_normal');
$('#' + elementId + '_left_bottom').addClass('sms_gray_left_bottom_selected').removeClass('sms_gray_left_bottom');
$('#content_' + elementId + '_middle').addClass('sms_gray_normal_selected').removeClass('sms_gray_normal');
$('#' + elementId + '_right_top').addClass('sms_gray_right_top_selected').removeClass('sms_gray_right_top');
$('#' + elementId + '_right_middle').addClass('sms_gray_normal_selected').removeClass('sms_gray_normal');
$('#' + elementId + '_right_bottom').addClass('sms_gray_right_bottom_selected').removeClass('sms_gray_right_bottom');
}
} else {
if ($('#check_' + elementId + '_checkbox').hasClass('check_on')) {
return;
}
if (isself) {
$('#' + elementId + '_left_top').removeClass('sms_blue_left_top_selected').addClass('sms_blue_left_top');
$('#' + elementId + '_left_middle').removeClass('sms_blue_normal_selected').addClass('sms_blue_normal');
$('#' + elementId + '_left_bottom').removeClass('sms_blue_left_bottom_selected').addClass('sms_blue_left_bottom');
$('#content_' + elementId + '_middle').removeClass('sms_blue_normal_selected').addClass('sms_blue_normal');
$('#' + elementId + '_right_top').removeClass('sms_blue_right_top_selected').addClass('sms_blue_right_top');
$('#' + elementId + '_right_middle').removeClass('sms_blue_normal_selected').addClass('sms_blue_normal');
$('#' + elementId + '_right_bottom').removeClass('sms_blue_right_bottom_selected').addClass('sms_blue_right_bottom');
} else {
$('#' + elementId + '_left_top').removeClass('sms_gray_left_top_selected').addClass('sms_gray_left_top');
$('#' + elementId + '_left_middle').removeClass('sms_gray_normal_selected').addClass('sms_gray_normal');
$('#' + elementId + '_left_bottom').removeClass('sms_gray_left_bottom_selected').addClass('sms_gray_left_bottom');
$('#content_' + elementId + '_middle').removeClass('sms_gray_normal_selected').addClass('sms_gray_normal');
$('#' + elementId + '_right_top').removeClass('sms_gray_right_top_selected').addClass('sms_gray_right_top');
$('#' + elementId + '_right_middle').removeClass('sms_gray_normal_selected').addClass('sms_gray_normal');
$('#' + elementId + '_right_bottom').removeClass('sms_gray_right_bottom_selected').addClass('sms_gray_right_bottom');
}
}
},
selectItem: function (obj, isSelf) {
var isShowSelected = false;
var clickId = $(obj).attr('id');
var checkboxId = 'check_' + clickId + '_checkbox';
$('#' + checkboxId).show();
if ($('#' + checkboxId).hasClass('check_on')) {
$('#' + checkboxId).removeClass('check_on').addClass('check_off');
isShowSelected = false;
} else {
$('#' + checkboxId).removeClass('check_off').addClass('check_on');
isShowSelected = true;
}
this.registerSmsMouseEvent(isShowSelected, clickId, isSelf);
},
selectCheckItem: function (obj, isSelf) {
var isShowSelected = false;
if ($(obj).hasClass('check_on')) {
$(obj).removeClass('check_on').addClass('check_off');
isShowSelected = false;
} else {
$(obj).removeClass('check_off').addClass('check_on');
isShowSelected = true;
}
var objId = $(obj).attr('id');
var tableId = objId.substring(6, objId.length - 9);
this.registerSmsMouseEvent(isShowSelected, tableId, isSelf);
},
adjustHeight: function () {
setTimeout(function () {
var intemLen = $('[id^=content_sms_list_resend_phone_]').length;
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=content_sms_list_resend_phone_]')[i];
var itemId = $(item).attr('id');
var itemHeight = $('#' + itemId).height();
var testWidth = $('#test_' + itemId + ' > span').width();
if (itemHeight > 54) {
var adjustId = itemId.substring(8, itemId.length - 7);
$('#' + adjustId + '_left_middle').text(' ');
$('#' + adjustId + '_left_middle').css('height', (itemHeight - 54) + 'px');
$('#' + adjustId + '_right_middle').text(' ');
$('#' + adjustId + '_right_middle').css('height', (itemHeight - 54) + 'px');
}
if (testWidth < 448 && itemHeight <= 54) {
if (itemHeight === 54) {
if ($('#' + itemId).text().indexOf('\n') >= 0) {
$('#' + itemId + '> div').css('padding-top', '8px');
} else {
$('#' + itemId + '> div').css('padding-top', '17.5px');
}
} else {
$('#' + itemId + '> div').css('padding-top', '17.5px');
}
}
}
}, 50);
},
convertHref: function (isself, str) {
var reg = '(((https|http|ftp|rtsp|mms):&#x2F;&#x2F;)|(www\\.)){1}[\41-\176]*';
var matchURL = new RegExp(reg, "ig");
str = xss(str);
return str.replace(matchURL, function ($1) {
$1_href = $1.indexOf('&#x2F;&#x2F;') === -1 ? 'http://' + $1 : $1;
if ($1_href.charAt($1_href.length - 1) === '=' && $1_href.charAt($1_href.length - 2) !== '=') {
$1_href = $1_href.substring(0, $1_href.length - 1);
}
if (isself) {
return '<a class="topmenuselect" href="' + $1_href + '" style="text-decoration:underline;color: #FFFFFF;" target="_blank" rel="noopener noreferrer">' + $1 + '</a>';
} else {
return '<a href="' + $1_href + '" class="selectmenu" style="text-decoration:underline;" target="_blank" rel="noopener noreferrer">' + $1 + '</a>';
}
});
},
showMessageList: function (dataArr) {
var dataList = dataArr.sort(function (a, b) {
var aDates = a.date.split(' ');
var aDay = aDates[0];
var aDate = aDates[1];
var bDates = b.date.split(' ');
var bDay = bDates[0];
var bDate = bDates[1];
if (aDay > bDay) {
return 1;
} else if (aDay < bDay) {
return -1;
} else {
if (aDate > bDate) {
return 1;
} else {
return -1;
}
}
});
var smsResend = [];
var dataLen = dataList.length;
var beforeTime = '';
this.draftItem = '';
$($('#current_phone_sms_list_items > div > div')[0]).empty();
for (var i = 0; i < dataLen; i++) {
var dataItem = dataList[i];
var itemHtml = '';
var smsType = dataItem['smstype'];
var smsContent = '';
var isSelf = true;
if (dataItem['curbox'] === '0') {
isSelf = false;
}
if (smsType === '7') { 
smsContent = '<span lang-id="sms.sms_usesreport">' + publicLang['sms.sms_usesreport'] + '</span><span lang-id="common_colon">' + publicLang['common_colon']
+ ' </span><span lang-id="sms.report.success">' + publicLang['sms.report.success'] + '</span>';
} else if (smsType === '8') { 
smsContent = '<span lang-id="sms.sms_usesreport">' + publicLang['sms.sms_usesreport'] + '</span><span lang-id="common_colon">' + publicLang['common_colon']
+ ' </span><span lang-id="sms.report.failed">' + publicLang['sms.report.failed'] + '</span>';
} else if (smsType === '4' || smsType === '5' || smsType === '6') { 
smsContent = '<span lang-id="sms.multisms">' + publicLang['sms.multisms'] + '</span>';
} else {
smsContent = this.convertHref(isSelf, dataItem['content']);
}
var resendHtml = '';
var smsStatus = dataItem['smstat'];
var isDraft = false;
if (smsStatus === '4') {
resendHtml = '<div class="pull-left ic_sms_resend" lang-id-set="title" title="' + publicLang['sms.sendagain'] + '" lang-id="sms.sendagain" name="{{index}}" onclick="EMUI.smsSendAndSaveController.reSendAgain(\'{{index}}\');"></div>';
} else if (smsStatus === '2') { 
$('#sms_resend_current_content').val(dataItem['content']);
EMUI.smsSendAndSaveController.smsContentChange(false, dataItem['content']);
this.draftItem = dataItem;
isDraft = true;
}
var nextTime = new Date(Date.parse(dataItem['date'].replace(/-/g, '/')));
var nowDate = new Date().Format('yyyy-MM-dd') + '';
var dateTime = dataItem['date'].split(' ');
if (dateTime[0] === nowDate) {
dateTime = dateTime[1];
} else {
dateTime = dataItem['date'];
}
if (beforeTime === '') {
itemHtml += '<div class="color_descroption_gray" style="font-size:14px;padding-top:30px;" align="center">{{dateTime}}</div>';
beforeTime = new Date(Date.parse(dataItem['date'].replace(/-/g, '/')));
} else {
var sperate = Math.ceil((nextTime - beforeTime) / 60000);
if (sperate >= 5) {
itemHtml += '<div class="color_descroption_gray" style="font-size:14px;padding-top:30px;" align="center">{{dateTime}}</div>';
beforeTime = nextTime;
}
}
var tableId = 'sms_list_resend_phone_' + dataItem['index'];
if (!isSelf) {
itemHtml += '<table cellpadding="0" cellspacing="0" frame=void rules=none style="margin-top:20px;" class="pull-left"><tr><td style="width:50px;">'
+ '<div style="margin-top:11px;" class="margin-left-15"><div onclick="EMUI.getActiveItemSmsController.selectCheckItem(this, false);" id="check_{{tableId}}_checkbox" class="hide check_off" name="{{dataItemIndex}}"></div>&nbsp;</div></td><td>'
+ '<table cellpadding="0" cellspacing="0" frame=void rules=none style="max-width:570px;" name="{{dataItemIndex}}" id="{{tableId}}" onclick="EMUI.getActiveItemSmsController.selectItem(this, false);">'
+ '<tr><td>'
+ '<div id="{{tableId}}_left" class="pull-left">'
+ '    <div id="{{tableId}}_left_top" class="sms_gray_left_top" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);">&nbsp;</div>'
+ '    <div id="{{tableId}}_left_middle" class="sms_gray_normal" style="" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);"></div>'
+ '    <div id="{{tableId}}_left_bottom" class="sms_gray_left_bottom" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);">&nbsp;</div>'
+ '</div><div id="real_content_{{tableId}}_middle" class="hide">{{dataItemContent}}</div>'
+ '<div id="content_{{tableId}}_middle" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);"\ onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);" class="pull-left sms_gray_normal sms_content_wordbreak" style="min-height:54px;max-width:446px;line-height:140%;">'
+ '<div id="noSelf_smsContent_{{dataItemIndex}}" style="white-space:pre-wrap;padding-top:8px;padding-bottom:8px;" class="sms_content_wordbreak"></div></div><div id="right" class="pull-left">'
+ '    <div id="{{tableId}}_right_top" class="sms_gray_right_top" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);">&nbsp;</div>'
+ '    <div id="{{tableId}}_right_middle" class="sms_gray_normal" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);" style="height:auto;"></div>'
+ '    <div id="{{tableId}}_right_bottom" class="sms_gray_right_bottom" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', false);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', false);">&nbsp;</div>'
+ '</div></td></tr></table>'
+ '</td></tr></table><div class="clearboth"></div><div class="topmenuselect" id="test_content_{{tableId}}_middle" style="height:1px;overflow:hidden;"><span>{{dataItemContent}}</span></div>';
} else {
itemHtml += '<table cellpadding="0" cellspacing="0" frame=void rules=none style="margin-top:20px;" class="pull-right"><tr><td><div id="self_resendHtml_{{dataItemIndex}}" style="width:32px;"></div></td><td>'
+ '<table cellpadding="0" cellspacing="0" frame=void rules=none style="max-width:570px;" name="{{dataItemIndex}}" id="{{tableId}}" onclick="EMUI.getActiveItemSmsController.selectItem(this, true);">'
+ '<tr><td>'
+ '<div id="{{tableId}}_left" class="pull-left">'
+ '    <div id="{{tableId}}_left_top" class="sms_blue_left_top" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);">&nbsp;</div>'
+ '    <div id="{{tableId}}_left_middle" class="sms_blue_normal" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);" style=""></div>'
+ '    <div id="{{tableId}}_left_bottom" class="sms_blue_left_bottom" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);">&nbsp;</div>'
+ '</div><div id="real_content_{{tableId}}_middle" class="hide">{{dataItemContent}}</div>'
+ '<div id="content_{{tableId}}_middle" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);" class="pull-left sms_blue_normal sms_content_wordbreak" style="min-height:54px;max-width:446px;line-height:140%;">'
+ '<div id="self_smsContent_{{dataItemIndex}}" style="white-space:pre-wrap;padding-top:8px;padding-bottom:8px;" class="sms_content_wordbreak"></div></div><div id="right" class="pull-left">'
+ '    <div id="{{tableId}}_right_top" class="sms_blue_right_top" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);">&nbsp;</div>'
+ '    <div id="{{tableId}}_right_middle" class="sms_blue_normal" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);" style="height:auto;"></div>'
+ '    <div id="{{tableId}}_right_bottom" class="sms_blue_right_bottom" onmouseover="EMUI.getActiveItemSmsController.registerSmsMouseEvent(true, \'{{tableId}}\', true);" onmouseleave="EMUI.getActiveItemSmsController.registerSmsMouseEvent(false, \'{{tableId}}\', true);">&nbsp;</div>'
+ '</div></td></tr></table>'
+ '</td><td style="width:50px;"><div style="margin-top:11px;" class="margin-left-15"><div onclick="EMUI.getActiveItemSmsController.selectCheckItem(this, true);" id="check_{{tableId}}_checkbox" class="hide check_off" name="{{dataItemIndex}}"></div>&nbsp;</div></td></tr></table>'
+ '<div class="clearboth"></div><div class="topmenuselect" id="test_content_{{tableId}}_middle" style="height:1px;overflow:hidden;"><span>{{dataItemContent}}</span></div>';
}
if (!isDraft) {
var templateDate = {
dateTime: dateTime,
tableId: tableId,
dataItemIndex: dataItem['index'],
dataItemContent: dataItem['content'],
};
$($('#current_phone_sms_list_items > div > div')[0]).secureAppend(itemHtml, templateDate);
var smsContentTargeId = '';
var resendTargeId = '';
if (!isSelf) {
smsContentTargeId = 'noSelf_smsContent_' + dataItem['index'];
} else {
smsContentTargeId = 'self_smsContent_' + dataItem['index'];
resendTargeId = 'self_resendHtml_' + dataItem['index'];
$('#' + resendTargeId).secureHtml(resendHtml, {index: dataItem['index']});
}
$('#' + smsContentTargeId).secureHtml(smsContent);
}
}
var splitHtml = '<div style="height:50px;">&nbsp;</div>';
$($('#current_phone_sms_list_items > div > div')[0]).secureAppend(splitHtml);
this.adjustHeight();
},
toReSendPage: function () {
var intemLen = $('[id^=check_sms_list_resend_phone_][class*=check_on]').length;
var resendContent = '';
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=check_sms_list_resend_phone_][class*=check_on]')[i];
var checkId = $(item).attr('id');
var contentId = 'real_content_' + checkId.substring(6, checkId.length - 9) + '_middle';
if (i === intemLen - 1) {
resendContent += $('#' + contentId).text();
} else {
resendContent += $('#' + contentId).text() + '\n';
}
}
if (resendContent.length === 0) {
utilShowToast(publicLang['sms.resend.error']);
return;
}
EMUI.smsSendAndSaveController.showNewSendPage();
$('#sms_send_user_input').val('');
$('#sms_send_user_input_length_test').empty();
$('#sms_current_content').val(resendContent);
EMUI.smsSendAndSaveController.smsContentChange(true, resendContent);
},
smsChatList: [], 
getsmsListContent: function (callback, needConcat) {
var self = this;
var phoneNum = EMUI.getActiveItemSmsController.currentNumber;
if (this.currentPage < 1 || this.currentPage > EMUI.getActiveItemSmsCountController.oneContractPageCount) {
return;
}
if (typeof phoneNum === 'undefined' || phoneNum === '') {
return;
}
var smsListArray = {
phone: xss(phoneNum),
pageindex: this.currentPage,
readcount: gSmsReadCount
};
self.postData(smsListArray, function (result) {
comeInStartTime = new Date().getTime();
if (typeof result.response !== 'undefined') {
var smsResult = result['response']['messages'];
var smsChatList = [];
if ($.isArray(smsResult['message'])) {
smsChatList = smsResult['message'];
} else {
smsChatList.push(smsResult['message']);
}
$('#sms_phone_list_length_test').text(phoneNum);
EMUI.smsSendAndSaveController.showResendPage();
self.showScroll();
if (needConcat === 'needConcat') {
self.smsChatList = self.smsChatList.concat(smsChatList);
}
else {
self.smsChatList = smsChatList;
}
self.showMessageList(self.smsChatList);
if (EMUI.getActiveItemSmsController.draftItem !== '') {
$('#sms_resend_user_input_area').show();
$('#sms_resend_user_input').focus();
$('#sms_resend_list').hide();
} else {
EMUI.getCurrentSmsListController.adjustResendContractStyle(phoneNum);
}
EMUI.setChatSmsReadController.setChatSmsRead(self.smsChatList);
if (callback) {
callback();
}
} else {
EMUI.smsSendAndSaveController.reSendBack();
EMUI.getCurrentSmsListController.initSmsPageStatus();
}
});
}
});
EMUI.getSendStatusController = EMUI.ObjController.extend({
objName: 'sms/send-status',
refreshFlag: null,
isToMainPage: false,
getsuccessProc: function (data) {
var self = this;
var responseData = data['response'];
var sendTotalCount = responseData['TotalCount'];
var currentSendPhone = responseData['Phone'];
var sendSuccessPhones = responseData['SucPhone'];
var sendFailPhones = responseData['FailPhone'];
var statusContent = publicLang['sms.sending'];
utilStartSubmitDialog(statusContent);
if (currentSendPhone === '') {
clearInterval(this.refreshFlag);
var successedArray = sendSuccessPhones.split(',');
var successedTotal = successedArray.length;
var failedArray = sendFailPhones.split(',');
var failedTotal = failedArray.length;
if (successedArray[successedTotal - 1] === '') {
successedArray.pop();
successedTotal > 0 ? successedTotal -= 1 : successedTotal = 0;
}
if (failedArray[failedTotal - 1] === '') {
failedArray.pop();
failedTotal > 0 ? failedTotal -= 1 : failedTotal = 0;
}
var resultInfo = publicLang['sms.suc_fail_info'].replace('%d1', successedTotal).replace('%d2', failedTotal);
var successDialogHtml = '<div>{{resultInfo}}</div>';
if (GLOBAL.modules.pb_enabled === '1') {
} else {
if (successedTotal > 0) {
successDialogHtml += '<div style="margin-top:10px; width:480px;" class="wordbreak">' + publicLang['sms.message_sent_successed'] + publicLang['common_colon'] + '{{sendSuccessPhones}}</div>';
}
if (failedTotal > 0) {
successDialogHtml += '<div style="margin-top:10px;width:480px;" class="wordbreak">' + publicLang['sms.message_sent_failed'] + publicLang['common_colon'] + '{{sendFailPhones}}</div>';
}
}
var templateData = {
resultInfo: resultInfo,
sendSuccessPhones: sendSuccessPhones.split(',').join(';'),
sendFailPhones: sendFailPhones.split(',').join(';')
};
utilStartSubmitDialog('');
$('#utilStartSubmitDialog_contentId').secureAppend(successDialogHtml, templateData);
setTimeout(function () {
utilStopSubmitDialog();
if (self.isToMainPage) {
$('#sms_current_content').val('');
EMUI.smsSendAndSaveController.sendNewBack();
} else {
EMUI.getActiveItemSmsController.getsmsListContent();
EMUI.getActiveItemSmsCountController.getOneContractSmsCount(sendSuccessPhones);
}
}, 1500);
}
}
});
var clickHref = '';
EMUI.smsSendAndSaveController = EMUI.ObjController.extend({
objName: 'sms/send-sms',
isSupportSaveInfo: false,
curIndex: '', 
smsJumpSave: function (callback) {
if (simRedirect(null, 'sms')) {
if (callback) {
callback();
}
return;
} else {
EMUI.smsSendAndSaveController.objName = 'sms/save-sms';
var phoneNumber = '';
var smsContent = '';
var isNewSend = true;
var oldDraft = EMUI.getActiveItemSmsController.draftItem;
if ($('#sms_resend_message_page').attr('style').indexOf('none') < 0) {
phoneNumber = $('#sms_phone_list_length_test').text();
smsContent = $('#sms_resend_current_content').val();
smsContent = resolveXMLEntityReference(smsContent);
isNewSend = false;
} else if ($('#sms_send_new_message_page').attr('style').indexOf('none') < 0) {
phoneNumber = $('#sms_send_user_input').val();
phoneNumber = $.trim(phoneNumber);
smsContent = $('#sms_current_content').val();
smsContent = resolveXMLEntityReference(smsContent);
isNewSend = true;
} else {
if (callback) {
callback();
}
return;
}
if (($('#sms_resend_message_page').attr('style').indexOf('none') < 0 && oldDraft === '') || phoneNumber !== '') {
if (phoneNumber.lastIndexOf(';') === (phoneNumber.length - 1)) {
phoneNumber = phoneNumber.substring(0, phoneNumber.length - 1);
}
var PhoneArray = phoneNumber.replace(/\n/g, ';').split(';');
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && EMUI.smsSendAndSaveController.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
if (callback) {
callback();
}
return;
} else {
if (realArray.length === 0) {
smsContent = '';
}
}
}
if (smsContent === '' || smsContent.length === 0) {
if (!isNewSend && oldDraft !== '') {
var postObj = {
Index: oldDraft.index
};
EMUI.setChatSmsDeleteController.isSupportSaveInfo = false;
EMUI.setChatSmsDeleteController.postData(postObj, function () {
comeInStartTime = new Date().getTime();
if (callback) {
callback();
}
})
} else if (callback) {
callback();
}
return;
}
clickHref = newHref;
window.location.hash = '#sms';
if (smsContent !== '' && phoneNumber === '') {
var noticeInfo = publicLang['sms.abandon.info'];
utilStartConfirmDialog(noticeInfo, function () {
$('#sms_resend_current_content').val('');
$('#sms_current_content').val('');
$('#sms_main_page').hide();
utilStopConfirmDialog();
if (callback) {
callback();
}
window.location.href = clickHref;
}, function () {
utilStopConfirmDialog();
utilStopSubmitDialog();
comeInStartTime = new Date().getTime();
}, publicLang['sms.abandon.btn']);
return;
}
if (smsContent !== '' && phoneNumber !== '') {
if (oldDraft !== '') {
EMUI.setChatSmsDeleteController.isSupportSaveInfo = false;
var postObj = {
Index: oldDraft['index']
};
EMUI.setChatSmsDeleteController.postData(postObj);
}
if (typeof g_sms_num === 'undefined') {
utilStartConfirmDialog(publicLang['sms.abandon.unsend'], function () {
$('#sms_resend_current_content').val('');
$('#sms_current_content').val('');
$('#sms_main_page').hide();
utilStopConfirmDialog();
if (callback) {
callback();
}
window.location.href = clickHref;
}, function () {
comeInStartTime = new Date().getTime();
utilStopConfirmDialog();
utilStopSubmitDialog();
}, publicLang['sms.abandon.btn']);
return;
}
if (phoneNumber.lastIndexOf(';') === (phoneNumber.length - 1)) {
phoneNumber = phoneNumber.substring(0, phoneNumber.length - 1);
}
var PhoneArray = phoneNumber.replace(/\n/g, ';').split(';');
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && EMUI.smsSendAndSaveController.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.hint_maximum_number'].replace('%d', g_sms_maxphonesize));
return;
}
if (realArray.length === 0) {
utilShowToast(publicLang['sms.phoneerror']);
return;
}
var index = -1;
var now = new Date().Format('yyyy-MM-dd HH:mm:ss');
var postObj = {
Index: index,
Phones: {
Phone: realArray
},
Sca: '',
Content: smsContent,
Length: smsContent.length,
Reserved: gTextMode,
Date: now
};
EMUI.smsSendAndSaveController.postData(postObj, function () {
comeInStartTime = new Date().getTime();
var phoneNum = '';
if (realArray.length === 1) {
phoneNum = realArray[0]
} else {
phoneNum = realArray.join(';');
}
var smsListArray = {
phone: xss(phoneNum),
pageindex: 1,
readcount: gSmsReadCount
};
EMUI.getActiveItemSmsController.postData(smsListArray, function (result) {
comeInStartTime = new Date().getTime();
EMUI.setChatSmsDeleteController.isSupportSaveInfo = true;
if (typeof result.response !== 'undefined') {
var smsResult = result['response']['messages'];
var smsChatList = [];
if ($.isArray(smsResult['message'])) {
smsChatList = smsResult['message'];
} else {
smsChatList.push(smsResult['message']);
}
}
});
if (callback) {
callback();
}
window.location.href = clickHref;
});
}
}
},
timeOutJumpSave: function (callback) {
EMUI.LoginStateController.load();
EMUI.smsSendAndSaveController.objName = 'sms/save-sms';
var phoneNumber = '';
var smsContent = '';
if ($('#sms_resend_message_page').attr('style').indexOf('none') < 0) {
phoneNumber = $('#sms_phone_list_length_test').text();
smsContent = $('#sms_resend_current_content').val();
smsContent = resolveXMLEntityReference(smsContent);
} else if ($('#sms_send_new_message_page').attr('style').indexOf('none') < 0) {
phoneNumber = $('#sms_send_user_input').val();
phoneNumber = $.trim(phoneNumber);
smsContent = $('#sms_current_content').val();
smsContent = resolveXMLEntityReference(smsContent);
}
if (smsContent !== '' && phoneNumber !== '') {
if (typeof g_sms_num === 'undefined') {
if (callback) {
callback();
}
return;
}
if (phoneNumber.lastIndexOf(';') === (phoneNumber.length - 1)) {
phoneNumber = phoneNumber.substring(0, phoneNumber.length - 1);
}
var PhoneArray = phoneNumber.replace(/\n/g, ';').split(';');
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && EMUI.smsSendAndSaveController.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
if (callback) {
callback();
}
return;
}
var index = -1;
var oldDraft = EMUI.getActiveItemSmsController.draftItem;
if (oldDraft !== '') {
EMUI.setChatSmsDeleteController.isSupportSaveInfo = false;
var postObj = {
Index: oldDraft['index']
};
EMUI.setChatSmsDeleteController.postData(postObj);
}
var now = new Date().Format('yyyy-MM-dd HH:mm:ss');
var postObj = {
Index: index,
Phones: {
Phone: realArray
},
Sca: '',
Content: smsContent,
Length: smsContent.length,
Reserved: gTextMode,
Date: now
};
EMUI.smsSendAndSaveController.postData(postObj, function () {
comeInStartTime = new Date().getTime();
if (callback) {
callback();
}
});
} else {
if (callback) {
callback();
}
}
},
showSmsUserBorder: function (obj) {
var curElement = $(obj);
if (curElement && curElement.parent()) {
curElement.parent().addClass('sms_add_person_input_selected').removeClass('sms_add_person_input');
}
},
reSendBack: function () {
this.sendNewBack();
},
initPageInfo: function () {
$('#sms_reinput_dynamic_info').text(publicLang['sms.inputmessageinit']);
$('#sms_input_dynamic_info').text(publicLang['sms.inputmessageinit']);
$('#sms_resend_phone_more_notice').hide();
$('#sms_send_new_phone_more_notice').hide();
$('#sms_current_content').val('');
$('#sms_resend_current_content').val('');
$('#sms_error_info').hide();
$('#sms_resend_error_info').hide();
$('#sms_error_null_info').hide();
$('#sms_resend_null_error_info').hide();
$('#sms_send_user_input').val('');
$('#sms_resend_user_input').val('');
$('#sms_send_new_phone_number').empty();
$('#send_back_phone_number').empty();
},
sendNewBack: function () {
var self = this;
EMUI.smsSendAndSaveController.smsJumpSave(function () {
$('#sms_send_new_message_page').hide();
$('#sms_resend_message_page').hide();
self.initPageInfo();
$('#sms_main_page').show();
EMUI.getActiveItemSmsController.currentNumber = '';
EMUI.getCurrentSmsListController.discheckAll();
EMUI.getActiveItemSmsController.currentPage = 1;
EMUI.getActiveItemSmsCountController.load();
});
},
hideSmsUserBorder: function (obj) {
var curElement = $(obj);
if (curElement && curElement.parent()) {
curElement.parent().addClass('sms_add_person_input').removeClass('sms_add_person_input_selected');
}
},
showResendPage: function () {
$('#sms_main_page').hide();
$('#sms_send_new_message_page').hide();
$('#sms_resend_current_content').val('');
$('#sms_resend_message_page').show();
},
showNewSendPage: function () {
$('#sms_main_page').hide();
$('#sms_send_user_input').val('');
$('#sms_resend_message_page').hide();
$('#sms_current_content').val('');
$('#sms_new_send_list').hide();
$('#sms_send_new_phone_more_notice').hide();
$('#sms_send_new_message_page').show();
$('#sms_input_contract_shadow').val('');
$('#sms_new_user_input_area').show();
EMUI.getActiveItemSmsController.draftItem = '';
$('#sms_total_count').empty();
if (GLOBAL.modules.pb_enabled === '1') {
$('#sms_choose_contract_form_pb').show();
} else {
$('#sms_choose_contract_form_pb').hide();
}
setTimeout(function () {
$('#sms_send_user_input').focus();
if (/(msie\s|trident.*rv:)([\w.]+)/i.test(navigator.userAgent)) {
$('#sms_send_user_input').blur();
}
}, 100);
},
smsNumberCheck: function (isNew, str) {
var N_or_Y_isCDMA_sms_hint_max_ucs2_characters_268 = '';
var N_or_Y_isCDMA_sms_hint_max_8bit_characters_532 = '';
var N_or_Y_isCDMA_sms_hint_max_ascii_characters_612 = '';
var sms_left_length;
var sms_num;
var temp_length;
var temp_enter_number;
var normal_max_len = 160;
var long_max_len = 153;
var err_info = null;
var langId = 'sms_hint_max_ucs2_characters_268';
if (SMS_IS_CDMA) { 
g_SMS_UCS2_MAX_SIZE = g_sms_Level * 65; 
g_SMS_8BIT_MAX_SIZE = g_sms_Level * 135; 
g_SMS_7BIT_MAX_SIZE = g_sms_Level * 155; 
N_or_Y_isCDMA_sms_hint_max_ucs2_characters_268 = publicLang['sms_hint_max_ucs2_characters_268'].replace(/268/, g_SMS_UCS2_MAX_SIZE);
N_or_Y_isCDMA_sms_hint_max_8bit_characters_532 = publicLang['sms_hint_max_8bit_characters_532'].replace(/532/, g_SMS_8BIT_MAX_SIZE);
N_or_Y_isCDMA_sms_hint_max_ascii_characters_612 = publicLang['sms_hint_max_ascii_characters_612'].replace(/612/, g_SMS_7BIT_MAX_SIZE);
} else {
g_SMS_UCS2_MAX_SIZE = g_sms_Level * 67;
g_SMS_8BIT_MAX_SIZE = g_sms_Level * 133;
g_SMS_7BIT_MAX_SIZE = g_sms_Level * 153;
N_or_Y_isCDMA_sms_hint_max_ucs2_characters_268 = publicLang['sms_hint_max_ucs2_characters_268'].replace(/268/, g_SMS_UCS2_MAX_SIZE);
N_or_Y_isCDMA_sms_hint_max_8bit_characters_532 = publicLang['sms_hint_max_8bit_characters_532'].replace(/532/, g_SMS_8BIT_MAX_SIZE);
N_or_Y_isCDMA_sms_hint_max_ascii_characters_612 = publicLang['sms_hint_max_ascii_characters_612'].replace(/612/, g_SMS_7BIT_MAX_SIZE);
}
temp_length = str.length;
if (SMS_TEXT_MODE_UCS2 == gTextMode) {
if (SMS_IS_CDMA) {
normal_max_len = 70;
long_max_len = 65;
} else {
normal_max_len = 70;
long_max_len = 67;
}
if (temp_length > g_SMS_UCS2_MAX_SIZE) {
err_info = N_or_Y_isCDMA_sms_hint_max_ucs2_characters_268;
langId = 'sms_hint_max_ucs2_characters_268';
}
} else if (SMS_TEXT_MODE_8BIT == gTextMode) {
if (SMS_IS_CDMA) {
normal_max_len = 140;
long_max_len = 135;
} else {
normal_max_len = 140;
long_max_len = 133;
}
if (temp_length > g_SMS_8BIT_MAX_SIZE) {
err_info = N_or_Y_isCDMA_sms_hint_max_8bit_characters_532;
langId = 'sms_hint_max_8bit_characters_532';
}
} else if (SMS_TEXT_MODE_7BIT == gTextMode && !SMS_IS_CDMA) {
if (g_lang_edit === '-1') {
temp_length = check_extension_ascii_for_char_number(str);
} else {
temp_length = check_extension_ascii_for_char_number_new(str);
}
if (g_lang_edit !== '-1' && !g_sms_smscharlang) {
normal_max_len = 160;
long_max_len = 153;
if (temp_length > g_SMS_7BIT_MAX_SIZE) {
err_info = N_or_Y_isCDMA_sms_hint_max_ascii_characters_612;
langId = 'sms_hint_max_ascii_characters_612';
}
} else if (g_lang_edit === '-1' && (g_smsFeature.smscharlang === '0' || typeof g_smsFeature.smscharlang !== 'undefined')) {
normal_max_len = 160;
long_max_len = 153;
if (temp_length > g_SMS_7BIT_MAX_SIZE) {
err_info = N_or_Y_isCDMA_sms_hint_max_ascii_characters_612;
langId = 'sms_hint_max_ascii_characters_612';
}
} else {
normal_max_len = 155;
long_max_len = 149;
if (temp_length > long_max_len * g_sms_Level) {
err_info = publicLang['sms_hint_max_ascii_characters_596'];
langId = 'sms_hint_max_ascii_characters_596';
}
}
} else if (SMS_TEXT_MODE_7BIT === gTextMode && SMS_IS_CDMA) {
normal_max_len = 160;
long_max_len = 155;
if (temp_length > long_max_len * g_sms_Level) {
err_info = N_or_Y_isCDMA_sms_hint_max_ascii_characters_612;
}
}
var noticeObj = '';
if (isNew) {
noticeObj = $('#sms_input_dynamic_info');
if (err_info !== null) {
$('#sms_error_info').show();
$('#sms_error_info').attr('lang-id', langId);
$('#sms_error_info').text(err_info);
g_sms_length = temp_length;
} else {
$('#sms_error_info').hide();
}
} else {
noticeObj = $('#sms_reinput_dynamic_info');
if (err_info !== null) {
$('#sms_resend_error_info').show();
$('#sms_resend_error_info').attr('lang-id', langId);
$('#sms_resend_error_info').text(err_info);
g_sms_length = temp_length;
} else {
$('#sms_resend_error_info').hide();
}
}
if (temp_length <= normal_max_len) {
noticeObj.text(publicLang['sms.inputmessage'].replace('{{arg1}}', normal_max_len - temp_length).replace('{{arg2}}', 1));
sms_num = 1;
if (temp_length <= 0) {
smsCurrentContent = str.substring(0);
}
} else if ((temp_length > normal_max_len ) && (temp_length <= long_max_len * g_sms_Level)) {
sms_num = parseInt(temp_length / long_max_len, 10) + 1;
if ((temp_length % long_max_len) === 0) {
sms_num -= 1;
}
noticeObj.text(publicLang['sms.inputmessage'].replace('{{arg1}}', long_max_len * sms_num - temp_length).replace('{{arg2}}', sms_num));
} else {
var tmp = parseInt((temp_length - long_max_len * g_sms_Level) / long_max_len, 10);
var tmp2 = Math.floor(tmp);
var tmp3 = (long_max_len * g_sms_Level + (tmp2 + 1) * long_max_len) - temp_length;
noticeObj.text(publicLang['sms.inputmessage'].replace('{{arg1}}', tmp3).replace('{{arg2}}', tmp2 + g_sms_Level + 1));
}
g_sms_num = sms_num;
g_sms_length = temp_length;
},
smsContentChange: function (isNew, str) {
if (SMS_IS_CDMA) { 
gTextMode = CDMATextModeCheck(str);
} else {  
if (/msie/.test(navigator.userAgent.toLowerCase())) {
if (GLOBAL.basicInfo.netModeType === MACRO_NET_DUAL_MODE && GLOBAL.basicInfo.netModeChange === MACRO_NET_MODE_CHANGE) {
g_ucs2_num = ucs2NumberCheck(str);
} else {
smsContentDiffUCS2Num(str);
}
} else {
g_ucs2_num = ucs2NumberCheck(str);
}
if (g_ucs2_num > 0) {
gTextMode = SMS_TEXT_MODE_UCS2;
} else {
gTextMode = SMS_TEXT_MODE_7BIT;
}
}
this.smsNumberCheck(isNew, str);
smsCurrentContent = str;
},
isPhoneNumber: function (str) {
var rgExp = /^[+]{0,1}[*#0123456789]{1,20}$/;
if (!(str.match(rgExp))) {
return false;
}
return true;
},
submitSmsData: function () {
var smsPhone = $('#sms_send_user_input').val();
var strPhoneNumber = $.trim(smsPhone);
var messageContent = $('#sms_current_content').val();
if (strPhoneNumber.length > 0) {
if (strPhoneNumber.lastIndexOf(';') === (strPhoneNumber.length - 1)) {
strPhoneNumber = strPhoneNumber.substring(0, strPhoneNumber.length - 1);
}
}
if (messageContent === '') {
g_sms_num = 1;
}
messageContent = resolveXMLEntityReference(messageContent);
var PhoneArray = strPhoneNumber.replace(/\n/g, ';').split(';');
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && this.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
var index = -1;
var now = new Date().Format('yyyy-MM-dd HH:mm:ss');
var postObj = {
Index: index,
Phones: {
Phone: realArray
},
Sca: '',
Content: messageContent,
Length: messageContent.length,
Reserved: gTextMode,
Date: now
};
return postObj;
},
reSendAgain: function (index) {
var content = $('#real_content_sms_list_resend_phone_' + index + '_middle').text();
EMUI.smsSendAndSaveController.smsContentChange(false, content);
this.reSendPagesendMessage(index, content);
},
reSendPagesendMessage: function (index, content) {
this.objName = 'sms/send-sms';
var now = new Date().Format('yyyy-MM-dd HH:mm:ss');
$('#sms_resend_error_info').hide();
$('#sms_resend_null_error_info').hide();
if (typeof g_sms_num === 'undefined') {
utilShowToast(publicLang['sms.maxlengtherr']);
$('#sms_resend_error_info').show();
return;
}
var messageContent = '';
var sendIndex = -1;
if (typeof index !== 'undefined' && index !== '') {
sendIndex = index;
}
if (typeof content !== 'undefined') {
messageContent = content;
} else {
messageContent = $('#sms_resend_current_content').val();
}
if (g_sms_notemptyenabled && $.trim($('#sms_resend_current_content').val()) === '') {
utilShowToast(publicLang['sms.nullerr']);
$('#sms_resend_null_error_info').show();
return;
}
if (messageContent === '') {
g_sms_num = 1;
}
messageContent = resolveXMLEntityReference(messageContent);
if (EMUI.getActiveItemSmsController.draftItem !== '') {
sendIndex = EMUI.getActiveItemSmsController.draftItem['index'];
}
var phoneList = $('#sms_phone_list_length_test').text();
if (phoneList.length === '') {
utilShowToast(publicLang['sms.message.phone.null']);
return;
}
if (phoneList.length > 0) {
if (phoneList.lastIndexOf(';') === (phoneList.length - 1)) {
phoneList = phoneList.substring(0, phoneList.length - 1);
}
}
var PhoneArray = phoneList.replace(/\n/g, '').split(';');
if (PhoneArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.hint_maximum_number'].replace('%d', g_sms_maxphonesize));
return;
}
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && this.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
if (realArray.length === 0) {
utilShowToast(publicLang['sms.phoneerror']);
return;
}
var postObj = {
Index: sendIndex,
Phones: {
Phone: realArray
},
Sca: '',
Content: messageContent,
Length: messageContent.length,
Reserved: gTextMode,
Date: now
};
EMUI.getActiveItemSmsController.currentNumber = postObj.Phones.Phone.join(';');
this.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
var statusContent = publicLang['sms.sending'];
utilStartSubmitDialog(statusContent);
EMUI.getSendStatusController.isToMainPage = false;
var dynamicInfo = publicLang['sms.inputmessageinit'];
$('#sms_reinput_dynamic_info').text(dynamicInfo);
$('#sms_resend_current_content').val('');
EMUI.getSendStatusController.refreshFlag = setInterval(function () {
EMUI.getSendStatusController.load();
}, 6000);
});
},
sendMessage: function () {
this.objName = 'sms/send-sms';
$('#sms_error_info').hide();
$('#sms_error_null_info').hide();
var smsphoneInput = $('#sms_send_user_input').val();
var strPhoneNumber = $.trim(smsphoneInput);
if (strPhoneNumber === '') {
utilShowToast(publicLang['sms.message.phone.null']);
return;
}
if (strPhoneNumber.length > 0) {
if (strPhoneNumber.lastIndexOf(';') === (strPhoneNumber.length - 1)) {
strPhoneNumber = strPhoneNumber.substring(0, strPhoneNumber.length - 1);
}
}
var PhoneArray = strPhoneNumber.replace(/\n/g, '').split(';');
if (PhoneArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.hint_maximum_number'].replace('%d', g_sms_maxphonesize));
return;
}
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (PhoneArray[i] !== '' && this.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
}
}
if (realArray.length === 0) {
utilShowToast(publicLang['sms.phoneerror']);
return;
}
if (g_sms_notemptyenabled && $.trim($('#sms_current_content').val()) === '') {
utilShowToast(publicLang['sms.nullerr']);
$('#sms_error_null_info').show();
return;
}
if (typeof g_sms_num === 'undefined') {
utilShowToast(publicLang['sms.maxlengtherr']);
$('#sms_error_info').show();
return;
}
utilStartSubmitDialog(publicLang['sms.sending']);
var postObj = this.submitSmsData();
this.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
var statusContent = publicLang['sms.sending'];
utilStartSubmitDialog(statusContent);
EMUI.getSendStatusController.isToMainPage = true;
var dynamicInfo = publicLang['sms.inputmessageinit'];
$('#sms_input_dynamic_info').text(dynamicInfo);
$('#sms_current_content').val('');
$('#sms_resend_error_info').hide();
$('#sms_error_info').hide();
$('#sms_error_null_info').hide();
$('#sms_resend_null_error_info').hide();
EMUI.getSendStatusController.refreshFlag = setInterval(function () {
EMUI.getSendStatusController.load(function () {
EMUI.setChatSmsDeleteController.isSupportSaveInfo = true;
var realArray = postObj.Phones.Phone;
var phoneNum = '';
if (realArray.length === 1) {
phoneNum = realArray[0]
} else {
phoneNum = realArray.join(';');
}
var smsListArray = {
phone: xss(phoneNum),
pageindex: 1,
readcount: gSmsReadCount
};
EMUI.getActiveItemSmsController.postData(smsListArray, function (result) {
comeInStartTime = new Date().getTime();
EMUI.setChatSmsDeleteController.isSupportSaveInfo = true;
if (typeof result.response !== 'undefined') {
var smsResult = result['response']['messages'];
var smsChatList = [];
if ($.isArray(smsResult['message'])) {
smsChatList = smsResult['message'];
} else {
smsChatList.push(smsResult['message']);
}
}
});
})
}, 6000);
});
},
showNewSendListItems: function () {
var phoneNum = $('#sms_send_user_input').val();
phoneNum = $.trim(phoneNum);
if (phoneNum.length <= 0) {
return;
}
if (phoneNum.length > 0) {
if (phoneNum.length > 1 && phoneNum.indexOf(';') === 0) {
phoneNum = phoneNum.substring(1);
}
if (phoneNum.lastIndexOf(';') === (phoneNum.length - 1)) {
phoneNum = phoneNum.substring(0, phoneNum.length - 1);
}
}
phoneNum = phoneNum.replace(/\n/g, ';');
var phoneArray = phoneNum.split(';');
var realArray = [];
for (var i = 0; i < phoneArray.length; i++) {
if (phoneArray[i] !== '' && this.isPhoneNumber(phoneArray[i])) {
realArray.push(phoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.maxphone_number'].replace('%d', g_sms_maxphonesize));
return;
}
var itemsHtml = [];
for (var i = 0; i < phoneArray.length; i++) {
if (phoneArray[i] === '' || !this.isPhoneNumber(phoneArray[i])) {
utilShowToast(publicLang['sms.phoneerror']);
return;
}
itemsHtml.push(phoneArray[i]);
}
if (GLOBAL.modules.pb_enabled === '1') {
EMUI.pbMatchController.getPbMatch(itemsHtml, EMUI.smsSendAndSaveController.showNewSendListItemsInfo);
} else {
EMUI.smsSendAndSaveController.showNewSendListItemsInfo(itemsHtml);
}
},
showNewSendListItemsInfo: function(itemsHtml) {
$('#sms_new_send_list').show();
$('#sms_new_user_input_area').hide();
var phoneWidth = $('#sms_send_user_input_length_test').width();
var realWidth = phoneWidth;
if (realWidth > 524) {
$('#sms_send_new_phone_more_notice').show();
$('#sms_send_new_phone_more_notice').text(publicLang['sms.phonemore.notice'].replace('%d', itemsHtml.length));
EMUI.LanguageController.registerLanguage('sms_send_new_phone_more_notice', 'sms.phonemore.notice', itemsHtml.length);
$('#sms_send_new_phone_number').text(itemsHtml.join(';').substring(0, 61) + '...');
} else {
$('#sms_send_new_phone_more_notice').hide();
$('#sms_send_new_phone_number').text(itemsHtml.join(';'));
}
},
showNewSendInput: function () {
$('#sms_new_user_input_area').show();
$('#sms_send_user_input').focus();
$('#sms_new_send_list').hide();
},
setResendInputHeight: function () {
var smscontractList = $('#sms_resend_user_input').val();
$('#sms_resend_input_contract_shadow').val(smscontractList);
var realHeight = document.getElementById('sms_resend_input_contract_shadow').scrollHeight;
if (realHeight >= 48) {
$('#sms_resend_user_input').css('height', '52px');
} else {
$('#sms_resend_user_input').css('height', realHeight + 'px');
}
if (realHeight >= 48) {
$('#sms_resend_user_input_middle_left').css('height', '30px');
$('#sms_resend_user_input_middle_right').css('height', '30px');
$('#sms_resend_user_input_block').css('height', '62px');
} else if (realHeight >= 32) {
$('#sms_resend_user_input_middle_left').css('height', '10px');
$('#sms_resend_user_input_middle_right').css('height', '10px');
$('#sms_resend_user_input_block').css('height', '42px');
} else {
$('#sms_resend_user_input_middle_left').css('height', '0px');
$('#sms_resend_user_input_middle_right').css('height', '0px');
$('#sms_resend_user_input_block').css('height', '32px');
}
},
showResendSendInput: function () {
this.setResendInputHeight();
$('#sms_resend_user_input_area').show();
$('#sms_resend_list').hide();
$('#sms_resend_user_input').focus();
if (EMUI.getActiveItemSmsController.draftItem === '') {
$('#sms_resend_user_input').attr('readonly', 'readonly');
} else {
$('#sms_resend_user_input').removeAttr('readonly');
}
},
showResendListItems: function () {
var phoneList = $('#sms_resend_user_input').val();
phoneList = $.trim(phoneList);
phoneNum = phoneList.replace(/\n/g, ';');
if (phoneNum.length > 1 && phoneNum.indexOf(';') === 0) {
phoneNum = phoneNum.substring(1);
}
if (phoneNum.lastIndexOf(';') === (phoneNum.length - 1)) {
phoneNum = phoneNum.substring(0, phoneNum.length - 1);
}
var phoneArray = phoneNum.split(';');
var realArray = [];
for (var i = 0; i < phoneArray.length; i++) {
if (phoneArray[i] !== '' && this.isPhoneNumber(phoneArray[i])) {
realArray.push(phoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.maxphone_number'].replace('%d', g_sms_maxphonesize));
return;
}
for (var i = 0; i < phoneArray.length; i++) {
if (phoneList.length > 0 && (phoneArray[i] === '' || !this.isPhoneNumber(phoneArray[i])) ) {
utilShowToast(publicLang['sms.phoneerror']);
return;
}
}
EMUI.getCurrentSmsListController.adjustResendContractStyle($('#sms_resend_user_input').val());
$('#sms_resend_user_input_area').hide();
$('#sms_resend_list').show();
}
});
var g_contact_enabled = null;
EMUI.smsFeaterSwitchController = EMUI.ObjController.extend({
objName: 'sms/sms-feature-switch',
getsuccessProc: function (data) {
var ret = data['response'];
g_contact_enabled = ret['getcontactenable'];
}
});
EMUI.deleteContractController = EMUI.ObjController.extend({
objName: 'sms/sms-delete-phone',
deleteContract: function () {
var deleteSmsContractArray = [];
var self = this;
var intemLen = $('[id^=sms_list_contract_item_sms_]').length;
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=sms_list_contract_item_sms_]')[i];
var classVal = $(item).attr('class');
if (classVal) {
if (classVal.indexOf('check_on') >= 0) {
var phoneNum = $(item).attr('name');
if (phoneNum !== '') {
deleteSmsContractArray.push(xss(phoneNum));
}
}
}
}
if (deleteSmsContractArray.length > 0) {
var postObj = {
Phones: {
Phone: deleteSmsContractArray
}
};
utilStartConfirmDialog(publicLang['sms.deleteinfo'], function () {
utilStopConfirmDialog();
utilStartSubmitDialog(publicLang['sms.deleteing']);
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
$('#sms_list_contract_input_select_all_label').removeClass('check_on').addClass('check_off');
EMUI.getActiveItemSmsCountController.load(function () {
utilStopSubmitDialog();
});
});
}, function () {
utilStopConfirmDialog();
});
} else {
utilShowToast(publicLang['sms.deletecontract.error1']);
}
}
});
EMUI.getCurrentSmsListController = EMUI.ObjController.extend({
objName: 'sms/sms-list-contact',
isSupportSaveInfo: false,
showScroll: function () {
$('#sms_message_list').mCustomScrollbar({
theme: 'minimal-dark',
scrollButtons: {
enable: true
},
mouseWheel: {
enable: true,
scrollAmount: 50
},
autoHideScrollbar: false,
scrollInertia: 0,
horizontalScroll: false,
callbacks: {
onScroll: function () {
}
}
});
},
checkSelectAll: function (obj) {
var isAllUnchecked = false;
var isAllChecked = false;
var intemLen = $('[id^=sms_list_contract_item_sms_]').length;
var sleceAllObj = $('#sms_list_contract_input_select_all_label');
var selfObjClass = $(obj).attr('class');
if (selfObjClass.indexOf('check_on') >= 0) {
$(obj).removeClass('check_on').addClass('check_off');
} else {
$(obj).removeClass('check_off').addClass('check_on');
}
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=sms_list_contract_item_sms_]')[i];
var classVal = $(item).attr('class');
if (classVal) {
if (classVal.indexOf('check_on') >= 0) {
isAllChecked = true;
}
if (classVal.indexOf('check_off') >= 0) {
isAllUnchecked = true;
}
}
}
if ((isAllChecked & isAllUnchecked) || (!isAllChecked && isAllUnchecked)) { 
if (sleceAllObj.hasClass('check_on')) {
sleceAllObj.removeClass('check_on').addClass('check_off');
}
} else if (!isAllUnchecked && isAllChecked) { 
if (!sleceAllObj.hasClass('check_on')) {
sleceAllObj.removeClass('check_off').addClass('check_on');
}
}
},
selectAll: function () {
var selectAllObj = $('#sms_list_contract_input_select_all_label');
if (selectAllObj.hasClass('check_on')) {
selectAllObj.removeClass('check_on').addClass('check_off');
$('[id^=sms_list_contract_item_sms_]').removeClass('check_on').addClass('check_off');
} else {
selectAllObj.removeClass('check_off').addClass('check_on');
$('[id^=sms_list_contract_item_sms_]').addClass('check_on').removeClass('check_off');
}
},
adjustResendContractStyle: function (phoneNum) {
phoneNum = $.trim(phoneNum);
if (phoneNum.length > 0) {
if (phoneNum.length > 1 && phoneNum.indexOf(';') === 0) {
phoneNum = phoneNum.substring(1);
}
if (phoneNum.lastIndexOf(';') === (phoneNum.length - 1)) {
phoneNum = phoneNum.substring(0, phoneNum.length - 1);
}
}
var phoneArray = phoneNum.split(';');
var phoneLen = phoneArray.length;
if (phoneLen < 1) {
$('#send_back_phone_number').empty();
return;
}
$('#sms_resend_user_input').val(phoneNum);
$('#sms_phone_list_length_test').text(phoneNum);
if (GLOBAL.modules.pb_enabled === '1') {
EMUI.pbMatchController.getPbMatch(phoneArray, EMUI.getCurrentSmsListController.adjustResendContractStyleInfo);
}else{
EMUI.getCurrentSmsListController.adjustResendContractStyleInfo(phoneArray);
}
},
adjustResendContractStyleInfo: function(itemsHtml) {
var realWidth = $('#sms_phone_list_length_test').width();
var noticeWidth = $('#sms_resend_phone_more_notice').width();
if (realWidth > 470) {
$('#sms_resend_phone_more_notice').show();
$('#send_back_phone_number').text(itemsHtml.join(';').substring(0, 56) + '...');
$('#sms_resend_phone_more_notice').text(publicLang['sms.phonemore.notice'].replace('%d', itemsHtml.length));
EMUI.LanguageController.registerLanguage('sms_resend_phone_more_notice', 'sms.phonemore.notice', itemsHtml.length);
} else {
$('#sms_resend_phone_more_notice').hide();
$('#send_back_phone_number').text(itemsHtml.join(';'));
}
$('#sms_resend_user_input_area').hide();
$('#sms_resend_list').show();
},
showOneContractInfo: function (obj) {
var phoneNum = $(obj).attr('name');
EMUI.smsSendAndSaveController.curIndex = $(obj).attr('id');
$('#sms_resend_current_content').val('');
$('#sms_resend_phone_more_notice').hide();
EMUI.getActiveItemSmsController.currentNumber = phoneNum;
$('#sms_phone_list_length_test').text(phoneNum);
$('#sms_resend_user_input').val(phoneNum);
EMUI.getActiveItemSmsCountController.getOneContractSmsCount(phoneNum, function () {
EMUI.getActiveItemSmsController.smsChatList = [];
EMUI.getActiveItemSmsController.getsmsListContent();
setTimeout(function () {
$('#current_phone_sms_list_items').mCustomScrollbar('scrollTo', 'bottom', {
scrollInertia: 500
});
}, 500);
});
},
discheckAll: function () {
$('[id^=sms_list_contract_item_sms_]').removeClass('check_on').addClass('check_off');
$('#sms_list_contract_input_select_all_label').removeClass('check_on').addClass('check_off');
},
hideAllOp: function () {
$('#sms_page_first_arrow').hide();
$('#sms_page_before_arrow').hide();
$('#sms_page_before_more').hide();
$('[id^=sms_page_index_]').hide();
$('#sms_current_page_total_page').hide();
$('#sms_hand_jump_page').hide();
$('#sms_page_after_more').hide();
$('#sms_page_after_arrow').hide();
$('#sms_page_last_arrow').hide();
},
initSmsPageStatus: function () {
gSmsPageIndex = 1;
this.showPageInCurrent();
},
showPageInCurrent: function () {
this.discheckAll();
var totalPage = EMUI.getActiveItemSmsCountController.pageCount;
this.hideAllOp();
if (totalPage > 1) {
$('#sms_hand_jump_page').show();
$('#sms_current_page_total_page').text(gSmsPageIndex + '/' + totalPage);
$('#sms_current_page_total_page').show();
$('#sms_go_page_index').val(gSmsPageIndex);
if (gSmsPageIndex !== 1) {
$('#sms_page_before_arrow').show();
$('#sms_page_first_arrow').show();
} else {
$('#sms_page_before_arrow').hide();
$('#sms_page_first_arrow').hide();
}
if (gSmsPageIndex !== totalPage) {
$('#sms_page_after_arrow').show();
$('#sms_page_last_arrow').show();
} else {
$('#sms_page_after_arrow').hide();
$('#sms_page_last_arrow').hide();
}
if (totalPage > 5) {
if (gSmsPageIndex > 3 && gSmsPageIndex < totalPage - 2) {
$('#sms_page_index_' + (gSmsPageIndex + 2)).show();
$('#sms_page_index_' + (gSmsPageIndex + 1)).show();
$('#sms_page_index_' + (gSmsPageIndex)).show();
$('#sms_page_index_' + (gSmsPageIndex - 1)).show();
$('#sms_page_index_' + (gSmsPageIndex - 2)).show();
$('#sms_page_after_more').show();
$('#sms_page_before_more').show();
} else if (gSmsPageIndex >= totalPage - 2) {
$('#sms_page_index_' + totalPage).show();
$('#sms_page_index_' + (totalPage - 1)).show();
$('#sms_page_index_' + (totalPage - 2)).show();
$('#sms_page_index_' + (totalPage - 3)).show();
$('#sms_page_index_' + (totalPage - 4)).show();
$('#sms_page_after_more').hide();
$('#sms_page_before_more').show();
} else if (gSmsPageIndex <= 3) {
$('#sms_page_index_1').show();
$('#sms_page_index_2').show();
$('#sms_page_index_3').show();
$('#sms_page_index_4').show();
$('#sms_page_index_5').show();
$('#sms_page_before_more').hide();
$('#sms_page_after_more').show();
}
} else {
for (var i = 1; i <= totalPage; i++) {
$('#sms_page_index_' + i).show();
}
}
for (var j = 1; j <= totalPage; j++) {
$('#sms_page_index_' + j).removeClass('selectmenu');
}
$('#sms_page_index_' + gSmsPageIndex).addClass('selectmenu');
}
},
smsGoPageFirst: function () {
if (gSmsPageIndex === 1) {
return;
}
gSmsPageIndex = 1;
this.showPageInCurrent();
this.getSmsList();
},
smsGoPageLast: function () {
if (gSmsPageIndex > EMUI.getActiveItemSmsCountController.pageCount) {
return;
}
gSmsPageIndex = EMUI.getActiveItemSmsCountController.pageCount;
this.showPageInCurrent();
this.getSmsList();
},
smsGoPageBefore: function () {
if (gSmsPageIndex < 1) {
return;
}
gSmsPageIndex = gSmsPageIndex - 1;
if (gSmsPageIndex === 0) {
gSmsPageIndex = 1;
}
this.showPageInCurrent();
this.getSmsList();
},
smsGoPageAfter: function () {
if (gSmsPageIndex === EMUI.getActiveItemSmsCountController.pageCount) {
return;
}
gSmsPageIndex = gSmsPageIndex + 1;
this.showPageInCurrent();
this.getSmsList();
},
smsGotoClickPage: function (obj) {
var pageIndex = $(obj).attr('name');
if (typeof pageIndex !== 'undefined') {
gSmsPageIndex = parseInt(pageIndex, 10);
this.showPageInCurrent();
this.getSmsList();
}
},
smsGoIndexPage: function () {
var indexPage = $('#sms_go_page_index').val();
if (!isPlusInteger(indexPage)) {
utilShowToast(publicLang['sms.pagenumber.error']);
return;
}
var pageNumber = parseInt(indexPage, 10);
if (pageNumber < 1 || pageNumber > EMUI.getActiveItemSmsCountController.pageCount) {
utilShowToast(publicLang['sms.pagenumber.error']);
return;
}
gSmsPageIndex = pageNumber;
this.showPageInCurrent();
this.getSmsList();
},
setDisplaydot: function () {
var intemLen = $('[id^=sms_list_contract_item_number_]').length;
for (var i = 0; i < intemLen; i++) {
var item = $('[id^=sms_list_contract_item_number_]')[i];
var sourNumberId = $(item).attr('id');
var sourNumHeight = $(item).height();
if (sourNumHeight > 16) {
$('#' + sourNumberId).addClass('sms_item_moreoneline_style');
} else {
$('#' + sourNumberId).addClass('sms_item_oneline_style');
}
var item2 = $('[id^=sms_list_contract_item_content_]')[i];
var testcontentHeight = $(item2).height();
if (testcontentHeight >= 48) {
$(item2).addClass('sms_item_moretwoline_style');
} else if (testcontentHeight >= 32) {
$(item2).addClass('sms_item_twoline_style');
} else {
$(item2).addClass('sms_item_oneline_style');
}
}
},
showMessage: function (initData) {
var data = initData.sort(function (a, b) {
var aDates = a.date.split(' ');
var aDay = aDates[0];
var aDate = aDates[1];
var bDates = b.date.split(' ');
var bDay = bDates[0];
var bDate = bDates[1];
if (aDay > bDay) {
return -1;
} else if (aDay < bDay) {
return 1;
} else {
if (aDate > bDate) {
return -1;
} else {
return 1;
}
}
});
var dataLen = data.length;
var fixHtml = '';
$($('#sms_message_list > div > div')[0]).empty();
$('#fix_sms_html_area').empty();
for (var i = 0; i < dataLen; i++) {
var bottomLine = 'border_bottom';
if (dataLen >= 9 && i === dataLen - 1) {
bottomLine = '';
}
var dataItem = data[i];
var newMsgTag = '&nbsp;';
var sendStatus = dataItem['smstat'];
var failedMsgTag = '';
var failedHtml = '';
if (sendStatus === '0') {
newMsgTag = '<div class="ic_sms_new_msg_flag">&nbsp;</div>';
} else if (sendStatus === '2') {
failedMsgTag = '<div class="ic_warning_small">&nbsp;</div>';
failedHtml = '<span lang-id="sms.draft">' + publicLang['sms.draft'] + '</span>';
} else if (sendStatus === '4') { 
failedMsgTag = '<div class="ic_warning_small">&nbsp;</div>';
failedHtml = '<span lang-id="sms.sendfailed">' + publicLang['sms.sendfailed'] + '</span>';
}
var newDate = new Date().Format('yyyy-MM-dd');
var smsDateSplit = dataItem['date'].split(' ');
var smsTime = smsDateSplit[0];
if (newDate === smsDateSplit[0]) {
smsTime = smsDateSplit[1];
}
var smsType = dataItem['smstype'];
var smsContent = xss(dataItem['content']);
if (smsType === '7') { 
smsContent = '<span lang-id="sms.sms_usesreport">' + publicLang['sms.sms_usesreport'] + '</span><span lang-id="common_colon">' + publicLang['common_colon'] + '</span> '
+ '<span lang-id="sms.report.success">' + publicLang['sms.report.success'] + '</span>';
} else if (smsType === '8') { 
smsContent = '<span lang-id="sms.sms_usesreport">' + publicLang['sms.sms_usesreport'] + '</span><span lang-id="common_colon">' + publicLang['common_colon'] + '</span> '
+ '<span lang-id="sms.report.failed">' + publicLang['sms.report.failed'] + '</span>';
} else if (smsType === '4' || smsType === '5' || smsType === '6') { 
smsContent = '<span lang-id="sms.multisms">' + publicLang['sms.multisms'] + '</span>';
}
var faileAddContent = failedHtml + smsContent;
var smscheck = '<div id="sms_list_contract_item_sms_{{dataItemIndex}}" class="check_off"  name="{{dataItemPhone}}" onclick="EMUI.getCurrentSmsListController.checkSelectAll(this);"></div>';
var contractsId = 'sms_list_contract_item_number_' + dataItem['index'];
var contractsContentId = 'sms_list_contract_item_content_' + dataItem['index'];
var templateHtml = ''
+ '<div class="{{bottomLine}} pull-left pointer" style="height:50px;" id="{{dataItemIndex}}" name="{{dataItemPhone}}" onclick="EMUI.getCurrentSmsListController.showOneContractInfo(this)" >'
+ '<div class="pull-left" style="width:20px;"><div class="sms_item_oneline_style" style="padding-top:15px;" id="newMsgTag_{{dataItemIndex}}"></div></div>'
+ '<div class="pull-left" style="width:120px;"><div id="{{contractsId}}" class="wordbreak" style="width:120px;font-size:12px;">{{dataItemContactName}}</div></div>'
+ '<div class="pull-left" style="width:400px;"><div class="margin-left-10" >'
+ '<table cellpadding="0" cellspacing="0" frame=void rules=none style="width:390px;height:50px;"><tr><td id="failedMsgTag_{{dataItemIndex}}"></td><td style="width:385px;height:50px;">'
+ '<div class="wordbreak faileHtml_smsContent_{{dataItemIndex}}" id="{{contractsContentId}}"></div></td></tr></table></div></div>'
+ '<div class="pull-left" style="width:90px;"><div class="sms_item_oneline_style padding-left-10" style="font-size:12px;">{{smsTime}}</div></div></div>'
+ '<div class="pull-left {{bottomLine}}" style="width:47px;height:50px;"><div style="margin-top:16px;" class="margin-left-10 pull-left" id="smscheck_{{dataItemIndex}}"></div></div><div class="clearboth"></div>';
fixHtml = '<span id="test_{{contractsId}}">{{dataItemContactName}}'+'&nbsp;&rlm;'+'</span><span class="faileHtml_smsContent_{{dataItemIndex}}" id="test_{{contractsContentId}}"></span><div class="clearboth"></div>';
var dataItemPhone = '';
if (GLOBAL.modules.pb_enabled === '1') {
dataItemPhone = EMUI.pbMatchController.getPbMatch(dataItem['phone']).join(';');
}
if (!dataItemPhone) {
dataItemPhone = dataItem['phone'];
}
var templateData = {
contractsId: contractsId,
dataItemContactName: dataItemPhone,
dataItemPhone: dataItem['phone'],
contractsContentId: contractsContentId,
dataItemIndex: dataItem['index'],
bottomLine: bottomLine,
smsTime: smsTime
};
$('#fix_sms_html_area').secureAppend(fixHtml, templateData);
$($('#sms_message_list > div > div')[0]).secureAppend(templateHtml, templateData);
$('.faileHtml_smsContent_' + dataItem['index']).secureHtml(faileAddContent);
$('#newMsgTag_' + dataItem['index']).secureAppend(newMsgTag);
$('#failedMsgTag_' + dataItem['index']).secureAppend(failedMsgTag);
$('#smscheck_' + dataItem['index']).secureAppend(smscheck, templateData);
if (typeof g_smsFeature.is_classification !== 'undefined' && g_smsFeature.is_classification === '1') {
if (smsType === '9') {
$('#'+contractsId).secureBefore('<div class="sms_item_alert_style"></div>');
$('#'+contractsId).css('width','102px');
$('#'+contractsId).css('float','left');
} else if (smsType === '10') {
$('#'+contractsId).secureBefore('<div class="sms_item_info_style"></div>');
$('#'+contractsId).css('width','102px');
$('#'+contractsId).css('float','left');
}
}
}
this.setDisplaydot();
this.discheckAll();
},
getSmsList: function () {
var self = this;
var postObj = {
pageindex: gSmsPageIndex,
readcount: gSmsReadCount
};
self.showScroll();
self.postData(postObj, function (result) {
comeInStartTime = new Date().getTime();
var sms = result['response'];
var smsList = [];
if (typeof sms !== 'undefined') {
if (sms['Count'] !== '0') {
if (sms.messages.message) {
if ($.isArray(sms.messages.message)) {
smsList = sms.messages.message;
} else {
smsList.push(sms.messages.message);
}
self.showMessage(smsList);
}
}
} else {
self.showMessage(smsList);
}
});
}
});
EMUI.smsDetectNewMsgController = EMUI.ObjController.extend({
objName: 'sms/sms-count',
getsuccessProc: function (data) {
var responseData = data['response'];
if (responseData['NewMsg'] !== '0') {
EMUI.headerStautsController.load();
EMUI.getActiveItemSmsCountController.load();
gSmsPageIndex = 1;
EMUI.getCurrentSmsListController.getSmsList();
if ($('#sms_resend_message_page').attr('style').indexOf('none') < 0) {
EMUI.getActiveItemSmsCountController.getOneNewContractCount();
}
}
}
});
var interVal = null;
var smsCountStatus = null;
function checkSmsCanUse() {
EMUI.smsDetectNewMsgController.load();
}
var timeoutInterval = 0;
var comeInStartTime = 0;
EMUI.smsTimeoutController = EMUI.ObjController.extend({
objName: 'time/timeout',
getsuccessProc: function (data) {
if (data.type === 'response') {
gTimeout = parseInt(data.response.timeout, 10) * 60 * 1000;
} else {
gTimeout = 5 * 60 * 1000;
}
}
});
function timeOutAction() {
var timeOutTime = new Date().getTime();
var durnTime = gTimeout;
if (timeOutTime - comeInStartTime > (durnTime - 5000)) {
EMUI.smsSendAndSaveController.timeOutJumpSave(function () {
EMUI.LogoutObjController.doLogout();
});
}
}
function smsFullStatus() {
if (typeof EMUI.headerStautsController.content.response.SmsStorageFull !== 'undefined' && EMUI.headerStautsController.content.response.SmsStorageFull === '1') {
$('#sms_full_noSave').show()
} else {
$('#sms_full_noSave').hide()
}
}
var gPbPageIndex = 1;
var gPbLocalContactListRequest = {
GroupID: 0,
PageIndex: gPbPageIndex,
ReadCount: 0,
SaveType: 0,
SortType: 1,
Ascending: 1,
KeyWord: ''
};
var gPbContactListArray = [];
var gPbCurGroupId = 0;
var MAX_SIZE = 50;
var gContact = '';
var gAllContactInfo = [];
var gSearchContactResult = [];
gPbLocalContactListRequest.GroupID = gPbCurGroupId;
function pbLocalRecursiveXml2Object($xml) {
if ($xml.children().size() > 0) {
var _obj = {};
$xml.children().each(function () {
if (this.tagName !== 'Field') {
var _childObj = ($(this).children().size() > 0) ?
pbLocalRecursiveXml2Object($(this)) : $(this).text();
if (($(this).siblings().size() > 0) &&
($(this).siblings().get(0).tagName === this.tagName)) {
if (!_obj[this.tagName]) {
_obj[this.tagName] = [];
}
_obj[this.tagName].push(_childObj);
} else {
_obj[this.tagName] = _childObj;
}
} else {
_obj[$(this).find('Name').text()] = $(this).find('Value').text();
}
});
return _obj;
}
return $xml.text();
}
function pbLocalXml2object($xml) {
var obj = {};
if ($xml.find('response').size() > 0) {
var _response = pbLocalRecursiveXml2Object($xml.find('response'));
obj.type = 'response';
obj.response = _response;
} else if ($xml.find('error').size() > 0) {
var _code = $xml.find('code').text();
var _message = $xml.find('message').text();
obj.type = 'error';
obj.error = {
code: _code,
message: _message
};
} else {
obj.type = 'unknown';
}
return obj;
}
function handler(_, raw) {
var ret = pbLocalXml2object($(raw));
$.merge(gPbContactListArray, $.makeArray(ret.response.Phonebooks.Phonebook));
}
EMUI.getPbInfoCount = EMUI.ObjController.extend({
objName: 'pb/pb-count',
getsuccessProc: function (data) {
var responseData = data['response'];
gContact = responseData;
gPbLocalContactListRequest.PageIndex = gPbPageIndex;
gPbLocalContactListRequest.ReadCount = MAX_SIZE;
}
});
EMUI.pbMatchController = EMUI.ObjController.extend({
objName: 'pb/pb-match',
isSupportSaveInfo: false,
pbName:[],
getPbMatch: function (phoneNumber,callback) {
this.pbName = [];
var PhoneArray = phoneNumber;
if (typeof phoneNumber === 'string') {
PhoneArray = phoneNumber.replace(/\n/g, ';').split(';');
}
var realArray = [];
for (var i = 0; i < PhoneArray.length; i++) {
if (EMUI.smsSendAndSaveController.isPhoneNumber(PhoneArray[i])) {
realArray.push(PhoneArray[i]);
delete PhoneArray[i];
}
}
var postObj = {
Phone: realArray.join(';')
}
var pbName = [];
this.postData(postObj, function (data) {
if (data.type === 'response') {
pbName = data.response.Name;
var lastNameChar = pbName.charAt(pbName.length - 1);
if (lastNameChar === ';') {
pbName = pbName.substring(0, pbName.length - 1);
}
pbName = pbName.split(';');
} else {
pbName = realArray;
}
for (var j = 0; j < PhoneArray.length; j++) {
if (typeof PhoneArray[j] === "undefined") {
PhoneArray[j] = pbName.splice(0,1)[0];
}
}
pbName = PhoneArray;
this.pbName = pbName;
if (callback) {
callback(pbName);
}
}, false);
return pbName;
}
});
EMUI.getPbInfo = EMUI.ObjController.extend({
objName: 'pb/pb-list',
isSupportSaveInfo: false,
async: false,
getAllPbInfo: function () {
gPbContactListArray = [];
var round = Math.floor(gContact.LocalUsed / MAX_SIZE) + 1;
for (gPbLocalContactListRequest.PageIndex = 1; gPbLocalContactListRequest.PageIndex < round + 1; gPbLocalContactListRequest.PageIndex++) {
this.postData(gPbLocalContactListRequest, handler, false);
}
}
});
function allContactInfo() {
gAllContactInfo = [];
for (var i = 0; i < gPbContactListArray.length; i++) {
if (gPbContactListArray[i].HomePhone !== '') {
gAllContactInfo.push({
'name': gPbContactListArray[i].FormattedName,
'phone': gPbContactListArray[i].HomePhone
});
}
;
if (gPbContactListArray[i].MobilePhone !== '') {
gAllContactInfo.push({
'name': gPbContactListArray[i].FormattedName,
'phone': gPbContactListArray[i].MobilePhone
});
}
;
if (gPbContactListArray[i].WorkPhone !== '') {
gAllContactInfo.push({
'name': gPbContactListArray[i].FormattedName,
'phone': gPbContactListArray[i].WorkPhone
});
}
;
}
}
function searchContanctReasult(searchValue) {
gSearchContactResult = [];
if (searchValue.length > 0) {
for (var i = 0; i < gAllContactInfo.length; i++) {
if (gAllContactInfo[i].name.indexOf(searchValue) !== -1 || gAllContactInfo[i].phone.indexOf(searchValue) !== -1) {
gSearchContactResult.push(gAllContactInfo[i]);
}
}
showContactList(gSearchContactResult);
} else {
showContactList(gAllContactInfo);
}
}
function setContactScroll() {
$('#current_pb_list_items').mCustomScrollbar({
theme: 'minimal-dark',
scrollButtons: {
enable: true
},
mouseWheel: {
enable: true,
scrollAmount: 70
},
autoHideScrollbar: false,
scrollInertia: 0,
horizontalScroll: false,
callbacks: {
onScroll: function () {
}
}
});
}
function showContactList(contactInfo) {
if (contactInfo.length > 0) {
$('#current_pb_list_items').mCustomScrollbar('destroy');
$('#current_pb_list_items').empty();
setContactScroll();
var smsRecipients = $('#sms_send_user_input').val().split(';');
for (var loop = 0; loop < contactInfo.length; loop++) {
var contactItem = contactInfo[loop];
var contactHasChecked = false;
for (var i = 0; i < smsRecipients.length; i++) {
if (smsRecipients[i] === contactItem.phone) {
contactHasChecked = true;
}
}
;
var templateData = {
contactItemName: contactItem.name,
contactItemPhone: contactItem.phone
};
var contactHtml = '';
contactHtml += '<div id="contact_list_{{contactItemPhone}}" class="border_bottom" style="height:70px;cursor:pointer;">';
contactHtml += '<div id="contact_name_{{contactItemName}}"  class="pull-left padding-left-20" style="height:56px;padding-top:14px;width:600px;">';
contactHtml += '<pre style="font-size:16px;margin-top:0px;">{{contactItemName}}</pre>';
contactHtml += '<div class="contact_phone color_descroption_gray" style="margin-top:-10px;font-size:14px;">{{contactItemPhone}}</div></div>';
if (contactHasChecked) {
contactHtml += '<div class="pull-right"><div class="check_on_disable contact_check_flag mobileconnet_btn_delete">&nbsp;</div></div></div>';
} else {
contactHtml += '<div class="pull-right"><div class="check_off contact_check_flag mobileconnet_btn_delete">&nbsp;</div></div></div>';
}
$('#current_pb_list_items').find('.mCSB_container').secureAppend(contactHtml, templateData);
}
} else {
$('#current_pb_list_items').mCustomScrollbar('destroy');
$('#current_pb_list_items').empty();
setContactScroll();
$('#current_pb_list_items').find('.mCSB_container').secureHtml('<div><div style="margin-top:200px;margin-left:300px" class="ic_no_contact"></div><div style="text-align:center">没有匹配项</div></div>')
}
}
function pbGetLocalContactList() {
EMUI.getPbInfoCount.load(null, false);
EMUI.getPbInfo.getAllPbInfo();
allContactInfo();
$('#person_simple_info_input').val('');
showContactList(gAllContactInfo);
}
function smsContactSize() {
if (LANGUAGE_DATA.current_language === 'fr_fr') {
$('#sms_send_user_input').css('font-size', '13px');
} else {
$('#sms_send_user_input').css('font-size', '14px');
}
}
function judgeIsMaxPhone(inputPhoneList) {
if (inputPhoneList.length <= 0) {
return;
}
if (inputPhoneList.length > 0) {
if (inputPhoneList.length > 1 && inputPhoneList.indexOf(';') === 0) {
inputPhoneList = inputPhoneList.substring(1);
}
if (inputPhoneList.lastIndexOf(';') === (inputPhoneList.length - 1)) {
inputPhoneList = inputPhoneList.substring(0, inputPhoneList.length - 1);
}
}
inputPhoneList = inputPhoneList.replace(/\n/g, ';');
var phoneArray = inputPhoneList.split(';');
var realArray = [];
for (var i = 0; i < phoneArray.length; i++) {
if (phoneArray[i] !== '' && EMUI.smsSendAndSaveController.isPhoneNumber(phoneArray[i])) {
realArray.push(phoneArray[i]);
}
}
if (realArray.length > g_sms_maxphonesize) {
utilShowToast(publicLang['sms.maxphone_number'].replace('%d', g_sms_maxphonesize));
return;
}
}
function init() {
if (simRedirect(null, 'sms')) {
return;
} else {
$("#sms_display").show();
}
checkSmsCanUse();
mouseEvent();
interVal = setInterval(function () {
checkSmsCanUse();
}, 6000);
smsFullStatus()
smsCountStatus = setInterval(function () {
smsFullStatus()
}, 6000);
EMUI.smsTimeoutController.load();
EMUI.smsSendAndSaveController.initPageInfo();
$('[id^=sms_list_contract_item_sms_]').removeClass('check_on').addClass('check_off');
$('#sms_list_contract_input_select_all_label').removeClass('check_on').addClass('check_off');
EMUI.smsSplitInfoController.load();
EMUI.smsFeaterSwitchController.load();
EMUI.getActiveItemSmsController.currentPage = 1;
EMUI.getActiveItemSmsController.currentNumber = '';
getConfigData('sms/config.xml', function ($xml) {
var smsConfig = xml2object($xml);
g_smsFeature = smsConfig['config'];
if ( g_smsFeature.longsms_enable && g_smsFeature.longsms_enable === '1'){
if (g_smsFeature.longsms_number) {
g_sms_Level = Number(g_smsFeature.longsms_number);
}
}
gSmsReadCount = parseInt(g_smsFeature.pagesize, 10) > 50 ? 50 : parseInt(g_smsFeature.pagesize, 10);
g_sms_maxphonesize = parseInt($.trim(g_smsFeature.maxphone), 10);
if (g_sms_maxphonesize === '' || typeof g_sms_maxphonesize === 'undefined') {
g_sms_maxphonesize = SMS_MAXPHONESIZE;
}
if (g_sms_maxphonesize < 2) {
$('#sms_send_user_input, #sms_resend_user_input').removeAttr('lang-id');
$('#sms_send_user_input, #sms_resend_user_input').removeAttr('lang-id-set');
}
g_sms_importenabled = g_smsFeature.import_enabled === '1' ? true : false;
g_sms_urlenabled = g_smsFeature.url_enabled === '1' ? true : false;
g_sms_notemptyenabled = g_smsFeature.not_support_send_empty_sms === '1' ? true : false;
var cdmaInfo = GLOBAL.basicInfo;
SMS_IS_CDMA = smsConfig.cdma_enabled === '1' ? true : false;
if (cdmaInfo.netModeStatus === 1) {
SMS_IS_CDMA = true;
} else if (cdmaInfo.netModeStatus === 2) {
SMS_IS_CDMA = false;
}
}, {
sync: true
});
$('#sms_main_page').show();
$('#sms_resend_message_page').hide();
$('#sms_send_new_message_page').hide();
comeInStartTime = new Date().getTime();
timeoutInterval = setInterval(timeOutAction, 2000);
EMUI.getActiveItemSmsCountController.load(function (data) {
if (data && data['response']) {
var responseData = data['response'];
var smsCount = parseInt(responseData['count'], 10);
if (smsCount > 0) {
EMUI.getCurrentSmsListController.initSmsPageStatus();
}
}
});
$('#sms_send_user_input').live('keydown keypress keyup focus change input', function (event) {
if ((event.type === 'keydown' || event.type === 'keypress' || event.type === 'keyup') && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
return;
}
var smscontractList = $('#sms_send_user_input').val();
$('#sms_send_user_input_length_test').text(smscontractList);
$('#sms_input_contract_shadow').val(smscontractList);
var realHeight = document.getElementById('sms_input_contract_shadow').scrollHeight;
if (realHeight >= 48) {
$('#sms_send_user_input').css('height', '52px');
} else {
$('#sms_send_user_input').css('height', realHeight + 'px');
}
if (realHeight >= 48) {
$('#sms_user_input_middle_left').css('height', '30px');
$('#sms_user_input_middle_right').css('height', '30px');
$('#sms_send_user_input_block').css('height', '62px');
} else if (realHeight >= 32) {
$('#sms_user_input_middle_left').css('height', '10px');
$('#sms_user_input_middle_right').css('height', '10px');
$('#sms_send_user_input_block').css('height', '42px');
} else {
$('#sms_user_input_middle_left').css('height', '0px');
$('#sms_user_input_middle_right').css('height', '0px');
$('#sms_send_user_input_block').css('height', '32px');
}
var phoneNum = $.trim(smscontractList);
judgeIsMaxPhone(phoneNum);
});
$('#sms_resend_user_input').live('keydown keypress keyup focus change input', function (event) {
if ((event.type === 'keydown' || event.type === 'keypress' || event.type === 'keyup') && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
return;
}
var smscontractList = $('#sms_resend_user_input').val();
$('#sms_phone_list_length_test').text(smscontractList);
EMUI.smsSendAndSaveController.setResendInputHeight();
var phoneNum = $.trim(smscontractList);
judgeIsMaxPhone(phoneNum);
});
$('#sms_current_content').live('keydown keypress keyup focus change input', function (event) {
if ((event.type === 'keydown' || event.type === 'keypress' || event.type === 'keyup') && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
return;
}
if (typeof g_sms_num === 'undefined') {
$('#sms_error_info').show();
}
var smsContent = $.trim($('#sms_current_content').val());
if (smsContent !== '') {
$('#sms_error_null_info').hide();
}
EMUI.smsSendAndSaveController.smsContentChange(true, smsContent);
});
$('#sms_resend_current_content').live('keydown keypress keyup focus change input', function (event) {
if ((event.type === 'keydown' || event.type === 'keypress' || event.type === 'keyup') && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
return;
}
if (typeof g_sms_num === 'undefined') {
$('#sms_resend_error_info').show();
}
var smsContent = $.trim($('#sms_resend_current_content').val());
if (smsContent !== '') {
$('#sms_resend_null_error_info').hide();
}
EMUI.smsSendAndSaveController.smsContentChange(false, smsContent);
});
$('#sms_choose_contract_form_pb').live('click', function () {
$('#sms_display').hide();
pbGetLocalContactList();
$('#select_pb_page').show();
$('#person_simple_info_input').live('keyup', function () {
searchContanctReasult($(this).val());
});
});
$('#cancel_select_pb').live('click', function () {
$('#sms_display').show();
$('#select_pb_page').hide();
});
$('#current_pb_list_items .contact_check_flag').die('click');
$('#current_pb_list_items .contact_check_flag').live('click', function () {
if ($(this).hasClass('check_on')) {
$(this).removeClass('check_on').addClass('check_off')
} else {
if (!$(this).hasClass('check_on_disable')) {
$(this).addClass('check_on').removeClass('check_off')
}
}
});
$('#confirm_choose_contract_form_pb').die('click');
$('#confirm_choose_contract_form_pb').live('click', function () {
var selectPbArray = [];
for (var i = 0; i < gAllContactInfo.length; i++) {
if ($('[id="contact_list_' + gAllContactInfo[i].phone + '"]').find('.contact_check_flag').hasClass('check_on')) {
selectPbArray.push($('[id="contact_list_' + gAllContactInfo[i].phone + '"]').find('.contact_phone').text());
}
}
var smsRecipients = $('#sms_send_user_input').val();
var smsAllRecipients = '';
if (smsRecipients.length > 0) {
if (smsRecipients.substr(smsRecipients.length - 1, 1) !== ';') {
smsAllRecipients = smsRecipients + ';' + selectPbArray.join(';');
} else {
smsAllRecipients = smsRecipients + selectPbArray.join(';');
}
} else {
smsAllRecipients = selectPbArray.join(';');
}
$('#sms_display').show();
$('#sms_send_user_input_length_test').text(smsAllRecipients);
$('#sms_send_user_input').val(smsAllRecipients);
$('#sms_send_new_phone_number').text(smsAllRecipients);
$('#select_pb_page').hide();
$('#sms_resend_message_page').hide();
$('#sms_new_send_list').hide();
$('#sms_send_new_phone_more_notice').hide();
$('#sms_send_new_message_page').show();
$('#sms_new_user_input_area').show();
setTimeout(function () {
$('#sms_send_user_input').focus();
}, 200);
});
if (EMUI.msgStorage && EMUI.msgStorage.length > 0) {
EMUI.smsSendAndSaveController.showNewSendPage();
var $smsInput = $('#sms_send_user_input');
setTimeout(function () {
$smsInput.trigger('focus');
$smsInput.val(EMUI.msgStorage.join(';'));
EMUI.msgStorage = [];
$smsInput.trigger('change');
$smsInput.trigger('blur');
}, 200);
}
if (!$('#sms_page').hasClass('registerFunction')) {
$('#sms_page').addClass('registerFunction');
EMUI.LanguageController.registerFunction(function () {
if (window.location.hash === '#sms') {
smsContactSize();
}
});
}
smsContactSize();
}
function destory() {
EMUI.smsSendAndSaveController.smsJumpSave(function () {
var newHref = window.location.href;
$('#fix_sms_html_area').empty();
oldHref = newHref;
getCurrentMenu();
showNewPage(true);
clearInterval(interVal);
clearInterval(timeoutInterval);
clearInterval(smsCountStatus);
});
return;
}
return {init: init, destory: destory};
}());
window.smsRenderPage = function () {
smsObj.init();
};
window.smsDestruction = function () {
smsObj.destory();
};
