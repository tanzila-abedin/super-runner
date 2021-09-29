import Phaser from 'phaser';
import gameConfig from '../Config/config';

// let score = 0;
let coronaObjects;
let gameOver = false;
let corona;
export const gameScore = {
  user: gameConfig.user,
  score: 0,
};

function hitEnemy(player, corona) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('death');

  gameOver = true;
}

// collision(hit) between player and river OR player and enemy
function playerHit(player, spike) {
  // this.gameoveraudio.play();
  this.scoreText.setText(`Score: ${gameScore.score}`);

  gameScore.score -= 10;
  player.setVelocity(0, 0);
  player.setX(player.x - 1000);
  player.setY(300);
  player.play('idle', true);
  player.setAlpha(0);
  const tw = this.tweens.add({
    targets: player,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  });
}

// increase score when start is collected
function point(player, jem) {
  // this.fx.play();
  jem.disableBody(true, true);
  gameScore.score += 10;
  this.scoreText.setText(`Score: ${gameScore.score}`);
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.image("logo", "src/assets/logo.png");

  }

  create() {
    // this.add.image(400, 300, "logo");

    // Creating game background assets using tilemap

    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
    backgroundImage.setScale(8, 0.8);
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
    const platforms = map.createLayer('Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // create player
    this.player = this.physics.add.sprite(50, 300, 'player');
    this.player.setBounce(0.1);
    this.player.body.setSize(55, 75).setOffset(20, 25);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    // add animation to player to stay idle, walk or jump

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', {
        prefix: 'robo_player_',
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'robo_player_0' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'robo_player_1' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'death',
      frames: [{ key: 'player', frame: 'robo_player_6' }],
      frameRate: 10,
    });

    // Input Events for curson and left,right,up and down key.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Creating jems
    this.jems = this.physics.add.group({
      allowGravity: false,
    });
    const jemObjects = map.getObjectLayer('jems').objects;
    jemObjects.forEach((jemObject) => {
      const jem = this.jems
        .create(jemObject.x, jemObject.y - 50, 'jem')
        .setOrigin(0, 0);
    });

    // adding collision between player and points(jem)
    this.physics.add.collider(this.player, this.jems, point, null, this);

    // create rivers
    this.rivers = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    const riverObjects = map.getObjectLayer('river').objects;
    riverObjects.forEach((riverObject) => {
      const river = this.rivers
        .create(riverObject.x, riverObject.y - 55, 'river')
        .setOrigin(0, 0);
    });

    // Adding collision between player and rivers
    this.physics.add.collider(this.player, this.rivers, playerHit, null, this);

    // create enemyObject
    this.coronas = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    coronaObjects = map.getObjectLayer('corona').objects;
    coronaObjects.forEach((coronaObject) => {
      corona = this.coronas
        .create(coronaObject.x, coronaObject.y - 50, 'corona')
        .setOrigin(0, 0);
      corona.setScale(0.1, 0.1);
      corona.setBounce(1);
      corona.setVelocityY(100);
      corona.setCollideWorldBounds(true);
    });
    // Adding collision between player and corona object
    this.physics.add.collider(
      this.player,
      this.coronas,
      hitEnemy,
      null,
      this,
    );

    // create thorn object to reduce score
    this.spikes = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    const spikeObjects = map.getObjectLayer('spikes').objects;
    spikeObjects.forEach((spikeObject) => {
      const spike = this.spikes
        .create(spikeObject.x, spikeObject.y - 60, 'spike')
        .setOrigin(0, 0);
      spike.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
    });

    // Adding collision between player and thorns
    this.physics.add.collider(this.player, this.spikes, playerHit, null, this);

    // Text space for score

    this.scoreText = this.add.text(16, 43, `Score: ${gameScore.score}`, {
      fontSize: '32px',
      fill: '#000000',
    });
    this.nameText = this.add.text(16, 16, `${gameConfig.user}`, {
      fontSize: '32px',
      fill: '#000000',
    });
    this.scoreText.setScrollFactor(0);
    this.nameText.setScrollFactor(0);

    // create camera to follow the player

    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    if (gameOver) {
      gameScore.user = gameConfig.user;
      this.scene.transition({
        target: 'End',
        duration: 3000,
        remove: true,
      });
      return;
    }
    // controlling player with keyBoard
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);

      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);

      if (this.player.body.onFloor()) {
        this.player.play('walk', true);
      }
    } else {
      this.player.setVelocityX(0);

      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }

    if (
      (this.cursors.space.isDown || this.cursors.up.isDown)
      && this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-600);
      this.player.play('jump', true);
    }
    if (this.cursors.down.isDown && !this.player.body.onFloor()) {
      this.player.setVelocityY(200);
      this.player.play('jump', true);
    }

    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      this.player.setFlipX(true);
    }
  }
}
