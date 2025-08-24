describe('AboutUs Component', () => {
    beforeEach(() => {
      cy.visit('/'); // Or whichever page the component is rendered on
      cy.get('.aboutus-container').should('exist');
    });
  
    it('should display main headings correctly', () => {
      cy.get('.aboutus-content').within(() => {
        cy.contains('About JustFurnishIt').should('be.visible');
        cy.contains('Interior Design, Redefined with Luxury').should('be.visible');
      });
    });
  
    it('should display both description paragraphs', () => {
      cy.get('.description').should('be.visible');
      cy.get('.aboutus-content p').should('have.length.at.least', 2);
    });
  
    it('should display all 4 stats (Years, Team, Projects, Cities)', () => {
      cy.get('.aboutus-stats').within(() => {
        cy.get('div').should('have.length', 4);
  
        cy.contains('2+').should('exist');
        cy.contains('150+').should('exist');
        cy.contains('500+').should('exist');
        cy.contains('50+').should('exist');
  
        cy.contains('Years Of Legacy').should('exist');
        cy.contains('Team Members').should('exist');
        cy.contains('Finished Projects').should('exist');
        cy.contains('Cities Served').should('exist');
      });
    });
  
    it('should show the Houzz award banner', () => {
      cy.get('.houzz-award').should('contain.text', 'Recognized Repeatedly as the Best');
    });
  
    it('should render all images correctly', () => {
      cy.get('.image-wrapper').within(() => {
        cy.get('img.background-image')
          .should('have.attr', 'alt', 'Background Design')
          .and('have.attr', 'src')
          .should('include', 'livspace-cdn');
  
        cy.get('img.foreground-image')
          .should('have.attr', 'alt', 'Foreground Design')
          .and('have.attr', 'src')
          .should('include', 'unsplash');
  
        cy.get('img.foreground-image-circle')
          .should('have.attr', 'alt', 'Foreground Design')
          .and('have.attr', 'src')
          .should('include', 'decoholic');
      });
    });
  });
  