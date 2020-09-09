const leapYears = function(year){
    if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
        return true;
    }
    return false;
    // return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
};
//console.log(leapYears(34992));
module.exports = leapYears;