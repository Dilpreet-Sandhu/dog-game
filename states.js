import { Dust,Fire,Splash } from "./particles.js";
let states = {
    SITITNG : 0,
    RUNNING : 1,
    JUMPING : 2,
    FALLING : 3,
    ROLLING : 4,
    DIVING : 5,
    HIT : 6
}

class State {
    constructor(state,game) {
        this.state = state;
        this.game = game;
    }
}

export class Sititng extends State {
    constructor(game) {
        super('SITTING',game)
   
    }
    enter() {
        this.game.player.frameY = 5;
        this.game.player.maxFrames = 4;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 0;
        }); 

    }
    handleInput(keys) {
        if (keys.includes('a') || keys.includes('d')) this.game.player.setStates(states.RUNNING,2);
        else if (keys.includes('Enter')) this.game.player.setStates(states.ROLLING,3);
       
    }
}

export class Running extends State {
    constructor(game) {
        super('running',game)
    }
    enter() {
        this.game.player.frameY = 3;
        this.game.player.maxFrames = 6;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 1;
        }); 
        
    }
    handleInput(keys) {
        this.game.particles.unshift(new Dust(this.game,this.game.player.x,this.game.player.y));
        if (keys.includes('s')) this.game.player.setStates(states.SITITNG,0);
        else if (keys.includes('w')) this.game.player.setStates(states.JUMPING,1);
        else if (keys.includes('Enter')) this.game.player.setStates(states.ROLLING,3);

        
    }
}

export class Jumping extends State {
    constructor(game) {
        super('jumping',game);
    }
    enter() {
        this.game.player.frameY = 1;
        this.game.player.vy -= 20;
        this.game.player.maxFrames = 6;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 1;
        }); 

    }
    handleInput(keys) {
        if (this.game.player.vy > 0) this.game.player.setStates(states.FALLING,1);
        else if (keys.includes('Enter')) this.game.player.setStates(states.ROLLING,3);

    }
}
export class Falling extends State {
    constructor(game) {
        super('falling',game)
    }
    enter() {
        this.game.player.frameY = 2;
        this.game.player.maxFrames = 6;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 1;
        }); 

    }
    handleInput(keys) {
        if (this.game.player.onGround()) this.game.player.setStates(states.RUNNING,2);
        else if (keys.includes('Enter')) this.game.player.setStates(states.ROLLING,3);
        else if (keys.includes('s')) this.game.player.setStates(states.DIVING,0)

    }
}
export class Rolling extends State {
    constructor(game) {
        super('falling',game);
    }
    enter() {
        this.game.player.frameY = 6;
        this.game.player.maxFrames = 5;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 3;
        }); 

    }
    handleInput(keys) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x,this.game.player.y));
        if (!keys.includes('Enter') && this.game.player.onGround()) this.game.player.setStates(states.RUNNING,2);
        if (!keys.includes('Enter') && !this.game.player.onGround()) this.game.player.setStates(states.FALLING,1);
        if (keys.includes('w') && keys.includes('Enter') && this.game.player.onGround()) this.game.player.vy -= 20;
        else if (keys.includes('s')) this.game.player.setStates(states.DIVING,0)

    }
}

export class Diving extends State {
    constructor(game) {
        super('diving',game);
    }
    enter() {
        this.game.player.frameY = 6;
        this.game.player.maxFrames = 5;
        this.game.player.frameX = 0;
        this.game.player.vy = 15;
        this.game.background.bgArr.forEach(background => {
            background.speedModifier = 3;
        }); 

    }
    handleInput(keys) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x,this.game.player.y));
        if (this.game.player.onGround()){ this.game.player.setStates(states.RUNNING,2);
            this.game.particles.unshift(new Splash(this.game,this.game.player.x,this.game))
        }
        if (keys.includes('Enter') && this.game.player.onGround()) this.game.player.setStates(states.ROLLING,1);
    }
}
export class Hit extends State {
    constructor(game) {
        super('hit',game);
    }
    enter() {
        this.game.player.frameY = 4;
        this.game.player.maxFrames = 10;
        this.game.player.frameX = 0;

    }
    handleInput(keys) {
        if (this.game.player.frameX > 8 && this.game.player.onGround())this.game.player.setStates(states.RUNNING,2);
        if (this.game.player.frameX > 8 && !this.game.player.onGround()) this.game.player.setStates(states.FALLING,1);
    }
}