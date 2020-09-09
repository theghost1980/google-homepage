console.time('removeFromArray');
function removeFromArray(...elem){
    let array = elem[0];
    let items = elem.slice(1);
    // return "Array: " + array + " Items: " + items;
    for (let i =0; i < items.length; i++){
        const index = array.indexOf(items[i]);
        if (index > -1){
            array.splice(index,1);
        }
    }
    return array;
}
console.log(removeFromArray([1,2,3,4,5,6,7,8,9,0,'1','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2'],1,2,3));
console.timeEnd('removeFromArray');
// module.exports = removeFromArray;