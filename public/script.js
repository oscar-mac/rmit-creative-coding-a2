document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("frame");
  // CanvasRenderingContext2D from Canvas API!!
  const context = canvas.getContext("2d");

  class Square {
    constructor(x, y, size, orientation, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.orientation = orientation;
      this.color = color;
      // Speed for movement
      this.speedX = (Math.random() - 0.1) * 0.1; // horizontal
      this.speedY = (Math.random() - 0.1) * 0.1; // vertical
    }

    // Draw square on canvas
    draw() {
      context.beginPath();
      if (this.orientation === "vertical") {
        for (let i = this.x; i < this.x + this.size; i += 5) {
          context.moveTo(i, this.y);
          context.lineTo(i, this.y + this.size);
        }
      } else {
        for (let i = this.y; i < this.y + this.size; i += 5) {
          context.moveTo(this.x, i);
          context.lineTo(this.x + this.size, i);
        }
      }
      context.strokeStyle = this.color;
      context.lineWidth = 1;
      context.stroke();
    }

    // Move square
    updatePosition() {
      this.x += this.speedX;
      this.y += this.speedY;

      // If square hits boundary, reverse horizontal direction
      if (this.x < 0 || this.x > canvas.width - this.size) {
        this.speedX *= -1;
      }

      // Reverse vertical direction if the square hits canvas boundary
      if (this.y < 0 || this.y > canvas.height - this.size) {
        this.speedY *= -1;
      }
    }
  }

  // Generate a random integer between range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Draw recursively generated squares
  function drawRecursion(numSquares, depth) {
    const canvasSize = canvas.width;

    // Calculate the size of each quadrant
    const quadrantSize = canvasSize / 2;

    const minSquareSize = 400;
    const maxSquareSize = quadrantSize - 20;
    // Define the coordinates of each quadrant
    const quadrants = [
      { x: 0, y: 0 }, // Top left
      { x: quadrantSize, y: 0 }, // Top right
      { x: 0, y: quadrantSize }, // Bottom left
      { x: quadrantSize, y: quadrantSize }, // Bottom right
    ];

    // Randomly choose the orientation for squares in the top-left quadrant and determine orientation of squares in other quadrants to create a grid pattern on movement.
    const topLeftOrientation = Math.random() > 0.5 ? "horizontal" : "vertical";
    const orientations = [
      topLeftOrientation,
      topLeftOrientation === "horizontal" ? "vertical" : "horizontal",
      topLeftOrientation === "horizontal" ? "vertical" : "horizontal",
      topLeftOrientation,
    ];

    // Array to store the generated squares
    const squares = [];

    // Recursive function to create squares within each quadrant
    function createSquares(quadrantIndex, recursionDepth) {
      // Base case: stop recursion when depth is zero
      if (recursionDepth <= 0) return;

      // Get the current quadrant
      const quadrant = quadrants[quadrantIndex];
      // Generate a random size for the square within the allowed range
      const size = getRandomInt(minSquareSize, maxSquareSize);
      // Define the range within which the square's position can vary
      const xRange = quadrantSize / 4;
      const yRange = quadrantSize / 4;
      // Generate random coordinates for the square within the quadrant
      const x = getRandomInt(
        quadrant.x + xRange,
        quadrant.x + quadrantSize - size - xRange,
      );
      const y = getRandomInt(
        quadrant.y + yRange,
        quadrant.y + quadrantSize - size - yRange,
      );
      // Get the orientation for the current quadrant
      const orientation = orientations[quadrantIndex];
      // Randomly choose the color for the square, 10% chance of being red, otherwise black.
      const color = Math.random() < 0.1 ? "red" : "black";
      // Create a new square object with the generated properties
      const square = new Square(x, y, size, orientation, color);
      // Add the square to the array of squares
      squares.push(square);

      // Recursively create squares in the next depth level
      createSquares((quadrantIndex + 1) % 4, recursionDepth - 1);
    }

    // Call the recursive function to create squares starting from the top-left quadrant
    createSquares(0, depth);

    // Animation function to continuously update and draw squares based on their updated position
    function animate() {
      // Clear the canvas before drawing the next frame
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Update and draw each square
      squares.forEach((square) => {
        square.updatePosition();
        square.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  const recursionDepth = getRandomInt(4, 10); // Range between 4 and 10
  // Draw the squares recursively with random recursion depth
  drawRecursion(1, recursionDepth);
});
