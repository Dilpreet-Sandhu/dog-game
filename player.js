import { Sititng ,Running,Jumping,Falling,Rolling,Diving,Hit} from "./states.js";
import { CollisionDetection } from "./collisionDetection.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.gravtiy = 0.5;
        this.states = [new Sititng(this.game),new Running(this.game),new Jumping(this.game),new Falling(this.game),new Rolling(this.game),new Diving(this.game),new Hit(this.game)];
        this.frameTimer = 0;
        this.frameInterval = 20;
        this.maxFrames = 5;
        this.currentState = this.states[0];
      
    }
    update(keys,deltaTime) {
        this.currentState.handleInput(keys);

        this.checkCollision();
          
        
        
            if (this.frameTimer > this.frameInterval) {
                this.frameTimer = 0;
               if (this.frameX < this.maxFrames) this.frameX++
               else this.frameX = 0;
            }
            else this.frameTimer += deltaTime;



        //horizontal movement
        this.speed = this.maxSpeed;
        if (keys.includes('d')) this.x += this.speed;
        else if (keys.includes('a')) this.x -= this.speed;
        else this.speed = 0;

        if (this.x < 0) this.x = 0;
        else if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;

        //vertical movement
        this.y += this.vy;
        // if (keys.includes('w') && this.onGround()) {
        //    this.vy -= 15;
        // }
        if (!this.onGround()) {
            this.vy += this.gravtiy;
        }
        else {
            this.vy = 0;
        }
      
    }
    draw(ctx) {
        if (!this.game.debug) {ctx.strokeRect(this.x,this.y,this.width,this.height)}
        ctx.drawImage(this.image,this.width * this.frameX,this.height * this.frameY,this.width,this.height,this.x,this.y,this.width,this.height);
    
    }   
   
    onGround() {
        return this.y + this.height + this.game.groundMargin > this.game.height;
    }
    setStates(state,speed) {
        this.currentState = this.states[state];
        this.game.speed = speed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            )
            {
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionDetection(this.game,enemy.x + enemy.width/2,enemy.y + enemy.height/2))
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++;
                }
                else {
                    this.setStates(6,0);
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}