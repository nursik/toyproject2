;'use strict'

function cl(text) {
    console.log(text);
}

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
        
        return this;
    }
    
    this.isGameLost = function isGameLost() {
        if (gameLost === false) {
            var notLost = false;
            outer: for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 3; j++) {
                    if (gameState[i][j] === gameState[i][j + 1]) {
                        notLost = true;
                        break outer;
                    }
                }
            }
            outer: for (var i = 0; i < 3; i++) {
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

function UIModelFabric() {
    var gameBox;
    var UITableBase;
    var UITable;
    var UIBlocked;
    
    this.init = function init(gameBoxEl) {
        gameBox = gameBoxEl;
        UITableBase =  [[null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null]];
        UITable =  [[null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null]];   
 
        this.setUITable();
        UIBlocked = false;
        return this;
    }
    
    this.setUITable = function setUITable() {
        var boxes = gameBox.children;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                UITableBase[i][j] = boxes[i*4+j];
            }
        }
        return this;
    }
    
    function _getFontSize(num) {
        if (num < 100) {
            return 60;
        }
        if (num < 1000) {
            return 48;
        }
        if (num < 10000) {
            return 36;
        }
        return 24;
    }
    
    this.addBlock = function addBlock(row, column, num) {
        var el = document.createElement("div");
        var base = UITableBase[row][column];
        
        el.id = "box" + row + "-" + column;
        el.className = "upper-box";
        el.innerText = num;
        el.style.fontSize = _getFontSize(num) + "px";
        el.style.width = base.offsetWidth + "px";
        el.style.height = base.offsetHeight + "px";
        el.style.top = base.offsetTop + "px";
        el.style.left = base.offsetLeft + "px";
        gameBox.appendChild(el);
        
        UITable[row][column] = el;
        return el;
    }
    this.g = function g() {
        return UITableBase;
    }
}

var GameModel;
var UIModel;

window.onload = function() {
    UIModel = new UIModelFabric();
    GameModel = new GameModelFabric();
    
    GameModel.init();
    UIModel.init(document.getElementById("gameBox"));
    UIModel.addBlock(0, 0, 4);
    UIModel.addBlock(0, 1, 16);
    UIModel.addBlock(0, 2, 512);
    UIModel.addBlock(0, 3, 4096);
    UIModel.addBlock(1, 0, 65564);
}














