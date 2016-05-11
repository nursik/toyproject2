;'use strict'

function GameModelFabric() {
    var score;
    var bestScore;
    var gameState;
    var gameLost;
    var transitions;
    
    this.init = function init() {
        score = 0;
        bestScore = this.getBestScore();
        gameState = [[null, null, null, null],
                     [null, null, null, null],
                     [null, null, null, null],
                     [null, null, null, null]];
        gameLost = false;
        transitions = [];
        _addBlock.call(this);
        _addBlock.call(this);
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
    
    // turns 2-length array clockwise;
    function _turnPair(arr) {
        return [arr[1], 3 - arr[0]];
    }
	
	function _turnTransitions(num) {
		for (var k = 0; k < num; k++) {
			for (var i = 0; i < transitions.length; i++) {
				if ("new" in transitions[i]) {
					var temp = _turnPair(transitions[i]["new"]);
					transitions[i]["new"][0] = temp[0];	
					transitions[i]["new"][1] = temp[1];	
				}
				else {
					transitions[i].a = _turnPair(transitions[i].a);
					transitions[i].b = _turnPair(transitions[i].b);					
				}
			}
		}
	}
    
    this.up = function up() {
        var wasMove = false;
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if (gameState[i][j] === null) {
                    continue;
                }

                var secondIndex = i + 1;
                while (secondIndex < 3 && gameState[secondIndex][j] == null) {
                    secondIndex++;
                }

                if (secondIndex < 4 && gameState[i][j] === gameState[secondIndex][j]) { // if there are two boxes, which can be merged together
                    score += gameState[i][j] * 2;
                    if (score > bestScore) {
                        bestScore = score;
                    }
                    
                    var dstIndex = i;
                    
                    while (dstIndex - 1 >= 0 && gameState[dstIndex - 1] === null) {
                        dstIndex--;
                    }
                    
                    gameState[secondIndex][j] = null;                    
                    gameState[dstIndex][j] = gameState[i][j] * 2;
                    
					wasMove = true;  
					transitions.push({
						"a": [secondIndex, j],
						"b": [dstIndex, j],
						"del": true,
					});
					
					transitions.push({
						"a": [i, j],
						"b": [dstIndex, j],
						"del": true,
					});
					
					transitions.push({
						"new": [dstIndex, j, gameState[dstIndex][j]],
					});
					
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
                        wasMove = true;
						transitions.push({
							"a": [i, j],
							"b": [dstIndex, j],
							"del": false,
						});  
                    }                    
                }
            }
        }
        if (wasMove) {
            _addBlock.call(this);
        }
    }
    
    this.down = function down() {
        _turnModel.call(this, 2);
        this.up();
        _turnModel.call(this, 2);
		_turnTransitions.call(this, 2);
    }
    
    this.right = function right() {
        _turnModel.call(this, 3);
        this.up();
        _turnModel.call(this, 1);
		_turnTransitions.call(this, 1);
    }
    
    this.left = function left() {
        _turnModel.call(this, 1);
        this.up();
        _turnModel.call(this, 3);
		_turnTransitions.call(this, 3);
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
    
    function _addBlock() {
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
            return;
        }
        
        var num = _getRandomNumber.call(this);
        var index = Number(Math.floor(Math.random() * n));
        var y = places[index][0];
        var x = places[index][1];
        gameState[y][x] = num;
		transitions.push({
			"new": [y, x, num],
		});
    }
    
    this.isGameLost = function isGameLost() {
        if (gameLost === false) {
            var notLost = false;
            
            outer1: 
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (gameState[i][j] === null) {
                        notLost = true;
                        break outer1;
                    }
                }
            }
            outer2: 
            for (var i = 0; (i < 4) && (!notLost); i++) {
                for (var j = 0; j < 3; j++) {
                    if (gameState[i][j] === gameState[i][j + 1]) {
                        notLost = true;
                        break outer2;
                    }
                }
            }
            outer3: 
            for (var i = 0; (i < 3) && (!notLost); i++) {
                for (var j = 0; j < 4; j++) {
                    if (gameState[i][j] === gameState[i + 1][j]) {
                        notLost = true;
                        break outer3;
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
    
    this.updateLocalStorage = function updateLocalStorage() {
        window.localStorage.setItem("Score", score.toString());
        window.localStorage.setItem("BestScore", bestScore.toString());
        window.localStorage.setItem("GameState", JSON.stringify(gameState));
        window.localStorage.setItem("GameLost", gameLost.toString());
    }
    
    this.getBestScore = function getBestScore() {
        var localBestScore = 0;
        if (window.localStorage.getItem("BestScore") === null) {
            window.localStorage.setItem("BestScore", 0);
        }
        else {
            localBestScore = window.localStorage.getItem("BestScore");
        }
        localBestScore = Number(localBestScore);
        if (bestScore !== undefined && bestScore > localBestScore) {
            localBestScore = bestScore;
            window.localStorage.setItem("BestScore", localBestScore);
        }
        return localBestScore;    
    }
    
    this.getCurrentScore = function getCurrentScore() {
        return score;
    }
    
	this.getTransitions = function getTransitions() {
		return transitions;
	}
    
    this.print = function print() {
        // to delete
        for (var i = 0; i < 4; i++) {
            var mes = i + ":";
            for (var j = 0; j < 4; j++) {
                if (gameState[i][j] === null) {
                    mes += "0";
                }
                else {
                    mes += String(gameState[i][j]);
                }
            }
            cl(mes);
        }
    }
}
