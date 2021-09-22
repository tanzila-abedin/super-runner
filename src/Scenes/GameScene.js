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
        const platforms = map.createLayer("Platforms", tileset, 0, 0);
        platforms.setCollisionByExclusion(-1, true);
        this.physics.world.setBounds(
          0,
          0,
          map.widthInPixels,
          map.heightInPixels
        );
    // create player
        this.player = this.physics.add.sprite(50, 300, "player");
        this.player.setBounce(0.1);
        this.player.body.setSize(55, 75).setOffset(20, 25);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

    // add animation to player to stay idle, walk or jump
    
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "robo_player_",
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: "robo_player_0" }],
      frameRate: 10,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "player", frame: "robo_player_1" }],
      frameRate: 10,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }



}
