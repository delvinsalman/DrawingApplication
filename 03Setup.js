// Set up the canvas and initialize background
function setup() {
  createCanvas(1000, 800);
  background(0);

  // Create and style the 'Clear' button
  let clearButton = createButton('Clear');
  styleButton(clearButton);
  clearButton.mousePressed(clearCanvas);

  // Create and style the color picker
  let colorPicker = createColorPicker('#00FF00');
  styleColorPicker(colorPicker);
  colorPicker.input(changeColor);
  currentColor = colorPicker.color();
  neonColor = color(0, 255, 0);

  // Create and style the input for drawing size
  drawSizeInput = createInput(defaultDrawSize, 'number');
  styleInput(drawSizeInput);
  drawSizeInput.input(changeDrawSize);
  drawSizeInput.attribute('min', minDrawSize);
  drawSizeInput.attribute('max', maxDrawSize);
  drawSizeInput.attribute('step', '0.1');

  // Create and style the selector for point shape
  pointSelector = createSelect();
  styleSelect(pointSelector);
  pointSelector.option('Circle');
  pointSelector.option('Square');
  pointSelector.option('Triangle');

  // Create and style the 'Random' button
  randomButton = createButton('Random');
  styleButton(randomButton);
  randomButton.mousePressed(drawRandom);

  // Create and style the 'Spawn Boids' button
  spawnBoidsButton = createButton('Spawn Boids');
  styleButton(spawnBoidsButton);
  spawnBoidsButton.mousePressed(spawnBoids);

  // Create and style the 'Toggle Animation' button
  toggleAnimationButton = createButton('Toggle Animation');
  styleButton(toggleAnimationButton);
  toggleAnimationButton.mousePressed(toggleAnimation);

  // Create and style the 'Toggle Effects' button
  toggleEffectsButton = createButton('Toggle Effects');
  styleButton(toggleEffectsButton);
  toggleEffectsButton.mousePressed(toggleEffects);

  // Create and style the 'Play Background Sound' button
  toggleBackgroundSoundButton = createButton('Play Background Sound');
  styleButton(toggleBackgroundSoundButton);
  toggleBackgroundSoundButton.mousePressed(toggleBackgroundSound);

  // Create and style the 'Change Color' button for background
  changeColorButton = createButton('Change Color');
  styleButton(changeColorButton);
  changeColorButton.mousePressed(changeBackgroundColor);
}

// Function to style buttons
function styleButton(button) {
  button.style('padding', '8px');
  button.style('font-size', '16px');
  button.style('font-family', 'cursive');
  button.style('background-color', '#0C0C0C');
  button.style('color', '#00FF00');
  button.style('border', 'none');
  button.style('border-radius', '8px');
  button.style('cursor', 'pointer');
  button.style('text-shadow', '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00');
  button.style('margin-right', '10px');
  button.style('margin-bottom', '10px');
  button.style('margin-top', '3px');

  button.style('transition', 'background-color 0.3s');
  button.style('position', 'relative');

  // Change button background color on hover
  button.mouseOver(() => {
    button.style('background-color', '#525252');
  });

  button.mouseOut(() => {
    button.style('background-color', '#0C0C0C');
  });
}

// Function to style color picker
function styleColorPicker(colorPicker) {
  colorPicker.position(1010, height + -800);
}

// Function to style input elements
function styleInput(input) {
  input.position(1010, height + -760);
  input.style('width', '50px');
  input.style('padding', '5px');
  input.style('font-size', '14px');
}

// Function to style select elements
function styleSelect(select) {
  select.position(1010, height + -720);
  select.style('padding', '5px');
  select.style('font-size', '14px');
}
