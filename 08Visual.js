// Class representing a particle for visual effects
class Particle {
  // Constructor to initialize the particle's properties
  constructor(x, y, vx, vy, color, alpha) {
    this.x = x;       // X-coordinate of the particle
    this.y = y;       // Y-coordinate of the particle
    this.vx = vx;     // Velocity in the X direction
    this.vy = vy;     // Velocity in the Y direction
    this.color = color; // Color of the particle
    this.alpha = alpha; // Alpha value for transparency
  }

  // Method to update the particle's position and alpha value
  update() {
    this.x += this.vx;    // Update X position based on velocity
    this.y += this.vy;    // Update Y position based on velocity
    this.alpha -= 2;      // Decrease alpha value over time
  }

  // Method to display the particle on the canvas
  display() {
    noStroke();
    // Set fill color with alpha for transparency
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    // Draw a small ellipse at the particle's position
    ellipse(this.x, this.y, 0.5, 0.5);
  }

  // Method to check if the particle has finished its lifecycle
  isFinished() {
    // Return true if alpha is less than or equal to 0, indicating the particle is no longer visible
    return this.alpha <= 0;
  }
}