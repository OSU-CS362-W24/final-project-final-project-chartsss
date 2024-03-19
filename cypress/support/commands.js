// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('generateBarChart', () => {
    cy.visit('http://localhost:8080/bar.html');

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
});


Cypress.Commands.add('generateLineChart', () => {
    cy.visit('http://localhost:8080/line.html');

    //chart title
    cy.get('#chart-title-input').type('Line Chart 1');

    //chart color
    cy.get('#chart-color-input').invoke('val', '#00FF00').trigger('input');
        
    //x and y axis labels
    cy.get('#x-label-input').type('X-Axis');
    cy.get('#y-label-input').type('Y-Axis');
    
    //x and y axis values
    cy.get('.x-value-input').first().type('1');
    cy.get('.y-value-input').first().type('100');
    cy.get('#add-values-btn').click();

    cy.get('.x-value-input').eq(1).type('2'); 
    cy.get('.y-value-input').eq(1).type('50');
    cy.get('#add-values-btn').click();

    cy.get('.x-value-input').eq(2).type('3'); 
    cy.get('.y-value-input').eq(2).type('25');
    cy.get('#add-values-btn').click();

    //generate chart
    cy.get('#generate-chart-btn').click();
});

Cypress.Commands.add('generateScatterChart', () => {
    cy.visit('http://localhost:8080/scatter.html');

    //chart title
    cy.get('#chart-title-input').type('Scatter Chart 1');

    //chart color
    cy.get('#chart-color-input').invoke('val', '#00FF00').trigger('input');
        
    //x and y axis labels
    cy.get('#x-label-input').type('X-Axis');
    cy.get('#y-label-input').type('Y-Axis');
    
    //x and y axis values
    cy.get('.x-value-input').first().type('1');
    cy.get('.y-value-input').first().type('100');
    cy.get('#add-values-btn').click();

    cy.get('.x-value-input').eq(1).type('2'); 
    cy.get('.y-value-input').eq(1).type('50');
    cy.get('#add-values-btn').click();

    cy.get('.x-value-input').eq(2).type('3'); 
    cy.get('.y-value-input').eq(2).type('25');
    cy.get('#add-values-btn').click();

    //generate chart
    cy.get('#generate-chart-btn').click();
});
