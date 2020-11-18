class Mario {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.maxX = this.ctx.canvas.width / 2;
    this.minX = 0;
    this.vx = 0;
    
    this.y = y;
    this.vy = 0;
    this.maxY = this.y;

    this.width = 0;
    this.height = 0;

    this.sprite = new Image();
    this.sprite.src = './assets/img/mario.sprite.png';
    this.sprite.isReady = false;
    this.sprite.horizontalFrames = 2;
    this.sprite.verticalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 1;
    this.sprite.drawCount = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWith;
      this.height = this.sprite.frameHeight;
    }

    this.movements = {
      up: false,
      right: false,
      left: false
    }
    this.isJumping = false;
  }

  isReady() {
    return this.sprite.isReady;
  }

  onKeyEvent(event) {
    const status = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status;
        break;
      case KEY_DOWN:
        this.movements.down = status;
        break;
      case KEY_RIGHT:
        this.movements.right = status;
        break;
      case KEY_LEFT:
        this.movements.left = status;
        break;
    }
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWith,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWith,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.sprite.drawCount++;
      this.animate();
    }
  }

  move() {
    if (this.movements.up && !this.isJumping) {
      this.isJumping = true;
      this.vy = -8;
    } else if (this.isJumping) {
      this.vy += GRAVITY;
    }
    
    if (this.movements.right) {
      this.vx = 4;
    } else if (this.movements.left) {
      this.vx = -4;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Check canvas bounds
    if (this.x >= this.maxX) {
      this.x = this.maxX;
    } else if (this.x <= this.minX) {
      this.x = this.minX;
    }
    if (this.y >= this.maxY) {
      this.y = this.maxY;
      this.isJumping = false;
      this.vy = 0;
    }
  }
  
  animate() {
    if (this.isJumping) {
      this.animateJump();
    } else if (this.movements.right || this.movements.left) {
      this.animateSprite(1, 0, 1, MOVEMENT_FRAMES);
    } else {
      this.resetAnimation();
    }
  }

  animateJump() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
  }

  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 1;
  }

  animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalSegments, frequency) {
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
      this.sprite.verticalFrameIndex = initialVerticalIndex;
      this.sprite.horizontalFrameIndex = initialHorizontalIndex;
    } else if (this.sprite.drawCount % frequency === 0) {
      this.sprite.horizontalFrameIndex = this.sprite.horizontalFrameIndex >= maxHorizontalSegments ? 0 : this.sprite.horizontalFrameIndex + 1;
      this.sprite.drawCount = 0;
    }
  }

}
