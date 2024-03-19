describe('Bar Chart Generation Test', () => {
    
    it('Successfully generates a bar chart', () => {
    cy.generateBarChart();

        //assert that a chart image should be visible
        cy.get('#chart-display img').should('be.visible');
    });
});

