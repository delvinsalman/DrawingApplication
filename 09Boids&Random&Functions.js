// Class representing a boid with flocking behavior
class Boid {
  // Constructor to initialize the boid's properties
  constructor() {
    // Set initial position to a random location within the canvas
    this.position = createVector(random(width), random(height));
    // Set initial velocity to a random 2D vector
    this.velocity = p5.Vector.random2D();
    // Initialize acceleration vector
    this.acceleration = createVector();
    // Set maximum force that can be applied for steering
    this.maxForce = 0.2;
    // Set maximum speed limit for the boid
    this.maxSpeed = 4;
    // Set a random color for the boid
    this.color = color(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
  }

  // Method to update the boid's position, velocity, and apply flocking behaviors
  update() {
    // Update position based on velocity
    this.position.add(this.velocity);
    // Update velocity based on acceleration
    this.velocity.add(this.acceleration);
    // Limit velocity to the maximum speed
    this.velocity.limit(this.maxSpeed);
    // Reset acceleration to zero for the next frame
    this.acceleration.mult(0);
    // Apply flocking behaviors (alignment, cohesion, separation, and edge avoidance)
    this.flock(boids);
    // Wrap around the edges of the canvas
    this.edges();
    // Avoid edges to prevent boids from getting too close
    this.avoidEdges();
    // Avoid other boids to maintain separation
    this.avoidOthers(boids);
  }

  // Method to apply a force to the boid's acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Method to apply flocking behaviors (alignment, cohesion, separation)
  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);

    // Adjust the influence of each behavior
    alignment.mult(1.0);
    cohesion.mult(1.0);
    separation.mult(1.5);

    // Apply the forces to the boid
    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(separation);
  }

  // Method for aligning with nearby boids
  align(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  // Method for cohesion with nearby boids
  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  // Method for separation from nearby boids
  separation(boids) {
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  // Method to handle wrapping around the edges of the canvas
  edges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;

    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }

  // Method to avoid edges and bounce off if too close
  avoidEdges() {
    let desired = null;
    let margin = 50;

    if (this.position.x < margin) {
      desired = createVector(this.maxSpeed, this.velocity.y);
    } else if (this.position.x > width - margin) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < margin) {
      desired = createVector(this.velocity.x, this.maxSpeed);
    } else if (this.position.y > height - margin) {
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    if (desired !== null) {
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  // Method to avoid other boids and maintain separation
  avoidOthers(boids) {
    let perceptionRadius = 24;
    let steering = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (other !== this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    this.applyForce(steering);
  }

  // Method to display the boid on the canvas
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, 1, 1);
  }
}