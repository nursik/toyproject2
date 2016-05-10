;'use strict'

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
        _afterMove.call(this);
    }

    this.move = function move(code) {
        if (UIModel.isBlocked()) {
            return;
        }
        switch(code) {
            case 37:
                GameModel.left();
            break;
            case 38:
                GameModel.up();            
            break;
            case 39:
                GameModel.right();            
            break;
            case 40:
                GameModel.down();            
            break; 
        } 
        _afterMove.call(this);
    }
    
    function _afterMove() {
        UIModel.drawModel(GameModel.getGameState());
        UIModel.drawScores();
        if (GameModel.isGameLost()) {
            this.showLoss();
        }
        GameModel.updateLocalStorage();
    }
    
    this.showLoss = function showLoss() {
        UIModel.showLoss();
    }
};