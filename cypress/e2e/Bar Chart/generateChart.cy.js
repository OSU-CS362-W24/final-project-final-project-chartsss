describe('Bar Chart Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/bar.html');
    });

    it('Generates a bar chart correctly', () => {
        //chart title
        cy.get('#chart-title-input').type('Bar Chart 1');

        //chart color
        cy.get('#chart-color-input').invoke('val', '#00FF00').trigger('input');
        
        //x and y axis labels
        cy.get('#x-label-input').type('X-Axis');
        cy.get('#y-label-input').type('Y-Axis');
        
        //x and y axis values
        cy.get('.x-value-input').type('1');
        cy.get('.y-value-input').type('100');
        cy.get('#add-values-btn').click();

        //generate chart
        cy.get('#generate-chart-btn').click();

        //assert that a chart image should be visible
        cy.get('#chart-display img').should('be.visible');
    });
});

