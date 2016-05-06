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
        return this;
    }
    
    this.setUITableBase = function setUITableBase() {
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

        setTimeout(function(){
            el.style.width = base.offsetWidth + 10 + "px";
            el.style.height = base.offsetHeight + 10 + "px";
            el.style.top = base.offsetTop - 5 + "px";
            el.style.left = base.offsetLeft - 5 + "px";
        }, 150);
        
        setTimeout(function(){
            el.style.width = base.offsetWidth + "px";
            el.style.height = base.offsetHeight + "px";
            el.style.top = base.offsetTop + "px";
            el.style.left = base.offsetLeft + "px";
        }, 300);
        gameBox.appendChild(el);
        
        UITable[row][column] = el;
        return el;
    }
    
    function _moveBox(y_dst, x_dst, y_src, x_src, isDel) {
        cl(arguments);
        var box = UITable[y_src][x_src];
        cl(box);
        var baseBox = UITableBase[y_dst][x_dst];
        box.style.top = baseBox.offsetTop + "px";
        box.style.left = baseBox.offsetLeft + "px";
        if (isDel) {
            box.addEventListener("transitionend", function(){
                box.remove();
            });
        }
        else {
            UITable[y_dst][x_dst] = UITable[y_src][x_src];
        }
        UITable[y_src][x_src] = null;
    }
    
    this.applyTransitions = function applyTransitions(transitions) {
        UIBlocked = true;
        for (var i = 0; i < transitions.transitions.length; i++) {
            var el = transitions.transitions[i];
            _moveBox(el.dst[0], el.dst[1], el.src[0], el.src[1], el.trm);
        }
        for (var i = 0; i < transitions.newBoxes.length; i++) {
            var el = transitions.newBoxes[i];
            _addBlock(el.y, el.x, el.num);
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
}