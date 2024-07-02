// Function triggered when the mouse is pressed
function mousePressed() {
  // Check if the mouse is within the canvas boundaries
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // Set drawing to true, reset points array, and play a click sound
    drawing = true;
    points = [];
    clickSound.play();
  }
}

// Function triggered when the mouse is released
function mouseReleased() {
  // Set drawing to false when the mouse is released
  drawing = false;
}

// Function to draw lines and shapes based on user input
function drawLine(x, y, isLeft, pointShape) {
  // Iterate through points array and draw lines and shapes
  for (let i = 1; i < points.length; i += 5) {
    // Calculate mirrored X coordinate based on whether it's the left side or not
    let mirroredX = isLeft ? points[i - 1].x : width - points[i - 1].x;

    // Set stroke properties
    stroke(neonColor);
    strokeWeight(points[i].weight);

    // Iterate for creating a blurred effect
    for (let j = 0; j < blurAmount; j++) {
      // Calculate alpha based on the blur amount
      let alpha = map(j, 0, blurAmount, 0, 255);
      // Adjust stroke color with alpha for a fading effect

      // Determine the shape to draw based on user selection
      if (pointShape === 'Circle') {
        // Draw an ellipse
        ellipse(
          lerp(mirroredX, x, i / points.length),
          lerp(points[i - 1].y, y, i / points.length),
          points[i].weight * (enableEffects ? 2 : 1),
          points[i].weight * (enableEffects ? 2 : 1)
        );
      } else if (pointShape === 'Square') {
        // Draw a rectangle
        rect(
          lerp(mirroredX, x, i / points.length),
          lerp(points[i - 1].y, y, i / points.length),
          points[i].weight * (enableEffects ? 2 : 1),
          points[i].weight * (enableEffects ? 2 : 1)
        );
      } else if (pointShape === 'Triangle') {
        // Draw a triangle
        triangle(
          lerp(mirroredX, x, i / points.length),
          lerp(points[i - 1].y, y, i / points.length),
          lerp(mirroredX, x, (i + 5) / points.length),
          lerp(points[i - 1].y, y, (i + 5) / points.length),
          lerp(mirroredX, x, (i + 10) / points.length),
          lerp(points[i - 1].y, y, (i + 10) / points.length)
        );
      }

      // Create particles for visual effects
      particles.push(
        new Particle(
          lerp(mirroredX, x, i / points.length),
          lerp(points[i - 1].y, y, i / points.length),
          random(-0.2, 0.2),
          random(-0.2, 0.2),
          neonColor,
          alpha
        )
      );
    }
  }
}

// Function to clear the canvas and play a clear sound
function clearCanvas() {
  background(0);
  boids = [];
  clearSound.play();
}

// Function to change the drawing color based on user input
function changeColor() {
  currentColor = this.color();
  neonColor = color(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2]);
}

// Function to change the drawing size based on user input
function changeDrawSize() {
  // Get the new size from the input field
  let newSize = parseFloat(drawSizeInput.value());
  // Constrain the new size within specified limits
  newSize = constrain(newSize, minDrawSize, maxDrawSize);
  // Set the input field value to the constrained size
  drawSizeInput.value(newSize.toString());
}