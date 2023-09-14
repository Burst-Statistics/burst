"use strict";
(self["webpackChunkburst_statistics"] = self["webpackChunkburst_statistics"] || []).push([["src_components_blocks_InsightsGraph_js"],{

/***/ "./src/components/blocks/InsightsGraph.js":
/*!************************************************!*\
  !*** ./src/components/blocks/InsightsGraph.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.mjs");
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/dist/index.js");




chart_js__WEBPACK_IMPORTED_MODULE_2__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_2__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_2__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.LineElement, chart_js__WEBPACK_IMPORTED_MODULE_2__.Title, chart_js__WEBPACK_IMPORTED_MODULE_2__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_2__.Legend);
const InsightsGraph = _ref => {
  let {
    data,
    loading
  } = _ref;
  const options = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    responsive: "true",
    maintainAspectRatio: false,
    cubicInterpolationMode: 'monotone',
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 13,
            weight: 400
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          maxTicksLimit: 6
        }
      },
      x: {
        ticks: {
          maxTicksLimit: 8
        }
      }
    },
    layout: {
      padding: 0
    }
  }), []);
  const loadingClass = loading ? 'burst-loading' : '';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__.Line, {
    className: `burst-loading-container ${loadingClass}`,
    options: options,
    data: data
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InsightsGraph);

/***/ })

}]);
//# sourceMappingURL=src_components_blocks_InsightsGraph_js.js.map