import Player from "./player.js";
import InputHandler from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemies,GroundEnemies,ClimbingEnemy } from "./enemy.js";
import { UI } from "./ui.js";

window.addEventListener('load',function() {
    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    let lastPaintTime = 0;
    

    class Game {
        constructor(width,height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 5;
            this.background = new Background(this)
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this)
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug =  true;
            this.score = 0;
            this.maxParticles = 50;
            this.timer = 0;
            this.gameOver = false;
            this.lives = 5;
        }
        update(deltaTime) {

            this.player.update(this.input.keys,deltaTime);
            this.background.update();
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this.addEnemy();
            }
            else this.enemyTimer += deltaTime;

            this.enemies.forEach(en => {
                en.update(deltaTime);
                if (en.markedForDeletion) this.enemies.splice(this.enemies.indexOf(en),1)
            })
            this.particles.forEach((particle,idx) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(idx,1)
            })
            this.collisions.forEach((col,idx) => {
                col.update(deltaTime);
                if (col.markedForDeletion) this.collisions.splice(idx,1)
            })
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.enemies.forEach(en => {
                en.draw(ctx)
            })
            this.ui.draw(ctx);
            this.particles.forEach(particle => {
                particle.draw(ctx)
            })
            this.collisions.forEach(col => {
                col.draw(ctx)
            })

            
        }
        addEnemy() {
            this.enemies.push(new FlyingEnemies(this));
            if (Math.random() > 0.8) this.enemies.push(new GroundEnemies(this));
            else if (Math.random() > 0.5) this.enemies.push(new ClimbingEnemy(this))

        }
        
        
    }
    let game = new Game(canvas.width,canvas.height);


    document.addEventListener('keydown',(e) => {
        if (game.gameOver) {
        if(e.key == 'Enter') {
            game.gameOver = false;
            game.enemies = [];
            game.score = 0;
            game.lives = 5;
            game.player.x = 0;
            animate(0)
        }
    }
    })

    function animate(timeStamp) {
        let deltaTime = timeStamp - lastPaintTime;
        lastPaintTime = timeStamp;
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})