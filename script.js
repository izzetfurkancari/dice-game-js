/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores,roundScore,activePlayer,dice,gamePlaying ;
//gamePlaying is a state variable that keeps whether the game is on, or has stopped(since there'a a winner) ,
//so that roll and hold button do not work after the winner is declared
init();     //initializing the game

//math.random() gives a random number between 0 and 1
//math.random()*6 gives a number between 0 and 5
//math.random()*6+1 gives a number between 1 and 6
//math.floor(4.6)=4

document.querySelector('.btn-roll').addEventListener("click",function()
{
    if(gamePlaying)
    {
    
    // 1. Random number 
    var dice=Math.floor(Math.random()*6)+1;

    //2. Display the results
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src='dice-'+dice+'.png';

    //3. Update the round score if the rolled number was not a one
    if(dice!==1)
    {
        //update the score
        roundScore+=dice;
        document.getElementById('current-'+activePlayer).textContent=roundScore;
    }
    else{
        //next player's turn
        nextPlayer();

        }
}    
});

document.querySelector('.btn-hold').addEventListener("click",function()
{
    if(gamePlaying)
    {
    
    //1. Add current score to global score
    scores[activePlayer]+=roundScore;

    //2.Update the Ui
    document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
    

    //3.Check if the player won the game
    if(scores[activePlayer]>=100)
    {
        document.getElementById('name-'+activePlayer).textContent='Winner!';
         //Hide the dice when winner is declared
    document.querySelector('.dice').style.display='none';
    //Changing the active player to winner player
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    gamePlaying=false;

    }
else
{
    nextPlayer();
}
        
}

});