import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Enemy from '../entity/Enemy';
import Gems from '../entity/Gems';

//score variables
let score = 0;
//let scoreText;
export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.spritesheet(
      'pinkMonster',
      'assets/spriteSheets/pinkMonster.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.load.spritesheet(
      'pinkMonsterIdle',
      'assets/spriteSheets/pinkMonsterIdle.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    ); //LOAD ENEMY HERE
    this.load.image('graveRobber', 'assets/sprites/graveRobber.png');
    this.load.image('ground', 'assets/sprites/ground.png');
    this.load.image('ground1', 'assets/sprites/ground1.png');
    //LOAD GEMS
    this.load.image('icon13', 'assets/sprites/icon13.png');

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
    this.load.audio('missionMusic', 'assets/audio/missionMusic.wav');
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('pickupCoin', 'assets/audio/pickupCoin.wav');
  }

  create() {
    let scoreText;
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.player = new Player(this, 20, 100, 'pinkMonster').setScale(2);
    //CREATE ENEMY
    this.enemy = new Enemy(this, 650, 100, 'graveRobber').setScale(1.5);
    //GROUND
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(50, 600);
    this.createGround(150, 600);
    this.createGround(400, 500);
    this.createGround(600, 400);
    //BRIDGE
    // this.bridgeGroup = this.physics.add.staticBridege({ classType: Bdrige });
    // this.createBridge(50, 400);
    //GEMS CREATE
    this.gems = new Gems(this, 200, 120, 'icon13').setScale(0.75);

    //PICKING UP GEMS PHYSICS
    //ADDING GEM GROUP
    this.gems = this.physics.add.group({
      key: 'icon13',
      repeat: 7,
      setXY: { x: 12, y: 0, stepX: 100 },
    });
    this.gems.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // When the player collides with the gem
    this.physics.add.overlap(
      this.player,
      this.gems,
      this.collectGems, // Our callback function that will handle the collision logic
      null, // processCallback. Can specify a function that has custom collision
      // conditions. We won't be using this so you can ignore it.
      this // The context of 'this' for our callback. Since we're binding
      // our callback, it doesn't really matter.
      //pickupCoin.play()
    );

    this.physics.add.collider(this.player, this.gems, function (player, gems) {
      this.pickupCoin.play();
    });

    //SCORE HERE
    this.scoreText = this.add.text(16, 16, 'Score:0', {
      fontSize: '28px',
      fill: '#000',
    });

    // Create sounds
    // << CREATE SOUNDS HERE >>
    this.jumpSound = this.sound.add('jump');
    //coin sound
    this.pickupCoin = this.sound.add('pickupCoin', { loop: false });

    //background music
    this.missionMusic = this.sound.add('missionMusic');
    this.missionMusic.setLoop(true);
    //this.missionMusic.play();

    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    //PLAYER COLLISION
    this.physics.add.collider(this.player, this.groundGroup);

    //ENEMY COLLISION
    //colider with ground
    this.physics.add.collider(this.enemy, this.groundGroup);
    //collider with player
    this.physics.add.collider(this.player, this.enemy);
    //collider with gem
    this.physics.add.collider(this.gems, this.groundGroup);

    //CREATE CURSORS
    this.cursors = this.input.keyboard.createCursorKeys();
    //CREATE MOVEMENT
    this.createAnimations();
  }
  //CREATE ANIMATION
  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('pinkMonster', {
        start: 1,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // this.anims.create({
    //   key: 'jump',
    //   frames: [{ key: 'josh', frame: 17 }],
    //   frameRate: 20,
    // });
    this.anims.create({
      key: 'idle',
      // //frames: this.anims.create('pinkMonsterIdle', {
      //frames: [{ key: 'pinkMonkeyIdle', frame: 1 }],
      // // }),
      frames: this.anims.generateFrameNumbers('pinkMonsterIdle', {
        start: 1,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  //helper function for groundjh
  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }

  collectGems(player, gem) {
    console.log(gem);
    gem.disableBody(true, true);
    //SOUND WHEN GEM IS PICKED UP
    this.pickupCoin.play();
    //add code for score
    score += 10;
    this.scoreText.setText('Score: ' + score);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC for player HERE >>

    this.player.update(this.cursors, this.jumpSound); // Add a parameter for the jumpSound
    //this.player.update(this., this.pickupCoin);
  }
}
