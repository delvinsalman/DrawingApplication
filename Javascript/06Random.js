// Function to draw random shapes with random colors and positions
function drawRandom() {
  // Set drawing to true, reset points array, and play a click sound
  drawing = true;
  points = [];
  clickSound.play();

  // Generate a random number of points between 30 and 50
  let numPoints = int(random(30, 50));

  // Generate random RGB values for a new random color
  let randomRed = int(random(128, 256));
  let randomGreen = int(random(128, 256));
  let randomBlue = int(random(128, 256));

  // Set currentColor and neonColor to the new random color
  currentColor = color(randomRed, randomGreen, randomBlue);
  neonColor = color(randomRed, randomGreen, randomBlue);

  // Loop to create and draw random points
  for (let i = 0; i < numPoints; i++) {
    // Generate random coordinates, weight, and shape for each point
    let randomX = random(width);
    let randomY = random(height);
    let randomWeight = random(0.1, 0.1);
    let randomShape = random(['Circle', 'Square', 'Triangle']);

    // Create an object representing the random point
    let randomPoint = {
      x: randomX,
      y: randomY,
      color: currentColor,
      weight: randomWeight,
      shape: randomShape,
    };

    // Draw lines and shapes based on the random point
    drawLine(randomPoint.x, randomPoint.y, true, randomPoint.shape);
    drawLine(width - randomPoint.x, randomPoint.y, false, randomPoint.shape);

    // Store the random point in the 'points' array
    points.push(randomPoint);
  }

  // Set drawing to false and play a sound
  drawing = false;
  boidSound.play();
}