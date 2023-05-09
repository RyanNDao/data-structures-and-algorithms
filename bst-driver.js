import * as BinarySearchTree from './binary-search-tree.js';

let numberOfNodes = Math.floor( Math.random()*25 )+10;
let nodesList = []
for (let i = 0; i<numberOfNodes; i++){
    nodesList.push(Math.floor(Math.random()*1000))
}

let newTree = new BinarySearchTree.Tree(BinarySearchTree.removeDuplicates(nodesList));
BinarySearchTree.prettyPrint(newTree.root);

console.log(`Tree balanced: ${newTree.isBalanced(newTree.root)}`)
console.log(`Level order: [${newTree.levelOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`Pre order: [${newTree.preOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`Post order: [${newTree.postOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`In order: [${newTree.inOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log('Unbalancing tree...')

newTree.insert(5555,newTree.root)
newTree.insert(5556,newTree.root)
newTree.insert(5557,newTree.root)
newTree.insert(5558,newTree.root)
newTree.insert(5559,newTree.root)
BinarySearchTree.prettyPrint(newTree.root);

console.log(`Tree balanced: ${newTree.isBalanced(newTree.root)}`)
console.log('Rebalancing tree...')

newTree.rebalance()
BinarySearchTree.prettyPrint(newTree.root);
console.log(`Tree balanced: ${newTree.isBalanced(newTree.root)}`)
console.log(`Level order: [${newTree.levelOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`Pre order: [${newTree.preOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`Post order: [${newTree.postOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)
console.log(`In order: [${newTree.inOrder(newTree.root, BinarySearchTree.getNodeValue)}]`)