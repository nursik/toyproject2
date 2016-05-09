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
        UIModel.drawModel(GameModel.getGameState());    
        UIModel.updateCurrentScore(GameModel.getScore());
        UIModel.updateBestScore(GameModel.getBestScore());
    }

    this.up = function up() {
        if (UIModel.isBlocked()) {
            return;
        }
        GameModel.up();
        _afterMove.call(this);
    }
    
    this.down = function down() {
        if (UIModel.isBlocked()) {
            return;
        }
        GameModel.down();
        _afterMove.call(this);
    }
    
    this.left = function left() {
        if (UIModel.isBlocked()) {
            return;
        }
        GameModel.left();
        _afterMove.call(this);
    }
    
    this.right = function right() {
        if (UIModel.isBlocked()) {
            return;
        }
        GameModel.right();
        _afterMove.call(this);
    }
    
    function _afterMove() {
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














