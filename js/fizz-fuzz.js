let answer = parseInt(prompt("Please enter the number"));
if (answer > 0){
    let cen = false;
    for (let i=1; i <= answer; i++){
        if ((i % 3 == 0) && (i % 5 == 0) && (!cen)){ 
            alert("FizzBuzz" + i);
            cen = true;
        }
        if ((i % 3 == 0) && !cen) { 
            alert("Fizz"+ i);
            cen = true;
        }
        if ((i % 5 == 0) && !cen){
            alert("Buzz"+ i);
        }
        cen = false;
    }

} else {
    alert("Please a number greater than 0");
}