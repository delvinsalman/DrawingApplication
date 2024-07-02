// The main draw function, called continuously by p5.js
function draw() {
  // Check if the user is currently drawing
  if (drawing) {
    // Create an object representing the current drawing point
    let currentPoint = {
      x: mouseX,
      y: mouseY,
      color: currentColor,
      weight: parseFloat(drawSizeInput.value()),
      shape: pointSelector.value(),
    };

    // Draw lines on both sides of the canvas based on the current drawing point
    drawLine(currentPoint.x, currentPoint.y, true, currentPoint.shape);
    drawLine(width - currentPoint.x, currentPoint.y, false, currentPoint.shape);

    // Store the current drawing point in the 'points' array
    points.push(currentPoint);

    // If effects are enabled, animate the style and movement
    if (enableEffects) {
      animateStyle();
      animateMovement();
    }
  }

  // Check if animation of drawing is enabled
  if (animateDrawing) {
    // If yes, animate style and movement, and increment animation frames
    animateStyle();
    animateMovement();
    animationFrames++;
  } else {
    // If not, set neonColor to the current drawing color and reset animation frames
    neonColor = color(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2]);
    animationFrames = 0;
  }

  // Update and display particles for visual effects
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    // Remove particles that have finished their lifecycle
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }

  // Update and display boids (if spawned) for flocking behavior
  for (let boid of boids) {
    boid.update();
    boid.display();
  }
}

// Helper function to animate the drawing style based on sine and cosine functions
function animateStyle() {
  neonColor = color(
    map(sin(animationFrames * 0.05), -1, 1, 0, 255),
    map(cos(animationFrames * 0.03), -1, 1, 0, 255),
    map(sin(animationFrames * 0.08), -1, 1, 0, 255)
  );
}

// Helper function to animate the movement of drawing points based on Perlin noise
function animateMovement() {
  for (let i = 0; i < points.length; i++) {
    // Adjust drawing point coordinates based on Perlin noise
    let noiseFactorX = noise(i * 0.1, animationFrames * 0.05) * 15;
    let noiseFactorY = noise(i * 0.1, animationFrames * 10.01) * 51;
    points[i].x += sin(animationFrames * 10.05 + noiseFactorX) * 12;
    points[i].y += cos(animationFrames * 10.03 + noiseFactorY) * 12;
  }
}