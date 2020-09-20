const app = document.getElementById("root");
const logo = document.createElement("img");
const container = document.createElement("div");
const p_description = document.createElement("p");
const a_link = document.createElement("a");
const a_link2 = document.createElement("a");
const p_line = document.createElement("p");
const p_line2 = document.createElement("p");
const footer = document.createElement("div");
const p_foot1 = document.createElement("p");
const p_foot2 = document.createElement("p");
const div_top = document.createElement("div");
let cont = 0;

//setting attr
div_top.setAttribute("class","div-top");
footer.setAttribute("class","footer");
p_foot1.setAttribute("class","footer-text ");
p_foot2.setAttribute("class","footer-text ");
p_foot1.textContent = "@theghost1980";
p_foot2.textContent = "As part of my lessons on The Odin Project";
p_line.setAttribute("class","p-link");
p_line2.setAttribute("class","p-link");
logo.setAttribute("src","./media-images/logo.png");
logo.setAttribute("class","img-logo");
container.setAttribute("class","container");
a_link.setAttribute("href","https://ghibliapi.herokuapp.com/films");
a_link.setAttribute("target","_blank");
//http://www.omdbapi.com/
a_link2.setAttribute("href","http://www.omdbapi.com/");
a_link2.setAttribute("target","_blank");
a_link.textContent = "Click here to open the API #1";
a_link2.textContent = "Click here to open the API #2";
p_description.textContent = "This webpage is loading the information of each movie, from the restful API's #1: https://ghibliapi.herokuapp.com/films, #2: http://www.omdbapi.com/. Click on the links down below, to open them in another windows.";
p_line.appendChild(a_link);
p_line2.appendChild(a_link2);
div_top.appendChild(logo);
//appending childs to body
app.appendChild(div_top);
app.appendChild(p_description);
app.appendChild(p_line);
app.appendChild(p_line2);
app.appendChild(container);
add_footer();

function xml_Request(){
    var request = new XMLHttpRequest();
    let url1 = 'https://ghibliapi.herokuapp.com/films';
    request.open('GET',url1,true);
    request.onload = function () {
        //begin accessing JSON data here
        let data = JSON.parse(this.response);
        console.log(data);
        //handling errors
        if (request.status >= 200 && request.status < 400){
            data.forEach(movie => {
                const card = document.createElement("div");
                card.setAttribute("class","card");
                //we add it to the card container and modify the src path later on
                const img = document.createElement("img");
                //assign id = cont to use it later on the path getter
                img.setAttribute("id",cont);
                cont++;
                img.setAttribute("class","img-poster");
                let alt_text = processString(movie.title);
                img.setAttribute("alt",alt_text);
                //////////////////////////////////////
                //call another request to get the path
                var posterRequest = new XMLHttpRequest();
                let url = "http://www.omdbapi.com/?apikey=c52ac68b&t=" + alt_text;
                // console.log(url);
                posterRequest.open("GET",url,true);
                posterRequest.onload = function (){
                    let data = JSON.parse(this.response);
                    //handling errors
                    if (posterRequest.status >= 200 && posterRequest.status < 400){
                        // console.log(data.Poster);
                        //assign to image
                        img.setAttribute("src",data.Poster);
                    } else {
                        console.log("Error: " + posterRequest.status);
                    }
                }
                //sending request
                posterRequest.send();
                //end 2nd request
                //////////////////////////////////////

                //create h1, set textcontent to film's title
                const h1 = document.createElement("h1");
                h1.textContent = movie.title;
                //add a director and release year p tag
                const p2 = document.createElement("p");
                p2.textContent = "Director: " + movie.director + " - Year: " + movie["release_date"];
                p2.setAttribute("id","p2");
                //add a rt image + score in div
                const divScore = document.createElement("div");
                    divScore.setAttribute("class","divScore");
                    const imgRt = document.createElement("img");
                    imgRt.setAttribute("src","./media-images/rt-image.png");
                    imgRt.setAttribute("class","img2");
                    const p3 = document.createElement("p");
                    p3.setAttribute("id","p3");
                    p3.textContent = " Score: " + movie.rt_score;
                    divScore.appendChild(imgRt);
                    divScore.appendChild(p3);
                //create a p tag and set its content to movie.descr
                const p = document.createElement("p");
                movie.description = movie.description.substring(0, 300);
                p.textContent = `${movie.description}...`
                
                card.appendChild(h1);
                //append img poster
                card.appendChild(img);

                card.appendChild(p2);
                card.appendChild(divScore);
                card.appendChild(p);
                container.appendChild(card);
                
                // console.log(movie.title);
                // console.log(movie.description);
            });
        } else {
            // console.log("Error: " + request.status);
            const errorMessage = document.createElement("marquee");
            errorMessage.textContent = "Gah, it's not working! Error: " + request.status;
            app.appendChild(errorMessage);
        }
    }
    //sending request
    request.send();
}

