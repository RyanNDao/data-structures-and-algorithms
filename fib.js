function fibs(n){
    fibArray = []
    for (let i=0; i<n; i++){
        if (i === 0){
            fibArray.push(0)
        } else if (i === 1){
            fibArray.push(1)
        } else {
            fibArray.push(fibArray[i-1] + fibArray[i-2])
        }
    }
    return fibArray
}

function fibsRecursive(n){
    if (n <= 1){
        return [0]
    } else if (n === 2){
        return [0, 1]
    }
    sumOne = fibsRecursive(n-1)
    sum = sumOne.at(-1) + sumOne.at(-2)
    sumOne.push(sum)
    return sumOne
}
