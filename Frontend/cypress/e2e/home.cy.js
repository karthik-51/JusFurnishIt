describe('Home Page UI and Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust the route if your home page is not at `/`
    cy.get('.home-container').should('exist');
  });

  it('should render the hero banner with correct image and quote', () => {
    cy.get('.hero-banner-sketch').should('have.css', 'background-image').and('include', 'http');
    cy.get('.hero-title').should('be.visible');
    cy.get('.hero-subtitle').should('be.visible');
  });

  it('should render and navigate hero slides with arrow buttons', () => {
    cy.get('.hero-title').then(($el) => {
      const initialTitle = $el.text();

      cy.get('button.carousel-arrow.right').click();
      cy.wait(500); // wait for state to update

      cy.get('.hero-title').should(($newEl) => {
        expect($newEl.text()).not.to.eq(initialTitle);
      });

      cy.get('button.carousel-arrow.left').click();
      cy.wait(500);

      cy.get('.hero-title').should('contain.text', initialTitle);
    });
  });

 
  it('should render AboutUs, ReviewSection, FooterContact, and Footer components', () => {
    cy.contains('About JustFurnishIt').should('exist');
    cy.contains('A Word From Our Customers').should('exist');
    cy.contains('Contact Us').should('exist');
    cy.contains('Useful Links').should('exist');
  });
});
