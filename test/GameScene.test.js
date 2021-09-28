import GameScene from "../src/Scenes/GameScene";

jest.mock("../src/Scenes/GameScene");

beforeEach(() => {
  GameScene.mockClear();
});

test("Instance of Game Scene", () => {
  expect(new GameScene()).toBeInstanceOf(GameScene);
});
