if(typeof(Storage) !== "undefined") {
    // console.log("Local storage is supported.");
    // Local storage is available on your browser
    const username = localStorage.getItem('username');
    const score = localStorage.getItem('score');
    const hiScore = localStorage.getItem('hiScore');
    if (username){
        let form = document.forms["helloForm"];
       
        form.style.display = "none";
        let modal = document.getElementById("modal");
        let modalContent = modal.children[0].children[2];
        modal.style.display = "block";
      
        modalContent.innerHTML = "username: " + username + "<br>" + "score: " + hiScore;
        let validateButton = document.getElementsByClassName("saved-data-accept")[0];
        let dismissButton = document.getElementsByClassName("saved-data-refusal")[0];
        validateButton.onclick = function(){
          //  window.location.href = "gameplay.html";
          startGame();
           modal.style.display = "none";
        }
        dismissButton.onclick = function(){
            modal.style.display = "none";
            form.style.display = "block";
            //the following is not necessary in this case, but I'll leave it here in case you need it later
            localStorage.clear();
        }
    }
    else{
        console.log("no data in localStorage, loading new session")
    }
  } else {
    console.log("Local storage is not supported.");
    // The condition isn't met, meaning local storage isn't supported
  }

// Stores the item data



function validateForm(){
    var x = document.forms["helloForm"]["username"].value;
    if (x == "") {
        console.log("form")
        alert("I need to know your name so I can say Hello");
        return false;
    }
    else{
        console.log("hi")
        localStorage.setItem("username", x);
        startGame();
        //more advanced pt2: make a system that changes the webpage based on the inputted name 
    }
}