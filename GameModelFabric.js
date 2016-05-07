;'use strict'

function GameModelFabric() {
    var gameState;
    var score;
    var gameLost;
    
    this.init = function init() {
        score = 0;
        gameState = [[null, null, null, null],
                     [null, null, null, null],
                     [null, null, null, null],
                     [null, null, null, null]];
        gameLost = false;
    }
    
    function _turnModel(numberOfRotations) {
        // Turns gameState-2D array clockwise
        for (var k = 0; k < numberOfRotations; k++) {
            var new_state = [[null, null, null, null],
                            [null, null, null, null],
                            [null, null, null, null],
                            [null, null, null, null]];
                       
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    new_state[i][j] = gameState[3 - j][i];
                }
            }    
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    gameState[i][j] = new_state[i][j];
                }
            }                   
        }
    }
    
    // function _turnTransitions(arr, numberOfRotations) {
    //     for (var k = 0; k < numberOfRotations; k++) {
    //         for (var i = 0; i < arr.transitions.length; i++) {
    //             var temp = [null, null];
    //             temp[0] = arr.transitions[i].src[1];
    //             temp[1] = 3 - arr.transitions[i].src[0];
    //             arr.transitions[i].src = temp.slice();
    //             temp = [null, null];
    //             temp[0] = arr.transitions[i].dst[1];
    //             temp[1] = 3 - arr.transitions[i].dst[0];
    //             arr.transitions[i].dst = temp.slice();
    //         }
    //     }
    //     for (var k = 0; k < 4 - numberOfRotations; k++) {
    //         for (var i = 0; i < arr.newBoxes.length; i++) {
    //             var x = arr.newBoxes[i].x;
    //             arr.newBoxes[i].x = arr.newBoxes[i].y;
    //             arr.newBoxes[i].y = 3 - x;
    //         }
    //     }
    // }
    
    this.up = function up() {
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if (gameState[i][j] === null) {
                    continue;
                }
                var secondIndex = i + 1;
                while (secondIndex < 3 && gameState[secondIndex][j] == null) {
                    secondIndex++;
                }
                if (secondIndex < 4 && gameState[i][j] === gameState[secondIndex][j]) {
                    score += gameState[i][j] * 2;
                    var dstIndex = i;
                    
                    for (var k = 0; k < i; k++) {
                        if (gameState[k][j] === null) {
                            dstIndex = k;
                            break;
                        }
                    }
                    gameState[secondIndex][j] = null;                    
                    gameState[dstIndex][j] = gameState[i][j] * 2;
                    
                    if (dstIndex !== i) {
                        gameState[i][j] = null;                    
                    }
                    i = secondIndex;
                }
                else {
                    var dstIndex = i;
                    
                    while (dstIndex - 1 >= 0 && gameState[dstIndex - 1][j] === null) {
                        dstIndex--;
                    }
                    gameState[dstIndex][j] = gameState[i][j];
                    if (dstIndex !== i) {
                        gameState[i][j] = null;                    
                    }                    
                }
            }
        }
    }
    
    this.down = function down() {
        _turnModel.call(this, 2);
        var transitions = this.up();
        _turnModel.call(this, 2);
    }
    
    this.right = function right() {
        _turnModel.call(this, 3);
        var transitions = this.up();
        _turnModel.call(this, 1);
    }
    
    this.left = function left() {
        _turnModel.call(this, 1);
        var transitions = this.up();
        _turnModel.call(this, 3);
    }
    
    function _getRandomNumber() {
        var rd = 0.0;
        for (var i = 1; i < 5; i++) {
            if (score >= i * 100) {
                rd = 0.1 * i;
            }
        }
        if (score >= 500) {
            rd =  0.5;
        }
        if (Math.random() < rd) {
            return 4;
        }
        return 2;
    }
    
    this.addBlock = function addBlock() {
        var places = [];
        
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (gameState[i][j] === null) {
                    places.push([i, j]);
                }
            }
        }
        
        var n = places.length;
        if (n === 0) {
            // no space for new block
            return this;
        }
        
        var num = _getRandomNumber.call(this);
        var index = Number(Math.floor(Math.random() * n));
        var x = places[index][0];
        var y = places[index][1];
        gameState[x][y] = num;
    }
    
    this.isGameLost = function isGameLost() {
        if (gameLost === false) {
            var notLost = false;
            
            outer: for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (gameState[i][j] === null) {
                        notLost = true;
                        break outer;
                    }
                }
            }
            
            outer: for (var i = 0; i < 4 && !notlost; i++) {
                for (var j = 0; j < 3; j++) {
                    if (gameState[i][j] === gameState[i][j + 1]) {
                        notLost = true;
                        break outer;
                    }
                }
            }
            outer: for (var i = 0; i < 3 && !notlost; i++) {
                for (var j = 0; j < 4; j++) {
                    if (gameState[i][j] === gameState[i + 1][j]) {
                        notLost = true;
                        break outer;
                    }
                }
            }
            if (notLost === false) {
                gameLost = true;
            }
        }
        return gameLost;
    }
    
    this.getGameState = function getGameState() {
        var copied = [];
        for (var i = 0; i < 4; i++) {
            copied.push(gameState[i].slice());
        }
        return copied;
    }
    
    this.getScore = function getScore() {
        return score;
    }
    
    this.print = function print() {
        for (var i = 0; i < 4; i++) {
            var mes = "";
            for (var j = 0; j < 4; j++) {
                if (gameState[i][j] === null) {
                    mes += "0 ";
                }
                else {
                    mes += String(gameState[i][j]) + " ";
                }
            }
            cl(mes);
            cl("");
        }
    }
}
