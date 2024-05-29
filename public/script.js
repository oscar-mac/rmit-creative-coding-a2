window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Get random number of starting points
  var numStartingPoints = Math.floor(Math.random() * 99) + 19; // Random number between 19 and 99
  var lines = [];

  for (var i = 0; i < numStartingPoints; i++) {
    // Set starting point closer to the center
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var maxDistanceFromCenter = Math.min(canvas.width, canvas.height) / 3;
    var startX =
      centerX +
      Math.floor(
        Math.random() * maxDistanceFromCenter * 2 - maxDistanceFromCenter,
      );
    var startY =
      centerY +
      Math.floor(
        Math.random() * maxDistanceFromCenter * 2 - maxDistanceFromCenter,
      );

    // Get random direction (0 for horizontal, 1 for vertical)
    var direction = Math.floor(Math.random() * 2);

    // Calculate end point
    var length = Math.floor(Math.random() * 400); // Random length up to 400 pixels
    var endX = direction === 0 ? startX + length : startX;
    var endY = direction === 1 ? startY + length : startY;

    // Store line information
    lines.push({
      startX: startX,
      startY: startY,
      endX: startX, // Initialize end point at start point
      endY: startY,
      targetLength: length,
      direction: direction,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      // Gradually increase end point towards target length
      if (line.direction === 0 && line.endX < line.startX + line.targetLength)
        line.endX += 0.1; // Increase slower
      if (line.direction === 1 && line.endY < line.startY + line.targetLength)
        line.endY += 0.1; // Increase slower
      // Draw line
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  draw(); // Start animation loop
};
