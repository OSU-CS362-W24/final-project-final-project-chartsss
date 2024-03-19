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

test("correctly adds two values in the chart builder", function (){

    initDomFromFiles(`${__dirname}/../../line/line.html`, `${__dirname}/../../chartBuilder/chartBuilder.js`)

    const submitButton = domTesting.getByText(document, "+")
    expect(submitButton).not.toBeNull()

})