describe('Re-opening a scatter chart', () => {
    before(() => {
        cy.generateScatterChart();
        cy.get('#save-chart-btn').click();
        cy.get('li.right a').click();
    });

    it('should display the saved chart data and image in the chart builder when reopened from the gallery', () => {
        cy.contains('Scatter Chart 1').click();
        cy.get('#chart-title-input').should('have.value', 'Scatter Chart 1');
        cy.get('#x-label-input').should('have.value', 'X-Axis');
        cy.get('#y-label-input').should('have.value', 'Y-Axis');
        cy.get('#chart-display img').should('be.visible'); 
    });
});