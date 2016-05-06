;'use strict'

function cl(text) {
    console.log(text);
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














