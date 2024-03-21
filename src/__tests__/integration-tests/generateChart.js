/**
 * @jest-environment jsdom
 */

require("whatwg-fetch")
const domTesting = require("@testing-library/dom")
require("@testing-library/jest-dom")
const userEvent = require("@testing-library/user-event").default

const fs = require("fs")
function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()

	jest.isolateModules(function() {
		require(jsPath)
	})
}

beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
    window.localStorage.clear()
})

describe("generateChart", () => {

    test("the correct data is sent to the chart generation function", async function() {
    
        jest.mock(`${__dirname}/../../lib/generateChartImg.js`)
        const generateChartImgStub = require(`${__dirname}/../../lib/generateChartImg.js`)
        generateChartImgStub.mockImplementation(function() {
            return "http://placekitten.com/480/480"
        })

        initDomFromFiles(`${__dirname}/../../line/line.html`, `${__dirname}/../../line/line.js`)

        //acquire the DOM elements
        const generateButton = domTesting.getByText(document, "Generate chart")
        const addButton = domTesting.getByText(document, "+")
        const xLabelInput = domTesting.getByLabelText(document, "X label")
        const yLabelInput = domTesting.getByLabelText(document, "Y label")
        const chartTitleInput = domTesting.getByLabelText(document, "Chart title")
        const chartColorInput = domTesting.getByLabelText(document, "Chart color")

        //set up user and add two more sets of inputs so we have 3 total points
        const user = userEvent.setup()
        await user.click(addButton)
        await user.click(addButton)

        const xInputs = domTesting.getAllByLabelText(document, "X")
        const yInputs = domTesting.getAllByLabelText(document, "Y")

        //fill chart data and click generate chart button
        await user.type(xLabelInput, "A")
        await user.type(yLabelInput, "B")
        await user.type(chartTitleInput, "TITLE")
        await domTesting.fireEvent.input(chartColorInput, {
            target: {value: "#4acf00"}
        })
        await user.type(xInputs[0], "1")
        await user.type(yInputs[0], "1")
        await user.type(xInputs[1], "3")
        await user.type(yInputs[1], "7")
        await user.type(xInputs[2], "47")
        await user.type(yInputs[2], "48")
        await user.click(generateButton)

        //make assertions: correct args + called correct number of times
        expect(generateChartImgStub).toHaveBeenCalled()
        expect(generateChartImgStub.mock.calls[0][0]).toBe("line")

        //assertions for the data argument (x and y values)
        const arr = generateChartImgStub.mock.calls[0][1]
        expect(arr[0].x).toBe("1")
        expect(arr[0].y).toBe("1")
        expect(arr[1].x).toBe("3")
        expect(arr[1].y).toBe("7")
        expect(arr[2].x).toBe("47")
        expect(arr[2].y).toBe("48")
        expect(arr.length).toBe(3)

        expect(generateChartImgStub.mock.calls[0][2]).toBe("A")
        expect(generateChartImgStub.mock.calls[0][3]).toBe("B")
        expect(generateChartImgStub.mock.calls[0][4]).toBe("TITLE")
        expect(generateChartImgStub.mock.calls[0][5]).toBe("#4acf00")

        generateChartImgStub.mockRestore()
    })

})