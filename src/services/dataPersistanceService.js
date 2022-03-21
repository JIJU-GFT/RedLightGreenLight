import { STRINGS } from '@utils/constants.js';
class DataPersistanceService {
  // Store username
  static saveUserName(username) {
    window.localStorage.setItem(STRINGS.USERNAME, username);
  }

  // Load username
  static loadUserName() {
    return window.localStorage.getItem(STRINGS.USERNAME);
  }

  // Save user data
  static saveUserData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  // Load existing user data
  static loadUserData(username) {
    return JSON.parse(window.localStorage.getItem(username));
  }

  // Save the status of the green light
  static setGreenLight(isGreen) {
    window.localStorage.setItem(STRINGS.GREEN_LIGHT, isGreen);
  }

  // Load leaderboards
  static loadLeaderboard() {
    return JSON.parse(window.localStorage.getItem(STRINGS.SCORE_LEADERBOARD)) || [];
  }
}

export default DataPersistanceService;
