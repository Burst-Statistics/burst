"use strict";
(globalThis["webpackChunkburst_statistics"] = globalThis["webpackChunkburst_statistics"] || []).push([["src_components_pages_DashboardPage_js"],{

/***/ "./src/api/getGoalsData.js":
/*!*********************************!*\
  !*** ./src/api/getGoalsData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   transformTotalGoalsData: () => (/* binding */ transformTotalGoalsData)
/* harmony export */ });
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");


const transformTotalGoalsData = response => {
  response.conversionPercentage.value = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_0__.getPercentage)(response.total.value, response.conversionMetric.value);
  response.bestDevice.value = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_0__.formatPercentage)(response.bestDevice.value);
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      if ('conversionPercentage' !== key && 'bestDevice' !== key) {
        if ('object' === typeof response[key]) {
          // if .value exists, format it
          if (response[key].value) {
            response[key].value = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_0__.formatNumber)(response[key].value);
          }
        }
      }
    }
  }

  // explain how it is calculated
  response.conversionPercentage.tooltip = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Calculated by:', 'burst-statistics') + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total amount of goals reached ', 'burst-statistics') + ' / ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total amount of', 'burst-statistics') + ' ' + response.conversionMetric.title + ' (' + response.total.value + ' / ' + response.conversionMetric.value + ')';
  return response;
};
const placeholderData = {
  today: {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'burst-statistics'),
    icon: 'goals'
  },
  total: {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total', 'burst-statistics'),
    value: '-',
    icon: 'goals'
  },
  topPerformer: {
    title: '-',
    value: '-'
  },
  conversionMetric: {
    title: '-',
    value: '-',
    icon: 'visitors'
  },
  conversionPercentage: {
    title: '-',
    value: '-'
  },
  bestDevice: {
    title: '-',
    value: '-',
    icon: 'desktop'
  },
  dateCreated: 0,
  dateStart: 0,
  dateEnd: 0,
  status: 'inactive'
};


/**
 * Get live goals
 * @param {Object} args
 * @param {string} args.startDate
 * @param {string} args.endDate
 * @param {string} args.range
 * @param {Object} args.filters
 * @returns {Promise<*>}
 */
const getGoalsData = async args => {
  const {
    startDate,
    endDate,
    range,
    filters,
    goal_id
  } = args;
  if (!goal_id) {
    return placeholderData;
  }
  const {
    data
  } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.getData)('goals', startDate, endDate, range, {
    goal_id: goal_id
  });
  return transformTotalGoalsData(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getGoalsData);

/***/ }),

/***/ "./src/api/getLiveGoals.js":
/*!*********************************!*\
  !*** ./src/api/getLiveGoals.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/formatting */ "./src/utils/formatting.js");



/**
 * Get live goals
 * @param {Object} args
 * @param {string} args.startDate
 * @param {string} args.endDate
 * @param {string} args.range
 * @param {Object} args.filters
 * @returns {Promise<*>}
 */
const getLiveGoals = async args => {
  const {
    startDate,
    endDate,
    range,
    filters,
    goal_id
  } = args;
  if (!goal_id) {
    return '-';
  }
  const {
    data
  } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.getData)('live-goals', startDate, endDate, range, {
    goal_id: goal_id
  });
  return (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLiveGoals);

/***/ }),

/***/ "./src/api/getLiveVisitors.js":
/*!************************************!*\
  !*** ./src/api/getLiveVisitors.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/formatting */ "./src/utils/formatting.js");



/**
 * Get live visitors
 * @param {Object} args
 * @param {string} args.startDate
 * @param {string} args.endDate
 * @param {string} args.range
 * @param {Object} args.filters
 * @returns {Promise<*>}
 */
const getLiveVisitors = async args => {
  const {
    startDate,
    endDate,
    range,
    filters
  } = args;
  const {
    data
  } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.getData)('live-visitors', startDate, endDate, range, {
    filters
  });
  return (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLiveVisitors);

/***/ }),

/***/ "./src/api/getTodayData.js":
/*!*********************************!*\
  !*** ./src/api/getTodayData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   transformTodayData: () => (/* binding */ transformTodayData)
/* harmony export */ });
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/formatting */ "./src/utils/formatting.js");


const transformTodayData = response => {
  for (let key in response) {
    if (response.hasOwnProperty(key)) {
      if ('timeOnPage' === key) {
        response[key].value = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_1__.formatTime)(response[key].value);
      } else {
        response[key].value = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(response[key].value);
      }
    }
  }
  return response;
};

/**
 * Get live visitors
 * @param {Object} args
 * @param {string} args.startDate
 * @param {string} args.endDate
 * @param {string} args.range
 * @param {Object} args.filters
 * @returns {Promise<*>}
 */
const getTodayData = async args => {
  const {
    startDate,
    endDate,
    range,
    filters
  } = args;
  const {
    data
  } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.getData)('today', startDate, endDate, range, {
    filters
  });
  return transformTodayData(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTodayData);

/***/ }),

/***/ "./src/components/blocks/ClickToFilter.js":
/*!************************************************!*\
  !*** ./src/components/blocks/ClickToFilter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_useFiltersStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/useFiltersStore */ "./src/store/useFiltersStore.js");
/* harmony import */ var _store_useGoalsStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/useGoalsStore */ "./src/store/useGoalsStore.js");
/* harmony import */ var _store_useInsightsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/useInsightsStore */ "./src/store/useInsightsStore.js");
/* harmony import */ var _store_useDateStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/useDateStore */ "./src/store/useDateStore.js");
/* harmony import */ var _common_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Tooltip */ "./src/components/common/Tooltip.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/formatting */ "./src/utils/formatting.js");











/**
 *
 * @param filter
 * @param filterValue
 * @param label
 * @param children
 * @param startDate
 * @param endDate
 * @return {Element}
 * @constructor
 */
const ClickToFilter = ({
  filter,
  filterValue,
  label,
  children,
  startDate,
  endDate
}) => {
  const setFilters = (0,_store_useFiltersStore__WEBPACK_IMPORTED_MODULE_1__.useFiltersStore)(state => state.setFilters);
  const setAnimate = (0,_store_useFiltersStore__WEBPACK_IMPORTED_MODULE_1__.useFiltersStore)(state => state.setAnimate);
  const goalFields = (0,_store_useGoalsStore__WEBPACK_IMPORTED_MODULE_2__.useGoalsStore)(state => state.goalFields);
  const setInsightsMetrics = (0,_store_useInsightsStore__WEBPACK_IMPORTED_MODULE_3__.useInsightsStore)(state => state.setMetrics);
  const insightsMetrics = (0,_store_useInsightsStore__WEBPACK_IMPORTED_MODULE_3__.useInsightsStore)(state => state.getMetrics());
  const setStartDate = (0,_store_useDateStore__WEBPACK_IMPORTED_MODULE_4__.useDate)(state => state.setStartDate);
  const setEndDate = (0,_store_useDateStore__WEBPACK_IMPORTED_MODULE_4__.useDate)(state => state.setEndDate);
  const setRange = (0,_store_useDateStore__WEBPACK_IMPORTED_MODULE_4__.useDate)(state => state.setRange);
  const tooltip = label ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Click to filter by:', 'burst-statistics') + ' ' + label : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Click to filter', 'burst-statistics');
  const waitForElement = (selector, timeout = 3000) => {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        const element = document.querySelector(selector);
        const timeElapsed = Date.now() - startTime;
        if (element) {
          clearInterval(intervalId);
          resolve(element);
        } else if (timeElapsed > timeout) {
          clearInterval(intervalId);
          reject(new Error(`Element not found: ${selector}`));
        }
      }, 100);
    });
  };
  const animateElement = async event => {
    try {
      const element = await waitForElement('.burst-data-filter--animate');
      const styles = window.getComputedStyle(element);
      const parentOffsetX = element.offsetParent ? element.offsetParent.offsetLeft : 0;
      const parentOffsetY = element.offsetParent ? element.offsetParent.offsetTop : 0;
      const marginLeft = parseInt(styles.marginLeft);
      const marginTop = parseInt(styles.marginTop);
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;
      const x = event.clientX - elementWidth + window.scrollX - parentOffsetX - marginLeft;
      const y = event.clientY - elementHeight * 4 + window.scrollY - parentOffsetY - marginTop;
      element.style.transformOrigin = '50% 50%';
      element.style.opacity = 0;
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      await new Promise(resolve => setTimeout(resolve, 50));
      element.style.transition = 'transform 0.2s ease, opacity 0.2s ease-out';
      element.style.transform = `translateX(${x}px) translateY(${y}px) scale(1)`;
      element.style.opacity = 1;
      element.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s ease-out';
      element.style.transform = 'translateX(0) translateY(0)';
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleClick = async event => {
    window.location.href = '#statistics';
    if ('goal_id' === filter) {
      // @todo get goal setup
      if (goalFields[filterValue] && goalFields[filterValue].goal_specific_page && goalFields[filterValue].goal_specific_page.value) {
        setFilters('page_url', goalFields[filterValue].goal_specific_page.value);
        setFilters(filter, filterValue);
        react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Filtering by goal & goal specific page', 'burst-statistics'));
      } else {
        setFilters(filter, filterValue);
        react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Filtering by goal', 'burst-statistics'));
      }
      if (!insightsMetrics.includes('conversions')) {
        // Add 'conversions' to the array and update the state
        setInsightsMetrics([...insightsMetrics, 'conversions']);
      }

      // add 'conversions' to insightMetrics
    } else {
      setFilters(filter, '');
      await new Promise(resolve => setTimeout(resolve, 10));
      setFilters(filter, filterValue, true);
      await animateElement(event);
      setAnimate(false);
    }
    handleDateRange();
  };
  const handleDateRange = () => {
    let formattedStartDate = '';
    let formattedEndDate = '';

    // Check if startDate is in Unix, Unix in milliseconds, or yyyy-MM-dd format
    if (/^\d+$/.test(startDate)) {
      // Unix or Unix in milliseconds
      const unixTime = 10 === startDate.toString().length ? startDate * 1000 : startDate;
      formattedStartDate = new Date(unixTime).toISOString().split('T')[0];
    } else if (/\d{4}-\d{2}-\d{2}/.test(startDate)) {
      // Already in yyyy-MM-dd format
      formattedStartDate = startDate;
    }

    // If endDate is not set, set to today
    if (!endDate) {
      formattedEndDate = new Date().toISOString().split('T')[0];
    } else if (/^\d+$/.test(endDate)) {
      // Unix or Unix in milliseconds
      const unixTime = 10 === endDate.toString().length ? endDate * 1000 : endDate;
      formattedEndDate = new Date(unixTime).toISOString().split('T')[0];
    } else if (/\d{4}-\d{2}-\d{2}/.test(endDate)) {
      // Already in yyyy-MM-dd format
      formattedEndDate = endDate;
    }
    if ((0,_utils_formatting__WEBPACK_IMPORTED_MODULE_8__.isValidDate)(formattedStartDate) && (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_8__.isValidDate)(formattedEndDate)) {
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setRange('custom');
    }
  };
  if (!filter || !filterValue) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
    content: tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: handleClick,
    className: "burst-click-to-filter"
  }, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClickToFilter);

/***/ }),

/***/ "./src/components/blocks/GoalStatus.js":
/*!*********************************************!*\
  !*** ./src/components/blocks/GoalStatus.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




const getStatusColor = status => {
  switch (status) {
    case 'active':
      return 'green';
    case 'inactive':
      return 'grey';
    default:
      return 'gray';
  }
};
const getStatusLabel = status => {
  switch (status) {
    case 'active':
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active', 'burst-statistics');
    case 'inactive':
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inactive', 'burst-statistics');
    default:
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unknown', 'burst-statistics');
  }
};
const GoalStatus = ({
  data
}) => {
  const {
    dateStart,
    dateEnd,
    dateCreated,
    status
  } = data;
  const iconColor = getStatusColor(status);
  const startedOrCreatedDate = dateStart || dateCreated;
  const dateTitle = dateStart ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Started', 'burst-statistics') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Created', 'burst-statistics');
  const relativeTime = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_1__.getRelativeTime)(startedOrCreatedDate);
  const statusLabel = getStatusLabel(status);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goal-status"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "dot",
    color: iconColor,
    size: 12
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, statusLabel));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalStatus);

/***/ }),

/***/ "./src/components/blocks/GoalsBlock.js":
/*!*********************************************!*\
  !*** ./src/components/blocks/GoalsBlock.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Tooltip */ "./src/components/common/Tooltip.js");
/* harmony import */ var _ClickToFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ClickToFilter */ "./src/components/blocks/ClickToFilter.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfDay/index.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var _GoalStatus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GoalStatus */ "./src/components/blocks/GoalStatus.js");
/* harmony import */ var _store_useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/useDashboardGoalsStore */ "./src/store/useDashboardGoalsStore.js");
/* harmony import */ var _store_useGoalsStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/useGoalsStore */ "./src/store/useGoalsStore.js");
/* harmony import */ var _common_GridItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/GridItem */ "./src/components/common/GridItem.js");
/* harmony import */ var _GoalsHeader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GoalsHeader */ "./src/components/blocks/GoalsHeader.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/api */ "./src/utils/api.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQueries.mjs");
/* harmony import */ var _api_getLiveGoals__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../api/getLiveGoals */ "./src/api/getLiveGoals.js");
/* harmony import */ var _api_getGoalsData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../api/getGoalsData */ "./src/api/getGoalsData.js");

















