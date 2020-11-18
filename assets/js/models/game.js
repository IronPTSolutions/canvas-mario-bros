class Game {
  
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.ctx = this.canvas.getContext('2d');

    this.fps = 1000 / 60;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(this.onFrameTic.bind(this), this.fps)
    }
  }

  onFrameTic() {
    this.clear();
    this.draw();
    this.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
  }

  move() {
    this.background.move();
  }

}
