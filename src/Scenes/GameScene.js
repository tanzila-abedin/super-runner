import Phaser from "phaser";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {
    // load images
    // this.load.image("logo", "src/assets/logo.png");
    
  }
  create() {
    // this.add.image(400, 300, "logo");

    // Creating game background assets using tilemap

    const backgroundImage = this.add.image(0, 0, "background").setOrigin(0, 0);
    backgroundImage.setScale(8, 0.8);
        let map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("kenny_simple_platformer", "tiles");
        const platforms = map.createStaticLayer("Platforms", tileset, 0, 0);
        platforms.setCollisionByExclusion(-1, true);
        this.physics.world.setBounds(
          0,
          0,
          map.widthInPixels,
          map.heightInPixels
        );
  }
}
