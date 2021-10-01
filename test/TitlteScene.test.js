import TitleScene from '../src/Scenes/TitleScene';

jest.mock('../src/Scenes/TitleScene');

beforeEach(() => {
  TitleScene.mockClear();
});

test('Instance of a Title Scene', () => {
  expect(new TitleScene()).toBeInstanceOf(TitleScene);
});
