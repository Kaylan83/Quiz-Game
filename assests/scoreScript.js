

var highScoresForm = document.querySelector("#highScores");
var clearScores = document.querySelector("#clear")


// calling the get scores function
getSavedScores();

// get the scores from locacl storage function
function getSavedScores(){
    storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores=storedScores;
        rednderHighScores();
    } 
  
}

// function to append the scores to the high scores file
function rednderHighScores() {
   
    highScoresForm.innerHTML="";
 var ul = document.createElement("ul");
    ul.setAttribute("class","ulStyle");
 for (var i = 0; i< highScores.length; i++){
     var li = document.createElement("li");
     li.setAttribute("class","liStyle");
     li.textContent=highScores[i];
     ul.appendChild(li);
     highScoresForm.appendChild(ul);

 }
}

// The clear button event to clear all high scores from the array and local storage
clearScores.addEventListener("click", function(event){
    event.preventDefault();
    console.log("iam clicked")
    highScores=[];
    // calling the render high scores
    rednderHighScores();
    //calling the save to storage function the empty array
    saveToLS(highScores);
})

// the save to local storage function
function saveToLS (arr) {
     localStorage.setItem("highScores", JSON.stringify(arr))
 }