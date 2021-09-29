import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import 'regenerator-runtime/runtime';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/L6RXz9spc5gYV37930Ga/scores/';
let scores;

const getUsers = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getScores = () => {
  getUsers().then((data) => {
    scores = data.result;
  }).catch((err) => {
    throw new Error('Error:', err);
  });
};

getScores();
let placement = config.height / 2;
export default class leaderBoardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.gameButton = new Button(
      this,
      config.width / 2,
      100,
      'blueButton1',
      'blueButton2',
      'Home',
      'Title',
    );

    scores
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .slice(0, 10)
      .forEach((score) => {
        this.add.text(
          config.width / 2 - 150,
          placement,
          `${score.user} ${score.score}`,
          { fontSize: '30px', fill: '#fff' },
        );
        placement += 50;
      });
  }
}