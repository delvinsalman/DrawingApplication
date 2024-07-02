// Array to store drawing points
let points = [];

// Array to store particles for visual effects
let particles = [];

// Flag to indicate if the user is currently drawing
let drawing = false;

// Flag to indicate if drawing should be animated
let animateDrawing = false;

// Flags for background sound state
let backgroundSoundPlaying = false;
let backgroundSoundPaused = false;

// Current color selected for drawing
let currentColor;

// Input for controlling the draw size
let drawSizeInput;

// Amount of blur applied to the drawing
let blurAmount = 10;

// Color for neon effect
let neonColor;

// Default draw size
let defaultDrawSize = "0.1";

// Minimum and maximum draw sizes
let minDrawSize = 0.1;
let maxDrawSize = 2;

// Sound variable for clearing canvas
let clearSound;

// Dropdown selector for point shape (circle, square, triangle)
let pointSelector;

// Sound for mouse click
let clickSound;

// Button for triggering random drawing
let randomButton;

// Button for spawning boids
let spawnBoidsButton;

// Sound for boid interactions
let boidSound;

// Background sound
let backgroundSound;

// Flag to enable/disable visual effects
let enableEffects = false;

// Sound for background color change
let colorChangeSound;

// Array to store boid objects
let boids = [];

// Counter for animation frames
let animationFrames = 0;

// Button for toggling animation
let toggleAnimationButton;

// Button for toggling visual effects
let toggleEffectsButton;

// Button for toggling background sound
let toggleBackgroundSoundButton;

// Button for changing drawing color
let changeColorButton;
