class DataPersistanceService {
  // Store username
  static saveUserName(username) {
    window.localStorage.setItem('username', username);
  }

  // Load username
  static loadUserName() {
    return window.localStorage.getItem('username');
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
    window.localStorage.setItem('greenLight', isGreen);
  }

  // Load leaderboards
  static loadLeaderboard() {
    return JSON.parse(window.localStorage.getItem('highscore_leaderboard')) || [];
  }
}

export default DataPersistanceService;
