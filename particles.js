class Particles {
    constructor(game){
        this.game = game;   
        this.markedForDeletion = false;
    }
    update() {

        this.x -= this.speedX + 5;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;
    }
 }


export class Dust extends Particles {
    constructor(game,x,y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x + this.game.player.width/2;
        this.y = y + this.game.player.height;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.4)';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export class Fire extends Particles {
    constructor(game,x,y) {
        super(game);
        this.game = game;
        this.size = Math.random() * 100 + 50;
        this.x = x + this.game.player.width/2;
        this.y = y  + this.game.player.height/2 ;
        this.image = document.getElementById('fire');
        this.speedX = 0;
        this.speedY = 0;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;

    }
    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle)
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image,-this.size * 0.5,-this.size * 0.5,this.size,this.size);
        ctx.restore();
    }
}

export class Splash extends Particles {
    constructor(game,x,y) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 100 + 100;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 4 - 2;
        this.image = document.getElementById('fire');
        this.gravtiy = 0;

    }
    update() {
        super.update();
        this.gravtiy += 0.1;
        this.y += this.gravtiy;
    }
    draw(ctx) {
        ctx.drawImage(this.image,this.x,this.y,this.size,this.size)
    }
}