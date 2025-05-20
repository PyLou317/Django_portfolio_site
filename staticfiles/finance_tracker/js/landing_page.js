"use_strict";

const changingWordElement = document.getElementById('changingWord');
const words = ["Track Expenses", "Build & Monitor Budgets", "Save for Your Future"];
let currentIndex = 0;

function changeWord() {
  changingWordElement.textContent = words[currentIndex];
  currentIndex = (currentIndex + 1) % words.length; // Cycle through the array
}

setInterval(changeWord, 2000);