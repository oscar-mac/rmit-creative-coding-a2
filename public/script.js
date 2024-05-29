window.onload = function () {
  // Define a Line class to represent individual lines
  class Line {
    constructor(startX, startY, direction, targetLength) {
      this.startX = startX;
      this.startY = startY;
      this.endX = startX; // Initialize end point at start point
      this.endY = startY;
      this.direction = direction; // 0 for horizontal, 1 for vertical
      this.targetLength = targetLength; // Desired length of the line
    }

    // Update the end point of the line based on its direction and target length
    update() {
      // Gradually increase end point towards target length
      if (this.direction === 0 && this.endX < this.startX + this.targetLength)
        this.endX += 0.3; // Draw speed
      if (this.direction === 1 && this.endY < this.startY + this.targetLength)
        this.endY += 0.3; // Draw speed
    }

    // Draw the line on the canvas context
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    }
  }

  // Function to generate a random number within a specified range
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate an array of Line objects
  function generateLines(numLines, canvasWidth, canvasHeight) {
    var lines = [];
    var centerX = canvasWidth / 2;
    var centerY = canvasHeight / 2;
    var maxDistanceFromCenter = Math.min(canvasWidth, canvasHeight) / 3;

    // Recursive function to generate lines
    function generateLine() {
      var startX =
        centerX +
        getRandomNumber(-maxDistanceFromCenter, maxDistanceFromCenter);
      var startY =
        centerY +
        getRandomNumber(-maxDistanceFromCenter, maxDistanceFromCenter);
      var direction = getRandomNumber(0, 1); // Random direction (0 for horizontal, 1 for vertical)
      var targetLength = getRandomNumber(100, 400); // Random target length
      lines.push(new Line(startX, startY, direction, targetLength));

      // Recursively generate remaining lines
      if (lines.length < numLines) {
        generateLine();
      }
    }

    // Start the recursion
    generateLine();

    return lines;
  }

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Generate random lines based on canvas dimensions and number of lines
  var lines = generateLines(
    getRandomNumber(19, 99),
    canvas.width,
    canvas.height,
  );

  // Function to draw lines on the canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(function (line) {
      line.update(); // Update the position of each line
      line.draw(ctx); // Draw each line on the canvas
    });
    requestAnimationFrame(draw); // Request animation frame for next draw cycle
  }

  draw(); // Start animation loop
};
