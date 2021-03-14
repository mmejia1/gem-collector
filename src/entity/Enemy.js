import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    //flip enemy around
    this.flipX = !this.flipX;
  }
  update() {}
}
