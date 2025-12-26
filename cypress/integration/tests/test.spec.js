describe('Flight Booking App', () => {
  before(() => {
    cy.visit('/');
  });

  it('Checking if the app is rendered', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
    cy.get('[data-testid="flight-search-form"]').should('be.visible');
  });

  it('Checking if drop-down and buttons are working and verifying when flights are not available', () => {
    // Select cities that won't have flights to test no flights scenario
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').type('MUMBAI');
    cy.get('[data-testid="fromCity"] input').type('{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').type('MUMBAI'); // Same city, so no flights
    cy.get('[data-testid="toCity"] input').type('{enter}');

    cy.get('[data-testid="search-button"]').click();

    // Should show no flights available message
    cy.get('[data-testid="no-flights-message"]').should('be.visible');
  });

  it('Filling out the form and search for the flights and verifying when flights are available', () => {
    // Select cities that will have flights
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI');
    cy.get('[data-testid="fromCity"] input').type('{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI');
    cy.get('[data-testid="toCity"] input').type('{enter}');

    cy.get('[data-testid="search-button"]').click();

    // Wait for flights to load
    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    // Fill passenger details
    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    // Submit booking
    cy.get('[data-testid="submit-booking"]').click();

    // Check for confirmation message
    cy.get('[data-testid="confirmation-message"]').should('contain', 'Thank you for the Booking. Click the below button to return to home page');
  });

  it('Validations for person details form', () => {
    // Navigate to booking page
    cy.visit('/');

    // Select cities
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI');
    cy.get('[data-testid="fromCity"] input').type('{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI');
    cy.get('[data-testid="toCity"] input').type('{enter}');

    cy.get('[data-testid="search-button"]').click();

    // Wait for flights to load and click book
    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    // Try submitting without filling details
    cy.get('[data-testid="submit-booking"]').click();

    // Should show validation errors
    cy.get('[data-testid="name-error"]').should('be.visible');
    cy.get('[data-testid="age-error"]').should('be.visible');
    cy.get('[data-testid="gender-error"]').should('be.visible');
    cy.get('[data-testid="contact-error"]').should('be.visible');

    // Fill in correct details
    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    // Submit booking
    cy.get('[data-testid="submit-booking"]').click();

    // Check for confirmation message
    cy.contains('Thank you for the Booking. Click the below button to return to home page').should('be.visible');
  });

  it('Validating Round Trip booking', () => {
    // Select round trip
    cy.visit('/');
    cy.get('[data-testid="round-trip"]').click();

    // Fill round trip details
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI');
    cy.get('[data-testid="fromCity"] input').type('{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI');
    cy.get('[data-testid="toCity"] input').type('{enter}');

    // Select return date
    cy.get('[data-testid="return-date"]').click();
    cy.get('.MuiPickersDay-day').contains('15').click(); // Select a date

    cy.get('[data-testid="search-button"]').click();

    // Wait for flights to load
    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    // Fill passenger details
    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    // Submit booking
    cy.get('[data-testid="submit-booking"]').click();

    // Check for confirmation message
    cy.contains('Thank you for the Booking. Click the below button to return to home page').should('be.visible');
  });
});