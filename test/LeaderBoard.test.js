import * as axios from 'axios';
import {
  LeaderBoard,
  getScores,
  getUsers,
  url,
} from '../src/Scenes/LeaderBoard';

jest.mock('axios');

test('Leaderboard Scene Test', () => {
  expect(new LeaderBoard()).toBeInstanceOf(LeaderBoard);
});

describe('fetchUsers', () => {
  describe('when API user is successful', () => {
    it('should return list of  users name and score', async () => {
      const dataList = [
        { user: 'John', score: 150 },
        { user: 'Tanzila', score: 250 },
      ];
      axios.get.mockImplementation(() => Promise.resolve({ data: dataList }));
      const result = await getUsers();

      expect(axios.get).toHaveBeenCalledWith(`${url}`);
      expect(result).toEqual(dataList);
    });
  });
});

describe('when API call fails', () => {
  it('should return empty users list', async () => {
    const message = 'Network Error';
    axios.get.mockImplementation(() => Promise.reject(new Error(message)));
    const result = await getScores();
    expect(axios.get).toHaveBeenCalledWith(`${url}`);
    expect(result).toEqual([]);
  });
});
