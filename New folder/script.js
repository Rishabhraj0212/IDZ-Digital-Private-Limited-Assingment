var balloonImages = [
  "Symbol 100001.png",
  "Symbol 100002.png",
  "Symbol 100003.png",
  "Symbol 100004.png",
  "Symbol 100005.png",
  "Symbol 100006.png",
  "Symbol 100007.png",
  "Symbol 100008.png",
  "Symbol 100009.png",
  "Symbol 100010.png"
];
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var maxBalloons = 5;
var activeBalloons = [];

function createBalloon() {
  var operator = document.getElementById("operator");
  var operatorRect = operator.getBoundingClientRect();
  var operatorLeft = operatorRect.left;
  var operatorTop = operatorRect.top;

  var balloonsToCreate = Math.min(maxBalloons - activeBalloons.length, 5); // Maximum 5 balloons at a time

  for (var i = 0; i < balloonsToCreate; i++) {
    var balloon = document.createElement("div");
    balloon.classList.add("balloon");
    var randomImage = balloonImages[Math.floor(Math.random() * balloonImages.length)];

    var balloonImage = document.createElement("img");
    balloonImage.src = randomImage;
    balloonImage.style.width = "100%";
    balloonImage.style.height = "100%";
    balloon.appendChild(balloonImage);

    var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    var letterSpan = document.createElement("span");
    letterSpan.textContent = randomLetter;
    letterSpan.style.fontSize = "30px";
    letterSpan.style.position = "absolute";
    letterSpan.style.top = "50%";
    letterSpan.style.left = "50%";
    letterSpan.style.transform = "translate(-50%, -50%)";
    balloon.appendChild(letterSpan);

    balloon.style.left = operatorLeft + "px"; // Set left position to match the operator's left position
    balloon.style.top = operatorTop + "px"; // Set top position to match the operator's top position
    document.body.appendChild(balloon);

    activeBalloons.push(balloon);
    animateBalloon(balloon, window.innerWidth - balloon.offsetWidth); // Pass the adjusted screenWidth
  }
}

function animateBalloon(balloon, screenWidth) {
  var duration = Math.floor(Math.random() * 8000) + 3000; // Random duration between 3s and 10s
  var startPositionX = screenWidth;
  var startPositionY = Math.floor(Math.random() * (window.innerHeight - 70));
  var endPositionX = 0 - balloon.offsetWidth; // Updated end position to left corner
  var endPositionY = startPositionY; // Balloon stays at the same Y position

  var startTime = Date.now();
  var animationId;

  function updatePosition() {
    var elapsedTime = Date.now() - startTime;
    var progress = elapsedTime / duration;
    var currentPositionX = startPositionX - (startPositionX - endPositionX) * progress;
    var currentPositionY = startPositionY - (startPositionY - endPositionY) * progress;

    balloon.style.left = currentPositionX + "px";
    balloon.style.top = currentPositionY + "px"; // Use top property instead of bottom

    if (progress < 1) {
      animationId = requestAnimationFrame(updatePosition);
    } else {
      cancelAnimationFrame(animationId);
      balloon.parentNode.removeChild(balloon);
      activeBalloons.splice(activeBalloons.indexOf(balloon), 1);
    }
  }

  balloon.addEventListener("click", function () {
      burstBalloon(balloon);
    });
  
    animationId = requestAnimationFrame(updatePosition);
  
    // Rest of the code...
  }

  function burstBalloon(balloon) {
    // Burst balloon code...
    balloon.parentNode.removeChild(balloon);
    activeBalloons.splice(activeBalloons.indexOf(balloon), 1);
    // Rest of the code...
  }

  function startGame() {
    setInterval(createBalloon, 3000);
  }
  startGame();

