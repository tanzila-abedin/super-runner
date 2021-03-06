import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);
    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);
    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
    // remove progress bar when complete
    this.load.on(
      'complete',
      () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      },
    );
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
    // load assets needed in our game
    this.load.image('blueButton1', 'src/assets/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/blue_button03.png');
    this.load.image('phaserLogo', 'src/assets/logo.png');
    this.load.image('box', 'src/assets/grey_box.png');
    this.load.image('checkedBox', 'src/assets/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
    this.load.audio('jemEat', 'src/assets/game/audio/jemAudio.mp3');

    // game background

    this.load.html('form', 'src/assets/form.html');

    this.load.image('background', 'src/assets/game/background.png');
    this.load.image('spike', 'src/assets/game/spike.png');
    this.load.image('fullscreen', 'src/assets/game/fullsc.png');
    this.load.image('corona', 'src/assets/game/v2.png');
    this.load.image('jem', 'src/assets/game/star.png');
    this.load.image('river', 'src/assets/game/river.png');
    this.load.image('gameover', 'src/assets/game/gameover.jpg');

    // Load player

    this.load.atlas(
      'player',
      'src/assets/game/kenney_player.png',
      'src/assets/game/kenney_player_atlas.json',
    );

    // Loading tilesheet and JSON file

    this.load.image(
      'tiles',
      'src/assets/game/tilesets/platformPack_tilesheet.png',
    );
    this.load.tilemapTiledJSON('map', 'src/assets/game/tilemaps/level4.json');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
