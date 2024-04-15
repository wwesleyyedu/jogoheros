class Character {
    constructor(name) {
        this.name = name;
        this._life = 1;
        this.maxLife = 1;
        this.attack = 0;
        this.defense = 0;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Monster');
        this.life = 100;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class LogBook {
    constructor(listEl) {
        this.listEl = listEl;
        this.list = [];
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';
        for (let message of this.list) {
            this.listEl.innerHTML += `<li>${message}</li>`;
        }
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        this.updateCharacter(this.fighter1, this.fighter1El);
        this.updateCharacter(this.fighter2, this.fighter2El);
    }

    updateCharacter(character, characterEl) {
        characterEl.querySelector('.name').innerHTML = `${character.name} - ${character.life.toFixed(1)} HP`;
        let pct = (character.life / character.maxLife) * 100;
        characterEl.querySelector('.bar').style.width = `${pct}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Atacando cachorro morto.`);
            return;
        }

        let attackFactor = Math.random() * 2;
        let defenseFactor = Math.random() * 2;

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            let damage = actualAttack - actualDefense;
            attacked.life -= damage;
            this.log.addMessage(`${attacking.name} causou ${damage.toFixed(2)} de dano em ${attacked.name}...`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }

        this.update();
    }
}

// Inicializando o jogo
let log = new LogBook(document.querySelector('.log'));

let char = new Knight('Wesley');
let monster = new LittleMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();
