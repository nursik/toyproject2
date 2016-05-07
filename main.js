;'use strict'

function cl(text) {
    console.log(text);
}


function GameControllerFabric() {
    var GameModel;
    var UIModel;

    this.newGame = function newGame() {
        UIModel = new UIModelFabric();
        GameModel = new GameModelFabric();
        
        GameModel.init();
        UIModel.init();
        UIModel.applyTransitions(GameModel.addBlock());
        UIModel.applyTransitions(GameModel.addBlock());    
    }

    this.up = function up() {
        if (UIModel.isBlocked()) {
            return;
        }
        var temp = GameModel.up();
        cl(temp);
        UIModel.applyTransitions(temp);
        UIModel.applyTransitions(GameModel.addBlock());
        if (GameModel.isGameLost()) {
            this.gameLost();
        }
    }
    this.down = function down() {
        if (UIModel.isBlocked()) {
            return;
        }
        var temp = GameModel.down();
        cl(temp);
        UIModel.applyTransitions(temp);
        UIModel.applyTransitions(GameModel.addBlock());
        if (GameModel.isGameLost()) {
            this.gameLost();
        }
    }
    this.left = function left() {
        if (UIModel.isBlocked()) {
            return;
        }
        var temp = GameModel.left();
        cl(temp);
        UIModel.applyTransitions(temp);
        UIModel.applyTransitions(GameModel.addBlock());
        if (GameModel.isGameLost()) {
            this.gameLost();
        }
    }
    this.right = function right() {
        if (UIModel.isBlocked()) {
            return;
        }
        var temp = GameModel.right();
        cl(temp);
        UIModel.applyTransitions(temp);
        UIModel.applyTransitions(GameModel.addBlock());
        if (GameModel.isGameLost()) {
            this.gameLost();
        }
    }
    this.gameLost = function gameLost() {
        UIModel.showLoss();
    }
    
    this.getUIModel = function getUIModel() {
        return UIModel;
    }
    this.getGameModel = function getGameModel() {
        return GameModel;
    }
};

window.onload = function() {
    var GameController = new GameControllerFabric();
    GameController.newGame();
    cl(GameController.getUIModel().getUITable());
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
}














