import GameService from '../services/gameService';

const LOW_POINTS_MIN_RANDOM = 8500;
const LOW_POINTS_MAX_RANDOM = 11501;
const HIGH_POINTS_MIN_RANDOM = 500;
const HIGH_POINTS_MAX_RANDOM = 3501;

const LOW_POINTS =  0;
const HIGH_POINTS = 80;

const RED_LIGHT_TIMER = 3000;

beforeAll(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
});

afterAll(() => {
  jest.clearAllMocks();
});

test('timer is in range with 0 score', () => {
  const gameService = new GameService(LOW_POINTS, true);

  expect(gameService.timeoutGreenLight).toBeGreaterThanOrEqual(LOW_POINTS_MIN_RANDOM);
  expect(gameService.timeoutGreenLight).toBeLessThan(LOW_POINTS_MAX_RANDOM);
});

test('timer is in range with 80 score', () => {
  const gameService = new GameService(HIGH_POINTS, true);

  expect(gameService.timeoutGreenLight).toBeGreaterThanOrEqual(HIGH_POINTS_MIN_RANDOM);
  expect(gameService.timeoutGreenLight).toBeLessThan(HIGH_POINTS_MAX_RANDOM);
});

test('can set score', () => {
  const gameService = new GameService(LOW_POINTS, true);

  gameService.setScore(HIGH_POINTS);

  expect(gameService.score).toBe(HIGH_POINTS);
});

test('can run green timer', () => {
  jest.useRealTimers();
  jest.spyOn(global, 'setTimeout');
  const gameService = new GameService(HIGH_POINTS, false);

  gameService.startGreenTimer();
  expect(setTimeout).toHaveBeenCalled();
});

test('can run red timer', () => {
  jest.useRealTimers();
  jest.spyOn(global, 'setTimeout');
  const gameService = new GameService(LOW_POINTS, false);

  gameService.startRedTimer();
  expect(setTimeout).toHaveBeenCalled();
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), RED_LIGHT_TIMER);
});

test('can replace greenLight persistent data', () => {
  const gameService = new GameService(LOW_POINTS, false);
  gameService.changeGreenLight();

  expect(localStorage.setItem).toHaveBeenCalled();
});

test('can replace redLight persistent data', () => {
  const gameService = new GameService(LOW_POINTS, false);
  gameService.changeRedLight();

  expect(localStorage.setItem).toHaveBeenCalled();
});

test('can stop green timert', () => {
  const gameService = new GameService(LOW_POINTS, true);
  gameService.stopGreenTimer();

  expect(setTimeout).toHaveBeenCalled();
});

test('can stop red timert', () => {
  const gameService = new GameService(LOW_POINTS, true);
  gameService.stopRedTimer();

  expect(setTimeout).toHaveBeenCalled();
});

test('can stop all timers', () => {
  const gameService = new GameService(LOW_POINTS, true);
  gameService.stopAllTimers();

  expect(setTimeout).toHaveBeenCalled();
});
