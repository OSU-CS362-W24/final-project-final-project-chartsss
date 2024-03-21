const generateChartImg = require('../../lib/generateChartImg');
require("whatwg-fetch")
//const fetch = require('node-fetch');

// Assign the fetch function to the global scope
//global.fetch = fetch;

// Create a mock implementation of URL.createObjectURL
global.URL = {
  createObjectURL: jest.fn().mockReturnValue('mock-object-url'),
};

describe('generateChartImg', () => {
  test('generates a chart image URL', async () => {
    const type = 'line';
    const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];
    const xLabel = 'X';
    const yLabel = 'Y';
    const title = 'Test Chart';
    const color = 'red';

    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl).toBe('mock-object-url');
  });
});