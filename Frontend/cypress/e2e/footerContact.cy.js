describe('FooterContact Component', () => {
    beforeEach(() => {
      cy.visit('/'); // or whichever route renders FooterContact
      cy.get('.footer-contact-hero').should('exist');
    });
  
    it('should display heading and description', () => {
      cy.contains('Contact Us').should('be.visible');
      cy.get('.footer-contact-desc')
        .should('be.visible')
        .and('contain.text', 'We’d love to hear from you!');
    });
  
    it('should show address, phone, and email information', () => {
      cy.get('.footer-contact-item').should('have.length', 3);
  
      cy.contains('Address').should('exist');
      cy.contains('JustFurnishIt').should('exist');
  
      cy.contains('Phone').should('exist');
      cy.contains('561-456-2321').should('exist');
  
      cy.contains('Email').should('exist');
      cy.contains('justfurnishit@email.com').should('exist');
    });
  
    it('should render all contact form fields', () => {
      cy.get('.footer-contact-form-box').within(() => {
        cy.contains('Send Message').should('be.visible');
        cy.get('input[type="text"][placeholder="Full Name"]').should('exist');
        cy.get('input[type="email"][placeholder="Email"]').should('exist');
        cy.get('input[type="tel"]').should('exist');
        cy.get('select').should('exist');
        cy.get('textarea[placeholder="Type your Message..."]').should('exist');
        cy.get('button[type="submit"]').should('contain.text', 'Send');
      });
    });
  
    it('should validate required form fields on submit', () => {
      cy.get('.footer-contact-form').within(() => {
        cy.get('button[type="submit"]').click();
      });
  
      // Optional: Check HTML5 native validation prevents form submission
      cy.get('input[required]:invalid').should('have.length.at.least', 1);
    });
  
    it('should allow filling and submitting the form', () => {
      cy.get('.footer-contact-form').within(() => {
        cy.get('input[type="text"]').type('John Doe');
        cy.get('input[type="email"]').type('john@example.com');
        cy.get('input[type="tel"]').type('1234567890');
        cy.get('select').select('Interior Design Service');
        cy.get('textarea').type('I am interested in a modern interior design.');
  
        cy.get('button[type="submit"]').click();
      });
  
      // Optional: Add alert/message check if submission shows feedback
    });
  });
  