export const getRandomNumber = (min: number = 0, max: number = 1): number =>
  Math.max(Math.min(Math.random(), max), min);
