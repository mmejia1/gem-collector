import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image('forest', 'assets/backgrounds/forest.png');
    this.load.image('logo', 'assets/backgrounds/logo.png');
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add.image(-100, 0, 'forest').setOrigin(0).setScale(1);
    this.add.image(280, 80, 'logo').setScale(5);
  }
}
