"use strict";
(globalThis["webpackChunkburst_statistics"] = globalThis["webpackChunkburst_statistics"] || []).push([["src_components_common_Tour_js"],{

/***/ "./src/components/common/Tour.js":
/*!***************************************!*\
  !*** ./src/components/common/Tour.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_shepherd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-shepherd */ "./node_modules/react-shepherd/dist/Shepherd.es.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/api */ "./src/utils/api.js");





const newSteps = [{
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Welcome to Burst Statistics', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The plugin is now active.', 'burst-statistics') + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Follow a quick tour and make sure everything works.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    type: 'cancel',
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit tour', 'burst-statistics')
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Start tour', 'burst-statistics'),
    action() {
      window.location.hash = 'dashboard';
      return this.next();
    }
  }]
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your dashboard', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This is your Dashboard. This will give you an overview of notices, real time data, and settings.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'dashboard';
      return this.back();
    }
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'burst-statistics'),
    action() {
      window.location.hash = 'dashboard';
      return this.next();
    }
  }],
  attachTo: {
    element: '.burst-progress',
    on: 'auto'
  }
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Real time data', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This block will show you real time visitors.', 'burst-statistics') + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('To make sure Burst Statistics is setup properly, try visiting this website on another device or open a private window.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'dashboard';
      return this.back();
    }
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'burst-statistics'),
    action() {
      window.location.hash = 'statistics';
      return this.next();
    }
  }],
  attachTo: {
    element: '.burst-today',
    on: 'auto'
  }
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your website statistics', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This page is probably quite empty at the moment. The data from your website will show up here in a few days. So be sure to come back soon.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'dashboard';
      return this.back();
    }
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'burst-statistics'),
    action() {
      window.location.hash = 'statistics';
      return this.next();
    }
  }]

  // attachTo: { element: '.burst-today', on: 'right' },
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Changing the date range', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Over here you can change the date range for the data being shown. Click on two different days or click twice on a single day to show the data for that period.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'statistics';
      return this.back();
    }
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'burst-statistics'),
    action() {
      window.location.hash = 'settings';
      return this.next();
    }
  }],
  attachTo: {
    element: '.burst-date-range-container',
    on: 'auto'
  }
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your configuration', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You can customize Burst to your liking. Change settings to meet your needs.', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'statistics';
      return this.back();
    }
  }, {
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'burst-statistics'),
    action() {
      window.location.hash = 'settings';
      return this.next();
    }
  }],
  attachTo: {
    element: '.burst-general',
    on: 'auto'
  }
}, {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Support & feedback', 'burst-statistics'),
  text: '<p>' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Feel free to post your questions or feedback on the WordPress forums. We are happy to help!', 'burst-statistics') + '</p>',
  classes: 'burst-shepherd',
  buttons: [{
    classes: 'burst-button burst-button--secondary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'burst-statistics'),
    action() {
      window.location.hash = 'settings';
      return this.back();
    }
  }, {
    type: 'cancel',
    classes: 'burst-button burst-button--primary',
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exit tour', 'burst-statistics')
  }]
}];
let tourEndRunning = false;
const onTourEnd = () => {
  if (!tourEndRunning) {
    tourEndRunning = true;
    let saveFields = [];
    saveFields.push({
      id: 'burst_tour_shown_once',
      value: '1',
      type: 'hidden'
    });
    _utils_api__WEBPACK_IMPORTED_MODULE_3__.setFields(saveFields).then(response => {
      tourEndRunning = false;
    });
  }
};
const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    keyboardNavigation: false
  },
  useModalOverlay: false,
  margin: 15
};
function TourInstance() {
  const tour = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(react_shepherd__WEBPACK_IMPORTED_MODULE_1__.ShepherdTourContext);
  tour.on('cancel', onTourEnd);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (tour) {
      tour.start();
    }
  }, [tour]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
}
const Tour = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_shepherd__WEBPACK_IMPORTED_MODULE_1__.ShepherdTour, {
    steps: newSteps,
    tourOptions: tourOptions
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TourInstance, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tour);

/***/ })

}]);
//# sourceMappingURL=src_components_common_Tour_js.js.map