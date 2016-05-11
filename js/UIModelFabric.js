;'use strict'

function UIModelFabric() {
    var gameBox;
    var UITableBase;
    var UITable;
    var UIBlocked;
    
    this.init = function init() {
        gameBox = document.getElementById("gameBox");
        document.getElementsByClassName("loss-box")[0].style.opacity = 0;        
        UITableBase =  [[null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null]];
        UIBlocked = 0;
                                
        if (UITable !== undefined) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (UITable[i][j] !== null) {
                        UITable[i][j].remove();
                        UITable[i][j] = null;
                    }
                }
            }
        }
        else {
             UITable = [[null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null],
                        [null, null, null, null]];
        }   
        
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
    
    function _getColors(num) {
        var color = {
            2:["#FFDEC4", "#776E65"],
            4:["#FFCEA8", "#776E65"],
            8:["#ECAF80", "#F9F6F2"],
            16:["#CF8A56", "#F9F6F2"],
            32:["#F15B50", "#F9F6F2"],
            64:["#FF4132", "#F9F6F2"],
            128:["#FF2A1A", "#F9F6F2"],
            256:["#EC1706", "#F9F6F2"],
            512:["#AE0900", "#F9F6F2"],
            1024:["#880C06", "#F9F6F2"],
            2048:["#750600", "#F9F6F2"],
            4096:["#6E0500", "#F9F6F2"],
        }
        if (num in color) {
            return color[num];
        }
        return ["#DDDDDD", "#F9F6F2"];
    }
    
    function _addBlock(row, column, num) {
        UIBlocked++;
        var el = document.createElement("div");
        var base = UITableBase[row][column];
        
        el.className = "upper-box";
        el.innerText = num;
        el.style.fontSize = _getFontSize(num) + "px";
        el.style.backgroundColor = _getColors(num)[0];
        el.style.color = _getColors(num)[1];
        el.style.width = base.offsetWidth + "px";
        el.style.height = base.offsetHeight + "px";
        el.style.top = base.offsetTop + "px";
        el.style.left = base.offsetLeft + "px";

        gameBox.appendChild(el);
        
        setTimeout(function(){el.style.transform = "scale(1.1)"}, 100);
        setTimeout(function(){el.style.transform = "scale(1.0)"}, 200);
        UITable[row][column] = el;
        UIBlocked--;        
    }
    
    
    this.drawTransitions = function drawTransitions(transitions) {
        UIBlocked++;
        var arrayRemove = [];
        for (var i = 0; i < transitions.length; i++) {
            var obj = transitions[i];
            if (!("new" in obj) && (obj.del === true)) {
                var el = UITable[obj.a[0]][obj.a[1]];
                var base = UITableBase[obj.b[0]][obj.b[1]];
               
                el.style.top = base.offsetTop + "px";
                el.style.left = base.offsetLeft + "px";
                arrayRemove.push(el);
                UITable[obj.a[0]][obj.a[1]] = null;
            }
        }
        
        for (var i = 0; i < transitions.length; i++) {
            var obj = transitions[i];
            if (!("new" in obj) && (obj.del === false)) {
                var el = UITable[obj.a[0]][obj.a[1]];
                var base = UITableBase[obj.b[0]][obj.b[1]];
                
                el.style.top = base.offsetTop + "px";
                el.style.left = base.offsetLeft + "px";
                
                UITable[obj.a[0]][obj.a[1]] = null;
                UITable[obj.b[0]][obj.b[1]] = el;                                
            }
        }
        
        setTimeout(function(){ 
            for (var i = 0; i < arrayRemove.length; i++) {
                arrayRemove[i].remove();
            }
            for (var i = 0; i < transitions.length; i++) {
                if ("new" in transitions[i]) {
                    obj = transitions[i]["new"];
                    _addBlock(obj[0], obj[1], obj[2]);
                }
            }
        }, 100);
        
        // transitions = [];
        setTimeout(function(){
            while(transitions.length > 0) {
                transitions.pop();
            }
            UIBlocked--;
        }, 200);
        
    }
    
    this.drawScores = function drawScores(currentScore, bestScore) {
        document.getElementsByClassName("current-score")[0].innerText = "Score: " + currentScore;
        document.getElementsByClassName("best-score")[0].innerText = "Best: " + bestScore;
    }
    
    this.isBlocked = function isBlocked() {
        return UIBlocked;
    }
    
    this.showLoss = function showLoss() {
        UIBlocked++;
        document.getElementsByClassName("loss-box")[0].style.opacity = 0.8;   
    }
    function _printUIModel() {
        for (var i = 0; i < 4; i++) {
            var mes = i + ": ";
            for (var j = 0; j < 4; j++) {
                var el = UITable[i][j];
                if (el === null) {
                    mes += "0";
                }
                else {
                    mes += UITable[i][j].innerText;
                }
            }
            cl(mes);
        }
        cl("");
    }
}