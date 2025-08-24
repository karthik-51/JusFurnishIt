describe('Footer Component', () => {
    beforeEach(() => {
      cy.visit('/'); // or the route where <Footer /> is rendered
      cy.get('footer.footer-root').should('exist');
    });
  
    it('should render all social media icons', () => {
      cy.get('.footer-social-row a').should('have.length', 5);
  
      cy.get('.footer-social-row').within(() => {
        cy.get('a[aria-label="Facebook"]').should('exist');
        cy.get('a[aria-label="Instagram"]').should('exist');
        cy.get('a[aria-label="Twitter"]').should('exist');
        cy.get('a[aria-label="YouTube"]').should('exist');
        cy.get('a[aria-label="LinkedIn"]').should('exist');
      });
    });
  
    it('should render all 3 footer columns', () => {
      cy.get('.footer-main .footer-col').should('have.length', 3);
    });
  
    it('should list all Useful Links items', () => {
      cy.get('.footer-col').eq(0).within(() => {
        cy.contains('Useful Links').should('exist');
        const links = [
          'Hire us',
          'Who we are',
          'How we work',
          'Book Luxury Interior Designer',
          'Interior Cost Calculator',
          'Contact us',
          'Refer a friend',
          'FAQs',
        ];
        links.forEach((text) => cy.contains(text).should('exist'));
      });
    });
  
    it('should list all Company Support items', () => {
      cy.get('.footer-col').eq(1).within(() => {
        cy.contains('Company Support').should('exist');
        const policies = [
          'Privacy Policy',
          'Payment Policy',
          'Refund, Return Policy & Delay Penalties',
          'Cancellation Policy',
          'Warranty Policy',
          'Terms & Conditions',
        ];
        policies.forEach((text) => cy.contains(text).should('exist'));
      });
    });
  
    it('should display all address blocks with titles', () => {
      const addressTitles = [
        'Registered Address',
        'Whitefield Design Centre',
        'HSR Layout Design Centre',
      ];
  
      cy.get('.footer-col').eq(2).within(() => {
        addressTitles.forEach((title) =>
          cy.contains('.footer-address-title', title).should('exist')
        );
      });
    });
  
    it('should display the correct copyright text', () => {
      cy.get('.footer-root')
        .contains('Copyright © 2025 - JustFurnishIt')
        .should('be.visible');
    });
  });
  