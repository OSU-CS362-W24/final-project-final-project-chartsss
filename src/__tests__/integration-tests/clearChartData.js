/**
 * @jest-environment jsdom
 */

require("whatwg-fetch");
const domTesting = require("@testing-library/dom");
require("@testing-library/jest-dom");
const userEvent = require("@testing-library/user-event").default;

const fs = require("fs");
function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  document.open();
  document.write(html);
  document.close();

  jest.isolateModules(function () {
    require(jsPath);
  });
}

beforeEach(function () {
  jest.resetModules();
  jest.restoreAllMocks();
  window.localStorage.clear();
});

describe("clearChartData", () => {
  test("the 'clear chart data' button correctly clears all chart data", async function () {
    initDomFromFiles(
      `${__dirname}/../../line/line.html`,
      `${__dirname}/../../line/line.js`
    );

    // Acquire the DOM elements
    const clearButton = domTesting.getByText(document, "Clear chart data");
    const addButton = domTesting.getByText(document, "+");
    const xLabelInput = domTesting.getByLabelText(document, "X label");
    const yLabelInput = domTesting.getByLabelText(document, "Y label");
    const chartTitleInput = domTesting.getByLabelText(document, "Chart title");
    const chartColorInput = domTesting.getByLabelText(document, "Chart color");

    // Set up user and add two more sets of inputs so we have 3 total points
    const user = userEvent.setup();
    await user.click(addButton);
    await user.click(addButton);

    const xInputs = domTesting.getAllByLabelText(document, "X");
    const yInputs = domTesting.getAllByLabelText(document, "Y");

    // Fill chart data
    await user.type(xLabelInput, "A");
    await user.type(yLabelInput, "B");
    await user.type(chartTitleInput, "TITLE");
    await domTesting.fireEvent.input(chartColorInput, {
      target: { value: "#4acf00" },
    });
    await user.type(xInputs[0], "1");
    await user.type(yInputs[0], "1");
    await user.type(xInputs[1], "3");
    await user.type(yInputs[1], "7");
    await user.type(xInputs[2], "47");
    await user.type(yInputs[2], "48");

    // Click the "Clear chart data" button
    await user.click(clearButton);

    // Assertions
    expect(xLabelInput).toHaveValue("");
    expect(yLabelInput).toHaveValue("");
    expect(chartTitleInput).toHaveValue("");
    expect(chartColorInput).toHaveValue("#ff4500"); // Default color
  });
});