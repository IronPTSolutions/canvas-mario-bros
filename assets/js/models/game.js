class Game {
  
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = 480;
    this.canvas.width = 640;
    this.ctx = this.canvas.getContext('2d');

    this.fps = 1000 / 60;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.mario = new Mario(this.ctx, 20, this.canvas.height - 97);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.draw();
      }, this.fps)
    }
  }

  onKeyEvent(event) {
    this.mario.onKeyEvent(event);
    this.background.onKeyEvent(event);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
    this.mario.draw();
  }

  move() {
    if (this.mario.x >= this.mario.maxX) {
      this.background.move();
    }
    this.mario.move();
  }

}
