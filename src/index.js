import Phaser from 'phaser';
import Model from './Model';
import config from './Config/config';
import { LeaderBoard } from './Scenes/LeaderBoard';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import FormScene from './Scenes/FormScene';
import EndScene from './Scenes/EndScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    // this.scene.add('Game', GameScene);
    this.scene.add('Leaderboard', LeaderBoard);
    this.scene.add('Name', FormScene);
    this.scene.add('End', EndScene);
    this.scene.start('Boot');
  }
}
window.game = new Game();
