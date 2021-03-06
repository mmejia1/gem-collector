import 'phaser';

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE GROUND ATTRIBUTES HERE >>
    this.scene = scene;
    //need physics so ground pulled down
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  // Check which controller button is being pushed and execute movement & animation
  update() {
    // << INSERT CODE HERE >>
  }
}
