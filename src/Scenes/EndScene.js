import Phaser from 'phaser';
import gameConfig from '../Config/config';
import { gameScore } from './GameScene';
import 'regenerator-runtime/runtime';

export default class endScene extends Phaser.Scene {
  constructor() {
    super('End');
  }

  create() {
    const postScore = (score) => {
      const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/L6RXz9spc5gYV37930Ga/scores/';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
      }).then((response) => response.json())
        .catch((error) => {
          throw new Error('Error:', error);
        });
    };
    postScore(gameScore);

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
      this.scene.start('Title');
    });
  }
}