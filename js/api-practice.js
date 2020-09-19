const app = document.getElementById("root");
const logo = document.createElement("img");
const container = document.createElement("div");
const p_description = document.createElement("p");
const a_link = document.createElement("a");

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
    var request = new XMLHttpRequest();
    request.open('GET','https://ghibliapi.herokuapp.com/films',true);
    request.onload = function () {
        //begin accessing JSON data here
        let data = JSON.parse(this.response);
        console.log(data);
        //handling errors
        if (request.status >= 200 && request.status < 400){
            data.forEach(movie => {
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

//calling functions

// xml_Request();
fetch_request();
