const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.6;

const backgroud = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
})

const shop = new Sprite ({
    position: {
        x: 600,
        y: 130,
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 50,
        y: 0
    },
    imageSrc: './assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './assets/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './assets/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './assets/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './assets/samuraiMack/Death.png',
            framesMax: 6
        }
        
    },
    attackBox:{
        offset: {
            x: 100,
            y: 50,
        },
        width: 155,
        height: 50,
    },
    attackPower: 5,
});


const enemy = new Fighter({
    position: {
    x: 400,
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './assets/Kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './assets/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './assets/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './assets/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox:{
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50,
    },
    attackPower: 10,
});

const wizard = new Fighter({
    position: {
    x: 400,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: {
        x: 50,
        y: 0
    },
    imageSrc: './assets/evilWizard/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 270
    },
    sprites: {
        idle: {
            imageSrc: './assets/evilWizard/Run.png',
            framesMax: 5
        },
        run: {
            imageSrc: './assets/evilWizard/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/evilWizard/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/evilWizard/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './assets/evilWizard/Attack1.png',
            framesMax: 8
        },
        takeHit: {
            imageSrc: './assets/evilWizard/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './assets/evilWizard/Death.png',
            framesMax: 7
        }
    },
    attackBox:{
        offset: {
            x: 100,
            y: 50,
        },
        width: 155,
        height: 50,
    }
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },

    //enemy
    ArrowUp: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowDown: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    }
}

decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    backgroud.update();
    shop.update();
    c.fillStyle = 'rgba(255,255,255, 0.15)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update();
    enemy.update();
    const backGroundAudio = document.querySelector('#bgAudio');
    backGroundAudio.play();
    // wizard.update();

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    if  (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run');
    } else{
        player.switchSprite('idle')
    }
    if (keys.w.pressed && player.height + player.position.y + player.velocity.y >= canvas.height - 96) {
        player.velocity.y = -15;
    }

    //jump player
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //player sounds
    function runSound(){
        const runAudio = document.querySelector('#runAudio');
        if (player.position.y < 330) {
            runAudio.pause();
            runAudio.currentTime = 0;
            return
        }

        if (keys.a.pressed || keys.d.pressed){
            runAudio.play();
        }
    }
    runSound();
        
    
    function enemySound(){
        const enemyRunAudio = document.querySelector('#enemyRun');
        if (enemy.position.y < 330) {
            enemyRunAudio.pause();
            enemyRunAudio.currentTime = 0;
            return
        }

        if (keys.ArrowRight.pressed || keys.ArrowLeft.pressed){
            enemyRunAudio.play();
        }
    }
   
    enemySound();


    //enemy movement
    if  (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }
    if (keys.ArrowUp.pressed && enemy.height + enemy.position.y + enemy.velocity.y >= canvas.height - 96) {
        enemy.velocity.y = -15;
    }

    //jump enemy
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detect for colision & enemy gets hit
    if (
        retangularColision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && player.frameCurrent === 4
        ) {
        enemy.takeHit()

        player.isAttacking = false;
        
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    // if player misses
    if (player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false;
        const slashAir = document.querySelector('#playerSlashAir');
        slashAir.play(); 
    }

    //player gets hit
    if (
        retangularColision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.frameCurrent === 2
        ) {
        player.takeHit()

        enemy.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false;
        const slashAir = document.querySelector('#enemySlashAir');
        slashAir.play(); 
    }


    //endgame based on health
    if (enemy.health <= 0 || player.health <=0) {
        determineWinner({ player, enemy, timerId })
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead){

        switch (event.key) {
            case 'w':
                keys.w.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 's':
                keys.s.pressed = true;
                player.lastKey = 's';
                break;
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            
            case ' ':
                player.attack();
                break;  
        }
    }

    if (!enemy.dead) {
        switch(event.key){
            case 'ArrowUp':
                keys.ArrowUp.pressed = true;
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft'
                break;
            case 'ArrowDown':
                keys.ArrowDown.pressed = true;
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight'
                break;
            case 'p':
                enemy.attack();
                break;
            }}  
})


window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;

        //enemyKEYS
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }    
})