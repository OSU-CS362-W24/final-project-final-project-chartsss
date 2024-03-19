describe('Scatter Chart Save Test', () => {
    it('Generates a scatter chart correctly', () => {
        cy.generateScatterChart();
        cy.get('#save-chart-btn').click();

        cy.get('li.right a').click();

        cy.contains('Scatter Chart 1').should('be.visible');
    });
});