import Phaser from 'phaser';
import gameConfig from '../Config/config';
import GameScene from './GameScene';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('Name');
  }

  create() {
    const element = this.add
      .dom(window.innerWidth / 2, window.innerHeight / 6)
      .createFromCache('form');
    element.addListener('click');

    element.on('click', (e) => {
      e.preventDefault();
      const inputText = document.querySelector('.nameInput');
      if (inputText.value !== '') {
        gameConfig.user = inputText.value;
        this.scene.add('Game', GameScene);
        this.scene.start('Game');
      }
    });
  }
}
