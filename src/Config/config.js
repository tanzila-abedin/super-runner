import "phaser";
const gameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "canvas",
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 600 },
    },
  },
  user: "",
};

export default gameConfig;
