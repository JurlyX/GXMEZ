

class User {
  constructor(username, password, data, blacklisted) {
    this.username = username;
    this.password = password;
    this.data = data;
    this.blacklisted = false;
  }
  add_Leaderboard(user, data) {
    if (!this.blacklisted) {
      createDatabase();
    }
  }
}

async function createDatabase() {
  try {
    const Database = require("@replit/database");
    const db = new Database();
    await db.set(user, data);
    console.log("successful! :>");
  } catch (err) {
    console.log("db creation failed! :<");
    console.log(err);
  } finally {
    console.log("db creation process ended!")
  }
}
// just 4 test
createDatabase();

let score = 0;
let scorePerClick = 1;
let multiplier = 1;

function handleClick() {
  score += scorePerClick;
  updateScore();
}

function updateScore() {
  document.getElementById("score").textContent = score;
  updateUpgrades();
  saveProgress(); // Add saveProgress function call
}

function purchaseUpgrade(cost, increase) {
  if (score >= cost) {
    score -= cost;
    scorePerClick += increase;
    updateScore();
  }
}


document.getElementById("click-me").onmousedown = handleClick;

document.getElementById("upgrade1").addEventListener("click", function () {
  purchaseUpgrade(10, 1);
});
document.getElementById("upgrade2").addEventListener("click", function () {
  purchaseUpgrade(50, scorePerClick * 4);
});

document.getElementById("upgrade3").addEventListener("click", function () {
  purchaseUpgrade(100, scorePerClick * 6);
});

document.getElementById("upgrade4").addEventListener("click", function () {
  purchaseUpgrade(1000, scorePerClick * 8);
});

document.getElementById("clear-score").addEventListener("click", function () {
  score = 0;
  updateScore();
});

document.getElementById("reset-game").addEventListener("click", function () {
  resetGame();
});

function updateUpgrades() {
  const upgrade1Button = document.getElementById("upgrade1");
  const upgrade2Button = document.getElementById("upgrade2");
  const upgrade3Button = document.getElementById("upgrade3");
  const upgrade4Button = document.getElementById("upgrade4");

  if (score >= 10) {
    upgrade1Button.disabled = false;
  } else {
    upgrade1Button.disabled = true;
  }

  if (score >= 50) {
    upgrade2Button.disabled = false;
  } else {
    upgrade2Button.disabled = true;
  }

  if (score >= 100) {
    upgrade3Button.disabled = false;
  } else {
    upgrade3Button.disabled = true;
  }

  if (score >= 1000) {
    upgrade4Button.disabled = false;
  } else {
    upgrade4Button.disabled = true;
  }
}

updateUpgrades();

function saveProgress() {
  const progress = {
    score: score,
    scorePerClick: scorePerClick,
  };
  localStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  const savedProgress = localStorage.getItem("progress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    score = progress.score;
    scorePerClick = progress.scorePerClick;
    updateScore();
  }
}

loadProgress();

function resetGame() {
  localStorage.removeItem("progress");
  score = 0;
  scorePerClick = 1;
  updateScore();
}

// Automatic saving every 5 seconds
setInterval(function () {
  saveProgress();
}, 5000);

function RedirectToHome() {
  window.location.href = "page1.htm";
}