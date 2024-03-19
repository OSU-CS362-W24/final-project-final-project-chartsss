describe('Line Chart Save Test', () => {
    it('Generates a line chart correctly', () => {
        cy.generateLineChart();
        cy.get('#save-chart-btn').click();

        cy.get('li.right a').click();

        cy.contains('Line Chart 1').should('be.visible');
    });
});