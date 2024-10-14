let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let compareArraysIndex = 0;
let gameOverState = false;

function randomButton() {
  const color = buttonColors[buttonColor()];
  return color;
}

function buttonColor() {
  const randomNumber = Math.round(Math.random() * 3);
  return randomNumber;
}

function nextSequence() {
  level++;
  $("h1").text(`Level ${level}`);
  gamePattern.push(randomButton());
  playFullGameSequence();
  resetUserInputs();
}

function playFullGameSequence() {
  gamePattern.forEach((e, index) => {
    setTimeout(() => {
      playAudio(e);
      buttonFlash(e);
    }, index * 500);
  });
}

function resetUserInputs() {
  userClickedPattern = [];
  compareArraysIndex = 0;
}

function buttonFlash(color) {
  $(`#${color}`).fadeOut(100).fadeIn(100);
}

function animatePress(e) {
  $(e.target).addClass("pressed");
  setTimeout(function () {
    $(e.target).removeClass("pressed");
  }, 100);
}

$(".btn").click(function (e) {
  if (gamePattern.length > 0 && gameOverState !== true) {
    color = e.target.id;
    animatePress(e);
    playAudio(color);
    userClickedPattern.push(color);
    compareArrays();
  }
});

function compareArrays() {
  if (
    userClickedPattern[compareArraysIndex] === gamePattern[compareArraysIndex]
  ) {
    compareArraysIndex++;
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1200);
    }
  } else {
    gameOver();
  }
}

function playAudio(color) {
  new Audio(`sounds/${color}.mp3`).play();
}

//Start the game with click
$("h1").click(function () {
  if (level === 0) {
    gamePattern = [];
    $("h1").text("Level 0");
    nextSequence();
  }
});

function gameOver() {
  gameOverState = true;
  level = 0;
  gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Lost! Click me to start over.");
}
