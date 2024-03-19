const sortPoints = require('../../lib/sortPoints');

describe('sortPoints', () => {
  test('sorts points by ascending X value', () => {
    const points = [
      { x: 3, y: 2 },
      { x: 1, y: 5 },
      { x: 2, y: 3 },
    ];
    const sortedPoints = sortPoints(points);
    expect(sortedPoints).toEqual([
      { x: 1, y: 5 },
      { x: 2, y: 3 },
      { x: 3, y: 2 },
    ]);
  });
});
