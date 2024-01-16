( function( blocks, element, i18n ) {
  var el = element.createElement;
  var __ = i18n.__;
  var _n = i18n._n;

  blocks.registerBlockType( 'burst/pageviews-block', {
    title: 'Pageviews Block',
    icon: 'analytics',
    category: 'widgets',

    edit: function() {

      var pageviewsText = sprint_r(__('This page has been visited %d times', 'burst-statistics'), 0);

      return el(
          'p',
          {},
          pageviewsText
      );
    },

    save: function() {

      var pageviewsText = sprint_r(__('This page has been visited %d times', 'burst-statistics'), 0);

      return el(
          'p',
          {},
          pageviewsText
      );
    },
  } );
} )( window.wp.blocks, window.wp.element, window.wp.i18n );
