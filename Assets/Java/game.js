
var timerClock = document.getElementById("timer-count")
var timerTitle = document.getElementById("timer-title")

var gameHomepage = document.getElementById("game-homepage")
var startQuiz = document.getElementById("start-quiz")

var quiz = document.getElementById("quiz")
var options = document.getElementById("options")
var message = document.getElementById("message")

var gameOver = document.getElementById("game-over")
var results = document.getElementById("results")
var initialsRecord = document.getElementById ("initials-record")
var seeScores = document.getElementById("see-scores")
var saveScore = document.getElementById("save-score")
var playAgain = document.getElementById("Try-again")

var highScoresBtn = document.getElementById("home-scores")



var secondsRemaining = 0;
var score = 0;
var currentQues = 0;
var timerCountdown;



function init () {

    gameHomepage.style.display = 'block';    
    gameOver.style.display = 'none'; 
    timerTitle.style.display = 'none';
    highScoresBtn.style.display = 'block';
    quiz.style.display = 'none';   
}

init();

function playSoundCorrect() {
    let correct = new Audio ('./Assets/Sound/correct.wav');
    correct.play();
}


function playSoundIncorrect() {
    let incorrect = new Audio ('./Assets/Sound/incorrect.wav');
    incorrect.play();
}

function playEndSound() {
    let playEnd = new Audio ('./Assets/Sound/yay-sound.mp3');
    playEnd.play();

}

function endGame() {

    clearInterval(timerCountdown);

    timerClock.textContent = " "
    quiz.style.display = 'none';
    gameOver.style.display = 'block';
    timerTitle.style.display = 'none';
    

    if (score == 0) {
        results.textContent = "You scored " + score + "/5 Try again"
    } else if (score !== 5) {
        results.textContent = "You scored " + score + "/5 Great Try again and get more scores"
    } else {
        results.textContent = "You scored " + score + "/5 CONGRATULATIONS"
    };
   
    playEndSound();
}

 function onSaveScore(e) {

    results.style.display = 'none';

     var userInitials = document.getElementById("user-initials").value

     if (userInitials !== ""){
         localStorage.setItem(userInitials, score);
     }
     document.getElementById("user-initials").value = ""; 

    initialsRecord.textContent = userInitials + " scored " + score + "  ";

      e.preventDefault();  
 }

 
function onSeeScores() {


  window.location.href = 'scoreboard.html';


}
    


function onAnswerSelection(event) {
    var correct = questions[currentQues].answer;
    var userAnswer = event.target.textContent;

    if (correct === userAnswer) {
        score++;

        answerMessage(" CORRECT ")
        playSoundCorrect();

    } else {

        secondsRemaining-=10;

        answerMessage(" WRONG ")
        playSoundIncorrect();
    }
showQuestion();
}


function answerMessage(displayed) {

    message.textContent = displayed

    setTimeout(function(){
        message.textContent = " ";
    }, 2000);
}


function showQuestion() {

    currentQues++;
    console.log('question asked' + currentQues);

    if (currentQues >= questions.length) {
        endGame();
        return;
    }

    var loadQues = questions[currentQues];
    document.getElementById("question").textContent = loadQues.title

    options.innerHTML = "";

    


    for (var i = 0; i < loadQues.choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = loadQues.choices[i];
        choice.onclick = onAnswerSelection;
        choice.classList.add("choice");

        options.appendChild(choice);
    }
    
}

function runGame() {

    secondsRemaining = 59;
    currentQues = -1;
    score = 0;

    timerCountdown = setInterval(function() {

        if (secondsRemaining > 0) {
            timerClock.textContent = secondsRemaining;
        } else {
            endGame();
        }
        secondsRemaining--;
    }, 1000);

    gameHomepage.style.display = 'none';
    timerTitle.style.display = 'block';
    quiz.style.display = 'block';
    gameOver.style.display = 'none'; 
    
    
    showQuestion();

    
    
}

startQuiz.addEventListener("click", runGame);
saveScore.addEventListener("click", onSaveScore);
playAgain.addEventListener("click", runGame);
seeScores.addEventListener("click", onSeeScores);
highScoresBtn.addEventListener("click", onSeeScores);
