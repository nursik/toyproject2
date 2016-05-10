;'use strict'

function cl(text) {
    console.log(text);
}


var GameController = null;

window.onload = function() {
    GameController = new GameControllerFabric();
    GameController.newGame();
    
    document.addEventListener("keyup", function(e) {
        var keyCode = e.keyCode || e.which;
        
        GameController.move(keyCode);
    });
    
    document.getElementsByClassName("btn")[0].addEventListener("click", function(){
       GameController.newGame(); 
    });
}














