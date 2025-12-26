describe('Flight Booking App', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Checking if the app is rendered', () => {
    cy.get('h1').should('be.visible');
    cy.get('[data-testid="flight-search-form"]').should('be.visible');
  });

  it('Checking if drop-down and buttons are working and verifying when flights are not available', () => {
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').type('MUMBAI{enter}');

    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="no-flights-message"]').should('be.visible');
  });

  it('Filling out the form and searching flights when available', () => {
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').clear().type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').clear().type('DELHI{enter}');

    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    cy.get('[data-testid="submit-booking"]').click();

    cy.get('[data-testid="confirmation-message"]')
      .should('be.visible')
      .and('contain', 'Thank you for the Booking');
  });

  it('Validations for person details form', () => {
    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').type('DELHI{enter}');

    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    cy.get('[data-testid="submit-booking"]').click();

    // Field-level validation checks (CORRECT)
    cy.get('[data-testid="name-error"]').should('be.visible');
    cy.get('[data-testid="age-error"]').should('be.visible');
    cy.get('[data-testid="gender-error"]').should('be.visible');
    cy.get('[data-testid="contact-error"]').should('be.visible');

    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    cy.get('[data-testid="submit-booking"]').click();

    cy.contains(
      'Thank you for the Booking. Click the below button to return to home page'
    ).should('be.visible');
  });

  it('Validating Round Trip booking', () => {
    cy.get('[data-testid="round-trip"]').click();

    cy.get('[data-testid="fromCity"]').click();
    cy.get('[data-testid="fromCity"] input').type('MUMBAI{enter}');

    cy.get('[data-testid="toCity"]').click();
    cy.get('[data-testid="toCity"] input').type('DELHI{enter}');

    cy.get('[data-testid="return-date"]').click();
    cy.get('.MuiPickersDay-day').contains('15').click();

    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid="flight-list"]').should('be.visible');
    cy.get('[data-testid="book-button"]').first().click();

    cy.get('[data-testid="passenger-name"]').type('John Doe');
    cy.get('[data-testid="passenger-age"]').type('30');
    cy.get('[data-testid="passenger-gender"]').type('Male');
    cy.get('[data-testid="passenger-contact"]').type('9876543210');

    cy.get('[data-testid="submit-booking"]').click();

    cy.contains(
      'Thank you for the Booking. Click the below button to return to home page'
    ).should('be.visible');
  });

});
