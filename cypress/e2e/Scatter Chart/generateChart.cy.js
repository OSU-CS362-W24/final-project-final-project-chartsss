describe('Scatter Chart Tests', () => {
    it('Generates a scatter chart correctly', () => {
        cy.generateScatterChart();

        //assert that a chart image should be visible
        cy.get('#chart-display img').should('be.visible');
    });
});