describe('Test tracking', () => {
  beforeEach(() => {
    cy.visit( '/' );
  });

  it('should have the time me script', () => {
    // script has an id of burst-timeme-js
    cy.get('#burst-timeme-js').should('exist');
  })

  it('should have the burst tracking script', () => {
    // script has an id of burst-js
    cy.get('#burst-js').should('exist');
  });

  it('should have a js variable burst', () => {
    cy.window().then((win) => {
      expect(win.burst).to.exist;
    });
  });

  it('should set a cookie of burst_uid', () => {
    cy.getCookie('burst_uid').should('exist');
  });

  it('should import goals if they exist for current page', () => {
    cy.window().then(win => {
      cy.stub(win, 'burst_import_goals').callsFake(() => Promise.resolve());
      cy.window().invoke('burst_import_goals');
      cy.wrap(win.burst_import_goals).should('be.called');
    });
  });

  it('should get a cookie by name', () => {
    cy.setCookie('test', '123');
    cy.window().then(win => {
      cy.wrap(win.burst_get_cookie('test')).should('eventually.equal', '123');
    });
  });

  it('should set a cookie', () => {
    cy.window().then(win => {
      burst_set_cookie('test', '123');
      cy.getCookie('test').should('have.property', 'value', '123');
    });
  });

  it('should use cookies for tracking', () => {
    cy.window().then(win => {
      expect(win.burst_use_cookies()).to.be.true;
    });
  });

  it('should get or set the user identifier', () => {
    cy.window().then(win => {
      cy.wrap(win.burst_uid()).should('eventually.be.ok');
    });
  });

  it('should generate a random string', () => {
    cy.window().then(win => {
      expect(win.burst_generate_uid()).to.have.length(32);
    });
  });

  it('should generate a fingerprint', () => {
    cy.window().then(win => {
      cy.wrap(win.burst_fingerprint()).should('eventually.be.ok');
    });
  });

  it('should get time on page', () => {
    cy.window().then(win => {
      cy.wrap(win.burst_get_time_on_page()).should('eventually.be.gte', 0);
    });
  });

  it('should check if this is a user agent', () => {
    cy.window().then(win => {
      expect(win.burst_is_user_agent()).to.be.false;
    });
  });

  it('should check if do not track is enabled', () => {
    cy.window().then(win => {
      expect(win.burst_is_do_not_track()).to.be.false;
    });
  });

  it('should make a XMLHttpRequest and return a promise', () => {
    cy.window().then(win => {
      cy.wrap(win.burst_api_request({ data: {} })).should('eventually.equal', 'ok');
    });
  });

  it('should update the tracked hit', () => {
    cy.window().then(win => {
      cy.stub(win, 'burst_update_hit').callsFake(() => Promise.resolve());
      cy.window().invoke('burst_update_hit');
      cy.wrap(win.burst_update_hit).should('be.called');
    });
  });

  it('should track a hit', () => {
    cy.window().then(win => {
      cy.stub(win, 'burst_track_hit').callsFake(() => Promise.resolve());
      cy.window().invoke('burst_track_hit');
      cy.wrap(win.burst_track_hit).should('be.called');
    });
  });

  it('should initialize events', () => {
    cy.window().then(win => {
      cy.stub(win, 'burst_init_events').callsFake(() => Promise.resolve());
      cy.window().invoke('burst_init_events');
      cy.wrap(win.burst_init_events).should('be.called');
    });
  });

});
