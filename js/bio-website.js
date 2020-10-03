const _arBookPaths = ['https://www.academia.edu/34599636/MANUAL_DE_SEMIOTICA','https://www.academia.edu/29176659/Cuerpo_y_discurso_cinco_ensayos_sobre_la_construcci%C3%B3n_social_del_sentido','https://www.academia.edu/9103998/IMAGOLETRAGRAFIA_Manual_de_semiotica_gr%C3%A1fica_y_visual'];
const _arFileNames = ['MANUAL_DE_SEMIOTICA.pdf','Cuerpo_y_discurso_cinco_ensayos_sobre_la.pdf','IMAGOLETRAGRAFIA_Manual_de_semiotica_gra.pdf'];
// Code for Carousel
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function addPathNDownload(n){
    const _bookAlink = document.getElementById("book-visit");
    const _bookAFile = document.getElementById("book-download");
    // console.log("Slide: " + n);
    let _path = _arBookPaths[n-1];
    let _file = _arFileNames[n-1];
    // console.log("ArBook: " + _path);
    _bookAlink.href = _path;
    _bookAFile.href = "./media-images/biographic-page/" + _file;
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  //assign file + paths to a-links
  addPathNDownload(n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  addPathNDownload(slideIndex);
  dots[slideIndex-1].className += " active";
}
// end Code for carousel

const _arSections = ['about','writings','work','contact'];
const _dictHeights = {'about':'1700px','writings':'1100px','work': '1100px','contact':'1100px'};
const elementDis = function(elem){
    if (elem != null && elem != ""){
        const element = document.querySelector(`.${elem}`);
        const styleElement = getComputedStyle(element);
        const display = styleElement.display;
        return  display;
    }
}
function setDisplay(query,value){
    //first thing is arrange items
    // container.height = 1000px 
    // imgtop display null
    // nav bar.position = absolute
    //check if already container.height = 1000px 
    if (query != null && query != ""){
        //set disp
        const element = document.querySelector(`.${query}`);
        element.style.setProperty(`--disp-${query}`,`${value}`);
    }
}

function setHeight(section){
    //check for container
    const container = document.getElementById("container");
    // if (container.offsetHeight < '1100px' && container.offsetHeight < '1700px' ){
        // console.log(`H: ${_dictHeights[section]}`);
        // container.style.setProperty('--height-container',`${_dictHeights[section]}`);
        
    //todo: check if the actua height if < 600 in order to set the height to auto

    if (section == 'about'){
        container.style.setProperty('--height-container','600px');
    } else if (section == 'work'){
        
    } else if (section == 'writings'){
        container.style.setProperty('--height-container','400px');
    } else if (section == 'contact'){

    }
    const imgtopcont = document.querySelector('.imgtop-container');
    imgtopcont.style.setProperty('--height-imgtopcont','180px')
    //test for #presentation-box
    hideElement('presentation-box');
    // }
}

function showSection(section){
    if (elementDis(section) == 'none'){
        setHeight(section);
        setDisplay(section,"flex");
        _arSections.forEach(function(x){
            if (x != section){
                setDisplay(x,"none");
            }
        });
    }
}

function hideElement(id){
    document.getElementById(id).style.setProperty('display','none');
}

function shareSocial(){
    let desc = "Take a look on this amazing website about Rocco Mangieri!";
    let params = "menubar=yes,toolbar=yes,status=yes,width=400,height=400"; // for window
    let url = window.location.href;
    let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}&caption='caption'&description=${desc}`;
    window.open(shareUrl,"NewWindow" , params);  
}