//doing all the same but using fetch
// function fetch_request(){
//     // url (required), options (optional)
//     // fetch('https://davidwalsh.name/some/url', {
//     //     method: 'get'
//     // }).then(function(response) {
        
//     // }).catch(function(err) {
//     //     // Error :(
//     // });
//     // url (required), options (optional)
//     fetch('https://ghibliapi.herokuapp.com/films', {
//         method: 'get'
//     }).then(response => response.json()).then(function(data) {
//         console.log(data);
//         data.forEach(movie =>{
//             const card = document.createElement("div");
//                 card.setAttribute("class","card");
//                 //create h1, set textcontent to film's title
//                 const h1 = document.createElement("h1");
//                 h1.textContent = movie.title;
//                 //add a director and release year p tag
//                 const p2 = document.createElement("p");
//                 p2.textContent = "Director: " + movie.director + " - Year: " + movie["release_date"];
//                 p2.setAttribute("id","p2");
//                 //add a rt image + score in div
//                 const divScore = document.createElement("div");
//                     divScore.setAttribute("class","divScore");
//                     const imgRt = document.createElement("img");
//                     imgRt.setAttribute("src","./media-images/rt-image.png");
//                     imgRt.setAttribute("class","img2");
//                     const p3 = document.createElement("p");
//                     p3.setAttribute("id","p3");
//                     p3.textContent = " Score: " + movie.rt_score;
//                     divScore.appendChild(imgRt);
//                     divScore.appendChild(p3);
//                 //create a p tag and set its content to movie.descr
//                 const p = document.createElement("p");
//                 movie.description = movie.description.substring(0, 300);
//                 p.textContent = `${movie.description}...`
                
//                 card.appendChild(h1);
//                 card.appendChild(p2);
//                 card.appendChild(divScore);
//                 card.appendChild(p);
//                 container.appendChild(card);
//         })
//     });
// }

// function find_poster(url){
//     // console.log("URL: " + url);
//     var posterRequest = new XMLHttpRequest();

//     //in order to work it must be sync
//     posterRequest.open("GET",url,false);
//     posterRequest.onload = function (){

//         let data = JSON.parse(this.response);
//         // console.log("OMDB Response: " + this.response);
//         // console.log(data.Poster);
//         //handling errors
//         if (posterRequest.status >= 200 && posterRequest.status < 400){
//             arraPosters.push(data.Poster);
//             // console.log(data.Poster);
//             // console.log(posterUrl);
//         } else {
//             console.log("Error: " + posterRequest.status);
//         }
//     }
//     //sending request
//     posterRequest.send();
// }

function processString(title){
    let titleFixed = String(title).split(" ").join("+");
    // console.log(titleFixed);
    return titleFixed;
}
function add_footer(){
    footer.appendChild(p_foot1);
    footer.appendChild(p_foot2);
    footer.style.display = "flex";
    app.appendChild(footer);
}

//calling functions
xml_Request();
// console.log(arrayTitles);
// request_paths();
// console.log(arrayFilePaths);
// fetch_request();
