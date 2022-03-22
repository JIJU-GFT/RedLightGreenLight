import { STRINGS, NUMBERS } from '../utils/constants.js';
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
    let userData = window.localStorage.getItem(STRINGS.USER_PREFIX + username);
    return userData && JSON.parse(userData);
  }

  // Save the status of the green light
  static setGreenLight(isGreen) {
    window.localStorage.setItem(STRINGS.GREEN_LIGHT, isGreen);
  }

  // Save user highscore, replace if user already exists in leaderboard
  static saveHighScore(key, highScore) {
    // Load preexisting leaderboard status
    let leaderboard = this.loadLeaderboard();

    // Create current highest object
    let currentHighest = {
      username: key,
      highScore: highScore,
    };

    // Update if user exists and return true if it does
    let exists = leaderboard.some((entry) => {
      if (entry.username === currentHighest.username) {
        if (entry.highScore < currentHighest.highScore) {
          entry.highScore = currentHighest.highScore;
        }
        return true;
      }
    });

    // If user does not exist, creates a new entry
    if (!exists) {
      leaderboard.push(currentHighest);
    }

    leaderboard.sort((a, b) => b.highScore - a.highScore);

    // Stores leaderboard
    window.localStorage.setItem(
      STRINGS.SCORE_LEADERBOARD,
      JSON.stringify(leaderboard)
    );
  }

  // Load leaderboards
  static loadLeaderboard() {
    let scoreboard = window.localStorage.getItem(STRINGS.SCORE_LEADERBOARD);
    return (scoreboard && JSON.parse(scoreboard)) || [];
  }
}

export default DataPersistanceService;