function selectGoalIcon(value) {
  value = parseInt(value);
  if (10 < value) {
    return 'goals';
  } else if (0 < value) {
    return 'goals';
  } else {
    return 'goals-empty';
  }
}
const GoalsBlock = () => {
  const [interval, setInterval] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5000);
  const goalId = (0,_store_useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_7__.useDashboardGoalsStore)(state => state.goalId);
  const setGoalId = (0,_store_useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_7__.useDashboardGoalsStore)(state => state.setGoalId);
  const goals = (0,_store_useGoalsStore__WEBPACK_IMPORTED_MODULE_8__.useGoalsStore)(state => state.goals);
  const currentDateWithOffset = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.getDateWithOffset)();
  const startDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_14__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_15__["default"])(currentDateWithOffset), 'yyyy-MM-dd');
  const endDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_14__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_16__["default"])(currentDateWithOffset), 'yyyy-MM-dd');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!goalId) {
      //get first entry of the goals array
      let firstGoal = goals.hasOwnProperty(0) ? goals[0] : false;
      if (firstGoal) {
        setGoalId(goals[0].id);
      }
    }
  }, [goals]);
  let goalStart = goals[goalId] && goals[goalId].date_start;
  let goalEnd = goals[goalId] && goals[goalId].date_end;
  if (0 == goalStart || goalStart === undefined) {
    goalStart = startDate;
  }
  if (0 == goalEnd || goalEnd === undefined) {
    goalEnd = endDate;
  }
  const args = {
    goal_id: goalId,
    startDate: startDate,
    endDate: endDate
  };
  const placeholderData = {
    today: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'burst-statistics'),
      icon: 'goals'
    },
    total: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total', 'burst-statistics'),
      value: '-',
      icon: 'goals'
    },
    topPerformer: {
      title: '-',
      value: '-'
    },
    conversionMetric: {
      title: '-',
      value: '-',
      icon: 'visitors'
    },
    conversionPercentage: {
      title: '-',
      value: '-'
    },
    bestDevice: {
      title: '-',
      value: '-',
      icon: 'desktop'
    },
    dateCreated: 0,
    dateStart: 0,
    dateEnd: 0,
    status: 'inactive'
  };
  const queries = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__.useQueries)({
    queries: [{
      queryKey: ['live-goals', goalId],
      queryFn: () => (0,_api_getLiveGoals__WEBPACK_IMPORTED_MODULE_12__["default"])(args),
      refetchInterval: interval,
      // @todo: make this configurable
      placeholderData: '-',
      onError: error => {
        setInterval(0);
      }
    }, {
      queryKey: ['goals', goalId],
      queryFn: () => (0,_api_getGoalsData__WEBPACK_IMPORTED_MODULE_13__["default"])(args),
      refetchInterval: interval * 2,
      placeholderData: placeholderData,
      onError: error => {
        setInterval(0);
      }
    }]
  });
  const onGoalsInfoClick = () => {
    return () => {
      burst_settings.goals_information_shown = '1';
      (0,_utils_api__WEBPACK_IMPORTED_MODULE_11__.setOption)('goals_information_shown', true);

      // change the #settings/goals to #settings/goals/add
      window.location.hash = '#settings/goals';
    };
  };
  const live = queries[0].data;
  let data = queries[1].data;
  if (queries.some(query => query.isError)) {
    data = placeholderData;
  }
  const todayIcon = selectGoalIcon(live);
  const totalIcon = selectGoalIcon(data.today.value);
  let today = (0,date_fns__WEBPACK_IMPORTED_MODULE_14__["default"])(currentDateWithOffset, 'yyyy-MM-dd');
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: 'border-to-border burst-goals',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Goals', 'burst-statistics'),
    controls: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GoalsHeader__WEBPACK_IMPORTED_MODULE_10__["default"], {
      goalId: goalId,
      goals: goals
    }),
    footer: 0 !== goals.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: 'burst-button burst-button--secondary',
      href: '#settings/goals'
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View setup', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'burst-flex-push-right'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GoalStatus__WEBPACK_IMPORTED_MODULE_6__["default"], {
      data: data
    })))
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-goals burst-loading-container'
  }, '1' !== burst_settings.goals_information_shown && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "information-overlay"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "information-overlay-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Goals', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep track of customizable goals and get valuable insights. Add your first goal!', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: 'https://burst-statistics.com/how-to-set-goals/'
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Learn how to set your first goal', 'burst-statistics'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    onClick: onGoalsInfoClick(),
    className: "burst-button burst-button--primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create my first goal', 'burst-statistics')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ClickToFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filter: "goal_id",
    filterValue: data.goalId,
    label: data.today.tooltip + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Goal and today', 'burst-statistics'),
    startDate: today
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-select-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: todayIcon,
    size: "23"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, live), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: "sun",
    color: 'yellow',
    size: "13"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'burst-statistics')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ClickToFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    filter: "goal_id",
    filterValue: data.goalId,
    label: data.today.tooltip + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Goal and the start date', 'burst-statistics'),
    startDate: goalStart,
    endDate: goalEnd
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-select-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: totalIcon,
    size: "23"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, data.total.value), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: "total",
    size: "13",
    color: 'green'
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total', 'burst-statistics'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.topPerformer.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-list-item burst-tooltip-topPerformer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: "winner"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-text"
  }, decodeURI(data.topPerformer.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-number"
  }, data.topPerformer.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    arrow: true,
    title: data.conversionMetric.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-list-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: data.conversionMetric.icon
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-text"
  }, data.conversionMetric.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-number"
  }, data.conversionMetric.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.conversionPercentage.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-list-item burst-tooltip-conversionPercentage"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: "graph"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-text"
  }, data.conversionPercentage.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-number"
  }, data.conversionPercentage.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.bestDevice.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-goals-list-item burst-tooltip-bestDevice"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: data.bestDevice.icon
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-text"
  }, data.bestDevice.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-goals-list-item-number"
  }, data.bestDevice.value))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalsBlock);

/***/ }),

/***/ "./src/components/blocks/GoalsHeader.js":
/*!**********************************************!*\
  !*** ./src/components/blocks/GoalsHeader.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/useDashboardGoalsStore */ "./src/store/useDashboardGoalsStore.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





const GoalsHeader = ({
  goals
}) => {
  const setGoalId = (0,_store_useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_1__.useDashboardGoalsStore)(state => state.setGoalId);

  // if goalValues is an empty array, return null
  if (0 === goals.length) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: 'loading'
    });
  }
  const handleChange = event => {
    setGoalId(event.target.value);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-goals-controls-flex'
  }, 1 === goals.length && goals[0] && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, goals[0].title), 1 < goals.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    onChange: e => handleChange(e)
  }, Object.entries(goals).map(([key, goal]) => goal && 'string' === typeof goal.title ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: key,
    value: goal.id
  }, goal.title) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: key,
    value: key
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unknown title', 'burst-statistics')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalsHeader);

/***/ }),

/***/ "./src/components/blocks/OtherPluginsBlock.js":
/*!****************************************************!*\
  !*** ./src/components/blocks/OtherPluginsBlock.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/api */ "./src/utils/api.js");
/* harmony import */ var _store_useOtherPluginsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/useOtherPluginsStore */ "./src/store/useOtherPluginsStore.js");
/* harmony import */ var _common_GridItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/GridItem */ "./src/components/common/GridItem.js");






const OtherPluginsBlock = () => {
  const [dataUpdated, setDataUpdated] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const dataLoaded = (0,_store_useOtherPluginsStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.dataLoaded);
  const setDataLoaded = (0,_store_useOtherPluginsStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.setDataLoaded);
  const pluginData = (0,_store_useOtherPluginsStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.pluginData);
  const setPluginData = (0,_store_useOtherPluginsStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.setPluginData);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!dataLoaded) {
      _utils_api__WEBPACK_IMPORTED_MODULE_2__.doAction('otherpluginsdata').then(response => {
        response.forEach(function (pluginItem, i) {
          response[i].pluginActionNice = pluginActionNice(pluginItem.pluginAction);
        });
        setPluginData(response);
        setDataLoaded(true);
      });
    }
  }, []);
  const PluginActions = (slug, pluginAction, e) => {
    if (e) {
      e.preventDefault();
    }
    let data = {};
    data.slug = slug;
    data.pluginAction = pluginAction;
    let pluginItem = getPluginData(slug);
    if ('download' === pluginAction) {
      pluginItem.pluginAction = 'downloading';
    } else if ('activate' === pluginAction) {
      pluginItem.pluginAction = 'activating';
    }
    pluginItem.pluginActionNice = pluginActionNice(pluginItem.pluginAction);
    updatePluginData(slug, pluginItem);
    if ('installed' === pluginAction || 'upgrade-to-pro' === pluginAction) {
      return;
    }
    _utils_api__WEBPACK_IMPORTED_MODULE_2__.doAction('plugin_actions', data).then(response => {
      pluginItem = response;
      updatePluginData(slug, pluginItem);
      PluginActions(slug, pluginItem.pluginAction);
    });
  };
  const getPluginData = slug => {
    return pluginData.filter(pluginItem => {
      return pluginItem.slug === slug;
    })[0];
  };
  const updatePluginData = (slug, newPluginItem) => {
    pluginData.forEach(function (pluginItem, i) {
      if (pluginItem.slug === slug) {
        pluginData[i] = newPluginItem;
      }
    });
    setPluginData(pluginData);
    setDataUpdated(slug + newPluginItem.pluginAction);
  };
  const pluginActionNice = pluginAction => {
    const statuses = {
      'download': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install', 'burst-statistics'),
      'activate': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activate', 'burst-statistics'),
      'activating': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activating...', 'burst-statistics'),
      'downloading': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Downloading...', 'burst-statistics'),
      'upgrade-to-pro': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Downloading...', 'burst-statistics')
    };
    return statuses[pluginAction];
  };
  const otherPluginElement = (plugin, i) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: i,
      className: 'burst-other-plugins-element burst-' + plugin.slug
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: plugin.wordpress_url,
      target: "_blank",
      title: plugin.title,
      rel: "noreferrer"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-bullet"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-other-plugins-content"
    }, plugin.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-other-plugin-status"
    }, 'upgrade-to-pro' === plugin.pluginAction && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      target: "_blank",
      href: plugin.upgrade_url,
      rel: "noreferrer"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade', 'burst-statistics'))), 'upgrade-to-pro' !== plugin.pluginAction && 'installed' !== plugin.pluginAction && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "settings/src/components/pages/Dashboard/OtherPlugins#",
      onClick: e => PluginActions(plugin.slug, plugin.pluginAction, e)
    }, plugin.pluginActionNice)), 'installed' === plugin.pluginAction && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Installed', 'burst-statistics'))));
  };
  if (!dataLoaded) {
    const n = 3;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: 'burst-column-2 no-border no-background',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Other plugins', 'burst-statistics')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-other-plugins-container"
    }, [...Array(n)].map((e, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: i,
      className: 'burst-other-plugins-element'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-bullet"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-other-plugins-content"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading..', 'burst-statistics'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-other-plugin-status"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activate', 'burst-statistics'))))));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: 'burst-column-2 no-border no-background',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Other plugins', 'burst-statistics')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-other-plugins-container"
  }, pluginData.map((plugin, i) => otherPluginElement(plugin, i))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OtherPluginsBlock);

/***/ }),

/***/ "./src/components/blocks/ProgressBlock.js":
/*!************************************************!*\
  !*** ./src/components/blocks/ProgressBlock.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TaskElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskElement */ "./src/components/blocks/TaskElement.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/useNoticesStore */ "./src/store/useNoticesStore.js");
/* harmony import */ var _common_GridItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/GridItem */ "./src/components/common/GridItem.js");
/* harmony import */ var _ProgressHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProgressHeader */ "./src/components/blocks/ProgressHeader.js");
/* harmony import */ var _ProgressFooter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProgressFooter */ "./src/components/blocks/ProgressFooter.js");








const LoadingComponent = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "burst-task-element"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: 'burst-task-status burst-loading'
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading...', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
  className: "burst-task-message"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading notices...', 'burst-statistics')));
const NoTasksComponent = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "burst-task-element"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  className: 'burst-task-status burst-completed'
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Completed', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
  className: "burst-task-message"
}, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No remaining tasks to show', 'burst-statistics')));
const ProgressBlock = ({
  highLightField
}) => {
  const loading = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.loading);
  const filter = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.filter);
  const notices = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.notices);
  const getNotices = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.getNotices);
  const filteredNotices = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.filteredNotices);
  const dismissNotice = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_3__["default"])(state => state.dismissNotice);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getNotices();
  }, [getNotices]);
  const displayNotices = 'remaining' === filter ? filteredNotices : notices;
  const renderTasks = () => {
    if (loading) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LoadingComponent, null);
    }
    if (0 === displayNotices.length) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(NoTasksComponent, null);
    }
    return displayNotices.map(notice => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TaskElement__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: notice.id,
      notice: notice,
      onCloseTaskHandler: () => dismissNotice(notice.id),
      highLightField: highLightField
    }));
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: 'burst-column-2 burst-progress',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Progress', 'burst-statistics'),
    controls: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProgressHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
      countAll: notices.length,
      countRemaining: filteredNotices.length
    }),
    footer: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProgressFooter__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-progress-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-scroll-container"
  }, renderTasks())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressBlock);

/***/ }),

/***/ "./src/components/blocks/ProgressFooter.js":
/*!*************************************************!*\
  !*** ./src/components/blocks/ProgressFooter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/api */ "./src/utils/api.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _common_Tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Tooltip */ "./src/components/common/Tooltip.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/formatting */ "./src/utils/formatting.js");







