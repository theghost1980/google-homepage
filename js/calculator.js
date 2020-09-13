const p_main = document.querySelector('.main-t');
const p_top = document.querySelector('.top-t');
//global vars
var lastOp = '';
var previuosN = 0;
var actualN = 0;
var saved = false; //control cen to check if ready to clear previuos and add actual
var toErase = false;
//keyboard support
document.onkeypress = keyboard;

function keyboard(e){
    let evt = e || window.event;
    let key = evt.keyCode;
    let ch = '';
    (key == 13) ? ch = '=' : ch = String.fromCharCode(key);
    console.log("ET: " + evt.type + " KC: " + evt.keyCode + " CCode: " + evt.charCode);
    console.log("Char: " + ch);
    // press(ch);
    const btn = document.getElementById(ch);
    if (btn != null) {btn.click();}
}

function press(){
    // let k = e || event.target.id;
    // console.log("SrcId " + event.target.id + '\n' + "k: " + k);
    let k = event.target.id;
    if (k == 'c'){ 
        reset_vars();
        return 0;
    }
    if (!isNaN(k)){
        if (toErase){
            toErase = false;
            p_main.textContent = '';
        }
        p_main.textContent += k;
    }else if (k !== '=' && k != 'enter'){
        if (!saved){
            //we save the actual to previous
            previuosN = parseInt(p_main.textContent);
            lastOp = k;
            saved = true;
            toErase = true;
        } else {//execute and show on top the full operation
            actualN = parseInt(p_main.textContent);
            let result = execute(previuosN,actualN,lastOp);
            //present  results
            if (p_top.textContent.length >= 50){ p_top.textContent = '';}
            p_top.textContent += previuosN + lastOp + actualN +'='+ result + " "
            p_main.textContent = result;
            previuosN = result;
            lastOp = k;
            toErase = true;
            //special check
            if (isNaN(result) || result == "Infinity"){ setTimeout(reset_vars,2000);}
        }
        
    } else if ((k == '=' || k =='enter') && lastOp != '' && saved){
        actualN = parseInt(p_main.textContent);
        let result = execute(previuosN,actualN,lastOp);
        //present  results
        if (p_top.textContent.length >= 50){ p_top.textContent = '';}
        p_top.textContent += previuosN + lastOp + actualN +'='+ result + " "
        p_main.textContent = result;
        previuosN = result;
        lastOp = k;
        toErase = true;
        saved = false;
        //special check
        if (isNaN(result) || result == "Infinity"){ setTimeout(reset_vars,2000);}
    }
}
function execute(a,b,op){
    if (op == '+'){
        return parseInt(a + b);
    } else if (op == '-'){
        return parseInt(a - b);
    } else if (op == '*'){
        return parseInt(a * b);
    } else if (op == '/'){
        return parseInt(a / b);
    }
}
function reset_vars(){
    toErase = false;
    saved = false;
    lastOp = '';
    actualN = 0;
    previuosN = 0;
    p_main.textContent = '';
    p_top.textContent = '';
}