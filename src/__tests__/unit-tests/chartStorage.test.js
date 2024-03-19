require('jest-localstorage-mock');

const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData,
  } = require('../../lib/chartStorage');
  
  describe('chartStorage', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    test('saveChart saves a chart to localStorage', () => {
      const chart = { title: 'Test Chart', data: [] };
      saveChart(chart);
      const savedCharts = JSON.parse(localStorage.getItem('savedCharts'));
      expect(savedCharts).toContainEqual(chart);
    });
  
    test('loadAllSavedCharts returns all saved charts', () => {
      const chart1 = { title: 'Chart 1', data: [] };
      const chart2 = { title: 'Chart 2', data: [] };
      localStorage.setItem('savedCharts', JSON.stringify([chart1, chart2]));
      const savedCharts = loadAllSavedCharts();
      expect(savedCharts).toEqual([chart1, chart2]);
    });
  
    test('loadSavedChart returns a specific saved chart', () => {
      const chart1 = { title: 'Chart 1', data: [] };
      const chart2 = { title: 'Chart 2', data: [] };
      localStorage.setItem('savedCharts', JSON.stringify([chart1, chart2]));
      const savedChart = loadSavedChart(1);
      expect(savedChart).toEqual(chart2);
    });
  
    test('updateCurrentChartData saves current chart data', () => {
      const chartData = { title: 'Current Chart', data: [] };
      updateCurrentChartData(chartData);
      const savedData = JSON.parse(localStorage.getItem('currentChartData'));
      expect(savedData).toEqual(chartData);
    });
  
    test('loadCurrentChartData returns current chart data', () => {
      const chartData = { title: 'Current Chart', data: [] };
      localStorage.setItem('currentChartData', JSON.stringify(chartData));
      const loadedData = loadCurrentChartData();
      expect(loadedData).toEqual(chartData);
    });
  });