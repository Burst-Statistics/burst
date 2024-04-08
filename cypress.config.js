const { defineConfig } = require( 'cypress' );

module.exports = defineConfig({
  env: {
    wpUser: 'admin',
    wpPassword: 'password'
  },
  e2e: {
    baseUrl: 'http://localhost:8889',
    setupNodeEvents( on, config ) {

      // implement node event listeners here
    }
  }
});
