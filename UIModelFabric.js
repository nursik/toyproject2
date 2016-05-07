;'use strict'

function UIModelFabric() {
    var gameBox;
    var UITableBase;
    var UITable;
    var UIBlocked;
    
    this.init = function init() {
        gameBox = document.getElementById("gameBox");
        UITableBase =  [[null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null]];
        if (UITable !== undefined) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (UITable[i][j] !== null) {
                        UITable[i][j].remove();
                    }
                }
            }
        }
        UITable =  [[null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null]];   
 
        this.setUITableBase();
        UIBlocked = false;
    }
    
    this.setUITableBase = function setUITableBase() {
        var boxes = gameBox.children;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                UITableBase[i][j] = boxes[i*4+j];
            }
        }
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
    
    function _addBlock(row, column, num) {
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
    }
    
    function _moveBox(y_dst, x_dst, y_src, x_src, isDel) {
    }
    
    this.drawModel = function drawModel(model) {
        UIBlocked = true;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (UITable[i][j] !== null) {
                    UITable[i][j].remove();
                    UITable[i][j] = null;
                }
                if (model[i][j] !== null) {
                   _addBlock.call(this, i, j, model[i][j]);
                }
            }
        }
        UIBlocked = false;
    }
    
    this.updateCurrentScore = function updateCurrentScore(newScore) {
        document.getElementsByClassName("current-score")[0].innerText = "Best: " + newScore;
    }
    
    this.updateBestScore = function updateBestScore(newScore) {
        document.getElementsByClassName("best-score")[0].innerText = "Score: " + newScore;
    }
    
    this.isBlocked = function isBlocked() {
        return UIBlocked;
    }
    
    this.showLoss = function showLoss() {
        UIBlocked = true;
        alert("LOST!");
    }
    
    this.getUITable = function getUITable() {
        // for delete
        return UITable;
    }
}