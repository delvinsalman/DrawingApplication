// Function to spawn a certain number of boids and play a sound
function spawnBoids() {
  // Create and add new Boid objects to the 'boids' array
  for (let i = 0; i < 5; i++) {
    let boid = new Boid();
    boids.push(boid);
  }

  // Play the boid sound
  boidSound.play();
}

// Function to toggle background sound on/off and update button text
function toggleBackgroundSound() {
  // Check if the background sound is currently playing
  if (backgroundSound.isPlaying()) {
    // If playing, pause the sound and update button text
    backgroundSound.pause();
    toggleBackgroundSoundButton.html('Play Background Sound');
  } else {
    // If not playing, loop the sound and update button text
    backgroundSound.loop();
    toggleBackgroundSoundButton.html('Pause Background Sound');
  }
}

// Function to toggle the drawing animation on/off and update button text
function toggleAnimation() {
  // Invert the state of animateDrawing
  animateDrawing = !animateDrawing;
  // Update button text based on the current state
  if (animateDrawing) {
    animationFrames = 0;
    toggleAnimationButton.html('Animation On');
  } else {
    toggleAnimationButton.html('Animation Off');
  }
}

// Function to toggle visual effects on/off and update button text
function toggleEffects() {
  // Invert the state of enableEffects
  enableEffects = !enableEffects;
  // Update button text based on the current state
  if (enableEffects) {
    toggleEffectsButton.html('Toggle Effects On');
  } else {
    toggleEffectsButton.html('Toggle Effects Off');
  }
}

// Function to dynamically change the background color and play a sound
function changeBackgroundColor() {
  // Change the background color dynamically using sin function over time
  let r = sin(frameCount * 0.1) * 127 + 128;
  let g = sin(frameCount * 0.05) * 127 + 128;
  let b = sin(frameCount * 0.02) * 127 + 128;
  background(r, g, b);

  // Play the sound for background color change
  colorChangeSound.play();
}