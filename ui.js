export class UI {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('lives');
    }
    draw(ctx) {
        ctx.font = '40px Helvatica';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black'
        ctx.fillText('score:'+ this.game.score,20,50);
        for (let i = 0; i < this.game.lives ; i++) {
            ctx.drawImage(this.image,25 * i + 20,70,25,26);
        }
    }
}