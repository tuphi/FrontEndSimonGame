// Initialize the level and the array of numbers
var isFirstTime = true;
var level;
var gameArray;
var playerArray;
var playerTapCount;

initializeGame();

function initializeGame() {
  //Button A is tapped, start the Game
  $(document).on("keypress", function(event) {
    $(document).off("keypress");
    if((event.key === "a" && isFirstTime) || (!isFirstTime)) {

      isFirstTime = false;
      // Initialize the level and the array of numbers
      level = 0;
      gameArray = new Array();
      playerArray = new Array();

      // Create a new challenge
      createChallenge();

      // Add keypress listener
      addPressedEffectToAllButtons(isCorrect);

    }
  })
}

// Function: Game over
function gameOver() {
  addSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },100);
  removeButtonsEventListener();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  initializeGame();
}

// Function: Add event listener to buttons
function addPressedEffectToAllButtons() {
  for(var i = 0; i < $(".btn").length; i++) {
    var buttonId = $(".btn")[i].getAttribute("id");
    $("#" + buttonId).click(function() {
      addPressedEffect(event.toElement.id);
      addSound(event.toElement.id);
      switch(event.toElement.id) {
        case "green": buttonNum = 0; break;
        case "red": buttonNum = 1; break;
        case "yellow": buttonNum = 2; break;
        case "blue": buttonNum = 3; break;
      }

      console.log("playerTapCount = " + playerTapCount);
      console.log("gameArray = " + gameArray);

      if(buttonNum === gameArray[playerTapCount]) {
        playerTapCount++;
        if(playerTapCount >= gameArray.length) {
          setTimeout(createChallenge, 500);
        }
      } else {
        gameOver();
      }

      // if(isCorrect(buttonNum)) {
      //   setTimeout(createChallenge, 500);
      // } else {
      //   gameOver();
      // }
    });
  }
}


// Function: Check whether what user tapped is correct
function isCorrect(buttonNum) {
  return buttonNum === gameArray[gameArray.length - 1];
}

// Function: Remove buttons click event listener
function removeButtonsEventListener() {
  for(var i = 0; i < $(".btn").length; i++) {
    var buttonId = $(".btn")[i].getAttribute("id");
    $("#" + buttonId).unbind();
  }
}

// Function: Add Pressed Effect to a specific button
function addPressedEffect(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 200);
}

// Function: Add Sound to a specific button
function addSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function: Create challenge, make a random number
function createChallenge() {

  // Count Level
  level++;

  // Initialize player tab Count
  playerTapCount = 0;

  // Create a random number
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonId = $(".btn")[randomNumber].getAttribute("id");

  // Create sounds
  addSound(buttonId);

  // Create a hidden effect
  hideButton(buttonId);

  // Set title as level
  $("#level-title").text("Level " + level);

  // Add an element to game Array
  gameArray.push(randomNumber);

}

function hideButton(id) {
  $("#" + id).fadeOut();
  setTimeout(function() {
    $("#" + id).fadeIn();
  }, 200);
}
