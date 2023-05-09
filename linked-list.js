class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    
    append = (value) => {
        let newNode = new Node(value, null);
        if (this.head === null){
            this.head = newNode;
        } 
        if (this.tail === null){
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    prepend = (value) => {
        let newNode = new Node(value, null);
        if (this.head === null){
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        if (this.tail === null){
            this.tail = newNode;
        }
    }

    get size() {
        let currentNode = this.head;
        let length = 0
        while (currentNode){
            length += 1;
            currentNode = currentNode.next;
            if (currentNode === null){
                break
            }
        }
        return length
    }

    at = (idx) => {
        if (idx-1 > this.size){
            return NaN;
        }
        let currentNode = this.head;
        for (let i=0; i<idx; i++){
            currentNode = currentNode.next;
        }
        return currentNode
    }

    pop = () => {
        if (this.size === 1){
            this.head = null;
            this.tail = null;
        } else if (this.size !== 0){
            this.at(this.size-2).next = null;
            this.tail = this.at(this.size-1)
        } 
    }

    contains = (valueToSearch) => {
        let currentNode = this.head;
        for (let i = 0; i<this.size; i++){
            if (currentNode.value === valueToSearch){
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }

    find = (valueToSearch) => {
        let currentNode = this.head;
        for (let i = 0; i<this.size; i++){
            if (currentNode.value === valueToSearch){
                return i;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    toString = () => {
        let stringToReturn = '';
        let currentNode = this.head;
        for (let i = 0; i<this.size; i++){
            stringToReturn += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }
        stringToReturn += null;
        return stringToReturn;
    }

    insertAt = (value, idx) => {
        let insertedNode = new Node(value, null);
        if (idx === 0){
            this.prepend(value);
        } else if (idx > this.size){
            console.error('Index is greater than size of linked list');
            return
        } else if (idx === this.size){
            this.append(value);
        } else {
            let previousNode = this.at(idx-1);
            let currentNode = previousNode.next;
            previousNode.next = insertedNode;
            insertedNode.next = currentNode;
        } 
    }

    remove = (idx) => {
        if (idx > this.size-1) {
            console.error('Index is greater than size of linked list');
            return;
        } else if (idx === this.size-1){
            this.pop();
        } else if (idx === 0 && this.size === 2){
            this.head = this.head.next;
        } else {
            let previousNode = this.at(idx-1);
            previousNode.next = previousNode.next.next;
        }
    }
}

class Node {
    constructor(value=null, next=null){
        this.value = value;
        this.next = next;
    }
}

x = new LinkedList();