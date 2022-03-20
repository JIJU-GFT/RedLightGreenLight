class GameService {
  constructor(score) {
    this.score = score;
    this.max = 10;
    this.min = 2;
  }

  timer() {
    var computedMilliseconds = this.max * 1000 - this.score * 100;
    console.log("MS after computing score", computedMilliseconds);
    var maxTime = computedMilliseconds < 2000 ? 2 : computedMilliseconds/1000;
    console.log("MS applied (should not be lower than 2000)", maxTime);
    var sec = 0;
    var myInterval = setInterval(() => {
      sec++;
      console.log("Seconds", sec);
      if (sec == maxTime) {
        clearInterval(myInterval);
      }
    }, 1000);
  }
}

export default GameService;
