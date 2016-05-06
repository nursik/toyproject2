;'use strict'

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