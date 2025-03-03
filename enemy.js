/**@type {HTMLCanvasElement} */
class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.frameInterval = 50;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        this.x -= this.speedX;
        this.y += this.speedY;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
        else this.frameTimer += deltaTime;

        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx) {
        if (!this.game.debug) {ctx.strokeRect(this.x,this.y,this.width,this.height)}

        ctx.drawImage(this.image,this.width * this.frameX,0,this.width,this.height,this.x,this.y,this.width,this.height)
    }
}

export class FlyingEnemies extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.width = 60;
        this.height = 44;
        this.speedX = 5 + 5;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById('fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle)
    }
}
export class GroundEnemies extends Enemy {
    constructor(game) {
      super();
      this.game = game;
      this.width = 60;
      this.height = 87;
      this.x = this.game.width;
      this.y = this.game.height - this.height - this.game.groundMargin;
      this.speedX = 5 ;
      this.speedY = 0;
      this.maxFrame = 1;
      this.image = document.getElementById('plant') ; 
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 5;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.image = document.getElementById('spider')
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height/3) this.speedY = -1;
     }
    draw(ctx) {

        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2,0);
        ctx.lineTo(this.x + this.width/2,this.y+ 50);
        ctx.stroke()
    }
}