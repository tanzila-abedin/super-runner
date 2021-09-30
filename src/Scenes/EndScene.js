import Phaser from 'phaser';
import gameConfig from '../Config/config';
import { gameScore } from './GameScene';
import axios from "axios";
import 'regenerator-runtime/runtime';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('End');
  }

  create() {

    const postScore = async(score) => {
      const url =
        "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/L6RXz9spc5gYV37930Ga/scores/";
      const response = await axios.post(url, score);
      return response.data;
    }

    if (gameScore.score) {
      postScore(gameScore);
    } 

    this.add.text(
      gameConfig.width / 2,
      gameConfig.height / 2,
      `${gameConfig.user}`,
      { fontSize: '42px', fill: '#fff' },
    );
    this.add.text(
      gameConfig.width / 2,
      gameConfig.height / 2 + 40,
      `SCORE: ${gameScore.score}`,
      { fontSize: '42px', fill: '#fff' },
    );

    const resetButton = this.add.text(
      gameConfig.width / 2,
      gameConfig.height / 2 + 100,
      'Restart',
      { fontSize: '42px', fill: '#0f0' },
    );
    resetButton.setInteractive();

    resetButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.start('Title');
    });
  }
}