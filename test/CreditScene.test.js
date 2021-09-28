import CreditsScene from "../src/Scenes/CreditsScene";



jest.mock("../src/Scenes/CreditsScene");

beforeEach(() => {
  CreditsScene.mockClear();
});

test("Boot Scene Test", () => {
  expect(new CreditsScene()).toBeInstanceOf(CreditsScene);
});
