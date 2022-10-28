var quizHome = document.getElementById("quiz-home")

var scoresPage = document.getElementById("high-scores")
var tableScore = document.getElementById("high-scores")
var clearScore = document.getElementById("clear-scores")




 for (var i=0; i < localStorage.length; i++) {

     var initials = localStorage.key(i);
     var numbers = localStorage.getItem(initials);
    
     var displayResults = document.createElement("div");
        displayResults.classList.add('display-result');

        tableScore.appendChild(displayResults);

        displayResults.textContent = initials + " " + numbers;

       }


function rtnQuizHome() {
        window.location.href = 'index.html';
}

function clearHighScores() {

localStorage.clear();
scoresPage.textContent = "No scores ? back and play quiz agin!";

}


//event listeners
quizHome.addEventListener("click", rtnQuizHome);
clearScore.addEventListener("click", clearHighScores);