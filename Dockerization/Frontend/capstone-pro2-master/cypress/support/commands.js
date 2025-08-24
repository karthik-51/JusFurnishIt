beforeEach(() => {
    cy.intercept('GET', '**/api/users/email/**', {
      statusCode: 200,
      body: {
        id: 1,
        fullName: 'Sneha V',
        email: 'sneha@example.com'
      }
    });
  
    cy.intercept('GET', '**/api/customer/cart/**', {
      statusCode: 200,
      body: [
        { productId: 101, quantity: 2 }
      ]
    });
  
    cy.intercept('GET', '**/api/customer/products/**', {
      statusCode: 200,
      body: {
        category: 'Modern',
        theme: 'Luxury',
        price: 5000
      }
    });
  
    cy.intercept('POST', '**/api/bookings', {
      statusCode: 201,
      body: {}
    });
  
    cy.intercept('DELETE', '**/api/customer/cart/clear/**', {
      statusCode: 200
    });
  
    cy.intercept('POST', '**/api/customer/ratings', {
      statusCode: 200
    });
  });
  