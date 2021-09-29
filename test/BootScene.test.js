import BootScene from "../src/Scenes/BootScene";


jest.mock("../src/Scenes/BootScene");

beforeEach(() => {
  BootScene.mockClear();
});

test("Instance of Boot Scene", () => {
  expect(new BootScene()).toBeInstanceOf(BootScene);
});
