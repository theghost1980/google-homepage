const floating_t = document.getElementById("floating-text");
const i_frame = document.getElementById("i-frame");
const img_ad = document.getElementById("img-ad");
const float_menu = document.getElementById("menu-float-r");
const black_div = document.getElementById("black-div");

function show_menu(){
  console.log(float_menu.style.display);
  if (float_menu.style.display == "flex"){
    float_menu.style.display = "none";
    black_div.style.display = "none";
  } else {
    float_menu.style.display = "flex";
    black_div.style.display = "flex";
  }
}

function load_ad(){
  //random
  let n = getRndInteger(1,11);
  let fileName = "../media-images/ads/ad" + n + ".png";
  img_ad.setAttribute("src",fileName);
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function toogle_view(){
  // alert("Hey");
  //the div that shows the info
  let info_song = document.getElementById("data-song");
  let h = info_song.offsetHeight;
  console.log("Height: " + h);
  (h <= 110) ? info_song.style.height = "100%" : info_song.style.height = "100px";
}

function showCoords(event) {
    // var x = event.clientX;
    // var y = event.clientY;
    // var coords = "X coords: " + x + ", Y coords: " + y;
    // console.log(coords);
    let idElem = event.target.id;
    console.log(idElem);
    let elem = document.getElementById(idElem);
    //show the div
    //adding 10px resting 10 to left
    let top = elem.offsetTop + 40;
    let left = elem.offsetLeft - 10;
    let text = elem.getAttribute("alt");
    console.log("Top: " + top + " Left: " + left);
    console.log("Alt: " + text);
    floating_t.style = 'display:flex;';
    floating_t.style.top = top + "px";
    floating_t.style.left = left + "px"; 
    floating_t.textContent = text;
  }
  function hideText(event){
    let idElem = event.target.id;
    console.log(idElem);
    floating_t.style.display = "none";
    floating_t.textContent = "";
  }

  //on loading functions
  load_ad();