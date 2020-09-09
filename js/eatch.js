//globals
var randomize = false;
var alphatize = false;
var alpha = 0;

//set up the keydown function
document.onkeydown = keydown;

function create_board(n){
    //declaring vars
    const check_b1 = document.createElement("input");
    const check_b2 = document.createElement("input");
    const label1 = document.createElement("label");
    const label2 = document.createElement("label");
    //random check box
    check_b1.type = "checkbox";
    check_b1.id = "random_c";
    check_b1.className = "elems";
    check_b1.addEventListener("click",random_colors);
    //alpha check box
    check_b2.type = "checkbox";
    check_b2.id = "alpha";
    check_b2.className = "elems";
    check_b2.addEventListener("click",alpha_colors);

    label1.className = "elems";
    label1.htmlFor = "random_c";
    label1.textContent = "Randomize Colors - (Shorcut Press R)";
    label1.style = "color:white;";
    label2.className = "elems";
    label2.htmlFor = "alpha";
    label2.textContent = "'Alphatize' Colors - (Shorcut Press A)";
    label2.style = "color:white;";
    //add check1 to label1 and chk2 to l2
    label1.appendChild(check_b1);
    label2.appendChild(check_b2);
    const btn = document.createElement("button");
    const html = document.querySelector('#html');
    const body = document.querySelector('#body');
    const container = document.querySelector('#container');
    const p = document.createElement("p");
    const menu = document.createElement("div");
    //bg image for html element
    html.style = "background: url('./media-images/bg-sketch.jpeg');background-position: center center; background-repeat: no-repeat;background-attachment:fixed;background-size: cover;background-color: rgb(0, 0, 0);";
    
    //shadows
    //definying the div as flex with wrap option
    container.setAttribute('style','display:flex;flex-direction:column;')
    //let us set container in the middle of the page 
    //removing position:absolute;
    container.setAttribute('style','top:0;bottom:0;left:0;right:0;margin:auto;text-align:center;width:500px;height:500px;box-shadow:5px 10px rgb(255,255,255);');

    btn.style = 'width:150px;height:40px;border-radius:10px;text-align:center;margin:auto;background-color:rgb(255,51,51);color:white;';
    btn.textContent = 'New Board (N)';
    btn.setAttribute('class','elems');
    btn.addEventListener("click",new_board);
    btn.addEventListener("pointerenter",h_over);
    btn.addEventListener("pointerleave",hoff_over);
    body.style = 'text-align: center';
    p.setAttribute('class','elems');
    p.style = 'color:white;position:fixed;bottom:0;font-size:0.8em;';
    p.textContent = "M: ";
    menu.className = "elems";
    //menu always top-left
    menu.style = 'display:flex;flex-direction:column;justify-content:center;align-text:center;border:1px solid white;width:500px;margin:auto;margin-top:15px;';

    //set a bg color to html
    html.style.backgroundColor = "black";
    //append to menu
    menu.appendChild(btn);
    menu.appendChild(label1);
    menu.appendChild(label2);
    //append to body
    // body.appendChild(btn);
    body.appendChild(menu);

    //variable to identify each div
    var cont = 1;
    //creating the div's 
    for (i=0; i < n; i++){
        //create another div as container of row
        const div16 = document.createElement('div-row');
        div16.setAttribute('id',cont);
        //++ to cont
        cont++;
        div16.setAttribute('style','display:flex;flex-direction:row;');
        for (j=0; j < n;j++){
            //create the div elem
            let div = document.createElement('div');
            div.setAttribute('id',cont);
            //to add border:1px solid black; as a check option
            div.setAttribute('style','background-color:red;');
            //we set width & height here so it can change because of the n
            let w = Math.round(500/n);
            // console.log("Width-Div: " + w);
            div.style.width = w + "px";
            div.style.height = w + "px";
            cont++;
            div.addEventListener("mouseover", function(){
                if (randomize){
                    //find random numbers
                    let col1 = getRandomInt(0,255);
                    let col2 = getRandomInt(0,255);
                    let col3 = getRandomInt(0,255);
                    if (alphatize){
                        (alpha < 1.0) ? alpha += 0.1 : alpha = 0;
                        this.style.backgroundColor = "rgb(" + col1 + "," + col2 + "," + col3 + "," + alpha + ")";
                    } else {
                        this.style.backgroundColor = "rgb(" + col1 + "," + col2 + "," + col3 + ")";
                    }    
                } else {
                    //orange rgb(255,135,43,alpha) alpha being range 0.0 - 1.0;
                    //if alpha checked
                    if (alphatize){
                        (alpha < 1.0) ? alpha += 0.1 : alpha = 0;
                        this.style.backgroundColor = "rgb(255,135,43," + alpha +")";
                    } else { //if unchecked
                        this.style.backgroundColor = "rgb(255,135,43)"; //orange
                    }
                }
            });
            //ading them to the inner-container.
            div16.appendChild(div);
        }
        div16.setAttribute('class','elems');
        container.appendChild(div16);
    }
    //add the p at the bottom just to let know the actual matrix size
    p.textContent += n + "x" + n + " -@theghost1980 part of my learning on The Odin Project. BG from coolbackgrounds.io";
    body.appendChild(p);
}

function random_colors(){
    randomize = this.checked;
}

function alpha_colors(){
    alphatize = this.checked;
}

function get_input(){
    let cen = true;
    while(true){
        let input = prompt("Input size of cuadratic matrix: ","0");
        if (input == null){
            //hitted cancel
            return true;
        } else {
            if (input.length <= 0 || isNaN(input) || input == '0'){
                //invalid input
                cen = true;
            }else{
                // console.log(input);
                return parseInt(input);
            }
        }
    }
}

function new_board(){
    let matrix = get_input();
    // alert(matrix);
    if (matrix === true){ return false;}
    randomize = false;
    alphatize = false;
    alpha = 0;
    document.querySelectorAll('.elems').forEach( e => e.parentNode.removeChild(e));
    create_board(matrix);
}

function h_over(){
    this.style.backgroundColor = "rgb(255,154,154)";
}

function hoff_over(){
    this.style.backgroundColor = "rgb(255,51,51)";
    
}

//proper randomw function with min - max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//for shorcuts
function keydown(evt){
    if (evt.keyCode == 82){
        document.getElementById("random_c").click();
    }
    if (evt.keyCode == 65){
        document.getElementById("alpha").click();
    }
    if (evt.keyCode == 78){
        new_board();
    }
  }

//loading creation by default 16x16
create_board(16);
