import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Enemy from '../entity/Enemy';

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

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.player = new Player(this, 20, 100, 'pinkMonster').setScale(2);
    //CREATE ENEMY
    this.enemy = new Enemy(this, 500, 100, 'graveRobber').setScale(2);
    //GROUND
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(50, 310);
    this.createGround(175, 310);
    this.createGround(500, 310);
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    //PLAYER COLLISION
    this.physics.add.collider(this.player, this.groundGroup);
    //ENEMY COLLISION
    this.physics.add.collider(this.enemy, this.groundGroup);
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
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'josh', frame: 17 }],
      frameRate: 20,
    });
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

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC for player HERE >>
    this.player.update(this.cursors);
  }
}
