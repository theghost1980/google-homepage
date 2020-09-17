const mess_cont = document.getElementById("message-c");
const mess_p = document.getElementById("message-p");
const body_elem = document.getElementById("body");
const overlayBox = document.getElementById("overlay-box");

body_elem.addEventListener('click',show_message);
//get all the queries under ".textEvent"
const list_inputs = document.querySelectorAll(".i-text.textEvent");
console.log(list_inputs);
list_inputs.forEach(elem => {
    elem.addEventListener('click',show_message);
});

function show_message(e){
    let eId = e.target.id;
    console.log(eId);
    if (eId == "privacy"){
        show_div();
    }
    if (eId != "email" && eId != "phone" && eId != "password"){
        //means click on other elements so we may hide the div message
        mess_cont.style.display = "none";
        return;
    }
    //bring the actual position of the clicked elem
    let top_item = document.getElementById(eId).offsetTop;
    let left_item = document.getElementById(eId).offsetLeft;
    let width_item = document.getElementById(eId).offsetWidth;
    let alt_text = document.getElementById(eId).getAttribute("alt");
    let space = 10; //in pixels
    console.log("T: " + top_item + " L: " + left_item + " W: " + width_item);
    console.log("Alt: " + alt_text);
    mess_p.textContent = alt_text;
    mess_cont.style.top =  top_item + "px";
    mess_cont.style.left = space + left_item + width_item + "px";
    mess_cont.style.display = "flex";

}

function show_div(){
    let proP_div = overlayBox.style.getPropertyValue('--display-div');
        if (proP_div == "flex") {
            overlayBox.style.setProperty('--display-div','none');
        }
        else {
            overlayBox.style.setProperty('--display-div','flex');
        }
        return 0;
}

function hide_div_message(){
    mess_cont.style.display = "none";
}
