class TreeNode {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(nodesArray){
        this.root = this.buildTree(nodesArray);
    }

    buildTree = (arr) => {
        let midIdx = Math.floor((arr.length)/2);
        if (arr.length <= 0) {
            return null;
        }
        let leftArray = arr.splice(0, midIdx);
        let newNode = new TreeNode(arr.shift())
        let rightArray = arr
        newNode.left = this.buildTree(leftArray)
        newNode.right = this.buildTree(rightArray)
        return newNode
    }

    insert = (value, node) => {
        if (node === null){
            return new TreeNode(value);
        }
        if (value < node.data){
            node.left = this.insert(value, node.left)
        } else if (value > node.data){
            node.right = this.insert(value, node.right)
        } else if (value === node.data){
            console.warn('Node already exists in tree!')
        }
        return node
    }
    
    delete = (value, node) => {
        if (node === null){
            console.warn('Node could not be found in tree!')
            return null
        }
        if (value === node.data){
            if (node.left === null && node.right === null){
                if (node.data === this.root.data){
                    this.root = null;
                }
                return null;
            } else if (node.left && node.right){
                let rightSubtree = node.right;
                let nextLargestNode = findSmallestValue(rightSubtree)
                this.delete(nextLargestNode.data, this.root)
                nextLargestNode.left = node.left;
                nextLargestNode.right = node.right;
                if (node.data === this.root.data){
                    this.root = nextLargestNode;
                }
                return nextLargestNode;
            } else {
                let childNode = node.left ? node.left : node.right;
                if (node.data === this.root.data){
                    this.root = childNode;
                }
                return childNode;
            }
        }
        if (value < node.data){
            node.left = this.delete(value, node.left);
        } else if (value > node.data){
            node.right = this.delete(value, node.right);
        }
        return node;
    }

    find = (value, node) => {
        if (node === null){
            console.warn('Node could not be found in tree!');
            return null;
        }
        if (value < node.data){
            return this.find(value, node.left);
        } else if (value > node.data){
            return this.find(value, node.right);
        } else if (value === node.data){
            return node;
        }
    }

    levelOrder = (node, func) => {
        let queue = []
        let levelOrderList = [];
        if (!node){
            return levelOrderList;
        }
        let currentNode = node;
        queue.push(currentNode);
        while (queue.length !== 0) {
            currentNode = queue.shift()
            if (currentNode.left !== null) {
                queue.push(currentNode.left)
            }
            if (currentNode.right !== null){
                queue.push(currentNode.right)
            }
            if (typeof(func)==='function') {
                levelOrderList.push(func(currentNode));
            } else {
                levelOrderList.push(currentNode);
            }
        }
        return levelOrderList
    }

    inOrder = (node, func) => {
        let inOrderList = [];
        if (node === null){
            return null;
        }
        if (node.left){
            let leftInOrderList = this.inOrder(node.left,func)
            inOrderList.push(leftInOrderList)
        }
        inOrderList.push(node);
        if (node.right){
            let rightInOrderList = this.inOrder(node.right,func)
            inOrderList.push(rightInOrderList)
        }
        inOrderList = inOrderList.flat().map((nodeObj)=>{
            if (typeof(nodeObj)==='object' && typeof(func) === 'function'){
                return func(nodeObj);
            } else {
                return nodeObj;
            }
        })
        return inOrderList
    }

    preOrder = (node, func) => {
        let preOrderList = [];
        if (node === null){
            return null;
        }
        preOrderList.push(node);
        if (node.left){
            let leftPreOrderList = this.preOrder(node.left,func)
            preOrderList.push(leftPreOrderList)
        }
        if (node.right){
            let rightPreOrderList = this.preOrder(node.right,func)
            preOrderList.push(rightPreOrderList)
        }
        preOrderList = preOrderList.flat().map((nodeObj)=>{
            if (typeof(nodeObj)==='object' && typeof(func) === 'function'){
                return func(nodeObj);
            } else {
                return nodeObj;
            }
        })
        return preOrderList
    }

