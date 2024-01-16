( function( blocks, element ) {
  var el = element.createElement;

  blocks.registerBlockType( 'burst/pageviews-block', {
    title: 'Pageviews Block',
    icon: 'analytics',
    category: 'widgets',

    edit: function() {
      return el(
          'p',
          {},
          'Pageviews: Loading...'
      );
    },

    save: function() {
      return el(
          'p',
          {},
          'Pageviews: [burst_pageviews]'
      );
    },
  } );
} )( window.wp.blocks, window.wp.element );