//global variables for setting alarm time
let gh = 0;
let gm = 0;
let gs = 0;
// var myAudio= new Audio('../media-images/alarm.wav');

function play() {
    // myAudio.play();
    document.getElementById('audio').play();
}
function set_vars(h, m, s){
    gh = h;
    gm = m;
    gs = s;
}
function get_alarm(){
    document.getElementById("alarm").innerHTML = gh + ":" + gm + ":" + gs;
}
function check_alarm(){
    let dat = new Date();
    let h = dat.getHours(); 
    let m = dat.getMinutes();
    let s = dat.getSeconds();
    if (gh == h && gm == m && gs == s){
        //we play the alarm sound and set the alarm to 0
        set_vars(0,0,0);
        play();
    }
}

function showtime() {
    let dat = new Date();
    let h = dat.getHours(); 
    let m = dat.getMinutes();
    let s = dat.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
    get_alarm();
    //check the alarm
    check_alarm();
    //setting interval using time out
    let t = setTimeout(showtime,1000);
}
function checkTime(i){
    if (i < 10){
        i = "0" + i;
    }
    return i;
}
function checkUTC(){
    let zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("utc_zone").innerHTML = "Your Local Time/Zone: " + zone;
}
//event handlers
function set_alarm(){
    // alert("Button pressed!");
    let h = document.getElementById("hourss").value;
    let m = document.getElementById("minutes").value;
    let s = document.getElementById("seconds").value;
    set_vars(h,m,s);
    //alert("Setting to: " + h +":"+ m + ":" + s);
    get_alarm();
}
window.onload = function() {
    showtime();
    checkUTC();
}