    postOrder = (node, func) => {
        let postOrderList = [];
        if (node === null){
            return null;
        }
        if (node.left){
            let leftPostOrderList = this.postOrder(node.left,func)
            postOrderList.push(leftPostOrderList)
        }
        if (node.right){
            let rightPostOrderList = this.postOrder(node.right,func)
            postOrderList.push(rightPostOrderList)
        }
        postOrderList.push(node);
        postOrderList = postOrderList.flat().map((nodeObj)=>{
            if (typeof(nodeObj)==='object' && typeof(func) === 'function'){
                return func(nodeObj);
            } else {
                return nodeObj;
            }
        })
        return postOrderList
    }

    height = (node, distance) => {
        if (distance === undefined){
            distance = 0;
        }
        if (node === null){
            return 0;
        }
        if (node.left === null && node.right === null){
            return 0;
        }
        let leftDist = 1 + this.height(node.left, distance+1)
        let rightDist = 1 + this.height(node.right, distance+1)
        return Math.max(leftDist, rightDist)
    }

    depth = (nodeToSearch, currentNode, distance) => {
        if (currentNode === null){
            console.warn('Node could not be found in tree!');
            return null;
        }
        if (currentNode === undefined){
            currentNode = this.root;
        }
        if (distance === undefined){
            distance = 0;
        }
        if (nodeToSearch.data < currentNode.data){
            return this.depth(nodeToSearch, currentNode.left, distance+1);
        } else if (nodeToSearch.data > currentNode.data){
            return this.depth(nodeToSearch, currentNode.right, distance+1);
        } else if (nodeToSearch.data === currentNode.data){
            return distance;
        }
    }

    isBalanced = (currentNode) => {
        if (currentNode === null) {
            return true
        }
        let leftSubtreeHeight = this.height(currentNode.left)
        let rightSubtreeHeight = this.height(currentNode.right)
        if (Math.abs(leftSubtreeHeight-rightSubtreeHeight) > 1) {
            return false
        }
        let leftBalanced = this.isBalanced(currentNode.left)
        let rightBalanced = this.isBalanced(currentNode.right)
        

        if (!leftBalanced || !rightBalanced){
            return false;
        }

        return true
    }

    rebalance = () => {
        let sortedNodes = this.inOrder(this.root, getNodeValue)
        this.root = this.buildTree(sortedNodes)
    }
}

function getNodeValue(node){
    return node.data
}

function findSmallestValue(node){
    let currentNode = node;
    while (currentNode.left !== null){
        console.log(currentNode.left)
        currentNode = currentNode.left
    }
    return currentNode
}

function removeDuplicates(arr){
    let noDuplicateList = []
    for (let element of arr){
        if (! noDuplicateList.includes(element)){
            noDuplicateList.push(element);
        }
    }
    return mergesort(noDuplicateList);
}

function mergesort(arr){
    if (arr.length <= 1){
        return arr;
    }
    const leftLen = Math.ceil(arr.length/2);
    let sortedLeft = mergesort(arr.splice(0,leftLen));
    let sortedRight = mergesort(arr)
    let mergedList = sortedLeft.concat(sortedRight)
    let newList = []
    while (mergedList.length !== 0) {
        let min = Infinity;
        for (let num of mergedList){
            if (num < min){
                min = num;
            }
        }
        newList[newList.length] = mergedList[mergedList.indexOf(min)]
        mergedList.splice(mergedList.indexOf(min),1);
        
    }
    return newList
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

/* a = removeDuplicates( [1, 7, 23, 8] )
x = removeDuplicates( [1, 7, 4, 3, 5, 12, 9, 22])
z = removeDuplicates( [4, 69, 23, 8, 9, 67, 324,200, 14,82,13, 14, 80, 92, 102, 106, 204, 86, 99, 122, 100, 300, 400, 506, 33, 504, 6969])
r = removeDuplicates([1,5])
y = new Tree(z);
*/
export {TreeNode, Tree, getNodeValue, findSmallestValue, removeDuplicates, mergesort, prettyPrint}