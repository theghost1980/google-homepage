//the idea is being able to access the OMDB api
//so the user can perfom search of movies and bring all the info of that movie
//first after first search we present the results bellow order by results
//second every link is clickable so we may open a second page with all the info detailed
//optional: we may try to find the downloable info for this movie, maybe find another api for torrents
//optional 2: would be great to get the trailer from your youtube.

//keyboard support
document.onkeypress = keyboard;

//constants elements
const overlayBox = document.getElementById("overlay-box");
const search_results = document.getElementById("search-results");
const btn_search = document.getElementById("search-button");
const p_data_results = document.getElementById("data_results");
const li_topR = document.getElementById("top-rated-li");
//seting attributes
p_data_results.setAttribute("class","p_centered");
//important constant variables URL + ApiKey
const apiKey = "ac20ea9f613b8fd5a88d72e8950b23d4";
const movieUrl = "https://api.themoviedb.org/3/search/movie?api_key=";
const tvShowUrl = "https://api.themoviedb.org/3/search/tv?api_key=";
const tMovieUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=";
const ttvShowUrl = "https://api.themoviedb.org/3/tv/top_rated?api_key=";
const imagePw92Url = "https://image.tmdb.org/t/p/w92";
const imagePw500Url = "https://image.tmdb.org/t/p/w500";
const nullPosterUrl = "./media-images/null-poster.jpg";
const appendToUrl = "&append_to_response=videos";

//global vars
let searchType = "";
let page = 1; //default value

//adding events listeners
btn_search.addEventListener("click",function(e){
    //validation of input
    let input_text = document.getElementById("search-input");
    // console.log("Input value: " + input_text.value);
    if (input_text.value == "" || input_text.value.length == 0 || input_text.value == null){
        console.log("Please Input a valid query, then press ENTER or Search");
        return;
    }
   checkOldElements();
    // console.log("S Type: " + searchType);
    process_query(searchType);
});
li_topR.addEventListener("click",function() {
    checkOldElements();
    process_query(searchType,page,"top");
});

function CheckError(response){
    if (response.status >= 200 && response.status <= 299){
        console.log("Server Says: " + response.status);
        return response.json();
    } else {
        throw Error(response.status);
    }
}

