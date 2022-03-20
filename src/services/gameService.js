class GameService {
  constructor(score) {
    this.score = score;
    this.max = 10;
    this.min = 2;
    this.ticks = 0;
    this.timerOn = true;
    this.myInterval = window.setInterval(() => this.startTimer(), 1000);
  }

  get isTimerOn() {
    return this.timerOn;
  }

  stopTimer() {
    window.clearInterval(this.myInterval);
  }

  // Timer function to handle the interval and traffic light status
  startTimer() {
    var computedMilliseconds = this.max * 1000 - this.score * 100;
    var maxTime = computedMilliseconds < 2000 ? 2 : computedMilliseconds / 1000;
    this.ticks++;
    console.log("Seconds", this.ticks);
    localStorage.setItem("greenLight", true);
    if (this.ticks == maxTime) {
      this.timerOn = false;
      localStorage.setItem("greenLight", false);
      window.clearInterval(this.myInterval);
    }
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
