import GameService from '../gameService';

beforeAll(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
});

afterAll(() => {
  jest.clearAllMocks();
});

test('timer is in range with 0 score', () => {
  const gameService = new GameService(0, true);

  expect(gameService.timeoutGreenLight).toBeGreaterThanOrEqual(8500);
  expect(gameService.timeoutGreenLight).toBeLessThan(11501);
});

test('timer is in range with 80 score', () => {
  const gameService = new GameService(80, true);

  expect(gameService.timeoutGreenLight).toBeGreaterThanOrEqual(500);
  expect(gameService.timeoutGreenLight).toBeLessThan(3501);
});

test('can set score', () => {
  const gameService = new GameService(0, true);

  gameService.setScore(80);

  expect(gameService.score).toBe(80);
});

test('can run green timer', () => {
  jest.useRealTimers();
  jest.spyOn(global, 'setTimeout');
  const gameService = new GameService(80, false);

  gameService.startGreenTimer();
  expect(setTimeout).toHaveBeenCalled();
});

test('can run red timer', () => {
  jest.useRealTimers();
  jest.spyOn(global, 'setTimeout');
  const gameService = new GameService(0, false);

  gameService.startRedTimer();
  expect(setTimeout).toHaveBeenCalled();
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
});

test('can replace greenLight persistent data', () => {
  const gameService = new GameService(0, false);
  gameService.changeGreenLight();

  expect(localStorage.setItem).toHaveBeenCalled();
});

test('can replace redLight persistent data', () => {
  const gameService = new GameService(0, false);
  gameService.changeRedLight();

  expect(localStorage.setItem).toHaveBeenCalled();
});

test('can stop green timert', () => {
  const gameService = new GameService(0, true);
  gameService.stopGreenTimer();

  expect(setTimeout).toHaveBeenCalled();
});

test('can stop red timert', () => {
  const gameService = new GameService(0, true);
  gameService.stopRedTimer();

  expect(setTimeout).toHaveBeenCalled();
});

test('can stop all timers', () => {
  const gameService = new GameService(0, true);
  gameService.stopAllTimers();

  expect(setTimeout).toHaveBeenCalled();
});
