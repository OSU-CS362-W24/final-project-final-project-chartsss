/**
 * @jest-environment jsdom
 */

const fs = require("fs")

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
  //read and write the HTML content to the JSDOM enviroment
  const html = fs.readFileSync(htmlPath, 'utf8')
  document.open()
  document.write(html)
  document.close()

	jest.isolateModules(function() {
	require(jsPath)
	});
}

test("Clicking the add values button generates two new input boxes for X and Y", async function() {
	//setup the test environment
  initDomFromFiles(
	`${__dirname}/../../line/line.html`,
	`${__dirname}/../../line/line.js`	
	)
  
  const user = userEvent.setup()
  //locate the add values button 
  const addValuesBtn = domTesting.getByText(document, "+")
    
  //simulate user interaction
  await user.click(addValuesBtn);
  await user.click(addValuesBtn);
    
  //locate the input boxes for X and Y values
  const xValueInputs = domTesting.getAllByLabelText(document, 'X');
  const yValueInputs = domTesting.getAllByLabelText(document, 'Y');

  //simulate user inputting values
  await user.type(xValueInputs[0], '1')
  await user.type(xValueInputs[1], '3')
  await user.type(xValueInputs[2], '5')
  await user.type(yValueInputs[0], '2')
  await user.type(yValueInputs[1], '4')
  await user.type(yValueInputs[2], '6')

  await user.click(addValuesBtn);

  //assert: verify the final state is expected to be those values
  const xValueInputsNew = domTesting.getAllByLabelText(document, 'X');
  const yValueInputsNew = domTesting.getAllByLabelText(document, 'Y');
  expect(xValueInputsNew[0].value).toBe('1')
  expect(xValueInputsNew[1].value).toBe('3')
  expect(xValueInputsNew[2].value).toBe('5')
  expect(yValueInputsNew[0].value).toBe('2')
  expect(yValueInputsNew[1].value).toBe('4')
  expect(yValueInputsNew[2].value).toBe('6')
    
  //verify that a new set of input boxses has been added and is empty
  expect(xValueInputsNew[3].value).toBe('')
  expect(yValueInputsNew[3].value).toBe('')

});