describe('Booking Page Functionality', () => {

  // This runs before each test
  beforeEach(() => {
    // Mock APIs
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

    // Simulate login state
    localStorage.setItem('userEmail', 'sneha@example.com');

    // Visit the booking page
    cy.visit('/booking');
  });

  it('should load and display cart items', () => {
    cy.contains('Book Your Design');
    cy.contains('Your Order');
    cy.contains('Modern - Luxury');
    cy.contains('₹5000 × 2');
    cy.contains('Total: ₹10000');
  });

  it('should have prefilled user info and allow address input', () => {
    cy.get('input[name="fullName"]').should('have.value', 'Sneha V');
    cy.get('input[name="email"]').should('have.value', 'sneha@example.com');
    cy.get('input[name="deliveryAddress"]').type('123 ABC Street');
  });

  it('should not proceed without delivery address', () => {
    cy.get('input[name="deliveryAddress"]').clear();
    cy.contains('Proceed to Payment').click();
    cy.contains('Please enter delivery address');
  });

  it('should proceed to payment and show rating modal', () => {
    cy.get('input[name="deliveryAddress"]').clear().type('123 ABC Street');

    cy.window().then((win) => {
      win.Razorpay = function (options) {
        return {
          open: () => {
            options.handler({ razorpay_payment_id: 'fake_payment_id_123' });
          }
        };
      };
    });

    cy.contains('Proceed to Payment').click();

    cy.contains('Payment successful! Payment ID: fake_payment_id_123');
    cy.contains('Rate Your Purchase');
    cy.contains('Modern');
    cy.contains('Luxury');
  });

  it('should allow rating submission and show thank you message', () => {
    cy.get('input[name="deliveryAddress"]').clear().type('123 ABC Street');

    cy.window().then((win) => {
      win.Razorpay = function (options) {
        return {
          open: () => {
            options.handler({ razorpay_payment_id: 'fake_payment_id_123' });
          }
        };
      };
    });

    cy.contains('Proceed to Payment').click();
    cy.get('[role="slider"]').click('center');
    cy.get('textarea').type('Amazing design!');
    cy.contains('Submit All Reviews').click();

    cy.contains('Thank you for your reviews!');
  });

});
