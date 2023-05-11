class Board{
    constructor(){
        this.moveList = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
        this.visitedPaths = [];
        this.queue = [];
    }
    
    findShortestPath(startPosition, endPosition){
        this.visitedPaths = [];
        this.queue = [];
        if (!startPosition || !endPosition){
            throw Error('Please include a start and end position!');
        } else if (endPosition[0] < 1 || endPosition[0] > 8 || endPosition[1] < 1 || endPosition[1] > 8){
            throw Error('Your end position is out of bounds!')
        } else if (startPosition[0] < 1 || startPosition[0] > 8 || startPosition[1] < 1 || startPosition[1] > 8){
            throw Error('Your start position is out of bounds!')
        }
        let currentKnight = new Knight(startPosition);
        while (currentKnight.position.toString() !== endPosition.toString()){
            let currentPosition = currentKnight.position;
            this.visitedPaths.push(currentPosition);
            let newMoves = this.#getMoves(currentPosition);
            this.appendNewMovesToQueue(currentKnight, newMoves);
            currentKnight = this.queue.shift();
        }
        console.log(`You made it in ${currentKnight.path.length-1} moves! Here is your path:`)
        for (let i=0; i<currentKnight.path.length;i++){
            console.log(currentKnight.path[i])
        }
    }
    
    #getMoves = (position) => {
        let potentialMoves = [];
        for (let move of this.moveList){
            potentialMoves.push([position[0] + move[0], position[1] + move[1]])
        }
        potentialMoves = potentialMoves.filter((pos) => 
            pos[0] >= 1 && pos[0] <= 8 && pos[1] >= 1 && pos[1] <= 8
        )
        potentialMoves = potentialMoves.filter((move)=>{
            return (!this.#includesDeep(this.queue, move) && (!this.#includesDeep(this.visitedPaths,move)))
        })
        return potentialMoves;
    }

    #includesDeep = (array, value) => {
        return array.some((subArray) => {
            if (Array.isArray(subArray)){
                return subArray.every(
                    (subArrayElem, index) => subArrayElem === value[index]
                );
            } else if (subArray instanceof Knight){
                return subArray.position.every(
                    (subArrayElem, index) => subArrayElem === value[index]
                );
            }
        });
      }

    appendNewMovesToQueue(knightObject, newMoves){
        for (let move of newMoves){
            let newKnight = new Knight(move,knightObject.path);
            this.queue.push(newKnight)
        }
    }
}

class Knight{
    constructor(position, path){
        if (position === undefined){
            throw Error('Knight has no position!')
        } else if (typeof(position) !== 'array' && position.length !== 2){
            throw Error('Knight\'s position are configured incorrectly!');
        }
        this.position = position;
        this.path = Array.isArray(path) ? path.concat([this.position]) : [this.position];
    }
}

board = new Board();
