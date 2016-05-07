;'use strict'

function cl(text) {
    console.log(text);
}


function GameControllerFabric() {
    var GameModel;
    var UIModel;

    this.newGame = function newGame() {
        if (UIModel === undefined) {
            UIModel = new UIModelFabric();
        }
        if (GameModel === undefined) {
            GameModel = new GameModelFabric();
        }
        
        UIModel.init();
        GameModel.init();
        GameModel.addBlock();
        GameModel.addBlock();
        UIModel.drawModel(GameModel.getGameState());    
        UIModel.updateCurrentScore(GameModel.getScore());
        UIModel.updateBestScore(GameModel.getBestScore());
    }

    this.up = function up() {
        if (UIModel.isBlocked()) {
            return;
        }
        var wasMove = GameModel.up();
        _afterMove.call(this, wasMove);
    }
    
    this.down = function down() {
        if (UIModel.isBlocked()) {
            return;
        }
        var wasMove = GameModel.down();
        _afterMove.call(this, wasMove);
    }
    
    this.left = function left() {
        if (UIModel.isBlocked()) {
            return;
        }
        var wasMove = GameModel.left();
        _afterMove.call(this, wasMove);
    }
    
    this.right = function right() {
        if (UIModel.isBlocked()) {
            return;
        }
        var wasMove = GameModel.right();
        _afterMove.call(this, wasMove);
    }
    
    function _afterMove(wasMove) {
        if (wasMove === true) {
            GameModel.addBlock();
        }
        UIModel.drawModel(GameModel.getGameState());
        UIModel.updateCurrentScore(GameModel.getScore());
        UIModel.updateBestScore(GameModel.getBestScore());
        if (GameModel.isGameLost()) {
            this.showLoss();
        }
        GameModel.updateLocalStorage();
    }
    
    this.showLoss = function showLoss() {
        UIModel.showLoss();
    }
};


var GameController = null;

window.onload = function() {
    GameController = new GameControllerFabric();
    GameController.newGame();
    document.addEventListener("keyup", function(e) {
        var cd = e.keyCode || e.which;
        if (cd === 37) {
            GameController.left();
        }
        if (cd === 38) {
            GameController.up();
        }
        if (cd === 39) {
            GameController.right();
        }
        if (cd === 40) {
            GameController.down();
        }
    });
    document.getElementsByClassName("btn")[0].addEventListener("click", function(){
       GameController.newGame(); 
    });
}














