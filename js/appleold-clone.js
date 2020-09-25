document.onclick = check_click;

// document.getElementById("search-div").addEventListener("click",function(){
//     document.getElementById("globalsearch").style.setProperty('--widthSB','50%');
//     console.log('Setting...');
// });
// document.getElementById("body").addEventListener("click",function(){
//     document.getElementById("globalsearch").style.setProperty('--widthSB','20%');
//     console.log('Setting back');
// });

function check_click(e){
    let _id = e.target.id;
    console.log(_id);
    if (_id == "input-search"){
        document.getElementById("globalsearch").style.setProperty("width", "50%");
    } else {
        document.getElementById("globalsearch").style.setProperty("width", "20%");    
    }
}