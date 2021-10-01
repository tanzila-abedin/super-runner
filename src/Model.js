export default class Model {
  constructor() {
    this.gamesoundOn = true;
    this.gamemusicOn = true;
    this.gamebgMusicPlaying = false;
  }

  set musicOn(value) {
    this.gamemusicOn = value;
  }

  get musicOn() {
    return this.gamemusicOn;
  }

  set soundOn(value) {
    this.gamesoundOn = value;
  }

  get soundOn() {
    return this.gamesoundOn;
  }

  set bgMusicPlaying(value) {
    this.gamebgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.gamebgMusicPlaying;
  }
}
