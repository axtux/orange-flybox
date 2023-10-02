var scripts = ["./js/libs/jquery.jscrollpane.min.js",
    "./js/libs/jquery.touchSwipe.min.js",
    "./js/libs/jquery-ui.js",
    "./js/libs/jquery.easing.1.3.min.js",
    "./js/libs/jquery.mousewheel.min.js",
    "./js/libs/jquery.nailthumb/jquery.nailthumb.1.1.min.js",
    "./js/libs/jquery.spin.js",
    "./js/libs/raphael.min.js",
    "./js/config.js",
    "./js/scripts/xml.js",
    "./js/scripts/plugins.js",
    "./js/scripts/pincode.js",
    "./js/scripts/onlineupdate.js",
    "./js/scripts/popins.js",
    // "./js/scripts/backup-livebox.js",
    "./js/scripts/main.js"];


var index = 0;

function load(script, callback) {
    $.getScript(script).done(callback);
}

function loadDoneCb(script, textStatus) {
    index++;
    if (index < scripts.length)
        load(scripts[index], loadDoneCb);
}

load(scripts[0], loadDoneCb);
