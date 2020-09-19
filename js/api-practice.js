const app = document.getElementById("root");
const logo = document.createElement("img");
const container = document.createElement("div");
const p_description = document.createElement("p");
const a_link = document.createElement("a");
var arraPosters = [];

//setting attr
logo.setAttribute("src","./media-images/logo.png");
container.setAttribute("class","container");
a_link.setAttribute("href","https://ghibliapi.herokuapp.com/films");
a_link.setAttribute("target","_blank");
a_link.textContent = "Click here to open the API";
p_description.textContent = "This webpage is loading the information of each movie, from the restful API: https://ghibliapi.herokuapp.com/films. Click on the link down below, to open it in another window.";
//appending childs to body
app.appendChild(logo);
app.appendChild(p_description);
app.appendChild(a_link);
app.appendChild(container);

function xml_Request(){
    let cont = 0;
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
                //before the h1 element we'll do another api request to
                // http://www.omdbapi.com/
                //format http://www.omdbapi.com/?apikey=[yourkey]&
                //API key: c52ac68b
                //format http://www.omdbapi.com/?apikey=[c52ac68b]&t=
                //first we must process the movie title
                let movieTitle =  processString(movie.title);
                urlTitle = "http://www.omdbapi.com/?apikey=c52ac68b&t=" + movieTitle;
                const img = document.createElement("img");
                find_poster(urlTitle);
                img.src = arraPosters[cont];
                // console.log(arraPosters);
                cont++;


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
    //delete arraPosters
    arraPosters = [];
}
//doing all the same but using fetch
function fetch_request(){
    // url (required), options (optional)
    // fetch('https://davidwalsh.name/some/url', {
    //     method: 'get'
    // }).then(function(response) {
        
    // }).catch(function(err) {
    //     // Error :(
    // });
    // url (required), options (optional)
    fetch('https://ghibliapi.herokuapp.com/films', {
        method: 'get'
    }).then(response => response.json()).then(function(data) {
        console.log(data);
        data.forEach(movie =>{
            const card = document.createElement("div");
                card.setAttribute("class","card");
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
                card.appendChild(p2);
                card.appendChild(divScore);
                card.appendChild(p);
                container.appendChild(card);
        })
    });
}

function find_poster(url){
    // console.log("URL: " + url);
    var posterRequest = new XMLHttpRequest();

    //in order to work it must be sync
    posterRequest.open("GET",url,false);
    posterRequest.onload = function (){

        let data = JSON.parse(this.response);
        // console.log("OMDB Response: " + this.response);
        // console.log(data.Poster);
        //handling errors
        if (posterRequest.status >= 200 && posterRequest.status < 400){
            arraPosters.push(data.Poster);
            // console.log(data.Poster);
            // console.log(posterUrl);
        } else {
            console.log("Error: " + posterRequest.status);
        }
    }
    //sending request
    posterRequest.send();
}
function processString(title){
    let titleFixed = String(title).split(" ").join("+");
    // console.log(titleFixed);
    return titleFixed;
}

//calling functions

xml_Request();
// fetch_request();
