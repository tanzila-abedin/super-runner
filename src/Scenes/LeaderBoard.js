import Phaser from 'phaser';
import axios from 'axios';
import config from '../Config/config';
import Button from '../Objects/Button';
import 'regenerator-runtime/runtime';

export const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/L6RXz9spc5gYV37930Ga/scores/';
let scores;

export const getUsers = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getScores = async () => {
  try {
    const data = await getUsers();
    scores = data.result;
    return data.result;
  } catch {
    return [];
  }
};

getScores();

let placement = config.height / 2;
export class LeaderBoard extends Phaser.Scene {
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
    console.log(scores);
  }
}