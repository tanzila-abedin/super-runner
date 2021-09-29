import PreloaderScene from '../src/Scenes/PreloaderScene';

jest.mock('../src/Scenes/PreloaderScene');

beforeEach(() => {
  PreloaderScene.mockClear();
});

test('Instance of a Preloader Scene', () => {
  expect(new PreloaderScene()).toBeInstanceOf(PreloaderScene);
});
