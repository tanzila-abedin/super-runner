import "jest-canvas-mock";

import gameConfig from "../src/Config/config";

describe("It tests configuration files for Phaser scripts", () => {
  it("returns screen width", () => {
    expect(gameConfig.width).toBe(1366);
  });

  it("returns screen height", () => {
    expect(gameConfig.height).toBe(741);
  });

  it("returns player gravity", () => {
    expect(gameConfig.physics.arcade.gravity.y).toEqual(600);
  });
});
