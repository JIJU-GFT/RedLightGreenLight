import DataPersistanceService from '../services/dataPersistanceService';

const SAVE_ACCESS = 4;
const LOAD_ACCESS = 3;

let userData = {
  username: 'user',
  highScore: 10,
  isGreen: true,
};

let mockLeaderBoard = [
  {
    username: 'user',
    highScore: 10,
  },
];

test('saves all data in localstorage', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  DataPersistanceService.saveUserName(userData.username);
  DataPersistanceService.saveUserData(userData.username, userData);
  DataPersistanceService.setGreenLight(userData.isGreen);
  DataPersistanceService.saveHighScore(userData.username, userData.highScore);

  expect(localStorage.setItem).toHaveBeenCalledTimes(SAVE_ACCESS);
});

test('loads all data correctly from localstorage', () => {
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  let scopedUserName = DataPersistanceService.loadUserName();
  let scopedLeaderboard = DataPersistanceService.loadLeaderboard();
  let scopedUserData = DataPersistanceService.loadUserData(userData.username);

  expect(localStorage.getItem).toHaveBeenCalledTimes(LOAD_ACCESS);
  expect(scopedUserName).toBe('user');
  expect(scopedLeaderboard).toEqual(mockLeaderBoard);
  expect(scopedUserData).toEqual(userData);
});
