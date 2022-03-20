
class GameService {
  constructor(score) {
    this.score = score;
    this.max = 10;
    this.min = 2;
    this.timerOn = true;
  }
  
  get isTimerOn() {
    return this.timerOn;
  }
  
  // Timer function to handle the interval and traffic light status
  timer() {
    var computedMilliseconds = this.max * 1000 - this.score * 100;
    var maxTime = computedMilliseconds < 2000 ? 2 : computedMilliseconds / 1000;
    var sec = 0;
    var myInterval = setInterval(() => {
      sec++;
      localStorage.setItem("greenLight", true);
      console.log("seconds", sec);
      if (sec == maxTime) {
        this.timerOn = false;
        localStorage.setItem("greenLight", false);
        clearInterval(myInterval);
      }
    }, 1000);
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