const ProgressFooter = props => {
  let [trackingType, setTrackingType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('loading'); // loading, error,
  // rest, endpoint,
  // disabled
  let [lastChecked, setLastChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    _utils_api__WEBPACK_IMPORTED_MODULE_1__.doAction('tracking').then(response => {
      if ('beacon' === response.status || 'rest' === response.status || 'disabled' === response.status) {
        let status = response.status ? response.status : 'error';
        let last_test = response.last_test ? response.last_test : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Just now', 'burst-statistics');
        setTrackingType(status);
        setLastChecked(last_test);
      } else {
        setTrackingType('error');
        setLastChecked(false);
      }
    });
  }, []);
  let trackingLastCheckedText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last checked:', 'burst-statistics') + ' ' + (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.getRelativeTime)(new Date(lastChecked * 1000)); // times 1000 because JS
  // uses milliseconds
  let trackingTexts = {
    'loading': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading tracking status...', 'burst-statistics'),
    'error': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error checking tracking status', 'burst-statistics'),
    'rest': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking with REST API', 'burst-statistics'),
    'beacon': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking with an endpoint', 'burst-statistics'),
    'disabled': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking is disabled', 'burst-statistics')
  };
  let trackingTooltipTexts = {
    'loading': '',
    'error': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking does not seem to work. Check manually or contact support.', 'burst-statistics'),
    'rest': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking is working. You are using the REST API to collect statistics.', 'burst-statistics'),
    'beacon': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking is working. You are using the Burst endpoint to collect statistics. This type of tracking is accurate and lightweight.', 'burst-statistics'),
    'disabled': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tracking is disabled', 'burst-statistics')
  };
  let trackingIcons = {
    'loading': {
      'icon': 'loading',
      'color': 'black'
    },
    'error': {
      'icon': 'circle-times',
      'color': 'red'
    },
    'rest': {
      'icon': 'circle-check',
      'color': 'green'
    },
    'beacon': {
      'icon': 'circle-check',
      'color': 'green'
    },
    'disabled': {
      'icon': 'circle-times',
      'color': 'red'
    }
  };
  let trackingTooltipText = trackingTooltipTexts[trackingType] + ' ' + trackingLastCheckedText;
  let trackingText = trackingTexts[trackingType];
  let trackingIcon = trackingIcons[trackingType].icon;
  let trackingIconColor = trackingIcons[trackingType].color;
  let redirectToStatistics = e => {
    props.selectMainMenu('statistics');
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: 'burst-button burst-button--secondary',
    href: '#statistics'
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View my statistics', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_4__["default"], {
    content: trackingTooltipText
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-legend burst-flex-push-right burst-tooltip-trackingtext"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    name: trackingIcon,
    color: trackingIconColor
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, trackingText))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressFooter);

/***/ }),

/***/ "./src/components/blocks/ProgressHeader.js":
/*!*************************************************!*\
  !*** ./src/components/blocks/ProgressHeader.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_useNoticesStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/useNoticesStore */ "./src/store/useNoticesStore.js");




