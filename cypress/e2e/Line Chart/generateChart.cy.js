describe('Line Chart Tests', () => {
    it('Successfully generates a bar chart', () => {
        cy.generateLineChart();
    
            //assert that a chart image should be visible
            cy.get('#chart-display img').should('be.visible');
        });
    });

