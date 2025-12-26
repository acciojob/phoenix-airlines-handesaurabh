// cypress/e2e/flight-booking.spec.js - COMPLETE FIXED VERSION
describe('Flight Booking App', () => {
  // Intercept API calls for reliable testing
  beforeEach(() => {
    cy.intercept('GET', '**/api/flights*').as('getFlights');
    cy.intercept('POST', '**/api/bookings*').as('bookFlight');
    cy.visit('/');
  });

  it('Checking if the app is rendered', () => {
    cy.get('h1').should('be.visible');
    cy.get('[data-testid="flight-search-form"]').should('be.visible');
  });

  it('Checking dropdowns and buttons work, verifies no flights available', () => {
    // Test same city (no flights scenario)
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').type('MUMBAI{enter}'); // Same city

    cy.get('[data-testid="search-button"]').click();
    
    // Verify no flights message
    cy.get('[data-testid="no-flights-message"]').should('be.visible');
  });

  it('Fills form, searches flights, completes successful booking', () => {
    // Fill search form with valid route
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI{enter}');

    cy.get('[data-testid="search-button"]').click();

    // Wait for API and verify results
    cy.wait('@getFlights');
    cy.get('[data-testid="flight-list"]').should('be.visible');
    
    cy.get('[data-testid="book-button"]').first().click();

    // Fill passenger details
    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').select('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    // Submit and verify
    cy.get('[data-testid="submit-booking"]').click();
    cy.wait('@bookFlight');
    cy.contains('Thank you for the Booking. Click the below button to return to home page')
      .should('be.visible');
  });

  it('Validates empty passenger form (FIXED - INDIVIDUAL FIELD ERRORS)', () => {
    // Complete search flow to reach booking form
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI{enter}');
    
    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI{enter}');
    
    cy.get('[data-testid="search-button"]').click();
    cy.wait('@getFlights');
    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    // Submit empty form - expects INDIVIDUAL FIELD ERRORS (your app's behavior)
    cy.get('[data-testid="submit-booking"]').click();
    
    // Verify all individual field validation errors appear
    cy.get('[data-testid="name-error"]').should('be.visible');
    cy.get('[data-testid="age-error"]').should('be.visible');
    cy.get('[data-testid="gender-error"]').should('be.visible');
    cy.get('[data-testid="contact-error"]').should('be.visible');

    // DEBUG screenshot if needed
    cy.screenshot('validation-errors-success');

    // Fill valid data and submit successfully
    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').select('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');
    
    cy.get('[data-testid="submit-booking"]').click();
    cy.wait('@bookFlight');
    cy.contains('Thank you for the Booking. Click the below button to return to home page')
      .should('be.visible');
  });

  it('Validates Round Trip booking flow', () => {
    // Enable round trip
    cy.get('[data-testid="round-trip"]').click();

    // Fill outbound
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI{enter}');

    // Reliable date picker (fixed)
    cy.get('[data-testid="return-date"]').click();
    cy.get('[data-testid="return-date"] input').type('2025-12-15{enter}');

    cy.get('[data-testid="search-button"]').click();
    cy.wait('@getFlights');
    
    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    // Fill passenger details
    cy.get('[data-testid="passenger-name"]').type('Jane Smith');
    cy.get('[data-testid="passenger-age"]').type('25');
    cy.get('[data-testid="passenger-gender"]').select('Female');
    cy.get('[data-testid="passenger-contact"]').type('9876543211');

    cy.get('[data-testid="submit-booking"]').click();
    cy.wait('@bookFlight');
    cy.contains('Thank you for the Booking. Click the below button to return to home page')
      .should('be.visible');
  });
});
