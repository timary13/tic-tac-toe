const chai = require('../test/setup-mocha');

class TicTacToe {
    constructor() {
        console.log("NEW GAME");
        this.currentPlayer = 'x';
        this.field = [[null, null, null], [null, null, null], [null, null, null]];
        this.winner = null;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
        //if cell is empty
        if(this.field[rowIndex][columnIndex] == null) {
            console.log("TURN");
            this.field[rowIndex][columnIndex] = this.currentPlayer;
            //full row or full column
            console.log("rowIndex " + rowIndex + " columnIndex " + columnIndex);
            console.log("this.currentPlayer " + this.currentPlayer);
            this.field.map((item) => console.log("itemrow " + item));

            //check row and column
            let player = this.currentPlayer;
            if(!this.field[rowIndex].reduce(function(acum, item) {
                //console.log("nextTurn reduce1 " + acum);
                return parseInt(acum + (item === player ? acum += 0 : acum += 1));
                }, 0)
                || !this.field.reduce(function(acum, item) {
                    //console.log("nextTurn reduce2 " + acum);
                    return parseInt(acum + (item[columnIndex] === player ? acum += 0 : acum += 1));
                    }, 0)) {
                this.winner = this.currentPlayer;
            }
            //check diagonals
            else if(this.field[1][1] === player) {
                //main diagonal
                if((this.field[0][0] === player && this.field[2][2] === player)
                || (this.field[0][2] === player && this.field[2][0] === player)) {
                    this.winner = this.currentPlayer;
                }
            }
            //change player
            this.currentPlayer = this.currentPlayer == 'o' ? 'x' : 'o';
        }
    }

    isFinished() {
        if(this.winner != null || this.isDraw())
            return true;
        else
            return false;
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        return !this.field.reduce( function(acum, item) {
            //console.log("reduce " + acum);
            return parseInt(acum + item.reduce((acum1, item1) => item1 == null ? acum1 += 1 : acum1 += 0, 0));
        }, 0);
    }

    isDraw() {
        console.log("noMoreTurns " + this.noMoreTurns());
        console.log("winner " + this.winner);
        return this.noMoreTurns() && this.winner == null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
