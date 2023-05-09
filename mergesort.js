function mergesort(arr){
    if (arr.length <= 1){
        return arr;
    }
    const leftLen = Math.ceil(arr.length/2);
    // rightLen = arr.length - leftLen;
    let sortedLeft = mergesort(arr.splice(0,leftLen));
    let sortedRight = mergesort(arr)
    mergedList = sortedLeft.concat(sortedRight)
    newList = []
    while (mergedList.length !== 0) {
        min = Infinity;
        for (num of mergedList){
            if (num < min){
                min = num;
            }
        }
        newList[newList.length] = mergedList[mergedList.indexOf(min)]
        mergedList.splice(mergedList.indexOf(min),1);
        
    }
    return newList
}