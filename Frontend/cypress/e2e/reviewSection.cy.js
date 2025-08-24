describe('ReviewSection Component', () => {
    beforeEach(() => {
      cy.visit('/'); // or use correct path where ReviewSection is rendered
      cy.get('.review-carousel').should('exist'); // ensure it's on the page
    });
  
    it('should render the section title', () => {
      cy.contains('A Word From Our Customers').should('be.visible');
    });
  
    it('should render three review cards', () => {
      cy.get('.carousel-card').should('have.length', 3);
    });
  
    it('should highlight the center card differently', () => {
      cy.get('.carousel-card.center').should('exist');
      cy.get('.carousel-card.side').should('have.length', 2);
    });
  
    it('should display name, role, review, designer, and rating on center card', () => {
      cy.get('.carousel-card.center').within(() => {
        cy.get('.card-name').should('exist').and('not.be.empty');
        cy.get('.card-role').should('exist').and('not.be.empty');
        cy.get('.card-review blockquote').should('exist').and('not.be.empty');
        cy.get('.card-design').should('contain.text', 'Designed by');
        cy.get('.card-stars').find('svg').should('have.length', 5);
      });
    });
  
    
  
    
  
    it('should display correct number of filled stars for rating', () => {
      cy.get('.carousel-card.center').within(() => {
        cy.get('.card-stars svg').then(($stars) => {
          const filledStars = $stars.filter((i, el) =>
            el.getAttribute('color') === '#ffc107'
          );
          // rating should be 4 or 5, all reviews in your list are 4 or 5
          expect(filledStars.length).to.be.within(4, 5);
        });
      });
    });
  });
  