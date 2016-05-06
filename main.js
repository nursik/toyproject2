;'use strict'

function cl(text) {
    console.log(text);
}

function GameFabric() {
    var gameState;
    var score;
    var gameLost;
    
    this.init = function init() {
        this.score = 0;
        this.gameState = [[null, null, null, null],
                          [null, null, null, null],
                          [null, null, null, null],
                          [null, null, null, null]];
        this.gameLost = false;
        this.addBlock();
        this.addBlock();
        return this;
    }
    
    function _turnModel(numberOfRotations) {
        // Turns gameState-2D array clockwise
        for (var k = 0; k < numberOfRotations; k++) {
            var new_state = [[null, null, null, null],
                            [null, null, null, null],
                            [null, null, null, null],
                            [null, null, null, null]];

            var n = new_state.length;                         
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    new_state[i][j] = this.gameState[n - j - 1][i];
                }
            }    
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    this.gameState[i][j] = new_state[i][j];
                }
            }                   
        }
    }
    this.up = function up() {
        return this;
    }
    this.down = function down() {
        return this;
    }
    this.left = function left() {
        return this;
    }
    this.right = function right() {
        return this;
    }
    function _getRandomNumber() {
        var rd = 0.0;
        for (var i = 1; i < 5; i++) {
            if (this.score >= i * 100) {
                rd = 0.1 * i;
            }
        }
        if (this.score >= 500) {
            rd =  0.5;
        }
        if (Math.random() < rd) {
            return 4;
        }
        return 2;
    }
    this.addBlock = function addBlock() {
        var places = [];
        var n = this.gameState.length;
        
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (this.gameState[i][j] === null) {
                    places.push([i, j]);
                }
            }
        }
        
        n = places.length;
        if (n === 0) {
            // no space for new block
            return this;
        }
        
        var num = _getRandomNumber.call(this);
        var index = Number(Math.floor(Math.random() * n));
        var x = places[index][0];
        var y = places[index][1];
        this.gameState[x][y] = num;
        
        return this;
    }
    this.isGameLost = function isGameLost() {
        return this.gameLost;
    }
    this.getGameState = function getGameState() {
        return this.gameState;
    }
    this.print = function print() {
        for (var i = 0; i < this.gameState.length; i++) {
            var mes = "";
            for (var j = 0; j < this.gameState.length; j++) {
                if (this.gameState[i][j] === null) {
                    mes += "0";
                }
                else {
                    mes += String(this.gameState[i][j]);
                }
            }
            cl(mes);
        }
    }
    return this;
}

function UIFabric() {
    
}

var GameModel = new GameFabric();
window.onload = function() {
    
}














