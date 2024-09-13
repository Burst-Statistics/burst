describe( 'React App', () => {
  beforeEach( () => {

    // Using the custom command before each test
    cy.login();
    cy.visit( 'wp-admin/admin.php?page=burst' );
    cy.wait( 1000 );
  });

  // write test that check if react app renders
  it( 'should render a react app', () => {
    cy.get( '.burst-content-area' ).should( 'exist' );
  });

  it( 'should have 5 grid items', () => {
    cy.get( '.burst-grid-item' ).should( 'have.length', 5 );
  });

});
