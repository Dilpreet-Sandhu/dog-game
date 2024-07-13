export class CollisionDetection {
    constructor(game,x,y) {
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.sizeModifier = Math.random() * 0.5;
        this.width =  this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.frameInterval = 20;
        this.frameTimer = 0;
    }
    update(deltaTime) {
        this.speed = 5;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX > this.maxFrame) this.frameX = 0;
            else this.frameX++;
        }
        else this.frameTimer += deltaTime;
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
       


    }
    draw(ctx) {
        ctx.drawImage(this.image,this.spriteWidth * this.frameX,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }   
}