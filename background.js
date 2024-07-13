class Layer {
    constructor(image,game,width,height,speedModifier) {
        this.game = game;
        this.width = width,
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = this.game.speed;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if(this.x < -this.width) this.x = 0;
        else this.x  -=  this.speed * this.speedModifier;
    }
    draw(ctx) {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
    }
}

export class Background  {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1 = document.getElementById('layer-1');
        this.layer2 = document.getElementById('layer-2');
        this.layer3 = document.getElementById('layer-3');
        this.layer4 = document.getElementById('layer-4');
        this.layer5 = document.getElementById('layer-5');
        this.bg1 = new Layer(this.layer1,this.game,this.width,this.height,0.2);
        this.bg2 = new Layer(this.layer2,this.game,this.width,this.height,0.4);
        this.bg3 = new Layer(this.layer3,this.game,this.width,this.height,0.6);
        this.bg4 = new Layer(this.layer4,this.game,this.width,this.height,0.8);
        this.bg5 = new Layer(this.layer5,this.game,this.width,this.height,1);
        this.bgArr = [this.bg1,this.bg2,this.bg3,this.bg4,this.bg5];
    }
    update() {
        this.bgArr.forEach(bg => {
            bg.update();
        })
    }
    draw(ctx) {
        this.bgArr.forEach(bg => {
            bg.draw(ctx);
        })
    }
}