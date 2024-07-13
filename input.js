export default class InputHandler {
    constructor(game) {
        this.keys = [];
        this.game = game;
        window.addEventListener('keydown', e => {
            if ((e.key == 'a' ||
                 e.key ==  'w' ||
                 e.key == 'd'  ||
                 e.key == 's'   ||
                 e.key == 'Enter'
                ) && this.keys.indexOf(e.key) == -1) {
                this.keys.push(e.key);

            } 
            else if (e.key == 'v') this.game.debug = !this.game.debug;
        })
        window.addEventListener('keyup', e => {
            if (e.key == 'a' || e.key == 'w' || e.key == 'd' || e.key == 's' || e.key == 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key),1)
            }
        })
    }
}