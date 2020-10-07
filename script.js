function playGame(){
    console.log("Play Game!")
    var win = checkWinner()
    if(!win){
        console.log('No winner yet!');
        chooseWhoseTurn();
        var playerEntry = document.querySelectorAll('.entryPlayer').length;
        var computerEntry = document.querySelectorAll('.entryComputer').length;
        var draw = playerEntry + computerEntry;
        if(draw == 9){
            document.querySelector('#whoWins').classList.remove('displayNone');
            document.querySelector('#whoWins').innerHTML='<span>Match Draw!</span>';
            setTimeout(reset, 5000);
        }
    }
    if(win){
        console.log('Game Over!')
        var player = getPlayer();
        
        var notFilled = document.querySelectorAll('div.item:not(.entryPlayer):not(.entryComputer)');
        let len = notFilled.length;
        for(let i =0; i<len; i++){ 
            notFilled[i].innerHTML ='<span style="font-size:40px">😬</span>';
            notFilled[i].classList.add('unclickable');
        }    
    } 
}

playGame();

function setGameStyle(){
    var theme = document.querySelectorAll('#inputGroup1 input');
    console.log('Select Your Theme: ',theme);
    theme.forEach(element => element.addEventListener('click', function(){
        console.log(element.value);
        var body = document.body;
        if(element.value == 'classic'){
            body.removeAttribute('class');
            body.classList.add('bodyClassic')
        }
        if(element.value == 'goth'){
            body.removeAttribute('class');
            body.classList.add('bodyGoth')
        }
        if(element.value == 'weapons'){
            body.removeAttribute('class');
            body.classList.add('bodyWeapons')
        }
    }));

}
setGameStyle();



function getgameStyle(){
    if (document.body.classList.contains('bodyClassic')) {
        var gameYourStyle = document.getElementById('classic').value;
        return gameYourStyle;
      }
      else if (document.body.classList.contains('bodyGoth')) {
        var gameYourStyle = document.getElementById('goth').value;
        return gameYourStyle;
      }
      else if (document.body.classList.contains('bodyWeapons')) {
        var gameYourStyle = document.getElementById('weapons').value;
        return gameYourStyle;
      }
}
function setPlayer(){
    var player = document.querySelectorAll('#inputGroup2 input');
    console.log(player);
    player.forEach(element=> element.addEventListener('click', function(){
        document.querySelector('form').classList.add('displayNone');
        document.querySelector('#playerName').classList.remove('displayNone');
        document.querySelector('#playerName').innerHTML = `<h2>You are : <span id="playerChoosen">${element.value}</span></h2>`;
        document.querySelector('.turnContainer').classList.remove('displayNone');
        document.querySelector('#gameBoard').classList.remove('displayNone');
        document.querySelector('#whoWins').classList.add('displayNone')
        document.querySelector('#greetings').classList.add('displayNone')

        var playerName = element.value
        console.log(`You choose: ${playerName}`);
    
    }));
}
setPlayer();
function getPlayer(){
    if(document.getElementById('playerChoosen')!=null){
        var player = document.getElementById('playerChoosen').innerHTML;
        return player;
    }
}

function startGame(){
    var items = document.querySelectorAll('.item');
    items.forEach(item=>item.addEventListener('click', function(){
        console.log(this);
        
        var gameTheme = getgameStyle();
        var player = getPlayer();
        console.log('You are: '+ player ,' Theme : '+ gameTheme);
        this.classList.add('unclickable');
           
        if(player == 'X' && gameTheme == 'classic'){
            this.innerHTML = '❌';
            this.classList.add('entryPlayer');
        }
        if(player == 'X' && gameTheme == 'goth'){
            this.innerHTML = '☠️';
            this.classList.add('entryPlayer');

        }
        if(player == 'X' && gameTheme == 'weapons'){
            this.innerHTML = '⚔️';
            this.classList.add('entryPlayer');

        }
        if(player == 'O' && gameTheme == 'classic'){
            this.innerHTML = '⭕';
            this.classList.add('entryPlayer');

        }
        if(player == 'O' && gameTheme == 'goth'){
            this.innerHTML = '💀';
            this.classList.add('entryPlayer');

        }
        if(player == 'O' && gameTheme == 'weapons'){
            this.innerHTML = '💣';
            this.classList.add('entryPlayer');

        }
        playGame();
    }));
}
startGame();

function chooseWhoseTurn(){
    //for this game you got the first turn
    var currentTurn;
    var filled_player = getPlayerCount();
    var filled_computer = getComputerCount();
    var playerTurn = (filled_player==filled_computer);
    var computerTurn = (filled_computer < filled_player);
    console.log('Player entries till now : ',filled_player);
    console.log('Computer entries till now: ',filled_computer);

    if(playerTurn){
        document.querySelector('#compTurn').classList.remove('styleTurn');
        document.querySelector('#yourTurn').classList.add('styleTurn');
        currentTurn = "playerOneTurn"
        return currentTurn;
    }
    if(computerTurn){
        document.querySelector('#yourTurn').classList.remove('styleTurn');
        document.querySelector('#compTurn').classList.add('styleTurn');
        setTimeout(computerTakeTurn, 800);
        currentTurn = "Computer Turn"
        return currentTurn;
    }

}

