document.addEventListener('DOMContentLoaded', () => {

  const qwerty = document.getElementById("qwerty");
  const phrase = document.getElementById("phrase");
  const startButton = document.querySelector(".btn__reset");
  const lifes = document.getElementById("scoreboard");
  const overlay = document.getElementById("overlay");
  const title = document.querySelector(".title");
  let missed = 0;

  var phrases = [
    "January",
    "Februrary",
    "April",
    "November",
    "August",
    "October",
    "December"

  ];



  // function which takes the array and selects a random item of the array

  function getRandomPhraseAsArray(arr) {
    let i = Math.floor(Math.random() * phrases.length)
    return phrases[i].split("");
  };

  // function which adds phrase to display

  function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
      const listItem = document.createElement('LI');
      listItem.textContent = arr[i];
      if (arr[i] != " ") {
        listItem.classList = "letter";
      } else {
        listItem.classList = "space";
      }
      phrase.appendChild(listItem)
    }
  }

  // Eventlistener which fades and sets display to none of the overlay

  startButton.addEventListener("click", () => {
    //setting missed always back to 0
    missed = 0;
    //fade the overlay away
    const overley = document.getElementById("overlay");
    setTimeout(() => {
      overlay.style.display = "none"}, 1000);
      overlay.classList.add("fade");
    // clear the phrase list
    let lettersInList = document.getElementsByClassName("letter");
    let spacesInList = document.getElementsByClassName("space");

    for (let i = lettersInList.length - 1; i >= 0; i--) {
      lettersInList[i].parentNode.removeChild(lettersInList[i]);
    }
    for (let i = spacesInList.length - 1; i >= 0; i--) {
      spacesInList[i].parentNode.removeChild(spacesInList[i]);
    }

    //generate and add  phrase
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray)

    // clear the keyboard
    let keys = document.querySelectorAll("BUTTON");

    for (let i = 0; i < keys.length; i++) {
      keys[i].removeAttribute("class");
      keys[i].removeAttribute("disabled");
    }

    // set to full lifes again
    for (let i = 0; i < 5; i++) {
      lifes.firstElementChild.children[i].firstElementChild.src = "images/liveHeart.png";
    }
  });




  // checks if the letter clicked matches any letter in the phrase
  function checkLetter(target) {
    const letter = document.querySelectorAll(".letter");
    const clickedLetter = target.textContent;
    let letterFound = null;

    for (let i = 0; i < letter.length; i++) {
      if (letter[i].textContent.toLocaleLowerCase() === clickedLetter) {
        letter[i].classList.add("show");
        letterFound = letter[i].textContent;
      }
    }
    return letterFound;
  }

// this function is used within the checkWin function
  function winLose(className, resultText) {
    overlay.classList = className;
    overlay.style.display = "flex";
    startButton.textContent = "Reset";
    title.innerHTML = resultText;
  }



  function checkWin() {
    const hasLetterClass = document.querySelectorAll(".letter");
    const hasShowClass = document.querySelectorAll(".show");
    if (hasLetterClass.length === hasShowClass.length) {
      winLose("win", "You win yeaaaah")
    }
    if (missed >= 5) {
      winLose("lose", "Oh dear maybe next time")
    }
  }

  // Eventlistener for each clicked Button

  qwerty.addEventListener("click", (e) => {
    const selectedButton = e.target;
    if (selectedButton.tagName === "BUTTON") {
      selectedButton.classList = "chosen";
      selectedButton.setAttribute("disabled", "");
    }
    checkLetter(selectedButton);

    // removing the lifes
    if (checkLetter(selectedButton) === null && selectedButton.classList.contains("keyrow") != true) { // is this if statement needed or how can I fix the issue that it would take a life if clicked in the gaps

      // lifes.firstElementChild.removeChild(tries[0] );
      lifes.firstElementChild.children[missed].firstElementChild.src = "images/lostHeart.png"
      missed++;
    }
    checkWin();
  });

  // Document loded even listener end
});
