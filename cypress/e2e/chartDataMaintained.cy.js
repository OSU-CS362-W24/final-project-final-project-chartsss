describe('Data Persistence Across Chart Types', () => {
    //pre-defining the input values
    const inputData = {
        title: 'Different Charts',
        color: '#00FF00',
        xAxisLabel: 'X-Axis',
        yAxisLabel: 'Y-Axis',
        xAxisValue: '1',
        yAxisValue: '100'
    };

    beforeEach(() => {
        cy.visit('http://localhost:8080/line.html');
    });

    it('Inputs values into the line chart and verifies persistence across charts', () => {
        //input values into the line chart
        cy.get('#chart-title-input').type(inputData.title);
        cy.get('#chart-color-input').invoke('val', inputData.color).trigger('input').trigger('change');
        cy.get('#x-label-input').type(inputData.xAxisLabel);
        cy.get('#y-label-input').type(inputData.yAxisLabel);
        cy.get('.x-value-input').type(inputData.xAxisValue);
        cy.get('.y-value-input').type(inputData.yAxisValue);
        cy.get('#add-values-btn').click();

        const otherPages = ['scatter.html', 'bar.html'];

        //iterates over each page to check for the same values
        otherPages.forEach(page => {
            cy.visit(`http://localhost:8080/${page}`);

            //verify chart title, color,axis labels, and axis values persist
            cy.get('#chart-title-input').should('have.value', inputData.title);
            cy.get('#chart-color-input').invoke('val').then(colorValue => {
                expect(colorValue.toLowerCase()).to.equal(inputData.color.toLowerCase());
            });
            cy.get('#x-label-input').should('have.value', inputData.xAxisLabel);
            cy.get('#y-label-input').should('have.value', inputData.yAxisLabel);
            cy.get('.x-value-input').should('have.value', inputData.xAxisValue);
            cy.get('.y-value-input').should('have.value', inputData.yAxisValue);
        });
    });
});