class GameService {
  constructor(score, isGreen) {
    this.score = score;
    this.max = 10000;
    this.min = 2000;
    this.isGreenOnLoad = isGreen;

    this.timerOn = true;

    this.timeoutGreenLight;
    this.timeoutRedLight = 3000;

    this.init();
    this.greenLightTimer = window.setTimeout(
      () => this.changeGreenLight(),
      this.timeoutGreenLight
    );
  }

  // Initialize class values
  init() {
    this.timeoutGreenLight = this.max - this.score * 100;
    if (this.timeoutGreenLight <= this.min) {
      this.timeoutGreenLight = this.min;
    }
    localStorage.setItem("greenLight", this.isGreenOnLoad);
  }

  // Stop timer in case game view is dismounted
  stopTimer() {
    window.clearTimeout(this.greenLightTimer);
  }

  // Change green light status
  changeGreenLight() {
    localStorage.setItem("greenLight", false);
  }
}

// Override storage setItem to allow for the main app to listen to the event
const setStorageItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  const event = new Event("itemInserted");

  event.key = key;
  event.value = value;

  window.dispatchEvent(event);

  setStorageItem.apply(this, arguments);
};

export default GameService;
