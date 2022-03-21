import { STRINGS, NUMBERS } from '@utils/constants.js';
class DataPersistanceService {
  // Store username
  static saveUserName(username) {
    window.localStorage.setItem(
      STRINGS.USERNAME,
      STRINGS.USER_PREFIX + username
    );
  }

  // Load username
  static loadUserName() {
    return window.localStorage
      .getItem(STRINGS.USERNAME)
      .substring(NUMBERS.USER_SUBSTRING_START);
  }

  // Save user data
  static saveUserData(key, data) {
    window.localStorage.setItem(
      STRINGS.USER_PREFIX + key,
      JSON.stringify(data)
    );
  }

  // Load existing user data
  static loadUserData(username) {
    return JSON.parse(window.localStorage.getItem(STRINGS.USER_PREFIX + username));
  }

  // Save the status of the green light
  static setGreenLight(isGreen) {
    window.localStorage.setItem(STRINGS.GREEN_LIGHT, isGreen);
  }

  // Load leaderboards
  static loadLeaderboard() {
    return (
      JSON.parse(window.localStorage.getItem(STRINGS.SCORE_LEADERBOARD)) || []
    );
  }
}

export default DataPersistanceService;
