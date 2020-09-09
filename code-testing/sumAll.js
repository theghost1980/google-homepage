function sumAll(a,b){
    if (typeof(a) != 'number' || typeof(b) != 'number'){ return 'ERROR'};
    if (a < 0 || b < 0){ return 'ERROR'};
    let sum = 0;
    if (a < b){
        for (let i=a; i<=b; i++){
            sum+= i;
        }
    } else if ( a > b){
        for (let i=b; i<=a; i++){
            sum+= i;
        }
    }
    return sum;
}
// console.log(sumAll(1,4));
module.exports = sumAll;