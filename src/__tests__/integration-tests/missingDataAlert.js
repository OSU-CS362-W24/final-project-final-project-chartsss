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

describe("missingDataAlert", () => {

    test("correctly displays error message when no x and y values are provided", async function(){

        initDomFromFiles(`${__dirname}/../../line/line.html`, `${__dirname}/../../line/line.js`)

        const alertSpy = jest.spyOn(window, "alert")
        alertSpy.mockImplementation(function(){
            //do nothing
        })

        const generateButton = domTesting.getByText(document, "Generate chart")

        const xLabelInput = domTesting.getByLabelText(document, "X label")
        const yLabelInput = domTesting.getByLabelText(document, "Y label")

        const user = userEvent.setup()
        await user.type(xLabelInput, "A")
        await user.type(yLabelInput, "B")
        await user.click(generateButton)

        expect(alertSpy).toHaveBeenCalled()
        expect(alertSpy.mock.calls[0][0]).toBe("Error: No data specified!")

        alertSpy.mockRestore()

    })

    test("correctly displays error message when no x and y labels are provided", async function(){

        initDomFromFiles(`${__dirname}/../../line/line.html`, `${__dirname}/../../line/line.js`)

        const alertSpy = jest.spyOn(window, "alert")
        alertSpy.mockImplementation(function(){
            //do nothing
        })

        const generateButton = domTesting.getByText(document, "Generate chart")

        const xInput = domTesting.getAllByLabelText(document, "X")
        const yInput = domTesting.getAllByLabelText(document, "Y")

        const user = userEvent.setup()
        await user.type(xInput[0], "1")
        await user.type(yInput[0], "1")
        await user.click(generateButton)

        expect(alertSpy).toHaveBeenCalled()
        expect(alertSpy.mock.calls[0][0]).toBe("Error: Must specify a label for both X and Y!")

        alertSpy.mockRestore()

    })

    test("correctly displays error message when neither labels nor values are provided", async function(){

        initDomFromFiles(`${__dirname}/../../line/line.html`, `${__dirname}/../../line/line.js`)

        const alertSpy = jest.spyOn(window, "alert")
        alertSpy.mockImplementation(function(){
            //do nothing
        })

        const generateButton = domTesting.getByText(document, "Generate chart")
        const clearButton = domTesting.getByText(document, "Clear chart data")

        const user = userEvent.setup()
        await user.click(clearButton)
        await user.click(generateButton)

        expect(alertSpy).toHaveBeenCalled()
        expect(alertSpy.mock.calls[0][0]).toBe("Error: No data specified!")

        alertSpy.mockRestore()

    })

})