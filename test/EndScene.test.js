import EndScene from "../src/Scenes/EndScene";

jest.mock("../src/Scenes/EndScene");

beforeEach(() => {
  EndScene.mockClear();
});

test("Instance of End Scene", () => {
  expect(new EndScene()).toBeInstanceOf(EndScene);
});
