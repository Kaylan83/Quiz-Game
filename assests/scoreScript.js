

var highScoresForm = document.querySelector("#highScores");
var clearScores = document.querySelector("#clear")



getSavedScores();

function getSavedScores(){
    storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores=storedScores;
        rednderHighScores();
    } 
  
}

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

clearScores.addEventListener("click", function(event){
    event.preventDefault();
    console.log("iam clicked")
    highScores=[];
    rednderHighScores();
    saveToLS(highScores);
})

function saveToLS (arr) {
    localStorage.setItem("highScores", JSON.stringify(arr))
}