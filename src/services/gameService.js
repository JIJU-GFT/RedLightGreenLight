import { Numbers } from '@utils/constants.js';
import DataPersistanceService from '@services/dataPersistanceService';

class GameService {
  constructor(score, isGreen) {
    // Get score and previous light state, set max and min time
    this.score = score;
    this.max = 10000;
    this.min = 2000;
    this.isGreenOnLoad = isGreen;

    // Declare timers for each traffic light
    this.timeoutGreenLight;
    this.timeoutRedLight = 3000;

    this.isGreenOnLoad ? this.startGreenTimer() : this.startRedTimer();
  }

  // Update timer according to score and adding ±1500 ms variation
  updateTimer() {
    let randomVariation = Math.round(
      Math.random() * Numbers.GAME_TIMEOUT_VARIATION
    );
    let isNegative = Math.random() < Numbers.RANDOM_NEGATIVE;

    if (isNegative) {
      randomVariation = -randomVariation;
    }

    this.timeoutGreenLight =
      Math.max(this.max - this.score * Numbers.SCORE_MILLISECONDS, this.min) +
      randomVariation;

    // console.log('MS Variation', randomVariation);
    // console.log('Negative', isNegative);
    // console.log('MS', this.timeoutGreenLight);
  }

  // Set the score
  setScore(score) {
    this.score = score;
  }

  // Start green timer
  startGreenTimer() {
    this.greenLightTimer = this.updateTimer();
    this.greenLightTimer = window.setTimeout(
      () => this.changeGreenLight(),
      this.timeoutGreenLight
    );
  }

  // Start red timer
  startRedTimer() {
    this.redLightTimer = window.setTimeout(
      () => this.changeRedLight(),
      this.timeoutRedLight
    );
  }

  // Stop all timers
  stopAllTimers() {
    this.stopGreenTimer();
    this.stopRedTimer();
  }

  // Stop green timer
  stopGreenTimer() {
    window.clearTimeout(this.greenLightTimer);
  }

  // Stop red timer
  stopRedTimer() {
    window.clearTimeout(this.redLightTimer);
  }

  // Change green light status
  changeGreenLight() {
    DataPersistanceService.setGreenLight(false);
  }

  // Change red light status
  changeRedLight() {
    DataPersistanceService.setGreenLight(true);
  }
}

// Override storage setItem to allow for the main app to listen to the event
const setStorageItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  const event = new Event('itemInserted');

  event.key = key;
  event.value = value;

  window.dispatchEvent(event);

  setStorageItem.apply(this, arguments);
};

export default GameService;