const ProgressHeader = ({
  countAll,
  countRemaining
}) => {
  const {
    setFilter,
    filter,
    notices,
    filteredNotices
  } = (0,_store_useNoticesStore__WEBPACK_IMPORTED_MODULE_2__["default"])(state => ({
    setFilter: state.setFilter,
    filter: state.filter
  }));
  const onFilterChange = e => {
    let selectedFilter = e.target.getAttribute('data-filter');
    if ('all' === selectedFilter || 'remaining' === selectedFilter) {
      setFilter(selectedFilter);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `burst-task-switcher-container burst-active-filter-${filter}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-task-switcher burst-all-tasks",
    onClick: onFilterChange,
    "data-filter": "all"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All tasks', 'burst-statistics'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst_task_count"
  }, "(", countAll, ")")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-task-switcher burst-remaining-tasks",
    onClick: onFilterChange,
    "data-filter": "remaining"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remaining tasks', 'burst-statistics'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst_task_count"
  }, "(", countRemaining, ")")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressHeader);

/***/ }),

/***/ "./src/components/blocks/TaskElement.js":
/*!**********************************************!*\
  !*** ./src/components/blocks/TaskElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");



const TaskElement = props => {
  const handleClick = () => {
    props.highLightField(props.notice.output.highlight_field_id);
  };
  let notice = props.notice;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-task-element"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: 'burst-task-status burst-' + notice.output.icon
  }, notice.output.label), 'skeleton' !== notice.output.icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-task-message",
    dangerouslySetInnerHTML: {
      __html: notice.output.msg
    }
  }), 'skeleton' === notice.output.icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-task-message"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "loading"
  })), notice.output.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    href: notice.output.url,
    rel: "noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('More info', 'burst-statistics')), notice.output.highlight_field_id && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-task-enable",
    onClick: handleClick
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fix', 'burst-statistics')), notice.output.plusone && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-plusone"
  }, "1"), notice.output.dismissible && 'completed' !== notice.output.status && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-task-dismiss"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    "data-id": notice.id,
    onClick: props.onCloseTaskHandler
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-close-warning-x"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "20",
    height: "20",
    viewBox: "0, 0, 400,400"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "path0",
    d: "M55.692 37.024 C 43.555 40.991,36.316 50.669,36.344 62.891 C 36.369 73.778,33.418 70.354,101.822 138.867 L 162.858 200.000 101.822 261.133 C 33.434 329.630,36.445 326.135,36.370 337.109 C 36.270 351.953,47.790 363.672,62.483 363.672 C 73.957 363.672,68.975 367.937,138.084 298.940 L 199.995 237.127 261.912 298.936 C 331.022 367.926,326.053 363.672,337.517 363.672 C 351.804 363.672,363.610 352.027,363.655 337.891 C 363.689 326.943,367.629 331.524,299.116 262.841 C 265.227 228.868,237.500 200.586,237.500 199.991 C 237.500 199.395,265.228 171.117,299.117 137.150 C 367.625 68.484,363.672 73.081,363.672 62.092 C 363.672 48.021,351.832 36.371,337.500 36.341 C 326.067 36.316,331.025 32.070,261.909 101.066 L 199.990 162.877 138.472 101.388 C 87.108 50.048,76.310 39.616,73.059 38.191 C 68.251 36.083,60.222 35.543,55.692 37.024 ",
    stroke: "none",
    fill: "#000000"
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskElement);

/***/ }),

/***/ "./src/components/blocks/TipsTricksBlock.js":
/*!**************************************************!*\
  !*** ./src/components/blocks/TipsTricksBlock.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_GridItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/GridItem */ "./src/components/common/GridItem.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



const TipsTricksBlock = props => {
  const items = [{
    content: 'Hidden Features of the Insights Graph',
    link: 'https://burst-statistics.com/hidden-features-of-the-insights-graph/'
  }, {
    content: 'What is Cookieless tracking?',
    link: 'https://burst-statistics.com/definition/what-is-cookieless-tracking/'
  }, {
    content: 'Why is Burst Privacy-Friendly?',
    link: 'https://burst-statistics.com/why-is-burst-privacy-friendly/'
  }, {
    content: 'How can I compare metrics?',
    link: 'https://burst-statistics.com/how-can-i-compare-metrics/'
  }, {
    content: 'What is Bounce Rate?',
    link: 'https://burst-statistics.com/definition/what-is-bounce-rate/'
  }, {
    content: 'How to set goals?',
    link: 'https://burst-statistics.com/how-to-set-goals/'
  }];
  const src = '?src=plugin-burst-tips-tricks';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: 'burst-column-2',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tips & Tricks', 'burst-statistics'),
    footer: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "https://burst-statistics.com/docs/",
      target: "_blank",
      className: "burst-button burst-button--secondary",
      rel: "noreferrer"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View all', 'burst-statistics'))
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-tips-tricks-container"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "burst-tips-tricks-element"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link + src,
    target: "_blank",
    rel: "noopener noreferrer",
    title: item.content
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-bullet medium"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-tips-tricks-content"
  }, item.content))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TipsTricksBlock);

/***/ }),

/***/ "./src/components/blocks/TodayBlock.js":
/*!*********************************************!*\
  !*** ./src/components/blocks/TodayBlock.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/Tooltip */ "./src/components/common/Tooltip.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQueries.mjs");
/* harmony import */ var _api_getLiveVisitors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/getLiveVisitors */ "./src/api/getLiveVisitors.js");
/* harmony import */ var _api_getTodayData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api/getTodayData */ "./src/api/getTodayData.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfDay/index.js");
/* harmony import */ var _common_GridItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/GridItem */ "./src/components/common/GridItem.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/formatting */ "./src/utils/formatting.js");











function selectVisitorIcon(value) {
  value = parseInt(value);
  if (100 < value) {
    return 'visitors-crowd';
  } else if (10 < value) {
    return 'visitors';
  } else {
    return 'visitor';
  }
}
const TodayBlock = () => {
  const [interval, setInterval] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5000);
  const currentDateWithOffset = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_7__.getDateWithOffset)();
  const startDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_9__["default"])(currentDateWithOffset), 'yyyy-MM-dd');
  const endDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_10__["default"])(currentDateWithOffset), 'yyyy-MM-dd');
  const placeholderData = {
    live: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live', 'burst-statistics'),
      icon: 'visitor'
    },
    today: {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total', 'burst-statistics'),
      value: '-',
      icon: 'visitor'
    },
    mostViewed: {
      title: '-',
      value: '-'
    },
    pageviews: {
      title: '-',
      value: '-'
    },
    referrer: {
      title: '-',
      value: '-'
    },
    timeOnPage: {
      title: '-',
      value: '-'
    }
  };
  const queries = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__.useQueries)({
    queries: [{
      queryKey: ['live-visitors'],
      queryFn: _api_getLiveVisitors__WEBPACK_IMPORTED_MODULE_3__["default"],
      refetchInterval: interval,
      placeholderData: '-',
      onError: error => {
        setInterval(0);
      }
    }, {
      queryKey: ['today'],
      queryFn: () => (0,_api_getTodayData__WEBPACK_IMPORTED_MODULE_4__["default"])({
        startDate,
        endDate
      }),
      refetchInterval: interval * 2,
      placeholderData: placeholderData,
      onError: error => {
        setInterval(0);
      }
    }]
  });

  // Your existing code
  const live = queries[0].data;
  let data = queries[1].data;
  if (queries.some(query => query.isError)) {
    data = placeholderData;
  }
  let liveIcon = selectVisitorIcon(live ? live : 0);
  let todayIcon = 'loading';
  if (data && data.today) {
    todayIcon = selectVisitorIcon(data.today.value ? data.today.value : 0);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_GridItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: 'border-to-border burst-today',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'burst-statistics'),
    controls: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, queries[0].isFetching ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      name: 'loading'
    }) : null)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.live.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-select-item burst-tooltip-live"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: liveIcon,
    size: "23"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, live), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "live",
    size: "12",
    color: 'red'
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live', 'burst-statistics')))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.today.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-select-item burst-tooltip-today"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: todayIcon,
    size: "23"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, data.today.value), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "total",
    size: "13",
    color: 'green'
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Total', 'burst-statistics'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.mostViewed.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-list-item burst-tooltip-mostviewed"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "winner"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-text"
  }, decodeURI(data.mostViewed.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-number"
  }, data.mostViewed.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.referrer.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-list-item burst-tooltip-referrer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "referrer"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-text"
  }, decodeURI(data.referrer.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-number"
  }, data.referrer.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.pageviews.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-list-item burst-tooltip-pageviews"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "pageviews"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-text"
  }, data.pageviews.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-number"
  }, data.pageviews.value))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
    content: data.timeOnPage.tooltip
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-today-list-item burst-tooltip-timeOnPage"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "time"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-text"
  }, data.timeOnPage.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-today-list-item-number"
  }, data.timeOnPage.value))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodayBlock);

/***/ }),

/***/ "./src/components/common/GridItem.js":
/*!*******************************************!*\
  !*** ./src/components/common/GridItem.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ErrorBoundary */ "./src/components/ErrorBoundary.js");



/**
 * GridItem
 * @param className
 * @param title
 * @param controls
 * @param children
 * @param footer
 * @return {JSX.Element}
 * @constructor
 */
const GridItem = ({
  className,
  title,
  controls,
  children,
  footer
}) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__["default"], {
    fallback: 'Could not load page'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-grid-item ' + className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "burst-grid-title burst-h4"
  }, title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-controls"
  }, controls)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-content"
  }, children), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-footer"
  }, footer)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridItem);

/***/ }),

/***/ "./src/components/common/Tooltip.js":
/*!******************************************!*\
  !*** ./src/components/common/Tooltip.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-tooltip */ "./node_modules/@radix-ui/react-tooltip/dist/index.mjs");



const Tooltip = ({
  children,
  content
}) => {
  if (!content) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Provider, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Root, {
    delayDuration: 400
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Trigger, {
    asChild: true
  }, children), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Portal, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Content, {
    className: "burst-tooltip-content",
    sideOffset: 5
  }, content, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Arrow, {
    className: "burst-tooltip-arrow"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tooltip);

/***/ }),

/***/ "./src/components/pages/DashboardPage.js":
/*!***********************************************!*\
  !*** ./src/components/pages/DashboardPage.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_ProgressBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks/ProgressBlock */ "./src/components/blocks/ProgressBlock.js");
/* harmony import */ var _blocks_TodayBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/TodayBlock */ "./src/components/blocks/TodayBlock.js");
/* harmony import */ var _blocks_GoalsBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blocks/GoalsBlock */ "./src/components/blocks/GoalsBlock.js");
/* harmony import */ var _blocks_TipsTricksBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blocks/TipsTricksBlock */ "./src/components/blocks/TipsTricksBlock.js");
/* harmony import */ var _blocks_OtherPluginsBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../blocks/OtherPluginsBlock */ "./src/components/blocks/OtherPluginsBlock.js");






const DashboardPage = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-content-area burst-grid burst-dashboard'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_ProgressBlock__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_TodayBlock__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_GoalsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_TipsTricksBlock__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_OtherPluginsBlock__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DashboardPage);

/***/ }),

/***/ "./src/store/useDashboardGoalsStore.js":
/*!*********************************************!*\
  !*** ./src/store/useDashboardGoalsStore.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDashboardGoalsStore: () => (/* binding */ useDashboardGoalsStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");


// define the store
const useDashboardGoalsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)(set => ({
  goalId: false,
  setGoalId: goalId => set({
    goalId: goalId
  })
}));

/***/ }),

/***/ "./src/store/useDateStore.js":
/*!***********************************!*\
  !*** ./src/store/useDateStore.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDate: () => (/* binding */ useDate)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/subDays/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfDay/index.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");





const updateRangeFromKey = key => {
  if (_utils_formatting__WEBPACK_IMPORTED_MODULE_0__.availableRanges[key]) {
    const {
      startDate,
      endDate
    } = _utils_formatting__WEBPACK_IMPORTED_MODULE_0__.availableRanges[key].range();
    return {
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(startDate, 'yyyy-MM-dd'),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(endDate, 'yyyy-MM-dd'),
      range: key
    };
  }
  return null;
};

// Define the store
const useDate = (0,zustand__WEBPACK_IMPORTED_MODULE_4__.create)(set => {
  // Attempt to get the range from local storage
  const savedRangeKey = (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.getLocalStorage)('selectedRangeKey');

  // Check if the saved range key is in availableRanges
  const rangeData = savedRangeKey ? updateRangeFromKey(savedRangeKey) : null;
  return {
    startDate: rangeData ? rangeData.startDate : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(new Date(), 7)), 'yyyy-MM-dd'),
    endDate: rangeData ? rangeData.endDate : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(new Date(), 1)), 'yyyy-MM-dd'),
    range: rangeData ? rangeData.range : 'last-7-days',
    setStartDate: startDate => set(state => ({
      startDate
    })),
    setEndDate: endDate => set(state => ({
      endDate
    })),
    setRange: range => {
      // Update local storage when range is set
      if ('custom' === range) {
        set({
          range
        });
        return;
      }
      (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.setLocalStorage)('selectedRangeKey', range);
      const updatedRange = updateRangeFromKey(range);
      if (updatedRange) {
        set(updatedRange);
      }
    }
  };
});

/***/ }),

/***/ "./src/store/useFiltersStore.js":
/*!**************************************!*\
  !*** ./src/store/useFiltersStore.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFiltersStore: () => (/* binding */ useFiltersStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useInsightsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useInsightsStore */ "./src/store/useInsightsStore.js");





// define the store
const useFiltersStore = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.create)((set, get) => ({
  filters: {
    page_id: '',
    page_url: '',
    goal_id: '',
    referrer: '',
    device: '',
    browser: '',
    platform: '',
    country_code: ''
  },
  filtersConf: {
    page_url: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page', 'burst-statistics'),
      icon: 'page'
    },
    goal_id: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Goal', 'burst-statistics'),
      icon: 'goals'
    },
    referrer: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Referrer URL', 'burst-statistics'),
      icon: 'referrer'
    },
    device: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Device', 'burst-statistics'),
      icon: 'desktop'
    },
    browser: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Browser', 'burst-statistics'),
      icon: 'browser'
    },
    platform: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Operating System', 'burst-statistics'),
      icon: 'operating-system'
    },
    country_code: {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Country', 'burst-statistics'),
      icon: 'world'
    }
  },
  animate: null,
  setAnimate: animate => set({
    animate
  }),
  setFilters: (filter, value, animate = false) => {
    // check if value is not empty or false
    // use zustand to produce a new state
    set(state => (0,immer__WEBPACK_IMPORTED_MODULE_3__.produce)(state, draft => {
      draft.filters[filter] = value;
    }));
    if (animate) {
      get().setAnimate(filter);
    }
  },
  deleteFilter: filter => {
    set(state => (0,immer__WEBPACK_IMPORTED_MODULE_3__.produce)(state, draft => {
      draft.filters[filter] = '';
    }));
  }
}));

/***/ }),

/***/ "./src/store/useGoalsStore.js":
/*!************************************!*\
  !*** ./src/store/useGoalsStore.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGoalsStore: () => (/* binding */ useGoalsStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);






const useGoalsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_3__.create)((set, get) => {
  const loadGoals = async () => {
    try {
      const {
        goals,
        predefinedGoals,
        goalFields
      } = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.getGoals();

      //convert goalFields object to array
      let goalFieldsArray = Object.values(goalFields);
      set({
        goals: goals,
        predefinedGoals: predefinedGoals,
        goalFields: goalFieldsArray
      });
    } catch (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load goals', 'burst-statistics'));
    }
  };
  const addPredefinedGoal = async (predefinedGoalId, type, cookieless) => {
    if ('hook' === type && cookieless) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cannot add server side goals in combination with cookieless tracking', 'burst-statistics'));
      return;
    }
    if (!burst_settings.is_pro) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Predefined goals are a premium feature.', 'burst-statistics'));
      return;
    }
    try {
      const response = await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise(_utils_api__WEBPACK_IMPORTED_MODULE_0__.addPredefinedGoal(predefinedGoalId), {
        pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Adding predefined goal...', 'burst-statistics'),
        success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Successfully added predefined goal!', 'burst-statistics'),
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to add predefined goal', 'burst-statistics')
      });
      const goal = response.goal;
      set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(state => {
        state.goals.push(goal);
      }));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Something went wrong', 'burst-statistics'));
    }
  };
  const getGoal = id => {
    let goals = get().goals;
    if (!Array.isArray(goals)) {
      return false;
    }
    let index = goals.findIndex(goal => goal.id === id);
    if (-1 !== index) {
      return goals[index];
    }
    return false;
  };
  const addGoal = async () => {
    try {
      const response = await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise(_utils_api__WEBPACK_IMPORTED_MODULE_0__.addGoal(), {
        pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Adding goal...', 'burst-statistics'),
        success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Goal added successfully!', 'burst-statistics'),
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to add goal', 'burst-statistics')
      });
      set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(state => {
        state.goals.push(response.goal);
      }));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Something went wrong', 'burst-statistics'));
    }
  };
  const deleteGoal = async id => {
    try {
      const response = await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise(_utils_api__WEBPACK_IMPORTED_MODULE_0__.deleteGoal(id), {
        pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deleting goal...', 'burst-statistics'),
        success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Goal deleted successfully!', 'burst-statistics'),
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to delete goal', 'burst-statistics')
      });
      if (response.deleted) {
        set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(draft => {
          // if there is only one goal left we a new one was created,
          if (1 === draft.goals.length) {
            draft.goals = [];
          } else {
            //find goal with goal.id = id, and delete from the array
            let index = draft.goals.findIndex(goal => goal.id === id);
            if (-1 !== index) {
              draft.goals.splice(index, 1);
            }
          }
        }));
      }
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Something went wrong', 'burst-statistics'));
    }
  };
  const setGoalValue = (id, type, value) => {
    //find goal by id in goals array
    let found = false;
    let index = false;
    set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(state => {
      state.goals.forEach(function (goalItem, i) {
        if (goalItem.id === id) {
          index = i;
          found = true;
        }
      });
      if (false !== index) {
        state.goals[index][type] = value;
      }
    }));
  };
  const saveGoals = async () => {
    try {
      let data = {
        goals: get().goals
      };
      const response = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.setGoals(data);
      return Promise.resolve(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  const updateGoal = (id, data) => set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(draft => {
    draft.goals[id] = {
      ...draft.goals[id],
      ...data
    };
  }));
  const saveGoalTitle = async (id, value) => {
    try {
      let goal = {
        'id': id,
        'title': value
      };
      let goals = [];
      goals.push(goal);
      let data = {
        goals: goals
      };
      await _utils_api__WEBPACK_IMPORTED_MODULE_0__.setGoals(data);
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  // Load goals on store creation
  loadGoals();
  return {
    goals: {},
    goalFields: {},
    addGoal,
    deleteGoal,
    updateGoal,
    addPredefinedGoal,
    setGoalValue,
    saveGoals,
    saveGoalTitle,
    getGoal
  };
});

/***/ }),

/***/ "./src/store/useInsightsStore.js":
/*!***************************************!*\
  !*** ./src/store/useInsightsStore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInsightsStore: () => (/* binding */ useInsightsStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");



// define the store
const useInsightsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_1__.create)((set, get) => ({
  metrics: ['visitors', 'pageviews'],
  loaded: false,
  getMetrics: () => {
    if (get().loaded) {
      return get().metrics;
    }
    let metrics = (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)('insights_metrics', ['visitors', 'pageviews']);

    //temporarily remove conversions from localstorage until the query has been fixed
    metrics = metrics.filter(metric => 'conversions' !== metric);
    set({
      metrics,
      loaded: true
    });
    return metrics;
  },
  setMetrics: metrics => {
    set({
      metrics
    });
    (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)('insights_metrics', metrics);
  }
}));

/***/ }),

/***/ "./src/store/useNoticesStore.js":
/*!**************************************!*\
  !*** ./src/store/useNoticesStore.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");



const useNotices = (0,zustand__WEBPACK_IMPORTED_MODULE_1__.create)((set, get) => ({
  filter: (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)('task_filter', 'all'),
  notices: [],
  filteredNotices: [],
  error: false,
  loading: true,
  setFilter: filter => {
    (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.setLocalStorage)('task_filter', filter);
    set(state => ({
      filter
    }));
  },
  filterNotices: () => {
    let filteredNotices = [];

    // loop trough notices and remove the ones that are not open
    get().notices.map((notice, i) => {
      if ('completed' !== notice.output.icon) {
        filteredNotices.push(notice);
      }
    });
    set(state => ({
      filteredNotices: filteredNotices
    }));
  },
  getNotices: async () => {
    try {
      const {
        notices
      } = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction('notices');
      set(state => ({
        notices: notices,
        loading: false
      }));
      get().filterNotices();
    } catch (error) {
      set(state => ({
        error: error.message
      }));
    }
  },
  dismissNotice: async noticeId => {
    let notices = get().notices;
    notices = notices.filter(function (notice) {
      return notice.id !== noticeId;
    });
    set(state => ({
      notices: notices
    }));
    await _utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction('dismiss_task', {
      id: noticeId
    }).then(response => {
      // error handling
      response.error && console.error(response.error);
    });
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useNotices);

/***/ }),

/***/ "./src/store/useOtherPluginsStore.js":
/*!*******************************************!*\
  !*** ./src/store/useOtherPluginsStore.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");

const useOtherPlugins = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)(set => ({
  dataLoaded: false,
  setDataLoaded: dataLoaded => {
    set(state => ({
      dataLoaded
    }));
  },
  pluginData: false,
  setPluginData: pluginData => {
    set(state => ({
      pluginData
    }));
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useOtherPlugins);

/***/ }),

/***/ "./src/utils/Icon.js":
/*!***************************!*\
  !*** ./src/utils/Icon.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_Tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/Tooltip */ "./src/components/common/Tooltip.js");



const iconColors = {
  'black': 'var(--rsp-black)',
  'green': 'var(--rsp-green)',
  'yellow': 'var(--rsp-yellow)',
  'red': 'var(--rsp-red)',
  'green-faded': 'var(--rsp-green-faded)',
  'yellow-faded': 'var(--rsp-yellow-faded)',
  'red-faded': 'var(--rsp-red-faded)',
  'grey': 'var(--rsp-grey-400)',
  'white': 'var(--rsp-white)'
};
const IconHtml = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  name = 'bullet',
  color = 'black',
  size = 15
}) => {
  // if color is not in array use color value
  const colorVal = iconColors[color] || color;
  let renderedIcon = '';
  if ('bullet' === name || 'dot' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"
      }))
    };
  }
  if ('circle' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
      }))
    };
  }
  if ('period' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 128 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M64 352c-35.35 0-64 28.65-64 64c0 35.35 28.65 64 64 64s64-28.65 64-64C128 380.7 99.35 352 64 352zM64 448c-17.64 0-32-14.36-32-32s14.36-32 32-32s32 14.36 32 32S81.64 448 64 448z"
      }))
    };
  }
  if ('check' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
      }))
    };
  }
  if ('warning' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
      }))
    };
  }
  if ('error' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
      }))
    };
  }
  if ('times' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 320 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
      }))
    };
  }
  if ('circle-check' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
      }))
    };
  }
  if ('circle-times' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
      }))
    };
  }
  if ('chevron-up' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z"
      }))
    };
  }
  if ('chevron-down' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
      }))
    };
  }
  if ('chevron-right' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 320 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
      }))
    };
  }
  if ('chevron-left' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 320 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"
      }))
    };
  }
  if ('plus' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
      }))
    };
  }
  if ('minus' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
      }))
    };
  }
  if ('sync' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h28.045c6.353 0 11.613-4.952 11.973-11.294C66.161 141.649 151.453 60 256 60c54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486zM491.699 256h-28.045c-6.353 0-11.613 4.952-11.973 11.294C445.839 370.351 360.547 452 256 452c-54.163 0-103.157-21.923-138.614-57.386l54.128-54.129c7.56-7.56 2.206-20.485-8.485-20.485H20c-6.627 0-12 5.373-12 12v143.029c0 10.691 12.926 16.045 20.485 8.485L80.65 431.35C125.525 476.233 187.516 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"
      }))
    };
  }
  if ('sync-error' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 79.1C178.5 79.1 112.7 130.1 89.2 199.7C84.96 212.2 71.34 218.1 58.79 214.7C46.23 210.5 39.48 196.9 43.72 184.3C73.6 95.8 157.3 32 256 32C337.5 32 408.8 75.53 448 140.6V104C448 90.75 458.7 80 472 80C485.3 80 496 90.75 496 104V200C496 213.3 485.3 224 472 224H376C362.7 224 352 213.3 352 200C352 186.7 362.7 176 376 176H412.8C383.7 118.1 324.4 80 256 80V79.1zM280 263.1C280 277.3 269.3 287.1 256 287.1C242.7 287.1 232 277.3 232 263.1V151.1C232 138.7 242.7 127.1 256 127.1C269.3 127.1 280 138.7 280 151.1V263.1zM224 352C224 334.3 238.3 319.1 256 319.1C273.7 319.1 288 334.3 288 352C288 369.7 273.7 384 256 384C238.3 384 224 369.7 224 352zM40 432C26.75 432 16 421.3 16 408V311.1C16 298.7 26.75 287.1 40 287.1H136C149.3 287.1 160 298.7 160 311.1C160 325.3 149.3 336 136 336H99.19C128.3 393 187.6 432 256 432C333.5 432 399.3 381.9 422.8 312.3C427 299.8 440.7 293 453.2 297.3C465.8 301.5 472.5 315.1 468.3 327.7C438.4 416.2 354.7 480 256 480C174.5 480 103.2 436.5 64 371.4V408C64 421.3 53.25 432 40 432V432z"
      }))
    };
  }
  if ('shortcode' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M128 32H32C14.4 32 0 46.4 0 64v384c0 17.6 14.4 32 32 32h96C145.7 480 160 465.7 160 448S145.7 416 128 416H64V96h64C145.7 96 160 81.67 160 64S145.7 32 128 32zM416 32h-96C302.3 32 288 46.33 288 63.1S302.3 96 319.1 96H384v320h-64C302.3 416 288 430.3 288 447.1S302.3 480 319.1 480H416c17.6 0 32-14.4 32-32V64C448 46.4 433.6 32 416 32z"
      }))
    };
  }
  if ('file' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 64C0 28.65 28.65 0 64 0H229.5C246.5 0 262.7 6.743 274.7 18.75L365.3 109.3C377.3 121.3 384 137.5 384 154.5V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM336 448V160H256C238.3 160 224 145.7 224 128V48H64C55.16 48 48 55.16 48 64V448C48 456.8 55.16 464 64 464H320C328.8 464 336 456.8 336 448z"
      }))
    };
  }
  if ('file-disabled' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M639.1 487.1c0-7.119-3.153-14.16-9.191-18.89l-118.8-93.12l.0013-237.3c0-16.97-6.742-33.26-18.74-45.26l-74.63-74.64C406.6 6.742 390.3 0 373.4 0H192C156.7 0 128 28.65 128 64L128 75.01L38.82 5.11C34.41 1.672 29.19 0 24.04 0C10.19 0-.0002 11.3-.0002 23.1c0 7.12 3.153 14.16 9.192 18.89l591.1 463.1C605.6 510.3 610.8 512 615.1 512C629.8 512 639.1 500.6 639.1 487.1zM464 338.4l-287.1-225.7l-.002-48.51c0-8.836 7.164-16 15.1-16h160l-.0065 79.87c0 17.67 14.33 31.1 31.1 31.1L464 159.1V338.4zM448 463.1H192c-8.834 0-15.1-7.164-15.1-16L176 234.6L128 197L128 447.1c0 35.34 28.65 64 63.1 64H448c20.4 0 38.45-9.851 50.19-24.84l-37.72-29.56C457.5 461.4 453.2 463.1 448 463.1z"
      }))
    };
  }
  if ('file-download' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M216 342.1V240c0-13.25-10.75-24-24-24S168 226.8 168 240v102.1L128.1 303C124.3 298.3 118.2 296 112 296S99.72 298.3 95.03 303c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L216 342.1zM365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0H64C28.65 0 0 28.65 0 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448z"
      }))
    };
  }
  if ('calendar' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M112 0C120.8 0 128 7.164 128 16V64H320V16C320 7.164 327.2 0 336 0C344.8 0 352 7.164 352 16V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H96V16C96 7.164 103.2 0 112 0zM416 192H32V448C32 465.7 46.33 480 64 480H384C401.7 480 416 465.7 416 448V192zM384 96H64C46.33 96 32 110.3 32 128V160H416V128C416 110.3 401.7 96 384 96z"
      }))
    };
  }
  if ('calendar-error' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M151.1 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V192H47.1V448C47.1 456.8 55.16 464 63.1 464H284.5C296.7 482.8 312.5 499.1 330.8 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24L151.1 64zM576 368C576 447.5 511.5 512 432 512C352.5 512 287.1 447.5 287.1 368C287.1 288.5 352.5 224 432 224C511.5 224 576 288.5 576 368zM432 416C418.7 416 408 426.7 408 440C408 453.3 418.7 464 432 464C445.3 464 456 453.3 456 440C456 426.7 445.3 416 432 416zM447.1 288C447.1 279.2 440.8 272 431.1 272C423.2 272 415.1 279.2 415.1 288V368C415.1 376.8 423.2 384 431.1 384C440.8 384 447.1 376.8 447.1 368V288z"
      }))
    };
  }
  if ('website' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 96C0 60.65 28.65 32 64 32H448C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96zM160 128H480V96C480 78.33 465.7 64 448 64H160V128zM128 64H64C46.33 64 32 78.33 32 96V128H128V64zM32 160V416C32 433.7 46.33 448 64 448H448C465.7 448 480 433.7 480 416V160H32z"
      }))
    };
  }
  if ('help' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"
      }))
    };
  }
  if ('copy' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"
      }))
    };
  }
  if ('trash' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M432 64C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H413.7L388.2 452.6C385.9 486.1 357.1 512 324.4 512H123.6C90.01 512 62.15 486.1 59.75 452.6L34.29 96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56L336.9 64H432zM177.7 32C172.2 32 167.1 34.84 164.2 39.52L148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7zM381.6 96H66.37L91.67 450.3C92.87 467 106.8 480 123.6 480H324.4C341.2 480 355.1 467 356.3 450.3L381.6 96z"
      }))
    };
  }
  if ('visitor' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z"
      }))
    };
  }
  if ('visitors' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336H274.7C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM375.1 241C392.9 250.8 412.3 256 432 256C493.8 256 544 205.8 544 144S493.8 32 432 32c-12.83 0-25.39 2.156-37.34 6.391c-8.328 2.953-12.69 12.09-9.734 20.42c2.953 8.344 12.12 12.66 20.42 9.734C413.9 65.53 422.8 64 432 64C476.1 64 512 99.89 512 144S476.1 224 432 224c-14.08 0-27.91-3.703-39.98-10.69c-7.656-4.453-17.44-1.828-21.86 5.828C365.7 226.8 368.3 236.6 375.1 241zM490.7 320H448c-8.844 0-16 7.156-16 16S439.2 352 448 352h42.67C555.4 352 608 404.6 608 469.3C608 475.2 603.2 480 597.3 480H496c-8.844 0-16 7.156-16 16s7.156 16 16 16h101.3C620.9 512 640 492.9 640 469.3C640 386.1 573 320 490.7 320z"
      }))
    };
  }
  if ('visitors-crowd' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM319.9 144c39.68 0 71.96 32.3 71.96 72S359.5 288 319.9 288S247.9 255.7 247.9 216S280.2 144 319.9 144zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM160.2 480c3.021-53.41 51.19-96 109.1-96H369.9c58.78 0 106.9 42.59 109.1 96H160.2zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM512 32c26.47 0 48 21.53 48 48S538.5 128 512 128s-48-21.53-48-48S485.5 32 512 32zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM128 32c26.47 0 48 21.53 48 48S154.5 128 128 128S80 106.5 80 80S101.5 32 128 32zM561.1 192H496c-11.16 0-22.08 2.5-32.47 7.438c-7.984 3.797-11.39 13.34-7.594 21.31s13.38 11.39 21.31 7.594C483.3 225.5 489.6 224 496 224h65.08C586.1 224 608 246.7 608 274.7V288c0 8.844 7.156 16 16 16S640 296.8 640 288V274.7C640 229.1 604.6 192 561.1 192zM162.8 228.3c7.938 3.797 17.53 .375 21.31-7.594c3.797-7.969 .3906-17.52-7.594-21.31C166.1 194.5 155.2 192 144 192H78.92C35.41 192 0 229.1 0 274.7V288c0 8.844 7.156 16 16 16S32 296.8 32 288V274.7C32 246.7 53.05 224 78.92 224H144C150.4 224 156.7 225.5 162.8 228.3z"
      }))
    };
  }
  if ('time' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 202.7 16.28 153.2 44.15 112.2C49.12 104.9 59.07 103 66.37 108C73.68 112.1 75.58 122.9 70.61 130.2C46.24 166.1 32 209.4 32 256C32 379.7 132.3 480 256 480C379.7 480 480 379.7 480 256C480 137.7 388.2 40.77 272 32.56V112C272 120.8 264.8 128 256 128C247.2 128 240 120.8 240 112V16C240 7.164 247.2 0 256 0C397.4 0 512 114.6 512 256V256zM267.3 244.7C273.6 250.9 273.6 261.1 267.3 267.3C261.1 273.6 250.9 273.6 244.7 267.3L148.7 171.3C142.4 165.1 142.4 154.9 148.7 148.7C154.9 142.4 165.1 142.4 171.3 148.7L267.3 244.7z"
      }))
    };
  }
  if ('pageviews' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256zM288 160C234.1 160 192 202.1 192 256C192 309 234.1 352 288 352C341 352 384 309 384 256C384 202.1 341 160 288 160zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM32 256C45.33 288 74.13 336 117.2 376C160.3 416 217.6 448 288 448C358.4 448 415.7 416 458.8 376C501.9 336 530.7 288 544 256C530.7 223.1 501.9 175.1 458.8 136C415.7 95.99 358.4 64 288 64C217.6 64 160.3 95.99 117.2 136C74.13 175.1 45.33 223.1 32 256V256z"
      }))
    };
  }
  if ('referrer' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 256C0 167.6 71.63 96 160 96H272C280.8 96 288 103.2 288 112C288 120.8 280.8 128 272 128H160C89.31 128 32 185.3 32 256C32 326.7 89.31 384 160 384H272C280.8 384 288 391.2 288 400C288 408.8 280.8 416 272 416H160C71.63 416 0 344.4 0 256zM480 416H368C359.2 416 352 408.8 352 400C352 391.2 359.2 384 368 384H480C550.7 384 608 326.7 608 256C608 185.3 550.7 128 480 128H368C359.2 128 352 120.8 352 112C352 103.2 359.2 96 368 96H480C568.4 96 640 167.6 640 256C640 344.4 568.4 416 480 416zM448 240C456.8 240 464 247.2 464 256C464 264.8 456.8 272 448 272H192C183.2 272 176 264.8 176 256C176 247.2 183.2 240 192 240H448z"
      }))
    };
  }
  if ('sessions' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M464 448H96c-35.35 0-64-28.65-64-64V112C32 103.2 24.84 96 16 96S0 103.2 0 112V384c0 53.02 42.98 96 96 96h368c8.836 0 16-7.164 16-16S472.8 448 464 448zM512 32H160C124.7 32 96 60.65 96 96v224c0 35.35 28.65 64 64 64h352c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM416 352H256v-16C256 309.5 277.5 288 304 288h64c26.51 0 48 21.49 48 48V352zM544 320c0 17.64-14.36 32-32 32h-64v-16C448 291.8 412.2 256 368 256h-64C259.8 256 224 291.8 224 336V352H160c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h352c17.64 0 32 14.36 32 32V320zM336 96c-35.35 0-64 28.65-64 64s28.65 64 64 64s64-28.65 64-64S371.4 96 336 96zM336 192c-17.64 0-32-14.36-32-32s14.36-32 32-32s32 14.36 32 32S353.6 192 336 192z"
      }))
    };
  }
  if ('bounces' === name || 'bounced_sessions' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M560 448h-40.81l-109.9-123.6l131.5-71.91C562.5 240.8 576 218.3 576 193.6c0-26.84-15.94-51-40.56-61.53c-30.63-13.12-59.45-22.2-88.24-28.06C443.1 63.63 409.4 32 368 32c-38.95 0-71.32 27.86-78.46 64.73C128.7 104.4 0 237.3 0 400C0 444.1 35.88 480 80 480h288c8.844 0 16-7.156 16-16S376.8 448 368 448h-288C53.53 448 32 426.5 32 400c0-145.2 114.5-263.8 257.8-271.3C297.5 164.9 329.6 192 368 192c35.81 0 65.76-23.68 75.96-56.12c25.68 5.471 51.47 13.86 78.88 25.62C535.7 167 544 179.6 544 193.6c0 12.84-7.031 24.62-18.47 30.78l-149.2 81.59c-4.25 2.344-7.25 6.5-8.062 11.28c-.8438 4.812 .5625 9.75 3.781 13.38l128 144C503.1 478 507.4 480 512 480h48c8.844 0 16-7.156 16-16S568.8 448 560 448zM368 128c15.06 0 29.67 1.078 44.15 2.801C404.8 147.9 387.8 160 368 160C341.5 160 320 138.5 320 112S341.5 64 368 64c21.82 0 40.08 14.73 45.89 34.71C398.9 97 383.7 96 368 96c-8.844 0-16 7.156-16 16S359.2 128 368 128zM281.3 365.5l-34.16 22.75c-7.344 4.906-9.344 14.81-4.438 22.19C245.8 415.1 250.8 417.6 256 417.6c3.062 0 6.156-.875 8.875-2.688l34.16-22.75c18.44-12.31 31-31.06 35.34-52.81s-.0313-43.91-12.34-62.34s-31.06-31-52.78-35.34C247.3 237.3 225.3 241.7 206.9 253.1L175.8 274.7C168.5 279.6 166.5 289.5 171.4 296.9s14.88 9.281 22.19 4.438l31.09-20.72C236 273 249.6 270.3 262.1 273c13.34 2.656 24.88 10.38 32.44 21.72s10.28 24.97 7.594 38.34C300.3 346.4 292.6 357.9 281.3 365.5z"
      }))
    };
  }
  if ('winner' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M572.2 76.72C570.7 69.31 564.1 64 556.6 64h-108.7c-.0137-6.172-.0496-12.01-.1804-17.34C447.1 20.5 425.1 0 399.7 0H176.3c-26.24 0-47.33 20.5-47.99 46.66C128.1 51.99 128.1 57.83 128.1 64H19.43C11.87 64 5.336 69.31 3.774 76.72C2.899 80.91-17.19 180.8 45.04 272.8c41.67 61.64 109.9 104 202.5 126.7c14.29 3.498 24.43 16.23 24.43 30.95L272 480H176c-8.834 0-16.02 7.163-16.02 16S167.2 512 176 512h223.1c8.834 0 15.1-7.163 15.1-16S408.8 480 399.1 480h-95.97l.0006-49.51c.0002-14.72 10.13-27.45 24.43-30.95c92.66-22.68 160.9-65.05 202.5-126.7C593.2 180.8 573.1 80.91 572.2 76.72zM160.3 47.47C160.5 38.78 167.5 32 176.3 32h223.5c8.747 0 15.78 6.781 15.1 15.47C417.7 128.4 409.1 320.2 288 374.6C166.9 320.2 158.3 128.4 160.3 47.47zM71.78 255.3C29.2 192.6 30.55 123.8 33.33 96h95.39c3.017 77.71 19.29 188.6 81.19 258.1C148.4 332.9 101.9 299.6 71.78 255.3zM504.2 255.3c-30.12 44.37-76.61 77.59-138.1 99.7C427.1 284.6 444.3 173.7 447.3 96h95.39C545.5 123.8 546.8 192.6 504.2 255.3z"
      }))
    };
  }
  if ('live' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 160C202.9 160 160 202.9 160 256s42.92 96 96 96s96-42.92 96-96S309.1 160 256 160zM256 280C242.8 280 232 269.3 232 256S242.8 232 256 232S280 242.8 280 256S269.3 280 256 280zM256 0c-141.4 0-256 114.6-256 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"
      }))
    };
  }
  if ('total' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M488.9 96C406.3 96 346.3 178.5 320 222.5C293.8 178.5 233.8 96 151.1 96C67.75 96 0 167.8 0 256s67.75 160 151.1 160C233.6 416 293.8 333.5 320 289.5C346.3 333.5 406.3 416 488.9 416C572.3 416 640 344.3 640 256S572.3 96 488.9 96zM151.1 384C85.5 384 32 326.6 32 256s53.5-128 119.1-128c78 0 136.5 100.6 150.9 128C287.6 283.4 229.1 384 151.1 384zM488.9 384c-78 0-136.5-100.6-150.9-128c14.38-27.38 72.88-128 150.9-128C554.5 128 608 185.4 608 256S554.5 384 488.9 384z"
      }))
    };
  }
  if ('graph' === name || 'conversion_rate' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M32 400C32 426.5 53.49 448 80 448H496C504.8 448 512 455.2 512 464C512 472.8 504.8 480 496 480H80C35.82 480 0 444.2 0 400V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V400zM331.3 299.3C325.1 305.6 314.9 305.6 308.7 299.3L223.1 214.6L123.3 315.3C117.1 321.6 106.9 321.6 100.7 315.3C94.44 309.1 94.44 298.9 100.7 292.7L212.7 180.7C218.9 174.4 229.1 174.4 235.3 180.7L320 265.4L452.7 132.7C458.9 126.4 469.1 126.4 475.3 132.7C481.6 138.9 481.6 149.1 475.3 155.3L331.3 299.3z"
      }))
    };
  }
  if ('goals' === name || 'conversions' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M300.9 32.58C299.8 33.64 298.6 34.73 297.5 35.84C284.1 33.32 270.2 32 256 32C132.3 32 32 132.3 32 256C32 379.7 132.3 480 256 480C379.7 480 480 379.7 480 256C480 241.8 478.7 227.9 476.2 214.5C477.3 213.4 478.4 212.2 479.4 211.1L502.2 185.7C508.6 208 512 231.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C280.4 0 303.1 3.406 326.3 9.768L300.9 32.58zM275.5 105.2L279.7 130.2C272 128.8 264.1 127.1 255.1 127.1C185.3 127.1 127.1 185.3 127.1 255.1C127.1 326.7 185.3 384 255.1 384C326.7 384 384 326.7 384 255.1C384 247.9 383.2 239.1 381.8 232.3L406.8 236.5C409.5 236.9 412.2 237.2 414.9 237.4C415.6 243.5 416 249.7 416 255.1C416 344.4 344.4 416 256 416C167.6 416 96 344.4 96 255.1C96 167.6 167.6 95.1 256 95.1C262.3 95.1 268.5 96.36 274.6 97.07C274.8 99.78 275.1 102.5 275.5 105.2H275.5zM341.5 193.1L267.3 267.3C261.1 273.6 250.9 273.6 244.7 267.3C238.4 261.1 238.4 250.9 244.7 244.7L318.9 170.5L307.1 100.1C304.4 83.79 310.2 67.26 322.6 56.3L371.1 12.37C385.1 .7184 405.9 6.611 410.9 23.42L428.8 83.15L488.6 101.1C505.4 106.1 511.3 126.9 499.6 140L455.7 189.4C444.7 201.8 428.2 207.6 411.9 204.9L341.5 193.1zM369.3 165.3L417.2 173.3C422.6 174.2 428.1 172.3 431.8 168.2L467.4 128.1L420.6 114.1L369.3 165.3zM397.9 91.44L383.9 44.62L343.8 80.22C339.7 83.87 337.8 89.38 338.7 94.8L346.7 142.7L397.9 91.44z"
      }))
    };
  }
  if ('goals-empty' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M192 256C192 220.7 220.7 192 256 192C291.3 192 320 220.7 320 256C320 291.3 291.3 320 256 320C220.7 320 192 291.3 192 256zM256 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 256 224C238.3 224 224 238.3 224 256C224 273.7 238.3 288 256 288zM96 256C96 167.6 167.6 96 256 96C344.4 96 416 167.6 416 256C416 344.4 344.4 416 256 416C167.6 416 96 344.4 96 256zM256 384C326.7 384 384 326.7 384 256C384 185.3 326.7 128 256 128C185.3 128 128 185.3 128 256C128 326.7 185.3 384 256 384zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 32C132.3 32 32 132.3 32 256C32 379.7 132.3 480 256 480C379.7 480 480 379.7 480 256C480 132.3 379.7 32 256 32z"
      }))
    };
  }
  if ('filter' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 80C0 71.16 7.164 64 16 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H16C7.164 96 0 88.84 0 80zM64 240C64 231.2 71.16 224 80 224H368C376.8 224 384 231.2 384 240C384 248.8 376.8 256 368 256H80C71.16 256 64 248.8 64 240zM272 416H176C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384H272C280.8 384 288 391.2 288 400C288 408.8 280.8 416 272 416z"
      }))
    };
  }
  if ('loading' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M207.4 20.36C209.8 28.88 204.8 37.69 196.3 40.04C101.5 66.19 32 152.1 32 255.1C32 379.7 132.3 479.1 256 479.1C379.7 479.1 480 379.7 480 255.1C480 152.1 410.5 66.19 315.7 40.04C307.2 37.69 302.2 28.88 304.6 20.36C306.9 11.85 315.7 6.847 324.3 9.198C432.5 39.07 512 138.2 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 138.2 79.51 39.07 187.7 9.198C196.3 6.847 205.1 11.85 207.4 20.36V20.36z"
      }))
    };
  }
  if ('desktop' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M512 0H64C28.65 0 0 28.65 0 64v288c0 35.35 28.65 64 64 64h149.7l-19.2 64H144C135.2 480 128 487.2 128 496S135.2 512 144 512h288c8.836 0 16-7.164 16-16S440.8 480 432 480h-50.49l-19.2-64H512c35.35 0 64-28.65 64-64V64C576 28.65 547.3 0 512 0zM227.9 480l19.2-64h81.79l19.2 64H227.9zM544 352c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V288h512V352zM544 256H32V64c0-17.64 14.36-32 32-32h448c17.64 0 32 14.36 32 32V256z"
      }))
    };
  }
  if ('tablet' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M384 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM416 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h320c17.64 0 32 14.36 32 32V448zM256 400H192c-8.836 0-16 7.162-16 16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16C272 407.2 264.8 400 256 400z"
      }))
    };
  }
  if ('mobile' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M288 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h192c35.35 0 64-28.65 64-64V64C352 28.65 323.3 0 288 0zM320 448c0 17.64-14.36 32-32 32H96c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h192c17.64 0 32 14.36 32 32V448zM224 400H160c-8.836 0-16 7.162-16 16c0 8.836 7.164 16 16 16h64c8.836 0 16-7.164 16-16C240 407.2 232.8 400 224 400z"
      }))
    };
  }
  if ('other' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M232 384c13.25 0 24-10.75 24-24s-10.75-24-24-24s-24 10.75-24 24S218.8 384 232 384zM296 336c13.25 0 24-10.75 24-24s-10.75-24-24-24s-24 10.75-24 24S282.8 336 296 336zM320 0H64C28.8 0 0 28.8 0 64l.0001 352c0 52.8 43.2 96 96 96h192c53.02 0 96-42.98 96-96L384 63.1C384 28.8 355.2 0 320 0zM352 416c0 35.35-28.65 64-64 64H96c-35.35 0-64-28.65-64-64V224h320V416zM352 192H32V64c0-17.67 14.33-32 32-32h256c17.67 0 32 14.33 32 32V192zM80 352h15.1l0 16C96 376.8 103.2 384 112 384s15.1-7.201 15.1-16V352h16c8.801 0 16-7.201 16-16c0-8.801-7.199-16-16-16h-16V304c0-8.801-7.199-16-15.1-16S96 295.2 96 303.1L96 320H80c-8.801 0-15.1 7.199-15.1 16C64 344.8 71.2 352 80 352z"
      }))
    };
  }
  if ('mouse' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M224 0H160c-88.38 0-160 71.63-160 160v192c0 88.38 71.63 160 160 160h64c88.38 0 160-71.63 160-160V160C384 71.62 312.4 0 224 0zM352 352c-.125 70.63-57.38 127.9-128 128H160c-70.63-.125-127.9-57.38-128-128V160c.125-70.63 57.38-127.9 128-128h64c70.63 .125 127.9 57.38 128 128V352zM192 95.1c-8.844 0-16 7.156-16 16v64C176 184.8 183.2 192 192 192s16-7.156 16-16v-64C208 103.2 200.8 95.1 192 95.1z"
      }))
    };
  }
  if ('eye' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 576 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256zM288 160C234.1 160 192 202.1 192 256C192 309 234.1 352 288 352C341 352 384 309 384 256C384 202.1 341 160 288 160zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM32 256C45.33 288 74.13 336 117.2 376C160.3 416 217.6 448 288 448C358.4 448 415.7 416 458.8 376C501.9 336 530.7 288 544 256C530.7 223.1 501.9 175.1 458.8 136C415.7 95.99 358.4 64 288 64C217.6 64 160.3 95.99 117.2 136C74.13 175.1 45.33 223.1 32 256V256z"
      }))
    };
  }
  if ('page' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 384 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H245.5C262.5 0 278.7 6.743 290.7 18.75L365.3 93.26C377.3 105.3 384 121.5 384 138.5V448C384 483.3 355.3 512 320 512zM64 480H320C337.7 480 352 465.7 352 448V138.5C352 130 348.6 121.9 342.6 115.9L268.1 41.37C262.1 35.37 253.1 32 245.5 32H64C46.33 32 32 46.33 32 64V448C32 465.7 46.33 480 64 480V480z"
      }))
    };
  }
  if ('hashtag' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M432 144h-85.73l21.32-92.4c1.969-8.609-3.375-17.2-12-19.19c-8.688-2.031-17.19 3.39-19.19 11.1l-22.98 99.59H186.3l21.32-92.4c1.969-8.609-3.375-17.2-12-19.19c-8.719-2.031-17.19 3.39-19.19 11.1L153.4 144H48c-8.844 0-16 7.144-16 15.99C32 168.8 39.16 176 48 176h98.04L109.1 336H16c-8.844 0-16 7.151-16 15.99s7.156 16 16 16h85.73L80.41 460.4c-1.969 8.609 3.375 17.2 12 19.19C93.63 479.9 94.81 480 96 480c7.281 0 13.88-4.1 15.59-12.41l22.98-99.59h127.2l-21.32 92.4c-1.969 8.609 3.375 17.2 12 19.19C253.6 479.9 254.8 480 256 480c7.281 0 13.88-4.1 15.59-12.41l22.98-99.59H400c8.844 0 16-7.161 16-16s-7.156-15.99-16-15.99h-98.04l36.92-159.1H432c8.844 0 16-7.168 16-16.01C448 151.2 440.8 144 432 144zM269.1 336H141.1L178.9 176h127.2L269.1 336z"
      }))
    };
  }
  if ('sun' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 0c8.8 0 16 7.2 16 16V96c0 8.8-7.2 16-16 16s-16-7.2-16-16V16c0-8.8 7.2-16 16-16zM0 256c0-8.8 7.2-16 16-16H96c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16zm400 0c0-8.8 7.2-16 16-16h80c8.8 0 16 7.2 16 16s-7.2 16-16 16H416c-8.8 0-16-7.2-16-16zM256 400c8.8 0 16 7.2 16 16v80c0 8.8-7.2 16-16 16s-16-7.2-16-16V416c0-8.8 7.2-16 16-16zM75 75c6.2-6.2 16.4-6.2 22.6 0l56.6 56.6c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L75 97.6c-6.2-6.2-6.2-16.4 0-22.6zm0 362c-6.2-6.2-6.2-16.4 0-22.6l56.6-56.6c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L97.6 437c-6.2 6.2-16.4 6.2-22.6 0zM357.8 154.2c-6.2-6.2-6.2-16.4 0-22.6L414.4 75c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-56.6 56.6c-6.2 6.2-16.4 6.2-22.6 0zm0 203.6c6.2-6.2 16.4-6.2 22.6 0L437 414.4c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-56.6-56.6c-6.2-6.2-6.2-16.4 0-22.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-192 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z"
      }))
    };
  }
  if ('world' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M256 480C132.3 480 32 379.7 32 256c0-11.8 .9-23.3 2.7-34.6l3 6.7c9.3 21 27.3 37 49.2 43.9l63 19.7c15.5 4.9 26.1 19.2 26.1 35.5v15c0 17 9.6 32.6 24.8 40.2c4.4 2.2 7.2 6.7 7.2 11.6v22.7c0 26.2 21.2 47.4 47.4 47.4c21.8 0 40.7-14.8 46-35.9l4.4-17.6c2.6-10.2 9.2-19 18.3-24.2l11.6-6.6c19.9-11.4 32.2-32.6 32.2-55.6v-8.3c0-17-6.7-33.3-18.7-45.3l-3.9-3.9c-12-12-28.3-18.7-45.3-18.7H251.3c-5 0-9.9-1.2-14.3-3.4l-45.9-22.9c-2.1-1-3.8-2.7-4.8-4.8l-.7-1.4c-2.3-4.6-.4-10.2 4.2-12.5c2.2-1.1 4.8-1.3 7.1-.5l24.2 8.1c15 5 31.5-.7 40.3-13.8c8.6-12.9 7.7-30-2.2-41.9l-17.9-21.5c-2.5-3-2.5-7.4 .1-10.3l20.1-23.5c13.2-15.4 15.3-37.4 5.2-55.1L259.6 32C337.1 33.2 405 73.8 444.3 134.6l-38.2 15.3c-23.6 9.4-35.7 35.6-27.7 59.7l16.9 50.7c5.2 15.6 18 27.4 33.9 31.4L475 303.2C453.3 404.3 363.5 480 256 480zM48 172.7C77.3 99.7 143.8 45.7 224 34.3l14.9 26.1c3.4 5.9 2.7 13.2-1.7 18.4l-20.1 23.5c-12.7 14.8-12.9 36.6-.4 51.6l17.9 21.5c.9 1.1 1 2.6 .2 3.7c-.8 1.2-2.2 1.7-3.6 1.2L207 172.1c-10.4-3.5-21.7-2.7-31.5 2.2c-20.4 10.2-28.7 35-18.5 55.4l.7 1.4c4.1 8.3 10.9 15 19.2 19.2l45.9 22.9c8.9 4.4 18.7 6.8 28.6 6.8h48.8c8.5 0 16.6 3.4 22.6 9.4l3.9 3.9c6 6 9.4 14.1 9.4 22.6v8.3c0 11.5-6.2 22.1-16.1 27.8l-11.6 6.6c-16.7 9.6-28.8 25.5-33.5 44.2l-4.4 17.6c-1.7 6.9-7.9 11.7-15 11.7c-8.5 0-15.4-6.9-15.4-15.4V393.9c0-17-9.6-32.6-24.8-40.2c-4.4-2.2-7.2-6.7-7.2-11.6v-15c0-30.3-19.7-57-48.6-66.1l-63-19.7c-13.2-4.1-23.9-13.7-29.5-26.3L48 172.7zM480 256c0 5.2-.2 10.3-.5 15.4l-42.6-10.6c-5.3-1.3-9.6-5.3-11.3-10.5l-16.9-50.7c-2.7-8 1.4-16.8 9.2-19.9l41.8-16.7c13 28.3 20.2 59.9 20.2 93.1zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
      }))
    };
  }
  if ('filters' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M0 71.5C0 49.7 17.7 32 39.5 32H472.5C494.3 32 512 49.7 512 71.5c0 9.2-3.2 18.1-9.1 25.2L320 317.8V446.1c0 18.7-15.2 33.9-33.9 33.9c-7.5 0-14.8-2.5-20.8-7.1l-61-47.4c-7.8-6.1-12.4-15.4-12.4-25.3V317.8L9.1 96.7C3.2 89.6 0 80.7 0 71.5zM39.5 64c-4.2 0-7.5 3.4-7.5 7.5c0 1.8 .6 3.4 1.7 4.8L220.3 301.8c2.4 2.9 3.7 6.5 3.7 10.2v88.2l61 47.4c.3 .3 .7 .4 1.1 .4c1 0 1.9-.8 1.9-1.9V312c0-3.7 1.3-7.3 3.7-10.2L478.3 76.3c1.1-1.3 1.7-3 1.7-4.8c0-4.2-3.4-7.5-7.5-7.5H39.5z"
      }))
    };
  }
  if ('referrers' === name) {
    renderedIcon = {
      html: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        "aria-hidden": "true",
        focusable: "false",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 512",
        height: size
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        fill: colorVal,
        d: "M43.3 20.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L105.4 128H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16s-16 7.2-16 16v57.4L43.3 20.7zm553.4 0L512 105.4V48c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H534.6l84.7-84.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0zM320 368c-77.3 0-132.6-65-156.7-112c24.1-47 79.4-112 156.7-112s132.6 65 156.7 112C452.6 303 397.3 368 320 368zm0-256c-97.3 0-161.4 81.6-186.5 131.9c-3.8 7.6-3.8 16.5 0 24.2C158.6 318.4 222.7 400 320 400s161.4-81.6 186.5-131.9c3.8-7.6 3.8-16.5 0-24.2C481.4 193.6 417.3 112 320 112zM596.7 491.3c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L534.6 384H592c8.8 0 16-7.2 16-16s-7.2-16-16-16H496c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V406.6l84.7 84.7zm-576-22.6c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L128 406.6V464c0 8.8 7.2 16 16 16s16-7.2 16-16V368c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h57.4L20.7 468.7zM272 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm128 0a80 80 0 1 0 -160 0 80 80 0 1 0 160 0z"
      }))
    };
  }

  //if renderICON.HTML is not defined, return empty string
  if (renderedIcon.html === undefined) {
    return '';
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, renderedIcon.html);
});
const Icon = ({
  name,
  color,
  size,
  tooltip,
  onClick
}) => {
  // set defaults if not set
  const iconName = name || 'bullet';
  const iconColor = color || 'black';
  let iconSize = size || 15;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  let tooltipClass = tooltip ? 'tooltip-' : '';
  let randomId = Math.floor(Math.random() * 1000000000);
  if (tooltip) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_common_Tooltip__WEBPACK_IMPORTED_MODULE_1__["default"], {
      content: tooltip
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'burst-icon burst-' + tooltipClass + 'icon burst-icon-' + iconName + ' burst-' + iconColor
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(IconHtml, {
      "data-for": '.burst-' + randomId,
      name: iconName,
      color: iconColor,
      size: iconSize,
      id: randomId,
      className: 'burst-' + randomId
    })));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    onClick: e => handleClick(e),
    className: 'burst-icon burst-' + tooltipClass + 'icon burst-icon-' + iconName + ' burst-' + iconColor
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(IconHtml, {
    name: iconName,
    color: iconColor,
    size: iconSize
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./src/utils/formatting.js":
/*!*********************************!*\
  !*** ./src/utils/formatting.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   availableRanges: () => (/* binding */ availableRanges),
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   formatPercentage: () => (/* binding */ formatPercentage),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   formatUnixToDate: () => (/* binding */ formatUnixToDate),
/* harmony export */   getAvailableRanges: () => (/* binding */ getAvailableRanges),
/* harmony export */   getAvailableRangesWithKeys: () => (/* binding */ getAvailableRangesWithKeys),
/* harmony export */   getBouncePercentage: () => (/* binding */ getBouncePercentage),
/* harmony export */   getChangePercentage: () => (/* binding */ getChangePercentage),
/* harmony export */   getCountryName: () => (/* binding */ getCountryName),
/* harmony export */   getDateWithOffset: () => (/* binding */ getDateWithOffset),
/* harmony export */   getDisplayDates: () => (/* binding */ getDisplayDates),
/* harmony export */   getPercentage: () => (/* binding */ getPercentage),
/* harmony export */   getRelativeTime: () => (/* binding */ getRelativeTime),
/* harmony export */   isSelected: () => (/* binding */ isSelected),
/* harmony export */   isValidDate: () => (/* binding */ isValidDate),
/* harmony export */   toUnixTimestampMillis: () => (/* binding */ toUnixTimestampMillis)
/* harmony export */ });
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfMonth/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addMonths/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfMonth/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfYear/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/addYears/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfYear/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);




/**
 * Returns a formatted string that represents the relative time between two dates
 * @param {Date | number} relativeDate - The date to compare or a UTC timestamp
 * @param {Date} date - The reference date, defaults to the current date
 * @returns {string} The relative time string
 */
const getRelativeTime = (relativeDate, date = new Date()) => {
  // if relativeDate is a number, we assume it is an UTC timestamp
  if ('number' === typeof relativeDate) {
    // convert to date object
    relativeDate = new Date(relativeDate * 1000);
  }
  if (!(relativeDate instanceof Date)) {
    // invalid date, probably still loading
    return '-';
  }
  let units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  };
  let rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto'
  });
  let elapsed = relativeDate - date;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (let u in units) {
    if (Math.abs(elapsed) > units[u] || 'second' === u) {
      return rtf.format(Math.round(elapsed / units[u]), u);
    }
  }
};

/**
 * Calculates the percentage of a value from the total and returns it as a formatted string or a number
 * @param {number} val - The value to calculate the percentage of
 * @param {number} total - The total value
 * @param {boolean} format - If true, returns the percentage as a formatted string, otherwise as a number
 * @returns {string | number} The formatted percentage or the raw percentage
 */
const getPercentage = (val, total, format = true) => {
  val = Number(val);
  total = Number(total);
  let percentage = val / total;
  if (isNaN(percentage)) {
    percentage = 0;
  }
  return format ? new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 1
  }).format(percentage) : percentage;
};

/**
 * Calculates the percentage change between two values and returns an object with the formatted percentage and status
 * @param {number} currValue - The current value
 * @param {number} prevValue - The previous value
 * @returns {Object} An object with a formatted percentage and a status ('positive' or 'negative')
 */
function getChangePercentage(currValue, prevValue) {
  currValue = Number(currValue);
  prevValue = Number(prevValue);
  let change = {};
  let percentage = (currValue - prevValue) / prevValue;
  if (isNaN(percentage)) {
    percentage = 0;
  }
  change.val = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero'
  }).format(percentage);
  change.status = 0 < percentage ? 'positive' : 'negative';
  if (percentage === Infinity) {
    change.val = '';
    change.status = 'positive';
  }
  return change;
}

/**
 * Calculates the bounce percentage of bounced sessions and total sessions
 * @param {number} bounced_sessions - The number of bounced sessions
 * @param {number} sessions - The total number of sessions
 * @param {boolean} format - If true, returns the bounce percentage as a formatted string, otherwise as a number
 * @returns {string | number} The formatted bounce percentage or the raw bounce percentage
 */
function getBouncePercentage(bounced_sessions, sessions, format = true) {
  bounced_sessions = Number(bounced_sessions);
  sessions = Number(sessions);
  return getPercentage(bounced_sessions, sessions + bounced_sessions, format);
}

/**
 * Formats a Unix timestamp as a date string, using the site's locale and wp date format
 * @param {number} unixTimestamp - The Unix timestamp to format
 * @returns {string} The formatted date string
 */
const formatUnixToDate = unixTimestamp => {
  const formattedDate = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_0__.dateI18n)(burst_settings.date_format, new Date(unixTimestamp * 1000));
  return formattedDate;
};

/**
 * Check if a date is valid
 * @param {string | number} date - The date to check
 * @return {boolean}
 */
const isValidDate = date => {
  const MIN_START_DATE = 1640995200 * 1000; // January 1, 2022 in Unix timestamp
  return date && ('number' === typeof date || Date.parse(date) >= MIN_START_DATE);
};

/**
 * Converts a date to a Unix timestamp in milliseconds
 * @param {string | number} date - The date to convert
 * @return {number|number|number}
 */
const toUnixTimestampMillis = date => {
  if ('number' === typeof date) {
    // If the number is 10 digits long, assume it's in seconds and convert to milliseconds
    return 10 === date.toString().length ? date * 1000 : date;
  }

  // If it's a string, parse it to get milliseconds
  return Date.parse(date);
};

/**
 * Formats a duration given in milliseconds as a time string in the format 'HH:mm:ss'
 * @param {number} timeInMilliSeconds - The duration in milliseconds
 * @returns {string} The formatted time string
 */
function formatTime(timeInMilliSeconds = 0) {
  let timeInSeconds = Number(timeInMilliSeconds);
  if (isNaN(timeInSeconds)) {
    timeInSeconds = 0;
  }
  const seconds = Math.floor(timeInSeconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  const zeroPad = num => {
    if (isNaN(num)) {
      return '00';
    }
    return String(num).padStart(2, '0');
  };
  const formatted = [hours, minutes, remainingSeconds].map(zeroPad);
  return formatted.join(':');
}

/**
 * Formats a number using compact notation with the specified number of decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - The number of decimal places to use
 * @returns {string} The formatted number
 */
function formatNumber(value, decimals = 1) {
  value = Number(value);
  if (isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Formats a percentage value with the specified number of decimal places
 * @param {number} value - The percentage value (not multiplied by 100)
 * @param {number} decimals - The number of decimal places to use
 * @returns {string} The formatted percentage
 */
function formatPercentage(value, decimals = 1) {
  value = Number(value) / 100;
  if (isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Returns the name of a country based on its country code. If undefined return Unknown
 * @param countryCode
 * @return {*}
 */
function getCountryName(countryCode) {
  if (countryCode) {
    return burst_settings.countries[countryCode.toUpperCase()] || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'burst-statistics');
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'burst-statistics');
}
function getDateWithOffset(currentDate = new Date()) {
  // get client's timezone offset in minutes
  const clientTimezoneOffsetMinutes = currentDate.getTimezoneOffset();

  // convert client's timezone offset from minutes to seconds
  const clientTimezoneOffsetSeconds = clientTimezoneOffsetMinutes * -60;

  // get current unix timestamp
  const currentUnix = Math.floor(currentDate.getTime() / 1000);

  // add burst_settings.gmt_offset x hour and client's timezone offset in
  // seconds to currentUnix
  const currentUnixWithOffsets = currentUnix + burst_settings.gmt_offset * 3600 - clientTimezoneOffsetSeconds;
  const currentDateWithOffset = new Date(currentUnixWithOffsets * 1000);
  return currentDateWithOffset;
}
const currentDateWithOffset = getDateWithOffset();
const availableRanges = {
  'today': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(currentDateWithOffset),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(currentDateWithOffset)
    })
  },
  'yesterday': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yesterday', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -1)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -1))
    })
  },
  'last-7-days': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Last 7 days', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -7)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -1))
    })
  },
  'last-30-days': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Last 30 days', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -30)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -1))
    })
  },
  'last-90-days': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Last 90 days', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -90)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -1))
    })
  },
  'last-month': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Last month', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(currentDateWithOffset, -1)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(currentDateWithOffset, -1))
    })
  },
  'week-to-date': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Week to date', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_4__["default"])(currentDateWithOffset, -currentDateWithOffset.getDay())),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(currentDateWithOffset)
    })
  },
  'month-to-date': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Month to date', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(currentDateWithOffset),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(currentDateWithOffset)
    })
  },
  'year-to-date': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Year to date', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])(currentDateWithOffset),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(currentDateWithOffset)
    })
  },
  'last-year': {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Last year', 'burst-statistics'),
    range: () => ({
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_9__["default"])(currentDateWithOffset, -1)),
      endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_10__["default"])((0,date_fns__WEBPACK_IMPORTED_MODULE_9__["default"])(currentDateWithOffset, -1))
    })
  }
};
const getAvailableRanges = selectedRanges => {
  return Object.values(selectedRanges).filter(Boolean).map(value => {
    const range = availableRanges[value];
    range.isSelected = isSelected;
    return range;
  });
};
const getAvailableRangesWithKeys = selectedRanges => {
  let ranges = {};
  Object.keys(availableRanges) // Get the keys from the availableRanges object
  .filter(key => selectedRanges.includes(key)) // Filter the keys based on selectedRanges
  .forEach(key => {
    ranges[key] = {
      // Assign a new object to the key on the ranges object
      ...availableRanges[key] // Spread the properties from the range object
    };
  });
  return ranges;
};
const getDisplayDates = (startDate, endDate) => {
  const formatString = 'MMMM d, yyyy';
  return {
    startDate: startDate ? (0,date_fns__WEBPACK_IMPORTED_MODULE_11__["default"])(new Date(startDate), formatString) : (0,date_fns__WEBPACK_IMPORTED_MODULE_11__["default"])(defaultStart, formatString),
    endDate: endDate ? (0,date_fns__WEBPACK_IMPORTED_MODULE_11__["default"])(new Date(endDate), formatString) : (0,date_fns__WEBPACK_IMPORTED_MODULE_11__["default"])(defaultEnd, formatString)
  };
};
function isSelected(range) {
  const definedRange = this.range();
  return (0,date_fns__WEBPACK_IMPORTED_MODULE_12__["default"])(range.startDate, definedRange.startDate) && (0,date_fns__WEBPACK_IMPORTED_MODULE_12__["default"])(range.endDate, definedRange.endDate);
}


/***/ }),

/***/ "./node_modules/date-fns/esm/subDays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/subDays/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subDays)
/* harmony export */ });
/* harmony import */ var _addDays_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addDays/index.js */ "./node_modules/date-fns/esm/addDays/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyAmount);
  return (0,_addDays_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, -amount);
}

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/queriesObserver.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/queriesObserver.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueriesObserver: () => (/* binding */ QueriesObserver)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _queryObserver_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryObserver.mjs */ "./node_modules/@tanstack/query-core/build/lib/queryObserver.mjs");
/* harmony import */ var _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.mjs */ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");





class QueriesObserver extends _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(client, queries) {
    super();
    this.client = client;
    this.queries = [];
    this.result = [];
    this.observers = [];
    this.observersMap = {};

    if (queries) {
      this.setQueries(queries);
    }
  }

  onSubscribe() {
    if (this.listeners.size === 1) {
      this.observers.forEach(observer => {
        observer.subscribe(result => {
          this.onUpdate(observer, result);
        });
      });
    }
  }

  onUnsubscribe() {
    if (!this.listeners.size) {
      this.destroy();
    }
  }

  destroy() {
    this.listeners = new Set();
    this.observers.forEach(observer => {
      observer.destroy();
    });
  }

  setQueries(queries, notifyOptions) {
    this.queries = queries;
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batch(() => {
      const prevObservers = this.observers;
      const newObserverMatches = this.findMatchingObservers(this.queries); // set options for the new observers to notify of changes

      newObserverMatches.forEach(match => match.observer.setOptions(match.defaultedQueryOptions, notifyOptions));
      const newObservers = newObserverMatches.map(match => match.observer);
      const newObserversMap = Object.fromEntries(newObservers.map(observer => [observer.options.queryHash, observer]));
      const newResult = newObservers.map(observer => observer.getCurrentResult());
      const hasIndexChange = newObservers.some((observer, index) => observer !== prevObservers[index]);

      if (prevObservers.length === newObservers.length && !hasIndexChange) {
        return;
      }

      this.observers = newObservers;
      this.observersMap = newObserversMap;
      this.result = newResult;

      if (!this.hasListeners()) {
        return;
      }

      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.difference)(prevObservers, newObservers).forEach(observer => {
        observer.destroy();
      });
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.difference)(newObservers, prevObservers).forEach(observer => {
        observer.subscribe(result => {
          this.onUpdate(observer, result);
        });
      });
      this.notify();
    });
  }

  getCurrentResult() {
    return this.result;
  }

  getQueries() {
    return this.observers.map(observer => observer.getCurrentQuery());
  }

  getObservers() {
    return this.observers;
  }

  getOptimisticResult(queries) {
    return this.findMatchingObservers(queries).map(match => match.observer.getOptimisticResult(match.defaultedQueryOptions));
  }

  findMatchingObservers(queries) {
    const prevObservers = this.observers;
    const prevObserversMap = new Map(prevObservers.map(observer => [observer.options.queryHash, observer]));
    const defaultedQueryOptions = queries.map(options => this.client.defaultQueryOptions(options));
    const matchingObservers = defaultedQueryOptions.flatMap(defaultedOptions => {
      const match = prevObserversMap.get(defaultedOptions.queryHash);

      if (match != null) {
        return [{
          defaultedQueryOptions: defaultedOptions,
          observer: match
        }];
      }

      return [];
    });
    const matchedQueryHashes = new Set(matchingObservers.map(match => match.defaultedQueryOptions.queryHash));
    const unmatchedQueries = defaultedQueryOptions.filter(defaultedOptions => !matchedQueryHashes.has(defaultedOptions.queryHash));
    const matchingObserversSet = new Set(matchingObservers.map(match => match.observer));
    const unmatchedObservers = prevObservers.filter(prevObserver => !matchingObserversSet.has(prevObserver));

    const getObserver = options => {
      const defaultedOptions = this.client.defaultQueryOptions(options);
      const currentObserver = this.observersMap[defaultedOptions.queryHash];
      return currentObserver != null ? currentObserver : new _queryObserver_mjs__WEBPACK_IMPORTED_MODULE_3__.QueryObserver(this.client, defaultedOptions);
    };

    const newOrReusedObservers = unmatchedQueries.map((options, index) => {
      if (options.keepPreviousData) {
        // return previous data from one of the observers that no longer match
        const previouslyUsedObserver = unmatchedObservers[index];

        if (previouslyUsedObserver !== undefined) {
          return {
            defaultedQueryOptions: options,
            observer: previouslyUsedObserver
          };
        }
      }

      return {
        defaultedQueryOptions: options,
        observer: getObserver(options)
      };
    });

    const sortMatchesByOrderOfQueries = (a, b) => defaultedQueryOptions.indexOf(a.defaultedQueryOptions) - defaultedQueryOptions.indexOf(b.defaultedQueryOptions);

    return matchingObservers.concat(newOrReusedObservers).sort(sortMatchesByOrderOfQueries);
  }

  onUpdate(observer, result) {
    const index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.result = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceAt)(this.result, index, result);
      this.notify();
    }
  }

  notify() {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_1__.notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(this.result);
      });
    });
  }

}


//# sourceMappingURL=queriesObserver.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/lib/useQueries.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/lib/useQueries.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useQueries: () => (/* binding */ useQueries)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/lib/queriesObserver.mjs");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _useSyncExternalStore_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useSyncExternalStore.mjs */ "./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs");
/* harmony import */ var _QueryClientProvider_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider.mjs */ "./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs");
/* harmony import */ var _isRestoring_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isRestoring.mjs */ "./node_modules/@tanstack/react-query/build/lib/isRestoring.mjs");
/* harmony import */ var _QueryErrorResetBoundary_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryErrorResetBoundary.mjs */ "./node_modules/@tanstack/react-query/build/lib/QueryErrorResetBoundary.mjs");
/* harmony import */ var _errorBoundaryUtils_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errorBoundaryUtils.mjs */ "./node_modules/@tanstack/react-query/build/lib/errorBoundaryUtils.mjs");
/* harmony import */ var _suspense_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suspense.mjs */ "./node_modules/@tanstack/react-query/build/lib/suspense.mjs");
'use client';









function useQueries({
  queries,
  context
}) {
  const queryClient = (0,_QueryClientProvider_mjs__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)({
    context
  });
  const isRestoring = (0,_isRestoring_mjs__WEBPACK_IMPORTED_MODULE_2__.useIsRestoring)();
  const errorResetBoundary = (0,_QueryErrorResetBoundary_mjs__WEBPACK_IMPORTED_MODULE_3__.useQueryErrorResetBoundary)();
  const defaultedQueries = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => queries.map(options => {
    const defaultedOptions = queryClient.defaultQueryOptions(options); // Make sure the results are already in fetching state before subscribing or updating options

    defaultedOptions._optimisticResults = isRestoring ? 'isRestoring' : 'optimistic';
    return defaultedOptions;
  }), [queries, queryClient, isRestoring]);
  defaultedQueries.forEach(query => {
    (0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.ensureStaleTime)(query);
    (0,_errorBoundaryUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.ensurePreventErrorBoundaryRetry)(query, errorResetBoundary);
  });
  (0,_errorBoundaryUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.useClearResetErrorBoundary)(errorResetBoundary);
  const [observer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => new _tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__.QueriesObserver(queryClient, defaultedQueries));
  const optimisticResult = observer.getOptimisticResult(defaultedQueries);
  (0,_useSyncExternalStore_mjs__WEBPACK_IMPORTED_MODULE_7__.useSyncExternalStore)(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(onStoreChange => isRestoring ? () => undefined : observer.subscribe(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_8__.notifyManager.batchCalls(onStoreChange)), [observer, isRestoring]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setQueries(defaultedQueries, {
      listeners: false
    });
  }, [defaultedQueries, observer]);
  const shouldAtLeastOneSuspend = optimisticResult.some((result, index) => (0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.shouldSuspend)(defaultedQueries[index], result, isRestoring));
  const suspensePromises = shouldAtLeastOneSuspend ? optimisticResult.flatMap((result, index) => {
    const options = defaultedQueries[index];
    const queryObserver = observer.getObservers()[index];

    if (options && queryObserver) {
      if ((0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.shouldSuspend)(options, result, isRestoring)) {
        return (0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(options, queryObserver, errorResetBoundary);
      } else if ((0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.willFetch)(result, isRestoring)) {
        void (0,_suspense_mjs__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(options, queryObserver, errorResetBoundary);
      }
    }

    return [];
  }) : [];

  if (suspensePromises.length > 0) {
    throw Promise.all(suspensePromises);
  }

  const observerQueries = observer.getQueries();
  const firstSingleResultWhichShouldThrow = optimisticResult.find((result, index) => {
    var _defaultedQueries$ind, _defaultedQueries$ind2;

    return (0,_errorBoundaryUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.getHasError)({
      result,
      errorResetBoundary,
      useErrorBoundary: (_defaultedQueries$ind = (_defaultedQueries$ind2 = defaultedQueries[index]) == null ? void 0 : _defaultedQueries$ind2.useErrorBoundary) != null ? _defaultedQueries$ind : false,
      query: observerQueries[index]
    });
  });

  if (firstSingleResultWhichShouldThrow != null && firstSingleResultWhichShouldThrow.error) {
    throw firstSingleResultWhichShouldThrow.error;
  }

  return optimisticResult;
}


//# sourceMappingURL=useQueries.mjs.map


/***/ })

}]);
//# sourceMappingURL=src_components_pages_DashboardPage_js.js.map