function computerTakeTurn(){
    var computer = getComputer();
    var notFilled = document.querySelectorAll('div.item:not(.entryPlayer):not(.entryComputer)');
    var randomItem = notFilled[Math.floor(Math.random()*notFilled.length)];
    console.log('Random item is : ',randomItem);
    randomItem.classList.add('entryComputer');
    randomItem.innerHTML = computer;
    randomItem.classList.add('unclickable');
    console.log('computerTakeTurn: computer clicked: ', randomItem)
      playGame();

}
function getComputer(){
    var gameTheme = getgameStyle();
    var player = getPlayer();
    var computer;
    if(gameTheme=='classic'){
        computer = (player == 'X')?('⭕'):('❌');
    }
    if(gameTheme=='goth'){
        computer = (player == 'X')?('💀'):('☠️');
    }
    if(gameTheme=='weapons'){
        computer = (player == 'X')?('💣'):('⚔️');
    }
    console.log('Computer is:', computer);
      return computer;
}
function getPlayerCount(){
    var Xlength = document.getElementsByClassName('entryPlayer').length;
    return Xlength;

}
function getComputerCount(){
    var Xlength = document.getElementsByClassName('entryComputer').length;
    return Xlength;
}

//Check for winner
function checkWinner(){
    if(checkCondition('one', 'two', 'three')||
        checkCondition('four', 'five', 'six')||
        checkCondition('seven', 'eight', 'nine')||
        checkCondition('one', 'four', 'seven')||
        checkCondition('two', 'five', 'eight')||
        checkCondition('three', 'six', 'nine')||
        checkCondition('one', 'five', 'nine')||
        checkCondition('three', 'five', 'seven')){
            return true;
    }
    // if(checkCondition())
    
}
function checkCondition(div1, div2, div3){
    if(getData(div1)!='X/O' && getData(div2)!='X/O' &&getData(div3)!='X/O'&&
            getData(div1)==getData(div2) &&getData(div2)==getData(div3)){ 
                let winner = getData(div1);
                console.log('Winner is: ',winner);
                document.querySelector('#whoWins').removeAttribute('class');
                document.querySelector('#greetings').removeAttribute('class');
                if(winner == '❌' ||winner == '☠️' || winner == '⚔️'){
                   
                    if(getPlayer() == 'X') {
                        document.querySelector('#whoWins').removeAttribute('class');
                        document.querySelector('#greetings').removeAttribute('class');
                         document.querySelector('#whoWins').innerHTML=`<span>You Wins!</span>`;
                          document.querySelector('#greetings').innerHTML ='<p>Congratulations! You Won.</p>';
                    }
                    if(getPlayer() == 'O'){
                        document.querySelector('#whoWins').removeAttribute('class');
                        document.querySelector('#greetings').removeAttribute('class');
                        document.querySelector('#whoWins').innerHTML=`<span>You Loose🙁!</span>`;
                         document.querySelector('#greetings').innerHTML ='<p>better Luck Next Time</p>';
                   }
                
            }
            if(winner == '⭕' ||winner == '💀' || winner == '💣'){
                   
                if(getPlayer() == 'O') {
                    document.querySelector('#whoWins').removeAttribute('class');
                    document.querySelector('#greetings').removeAttribute('class');
                     document.querySelector('#whoWins').innerHTML=`<span>You Wins!</span>`;
                      document.querySelector('#greetings').innerHTML ='<p>Congratulations! You Won.</p>';
                }
                if(getPlayer() == 'X'){
                    document.querySelector('#whoWins').removeAttribute('class');
                    document.querySelector('#greetings').removeAttribute('class');
                    document.querySelector('#whoWins').innerHTML=`<span>You Loose🙁!</span>`;
                     document.querySelector('#greetings').innerHTML ='<p>better Luck Next Time</p>';
               }
            
        }
            return true;
        }
}
function getData(div){
     return document.getElementById(div).innerHTML;
}

function whoWins(){
    var winner = getPlayer();
    var winnerCondition = checkWinner();
    console.log(winnerCondition);
    
}
//reset game
function reset(){
    console.log('Reseting Game...');
    document.querySelector('#infoForm').classList.remove('displayNone');
    document.querySelector('#gameBoard').classList.add('displayNone');
    document.querySelector('.turnContainer').classList.add('displayNone');
    document.querySelector('#playerName').classList.add('displayNone');
    
    var items = document.querySelectorAll('.item');
    let len = items.length;
    for(let i =1; i<=len; i++){
        document.querySelector('.item-'+i).classList.remove('unclickable');
        document.querySelector('.item-'+i).classList.remove('entryPlayer');
        document.querySelector('.item-'+i).classList.remove('entryComputer');
        document.querySelector('.item-'+i).innerHTML ='X/O';
    }

}