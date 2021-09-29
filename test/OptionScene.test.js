import OptionsScene from '../src/Scenes/OptionsScene';

jest.mock('../src/Scenes/OptionsScene');

beforeEach(() => {
  OptionsScene.mockClear();
});

test('Instance of Option Scene', () => {
  expect(new OptionsScene()).toBeInstanceOf(OptionsScene);
});
