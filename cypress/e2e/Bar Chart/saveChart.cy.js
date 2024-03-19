describe('Bar Chart Save Test', () => {
    it('Generates a bar chart correctly', () => {
        cy.generateBarChart();
        cy.get('#save-chart-btn').click();

        cy.get('li.right a').click();

        cy.contains('Bar Chart 1').should('be.visible');
    });
});