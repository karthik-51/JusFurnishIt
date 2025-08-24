describe('Customer Review Carousel', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('A Word From Our Customers').should('exist');
    });
  
    it('should render the main title and three review cards', () => {
      cy.get('.carousel-title').should('contain', 'A Word From Our Customers');
      cy.get('.carousel-card').should('have.length', 3);
    });
  
    it('should highlight the center card correctly', () => {
      cy.get('.carousel-card.center').should('exist');
      cy.get('.carousel-card.center .card-name').should('not.be.empty');
      cy.get('.carousel-card.center .card-review blockquote').should('exist');
    });
  
    it('should show designer name and stars', () => {
      cy.get('.carousel-card.center .card-design').should('contain', 'Designed by:');
      cy.get('.carousel-card.center .card-stars svg').should('have.length', 5);
    });
  
    it('should move to next review on right arrow click', () => {
      cy.get('.carousel-card.center .card-name').then(($nameBefore) => {
        const nameBefore = $nameBefore.text().trim();
  
        cy.get('button[aria-label="Next"]').click();
  
        cy.wait(300); // wait for state update
        cy.get('.carousel-card.center .card-name').should(($nameAfter) => {
          expect($nameAfter.text().trim()).to.not.equal(nameBefore);
        });
      });
    });
  
    it('should move to previous review on left arrow click', () => {
      cy.get('.carousel-card.center .card-name').then(($nameBefore) => {
        const nameBefore = $nameBefore.text().trim();
  
        cy.get('button[aria-label="Previous"]').click();
  
        cy.wait(300); // wait for state update
        cy.get('.carousel-card.center .card-name').should(($nameAfter) => {
          expect($nameAfter.text().trim()).to.not.equal(nameBefore);
        });
      });
    });
  
    it('should cycle through reviews infinitely (wrap-around)', () => {
      const totalClicks = reviews.length + 1;
  
      for (let i = 0; i < totalClicks; i++) {
        cy.get('button[aria-label="Next"]').click();
      }
  
      cy.get('.carousel-card.center .card-name').should('exist');
    });
  });
  