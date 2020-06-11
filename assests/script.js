//declaring variables
var questionForm = document.querySelector("#question");
var startBtn = document.querySelector("#startQuiz");
var timerBox = document.querySelector("#timerBox");
var scoreEl = document.querySelector("#yourScore");
var submitScores = document.querySelector("#scoreRecord")
var main = document.querySelector("#main");
var UserInt = document.querySelector("#userName");
var submitBtn = document.querySelector("#submit");
var img = document.querySelector("#image");
var init = document.querySelector("#initials");
var currentIndex=0;
var secondsLeft = 200;
var score = 0;
//empty array for the initials with high scores
var highScores = [];
// The questions array
var questions = [
    {
        title: "Question 1- Book is to Reading as Fork is to: ",
        choices: ["drawing", "writing", "stirring", "eating"],
        answer: "eating",
        gif: "assests/bat.gif"
    },
    {
        title: "Which number should come next in this series? 25, 24, 22, 19, 15: ",
        choices: ["14", "10", "0", "5"],
        answer: "10",
        gif: "assests/giphy.gif"
    },
    {
        title: "Which one of the five is least like the other four? ",
        choices: ["Snake", "Dog", "Tiger", "Cow"],
        answer: "Snake",
        gif: "assests/pooh.gif"
    },
    {
        title: "If you rearrange the letters 'BARBIT,' you would have the name of a: ",
        choices: ["City", "Country", "Animal", "Ocean"],
        answer: "Animal",
        gif: "assests/tenor.gif"
    },
    {
        title: "Jack is taller than Peter, and Bill is shorter than Jack. Which of the following statements would be more accurate? ",
        choices: ["Bill is taller than Peter", "Peter is taller than Bill", "Bill is as tall as Peter", "It is impossible to tell whether Bill or Peter is taller"],
        answer: "It is impossible to tell whether Bill or Peter is taller",
        gif: "assests/health-and-wellbeing_positive-thinking.gif"
    },
    {
        title: "Nia,  twelve years old, is three times as old as her sister. How old will Nia be when she is twice as old as her sister? ",
        choices: ["15", "18", "16", "20"],
        answer: "16",
        gif: "assests/DoYouWantCalculator.gif"
    },
    {
        title: " Two people can make 2 bicycles in 2 hours. How many people are needed to make 12 bicycles in 6 hours? ",
        choices: ["4", "2", "12", "8"],
        answer: "4",
        gif: "assests/Simpson.gif"
    },
    {
        title: "What instrument of Minion Stuart in the Minions movie?",
        choices: ["Super Mega Ukulele","Lute","Guitar","Electric Guitar"],
        answer:"Super Mega Ukulele",
        gif:"assests/stuart.gif"
    },
    {
        title: "Which one of the five makes the best comparison?   CAACCAC is to 3113313 as CACAACAC is to:",
        choices: ["31313113","31311131","31311313","13133313"],
        answer:"31311313",
        gif:"assests/LameOrangeBoubou-size_restricted.gif"
    },
    {
        title: "The day after the day after tomorrow is four days before Monday. What day is it today?",
        choices: ["Thursday","Wednesday","Tuesday","Monday"],
        answer:"Monday",
        gif:"assests/Nick.gif"
    }
  ];


  // function to appened the questions to the block in the index file
  // this function also check the answer if it is correct or not and present the next answer
  // if the answer is correct will show the correct on the block and add 10 points to the score
  // if the answer is wrong will show wrong on the block and deduct 10 seconds from the counter
  function renderQuestions (){
    scoreEl.setAttribute("style", "display:block;")
    questionForm.innerHTML="";
     var questionAdd = questions[currentIndex];
    var ol = document.createElement("ol");
    
    ol.type="a";
    var questionTitle = document.createElement("h6");
    questionTitle.innerText = (questionAdd.title);

      
     
     var li1 = document.createElement("li");
     var li2 = document.createElement("li");
     var li3 = document.createElement("li");
     var li4 = document.createElement("li");
     li1.innerHTML = ('<button class= "button">' + questionAdd.choices[0] + "</button>");
     li2.innerHTML = ('<button class= "button">' + questionAdd.choices[1] + "</button>");
     li3.innerHTML = ('<button class= "button">' + questionAdd.choices[2] + "</button>");
     li4.innerHTML = ('<button class= "button">' + questionAdd.choices[3] + "</button>");
   
    ol.appendChild(li1);
    ol.appendChild(li2);
    ol.appendChild(li3);
    ol.appendChild(li4);
      
     img.src= questionAdd.gif;
     questionForm.appendChild(questionTitle);
     questionForm.appendChild(ol);
     
    var answers= document.querySelectorAll(".button");
    for (var i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", function(event){
            event.preventDefault();
            var answerCheck = document.getElementById("answerCheck");
            if (event.currentTarget.innerText === questions[currentIndex].answer) {
                
                answerCheck.innerHTML= "Correct";
                score +=10;
                scoreEl.innerText = "Your score: " + score;
                } 
                else {
                answerCheck.innerHTML="Wrong";
                secondsLeft -= 10;
                
             }
            currentIndex++;

            if (currentIndex <questions.length){
                setTimeout(function () {answerCheck.innerHTML="";},1000);
                renderQuestions();
            } else if (currentIndex ===questions.length) {
                submitScores.setAttribute("style", "display:block");
                main.setAttribute("style", "display:none");
            }
           
        })
       
    }
    
  }
  
  // The timer function to set the timer and increase by one second
function timer (){
    timerBox.setAttribute("style", "display:block;")
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerBox.innerText= "Time left: " + secondsLeft;

        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            sendMessage();
          }
    },1000);
    
    // a function to send a message to the block if the time is up
    function sendMessage() {
        var timesUp = document.createElement("div");
        timesUp.innerHTML = '<h1> Sorry your time is up</h1>'
        var mainEl = document.querySelector("#main");
        mainEl.innerHTML="";
        mainEl.appendChild(timesUp);
        submitScores.setAttribute("style", "display:block");
    }
}



  // The start buttun event to start the quiz 
  // when clicked call the questions timer functions
  startBtn.addEventListener("click", function(event){
    event.preventDefault();
    renderQuestions();
    timer();
    
    
}
)

// getting the scores from the local storage


// the submit button function to enter the initials and save it with the high score recieved
submitBtn.addEventListener("click", function scoreRecord(event){
    event.stopPropagation();
    var userInput = UserInt.value.trim();
    console.log(userInput)
    if (userInput !=="") {
        highScores.push(userInput + " score is: " + score);
        saveToLS(highScores);
        UserInt.value="";
    } else {
        init.setAttribute("style", "color:red");
        scoreRecord();
    }
    
})
// saving the scores to the local storage with the user initials
function saveToLS (arr) {
    localStorage.setItem("highScores", JSON.stringify(arr))
}



