let player_games = 0;
let computer_games = 0;
let g_counter = 0;
let pCounter = 0;
let cCounter = 0;

function reset_results(){ // to reset result after t time
    document.getElementById("results").innerHTML = "|=|=|=|=|=|=|=|";
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function comp_choosing(){
    let options = ['paper','rock','scissor'];
    let i = getRndInteger(0,2);
    return options[i]; //return the element as string.
}

function choose_msg_win(){
    let messages = ['You Rock, You Win!','You are the best, you win','Damn you are good'];
    return messages[getRndInteger(0,2)];
}

function choose_msg_lost(){
    let messages = ['The computer got you!','Not enough luck buddy!','Damn you are bad for this :('];
    return messages[getRndInteger(0,2)];
}

function reset_all() {
    g_counter = 0;
    reset_results();
    document.getElementById("p_r1").innerHTML = "";
    document.getElementById("c_r1").innerHTML = "";
    document.getElementById("p_r2").innerHTML = "";
    document.getElementById("c_r2").innerHTML = "";
    document.getElementById("p_r3").innerHTML = "";
    document.getElementById("c_r3").innerHTML = "";
    document.getElementById("cont_p").innerHTML = "";
    document.getElementById("cont_c").innerHTML = "";
    pCounter = 0;
    cCounter = 0;
}

function choose(p_option){
    // alert(p_option);
    // alert(comp_choosing()); // just testing
    let mess = "";
    let c_choice = comp_choosing();
    //incrementing game counter as he hit click
    g_counter++;
        //logic of the game
        if (p_option == c_choice){
            //tie
            mess = "Tie! try Again";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        }
        if (p_option == 'paper' && c_choice == 'rock'){
            //player wins
            pCounter++;
            mess = "Good!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        } else if (p_option == 'paper' && c_choice == 'scissor'){
            //comp wins
            cCounter++;
            mess = "Ouch!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        } else if (p_option == 'rock' && c_choice == 'paper'){
            //comp wins
            cCounter++;
            mess = "Not Good!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        } else if (p_option == 'rock' && c_choice == 'scissor'){
            //player wins
            pCounter++;
            mess = "Nice!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        } else if (p_option == 'scissor' && c_choice == 'paper'){
            //player wins
            pCounter++;
            mess = "Good!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        } else if (p_option == 'scissor' && c_choice == 'rock'){
            //comp wins
            cCounter++;
            mess = "That Hurts!";
            document.getElementById("results").innerHTML = mess;
            setTimeout(reset_results,1500);
        }
        //we present the player/comp choices
        if (g_counter == 1){
            document.getElementById("p_r1").innerHTML = p_option;
            document.getElementById("c_r1").innerHTML = c_choice;
            document.getElementById("cont_p").innerHTML = pCounter;
            document.getElementById("cont_c").innerHTML = cCounter;
        } else if (g_counter == 2){
            document.getElementById("p_r2").innerHTML = p_option;
            document.getElementById("c_r2").innerHTML = c_choice;
            document.getElementById("cont_p").innerHTML = pCounter;
            document.getElementById("cont_c").innerHTML = cCounter;
        } else if (g_counter == 3){
            document.getElementById("p_r3").innerHTML = p_option;
            document.getElementById("c_r3").innerHTML = c_choice;
            document.getElementById("cont_p").innerHTML = pCounter;
            document.getElementById("cont_c").innerHTML = cCounter;
            //make the counts
             if (pCounter > cCounter){
                //player wins
                mess = choose_msg_win();
            } else if (pCounter < cCounter){
                //comp wins
                mess = choose_msg_lost();
            } else  if (pCounter == cCounter){
                //tied
                mess = "Holy Cow It is a Tie";
            }
            //final results:
            document.getElementById("results").innerHTML = mess;
            //game over and reset counter and game
            //we reset the results label after t time
            //reset the table
            setTimeout(reset_all,3500);
        }
}
