function keyPressed() {
  // Check if the key pressed is 's'
  if (key === 's' || key === 'S') {
    // Save the canvas as an image with a timestamp
    saveCanvas('MyVisualArtPiece', 'png');
  }
}