function process_query(sType,_page = page,option){
    // alert("Hey");
    //meassuring time of process the query
    var start = window.performance.now();
    /////////////
    let elem = document.getElementById("search-input");
    let fixed_text = elem.value;
    if (/\s/g.test(fixed_text)){
        fixed_text = String(fixed_text).split(" ").join("+");
    }
    console.log("Search Q: " + fixed_text);
    let url = "";
    //check type of query
    if (sType == "movies"){
        if (option == "" || option == null){
            url = movieUrl + apiKey + "&query=" + fixed_text + "&page=" + _page;
        } else {
            url = tMovieUrl + apiKey + "&page=" + _page;
        }
    } else if (sType == "tv") {
        if (option == "" || option == null){
            url = tvShowUrl + apiKey + "&query=" + fixed_text + "&page=" + _page;
        } else {
            url = ttvShowUrl + apiKey + "&page=" + _page;
        }
    }
    console.log(url);
    fetch(url)
    .then(CheckError) //handling possible errors 4xx & 5xx
    .then(function(data){
        //check data for pages
        let pages = data.total_pages
        console.log("Pages: " + pages);
        //add pages to the div
        const divPages = document.getElementById("div-pages");
        //we must limit for now the pages from pages to 20
        if (pages > 20){pages = 20;}
        for(let i = 1; i <= pages; i++){
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = i;
            a.setAttribute("class","text-bold text-under-pages");
            if (i == _page){
                a.style.textDecoration = "underline";
                a.style.fontWeight = "bold";
            }
            li.setAttribute("id", "li-" + i);
            li.setAttribute("class","pages");
            // li.addEventListener("click",process_query(searchType,));
            li.addEventListener("click",resolveId);
            li.appendChild(a);
            divPages.appendChild(li);
        }
        let l_array = data.results.length;
        // console.log("Length Array: " + l_array);
        if(l_array > 0){
            //adding results to label on top
            p_data_results.textContent += "Results: " + l_array + " found.";
            
            let data_ar = data.results;
            console.log(data_ar);
            data_ar.forEach(element => {
                // console.log(element);
                // for(let field in element){
                //     console.log(field,element[field]);
                // }
                //create the main div element for every search result
                let div = document.createElement("div");
                //create 2 more divs to arrange the text + img
                let div_l = document.createElement("div");
                let div_r = document.createElement("div");
                //attrib
                div_l.setAttribute("class","div-img-search");
                div_r.setAttribute("class","div-text-search")

                let title_p = document.createElement("p");
                let overview_p = document.createElement("p");
                let voteAvg_p = document.createElement("p"); //we must limit to 100chars
                let release_date = document.createElement("p");
                let id_p = document.createElement("p");
                let img_search = document.createElement("img");
                //adding all data content to div right
                div_r.appendChild(title_p);
                div_r.appendChild(overview_p);
                div_r.appendChild(voteAvg_p);
                div_r.appendChild(release_date);
                div_r.appendChild(id_p);
                //adding img to the div left
                div_l.appendChild(img_search);
                title_p.textContent = "Original Title: " + (element.original_title || element.original_name);
                overview_p.textContent = "Overview: " + element.overview.substring(0, 150) + " ..."; //limited chars
                voteAvg_p.textContent = "Vote Average: " + element.vote_average;
                release_date.textContent = "Release Date: " + (element.release_date || element.first_air_date);
                id_p.textContent = "Id: " + element.id;
                //check if the image return null
                if (element.poster_path !== null){
                    img_search.src = imagePw92Url + element.poster_path;
                } else {
                    img_search.src = "./media-images/no-mini-image.jpg";
                }
                img_search.alt = fixed_text;
                //setting attributes
                img_search.setAttribute("class","img-search");
                title_p.setAttribute("class","p-bold");
                overview_p.setAttribute("class","p-italic")
                // div.style.border = "1px solid black";
                div.style.borderRadius = "8px";
                div.setAttribute("id",element.id);
                //setting main div class to handle in css
                div.setAttribute("class","searchR-div");
                div.addEventListener("click",function(){//adding the click event for every div
                    // alert(div.id);
                    show_details_movie(div.id);
                });
                // if (!document.getElementById("data_results")){
                //     let p_data_results = document.createElement("p");
                //     p_data_results.textContent = "Results: " + l_array + " found.";
                //     p_data_results.setAttribute("id","data_results");
                //     //append to search results the amount of results found
                //     search_results.appendChild(p_data_results);
                // }
                //append to main div
                div.appendChild(div_l);
                div.appendChild(div_r);
                //append to results-div
                search_results.appendChild(div);
                
            });

        }else if (l_array == 0 || l_array == null){
            let message = " No Movie was Found! ";
            console.log(message);
            p_data_results.textContent += message;
        }
    })
    .catch(function(error){//handling network errors
        //error
        console.log(error);
    });
    // .then(meassureTimeExec());

    console.log("End Query!");
    //calculations to meassure time of execution
    var end = window.performance.now();
    var dur = roundNumber(end - start);
    console.log("Time of Execution: " + dur);
    p_data_results.textContent += " Found results in " + dur + " ms.";
}
function checkOldElements(){
    //search for divs & elements already created
    if (document.querySelectorAll(".searchR-div").length > 0){
        document.querySelectorAll(".searchR-div").forEach(e => e.remove());
        p_data_results.textContent = "";
    }
    console.log(".Pages found: " + document.querySelectorAll(".pages").length);
    if (document.querySelectorAll(".pages").length > 0){
        document.querySelectorAll(".pages").forEach(e => e.remove());
    }
    //check search type
    searchType = document.querySelector('input[name="queryType"]:checked').value;
    
}
function resolveId(){
    let id = this.id;
    let _id = this.id.split("-")[1];
    // console.log(_id);
    //check and delete prevois results
    checkOldElements();
    process_query(searchType,_id);
}
function keyboard(e){
    let eventKeyboard = e || window.event;
    let keyPressed = eventKeyboard.keyCode;
    // alert(keyPressed);
}

