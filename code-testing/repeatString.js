function repeatString(word,x){
    if (x < 0){return 'ERROR'};
    let str = "";
    for (i=0; i < x; i++){
        str+= word;
    }
    return str;
}
module.exports = repeatString;