function meassureTimeExec(){
    console.log("End Query!");
    //calculations to meassure time of execution
    var end = window.performance.now();
    var dur = roundNumber(end - start);
    //reset start
    start = 0;
    console.log("Time of Execution: " + dur);
    p_data_results.textContent += " Found results in " + dur + " ms.";
}

function roundNumber(num){
    return parseFloat(num).toFixed(2);
}

function requestMovieById(id,sType){
    const movieIdUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=`;
    const tvShowIdUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=`;
    let url = "";
    //check type of query
    console.log("Query Type: " + sType);
    if (sType == "movies"){
        url = movieIdUrl + apiKey + appendToUrl;
    } else {
        url = tvShowIdUrl + apiKey + appendToUrl;
    }
    console.log(url)
    fetch(url)
    .then(CheckError) //handling response + 4xx & 5xx errors
    .then(function(data){
        console.log("Inside the Fecth");
        console.log(data);
        //let us handle the data here then

        //let us get an array of the production companies logos
        let divPcImg = document.getElementById("production-comp-cont");
        data.production_companies.forEach(item => {
            // console.log(item.name,item.logo_path);
            let logo_path = item.logo_path;
            let pcName = item.name;
            let urlImage = "https://image.tmdb.org/t/p/w92";
            if (logo_path != null){
                let imgPC = document.createElement("img");    
                imgPC.src = urlImage + logo_path;
                imgPC.alt = pcName;
                imgPC.title = pcName;
                imgPC.setAttribute("id",pcName);
                imgPC.setAttribute("class","pcLogo");
                divPcImg.appendChild(imgPC);
            }
        });

        //present results
        document.getElementById("movie-id").textContent = data.id;
        if (data.poster_path == null){
            document.getElementById("img-poster").src = nullPosterUrl;
        } else {
            document.getElementById("img-poster").src = imagePw500Url + data.poster_path;
        }
        document.getElementById("original-title").textContent = "Original Title: " + (data.original_title || data.original_name);
        document.getElementById("movie-ori-lang").textContent = "Movie Original Language: " + data.original_language;
        if (sType == "movies"){    
            let moto = data.tagline;
            if (moto == "" || moto.length == 0 || moto == null){ moto = "It does not have a Moto :(";}
            document.getElementById("tag-line").textContent = "Moto: " + '"' + moto + '"';
        }
        document.getElementById("movie-popularity").textContent = "Popularity: " + data.popularity;
        document.getElementById("movie-vote-avg").textContent = "Vote Avg.: " + data.vote_average;
        document.getElementById("movie-vote-count").textContent = "Vote Count: " + data.vote_count;
        document.getElementById("movie-overview").textContent = "OverView: " + data.overview;
        //youtube trailer
        console.log("Videos Found: " + data.videos.results.length);
        if (data.videos.results.length > 0){
            if (data.videos.results[0].site == "YouTube"){
                console.log("Trailer at Key: " + data.videos.results[0].key);
                //we add the video sr to the iframe
                document.getElementById("video-trailer").src = "https://www.youtube.com/embed/" + data.videos.results[0].key;
            }
        }
    })
    .catch(function(error){ //handling errors
        console.log(error);
        return error;
    });
        // return fetch(url)
        // .then((response) => response.json())
        // .then((responseData) => {
        //     // console.log("Inside the fetch");
        //     // console.log(responseData);
        //     return responseData;
        // })
        // .catch(error => console.warn(error));
}

function show_details_movie(id){
    // alert(id);
    let proP_div = overlayBox.style.getPropertyValue('--display-div');
    if (proP_div == "flex") {
        //check for elements created to destroy them
        
         if (document.querySelectorAll(".pcLogo").length > 0){
            document.querySelectorAll(".pcLogo").forEach(e => e.remove());
        }
        if (document.getElementById("img-poster")){
            document.getElementById("img-poster").src = "";
        }
        overlayBox.style.setProperty('--display-div','none');
    }
    else {
        //now we search by ID for the selected Movie
        if (!isNaN(id)){    
            requestMovieById(id,searchType);
        }
        //set to flex to show div
        overlayBox.style.setProperty('--display-div','flex');
    }
}