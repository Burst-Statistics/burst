/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Page.js":
/*!********************************!*\
  !*** ./src/components/Page.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getAnchor */ "./src/utils/getAnchor.js");
/* harmony import */ var _common_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/Header */ "./src/components/common/Header.js");
/* harmony import */ var _pages_PagePlaceholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/PagePlaceholder */ "./src/components/pages/PagePlaceholder.js");
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store/useFieldsStore */ "./src/store/useFieldsStore.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);








const Page = () => {
  const menuLoaded = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__.useMenu)(state => state.menuLoaded);
  const selectedMainMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__.useMenu)(state => state.selectedMainMenuItem);
  const fetchSubMenuData = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__.useMenu)(state => state.fetchSubMenuData);
  const fields = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_6__.useFields)(state => state.fields);
  const fieldsLoaded = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_6__.useFields)(state => state.fieldsLoaded);
  const fetchFieldsData = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_6__.useFields)(state => state.fetchFieldsData);
  const [ToastContainer, setToastContainer] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
  const [DashboardPage, setDashboardPage] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
  const [StatisticsPage, setStatisticsPage] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
  const [SettingsPage, setSettingsPage] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
  const [Tour, setTour] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);

  //load the chunk translations passed to us from the rsssl_settings object
  //only works in build mode, not in dev mode.
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    burst_settings.json_translations.forEach(translationsString => {
      let translations = JSON.parse(translationsString);
      let localeData = translations.locale_data['burst-statistics'] || translations.locale_data.messages;
      localeData[""].domain = 'burst-statistics';
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.setLocaleData)(localeData, 'burst-statistics');
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (!burst_settings.tour_shown || (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])() === 'dashboard' && (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('menu') === 'tour' && !Tour) {
      Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-shepherd_dist_Shepherd_es_js"), __webpack_require__.e("src_components_common_Tour_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./common/Tour */ "./src/components/common/Tour.js")).then(_ref => {
        let {
          default: Tour
        } = _ref;
        setTour(() => Tour);
      });
    }
    if (selectedMainMenuItem === 'dashboard' && !DashboardPage) {
      Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Tooltip_Tooltip_js-node_modules_babel_runtime_helpers_esm_t-81b4be"), __webpack_require__.e("vendors-node_modules_date-fns_esm_endOfDay_index_js-node_modules_date-fns_esm_format_index_js-02f33e"), __webpack_require__.e("src_components_pages_DashboardPage_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/DashboardPage */ "./src/components/pages/DashboardPage.js")).then(_ref2 => {
        let {
          default: DashboardPage
        } = _ref2;
        setDashboardPage(() => DashboardPage);
      });
    }
    if (selectedMainMenuItem === 'statistics' && !StatisticsPage) {
      Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Tooltip_Tooltip_js-node_modules_babel_runtime_helpers_esm_t-81b4be"), __webpack_require__.e("vendors-node_modules_date-fns_esm_endOfDay_index_js-node_modules_date-fns_esm_format_index_js-02f33e"), __webpack_require__.e("vendors-node_modules_react-data-table-component_dist_index_cjs_js"), __webpack_require__.e("vendors-node_modules_mui_material_Modal_Modal_js-node_modules_mui_material_Paper_Paper_js-nod-d5f9ac"), __webpack_require__.e("vendors-node_modules_mui_material_Popover_Popover_js-node_modules_date-fns_esm_endOfYear_inde-fbd786"), __webpack_require__.e("src_components_pages_StatisticsPage_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/StatisticsPage */ "./src/components/pages/StatisticsPage.js")).then(_ref3 => {
        let {
          default: StatisticsPage
        } = _ref3;
        setStatisticsPage(() => StatisticsPage);
      });
    }
    if (selectedMainMenuItem === 'settings' && !SettingsPage) {
      Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_mui_material_Tooltip_Tooltip_js-node_modules_babel_runtime_helpers_esm_t-81b4be"), __webpack_require__.e("vendors-node_modules_mui_material_Modal_Modal_js-node_modules_mui_material_Paper_Paper_js-nod-d5f9ac"), __webpack_require__.e("vendors-node_modules_mui_material_Dialog_Dialog_js-node_modules_mui_material_DialogActions_Di-f8e37c"), __webpack_require__.e("src_components_pages_SettingsPage_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/SettingsPage */ "./src/components/pages/SettingsPage.js")).then(_ref4 => {
        let {
          default: SettingsPage
        } = _ref4;
        setSettingsPage(() => SettingsPage);
      });
    }
  }, [selectedMainMenuItem]);

  // change pages
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (fieldsLoaded) {
      fetchSubMenuData(fields);
    }
    window.addEventListener('hashchange', () => {
      fetchSubMenuData(fields);
    });
  }, [fields]);
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    let subMenuItem = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('menu');
    fetchFieldsData(subMenuItem);
    // initGoals();
  }, []);

  // async load react-toastify
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs")).then(module => {
      const ToastContainer = module.ToastContainer;
      setToastContainer(() => ToastContainer);
    });
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null), menuLoaded ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Tour && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tour, null), selectedMainMenuItem === 'dashboard' && DashboardPage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DashboardPage, null), selectedMainMenuItem === 'statistics' && StatisticsPage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(StatisticsPage, null), selectedMainMenuItem === 'settings' && SettingsPage && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SettingsPage, null)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pages_PagePlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], null), ToastContainer && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToastContainer, {
    position: "bottom-right",
    autoClose: 2000,
    limit: 5,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    theme: "light"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);

/***/ }),

/***/ "./src/components/common/Header.js":
/*!*****************************************!*\
  !*** ./src/components/common/Header.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




const Header = () => {
  const menu = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_2__.useMenu)(state => state.menu);
  const menuLoaded = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_2__.useMenu)(state => state.menuLoaded);
  const selectedMainMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_2__.useMenu)(state => state.selectedMainMenuItem);
  const fetchMainMenuData = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_2__.useMenu)(state => state.fetchMainMenuData);
  const plugin_url = burst_settings.plugin_url;

  // support url is
  const support_url = !burst_settings.is_pro ? 'https://wordpress.org/support/plugin/burst-statistics/' : 'https://burst-statistics.com/support/?src=plugin-header';
  const firstUpdate = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (firstUpdate.current) {
      fetchMainMenuData();
      firstUpdate.current = false;
      return;
    }
  }, []);
  let menuItems = Object.values(menu);
  menuItems = menuItems.filter(item => item !== null); // Remove null values

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-header-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    className: "burst-logo",
    src: plugin_url + 'assets/img/burst-logo.svg',
    alt: "Burst Statistics Logo"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-header-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "burst-header-menu"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, menuLoaded && menuItems.map((menu_item, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: selectedMainMenuItem === menu_item.id ? 'active' : '',
    href: "#" + menu_item.id.toString()
  }, menu_item.title)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-header-right"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: support_url,
    className: "burst-button burst-button--secondary",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Support', 'burst-statistics')), !burst_settings.is_pro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: 'https://burst-statistics.com/pricing/?src=plugin-header',
    className: "burst-button burst-button--pro",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'burst-statistics')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/pages/PagePlaceholder.js":
/*!*************************************************!*\
  !*** ./src/components/pages/PagePlaceholder.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const PagePlaceholder = props => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-content-area burst-grid burst-dashboard burst-page-placeholder"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item  burst-column-2 burst-row-2 "
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item burst-row-2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item burst-row-2"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item  burst-column-2"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PagePlaceholder);

/***/ }),

/***/ "./src/store/useFieldsStore.js":
/*!*************************************!*\
  !*** ./src/store/useFieldsStore.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateFieldsListWithConditions: () => (/* binding */ updateFieldsListWithConditions),
/* harmony export */   useFields: () => (/* binding */ useFields),
/* harmony export */   validateConditions: () => (/* binding */ validateConditions)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");



const fetchFields = () => {
  return _utils_api__WEBPACK_IMPORTED_MODULE_0__.getFields().then(response => {
    let fields = response.fields;
    let progress = response.progress;
    return {
      fields,
      progress
    };
  }).catch(error => {
    console.error(error);
  });
};
const useFields = (0,zustand__WEBPACK_IMPORTED_MODULE_1__.create)((set, get) => ({
  fieldsLoaded: false,
  fields: [],
  changedFields: [],
  progress: [],
  nextButtonDisabled: false,
  highLightField: '',
  setHighLightField: highLightField => set(state => ({
    highLightField
  })),
  setChangedField: async (id, value) => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(state => {
      //remove current reference
      const existingFieldIndex = state.changedFields.findIndex(field => {
        //find index of existing field
        return field.id === id;
      });
      if (existingFieldIndex !== -1) {
        state.changedFields.splice(existingFieldIndex, 1);
      }

      //add again, with new value
      let field = {};
      field.id = id;
      field.value = value;
      state.changedFields.push(field);
    }));
    let conditionallyEnabledFields = updateFieldsListWithConditions(get().fields);
    set(state => ({
      fields: conditionallyEnabledFields
    }));
  },
  updateField: (id, value) => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(state => {
      let index = false;
      state.fields.forEach(function (fieldItem, i) {
        if (fieldItem.id === id) {
          index = i;
        }
      });
      state.fields[index].value = value;
    }));
  },
  addHelpNotice: (id, label, text, title, url) => {
    //create help object

    let help = {};
    help.label = label;
    help.text = text;
    if (url) help.url = url;
    if (title) help.title = title;
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(state => {
      const fieldIndex = state.fields.findIndex(field => {
        return field.id === id;
      });
      if (fieldIndex !== -1) {
        state.fields[fieldIndex].help = help;
      }
    }));
  },
  saveFields: async () => {
    try {
      let fields = get().fields;
      let changedFields = get().changedFields;
      let progress = get().progress;
      let saveFields = [];
      for (const field of fields) {
        let fieldIsIncluded = changedFields.filter(changedField => changedField.id === field.id).length > 0;
        if (fieldIsIncluded) {
          saveFields.push(field);
        }
      }
      if (saveFields.length === 0) {
        return Promise.resolve();
      }
      const response = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.setFields(saveFields);
      progress = response.progress;
      fields = updateFieldsListWithConditions(response.fields);
      set(state => ({
        changedFields: [],
        fields: fields,
        progress: progress
      }));
      return Promise.resolve(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  updateFieldsData: async selectedSubMenuItem => {
    let fields = get().fields;
    fields = updateFieldsListWithConditions(fields);
    const nextButtonDisabled = isNextButtonDisabled(fields, selectedSubMenuItem);
    set((0,immer__WEBPACK_IMPORTED_MODULE_2__.produce)(state => {
      state.fields = fields;
      state.nextButtonDisabled = nextButtonDisabled;
    }));
  },
  fetchFieldsData: async selectedSubMenuItem => {
    const {
      fields,
      progress
    } = await fetchFields();
    //process pro field
    if (burst_settings.is_pro) {
      for (const field of fields) {
        if (field.pro) {
          if (field.pro.default) field.default = field.pro.default;
          if (field.pro.label) field.label = field.pro.label;
          if (field.pro.comment) field.comment = field.pro.comment;
          if (field.pro.tooltip) field.tooltip = field.pro.tooltip;
          if (field.pro.react_conditions) field.react_conditions = field.pro.react_conditions;
        }
      }
    }
    let conditionallyEnabledFields = updateFieldsListWithConditions(fields);
    let selectedFields = conditionallyEnabledFields.filter(field => field.menu_id === selectedSubMenuItem);
    set(state => ({
      fieldsLoaded: true,
      fields: conditionallyEnabledFields,
      selectedFields: selectedFields,
      progress: progress
    }));
  }
}));

//check if all required fields have been enabled. If so, enable save/continue button
const isNextButtonDisabled = (fields, selectedMenuItem) => {
  let fieldsOnPage = [];
  //get all fields with group_id this.props.group_id
  for (const field of fields) {
    if (field.menu_id === selectedMenuItem) {
      fieldsOnPage.push(field);
    }
  }
  let requiredFields = fieldsOnPage.filter(field => field.required && !field.conditionallyDisabled && (field.value.length == 0 || !field.value));
  return requiredFields.length > 0;
};

// export const updateFieldsListWithConditions = (fields) => {
//   let newFields = [];
//   fields.forEach(function(field, i  ) {
//     let enabled = !( field.hasOwnProperty('react_conditions') && !validateConditions(field.react_conditions, fields, field.id) );
//     //we want to update the changed fields if this field has just become visible. Otherwise the new field won't get saved.
//     const newField = {...field};
//     newField.conditionallyDisabled = !enabled;
//     newFields.push(newField);
//   });
//   return newFields;
// }
const updateFieldsListWithConditions = fields => {
  return fields.map(field => {
    const enabled = !(field.hasOwnProperty('react_conditions') && !validateConditions(field.react_conditions, fields, field.id));
    const newField = {
      ...field
    };
    if (newField.condition_action === 'disable') {
      newField.disabled = !enabled;
    } else {
      newField.conditionallyDisabled = !enabled;
    }
    return newField;
  });
};
// export const validateConditions = (conditions, fields) => {
//   let relation = conditions.relation === 'OR' ? 'OR' : 'AND';
//   let conditionApplies = relation==='AND';
//   let result = {};
//
//   for (const key in conditions) {
//     if ( conditions.hasOwnProperty(key) ) {
//       let thisConditionApplies = relation==='AND';
//       let subConditionsArray = conditions[key];
//       if ( subConditionsArray.hasOwnProperty('relation') ) {
//         let subConditionsResult = validateConditions(subConditionsArray, fields);
//         thisConditionApplies = subConditionsResult.conditionApplies;
//       } else {
//         for ( let conditionField in subConditionsArray ) {
//           let invert = conditionField.indexOf('!')===0;
//           if ( subConditionsArray.hasOwnProperty(conditionField) ) {
//             let conditionValue = subConditionsArray[conditionField];
//             conditionField = conditionField.replace('!','');
//             let conditionFields = Array.isArray(fields) ? fields.filter(field => field.id === conditionField) : [];
//             if (conditionFields.length > 0) {
//               let field = conditionFields[0];
//               let actualValue = field.value;
//               if ( field.type==='checkbox' ) {
//                 thisConditionApplies = actualValue === conditionValue;
//               } else if ( field.type==='multicheckbox' ) {
//                 thisConditionApplies = false;
//                 let arrayValue = actualValue;
//                 if ( arrayValue.length===0 ) {
//                   thisConditionApplies = false;
//                 } else {
//                   for (const key of Object.keys(arrayValue)) {
//                     if ( !Array.isArray(conditionValue) ) conditionValue = [conditionValue];
//                     if ( conditionValue.includes(arrayValue[key])){
//                       thisConditionApplies = true;
//                       break;
//                     }
//                   }
//                 }
//               } else if ( field.type==='radio' ) {
//                 if ( Array.isArray(conditionValue) ) {
//                   thisConditionApplies = conditionValue.includes(actualValue);
//                 } else {
//                   thisConditionApplies = conditionValue === actualValue;
//                 }
//               } else {
//                 if (typeof conditionValue === 'string' && conditionValue.indexOf('EMPTY')!==-1){
//                   thisConditionApplies = actualValue.length===0;
//                 } else if (Array.isArray(conditionValue)) {
//                   thisConditionApplies = false;
//                   for (const value of conditionValue) {
//                     if (String(actualValue).toLowerCase() === value.toLowerCase()) {
//                       thisConditionApplies = true;
//                       break;
//                     }
//                   }
//                 } else {
//                   thisConditionApplies = String(actualValue).toLowerCase() === conditionValue.toLowerCase();
//                 }
//               }
//             }
//           }
//           if ( invert ){
//             thisConditionApplies = !thisConditionApplies;
//           }
//           if ( relation === 'AND' ) {
//             conditionApplies = conditionApplies && thisConditionApplies;
//           } else {
//             conditionApplies = conditionApplies || thisConditionApplies;
//           }
//         }
//       }
//     }
//   }
//
//   return conditionApplies ? 1 : 0;
// }

const validateConditions = (conditions, fields, fieldId, isSub) => {
  let relation = conditions.relation === 'OR' ? 'OR' : 'AND';
  let conditionApplies = relation === 'AND';
  for (const key in conditions) {
    if (conditions.hasOwnProperty(key)) {
      let thisConditionApplies = relation === 'AND';
      let subConditionsArray = conditions[key];
      //check if there's a subcondition
      if (subConditionsArray.hasOwnProperty('relation')) {
        thisConditionApplies = validateConditions(subConditionsArray, fields, fieldId, true) === 1;
        if (relation === 'AND') {
          conditionApplies = conditionApplies && thisConditionApplies;
        } else {
          conditionApplies = conditionApplies || thisConditionApplies;
        }
      }
      for (let conditionField in subConditionsArray) {
        if (conditionField === 'hidden') {
          thisConditionApplies = false;
          continue;
        }
        let invert = conditionField.indexOf('!') === 0;
        if (subConditionsArray.hasOwnProperty(conditionField)) {
          let conditionValue = subConditionsArray[conditionField];
          conditionField = conditionField.replace('!', '');
          let conditionFields = fields.filter(field => field.id === conditionField);
          if (conditionFields.hasOwnProperty(0)) {
            let field = conditionFields[0];
            let actualValue = field.value;
            if (field.type === 'text_checkbox') {
              thisConditionApplies = actualValue.hasOwnProperty('show') && actualValue['show'] == conditionValue;
            } else if (field.type === 'checkbox') {
              thisConditionApplies = actualValue == conditionValue; //with == it can be either true or 1
            } else if (field.type === 'multicheckbox') {
              //multicheckbox conditions
              //loop through objects
              thisConditionApplies = false;
              let arrayValue = actualValue;
              if (!Array.isArray(arrayValue)) {
                arrayValue = arrayValue !== '' ? [] : [arrayValue];
              }
              if (arrayValue.length === 0) {
                thisConditionApplies = false;
              } else {
                for (const key of Object.keys(arrayValue)) {
                  if (!Array.isArray(conditionValue)) conditionValue = [conditionValue];
                  if (conditionValue.includes(arrayValue[key])) {
                    thisConditionApplies = true;
                    break;
                  }
                }
              }
            } else if (field.type === 'radio' || field.type === 'document') {
              //as the regions field can be both radio and multicheckbox, an array is possible for a radio field
              if (Array.isArray(conditionValue)) {
                thisConditionApplies = conditionValue.includes(actualValue);
              } else {
                thisConditionApplies = conditionValue === actualValue;
              }
            } else {
              if (conditionValue === true) {
                thisConditionApplies = actualValue === 1 || actualValue === "1" || actualValue === true;
              } else if (conditionValue === false) {
                thisConditionApplies = actualValue === 0 || actualValue === "0" || actualValue === false;
              } else if (conditionValue.indexOf('EMPTY') !== -1) {
                thisConditionApplies = actualValue.length === 0;
              } else if (Array.isArray(conditionValue)) {
                thisConditionApplies = conditionValue.includes(actualValue);
              } else {
                thisConditionApplies = String(actualValue).toLowerCase() === conditionValue.toLowerCase();
              }
            }
          }
        }
        if (invert) {
          thisConditionApplies = !thisConditionApplies;
        }
        if (relation === 'AND') {
          conditionApplies = conditionApplies && thisConditionApplies;
        } else {
          conditionApplies = conditionApplies || thisConditionApplies;
        }
      }
      if (relation === 'AND') {
        conditionApplies = conditionApplies && thisConditionApplies;
      } else {
        conditionApplies = conditionApplies || thisConditionApplies;
      }
    }
  }
  return conditionApplies ? 1 : 0;
};

/***/ }),

/***/ "./src/store/useMenuStore.js":
/*!***********************************!*\
  !*** ./src/store/useMenuStore.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMenu: () => (/* binding */ useMenu)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var _utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getAnchor */ "./src/utils/getAnchor.js");



const fetchMenu = () => {
  return burst_settings.menu;
};

// Parses menu items and nested items in single array
const menuItemParser = (parsedMenuItems, menuItems) => {
  menuItems.forEach(menuItem => {
    if (menuItem.visible) {
      parsedMenuItems.push(menuItem.id);
      if (menuItem.hasOwnProperty('menu_items')) {
        menuItemParser(parsedMenuItems, menuItem.menu_items);
      }
    }
  });
  return parsedMenuItems;
};
const getPreviousAndNextMenuItems = (menu, selectedSubMenuItem) => {
  let previousMenuItem;
  let nextMenuItem;
  const parsedMenuItems = [];
  menuItemParser(parsedMenuItems, menu);
  // Finds current menu item index
  const currentMenuItemIndex = parsedMenuItems.findIndex(menuItem => menuItem === selectedSubMenuItem);
  if (currentMenuItemIndex !== -1) {
    previousMenuItem = parsedMenuItems[currentMenuItemIndex === 0 ? '' : currentMenuItemIndex - 1];
    nextMenuItem = parsedMenuItems[currentMenuItemIndex === parsedMenuItems.length - 1 ? '' : currentMenuItemIndex + 1];
    previousMenuItem = previousMenuItem ? previousMenuItem : parsedMenuItems[0], nextMenuItem = nextMenuItem ? nextMenuItem : parsedMenuItems[parsedMenuItems.length - 1];
  }
  return {
    nextMenuItem,
    previousMenuItem
  };
};
const dropEmptyMenuItems = (menuItems, fields, selectedSubMenuItem) => {
  const newMenuItems = menuItems;
  for (const [index, menuItem] of menuItems.entries()) {
    const menuItemFields = fields.filter(field => {
      return field.menu_id === menuItem.id && field.visible && !field.conditionallyDisabled;
    });
    if (menuItemFields.length === 0 && !menuItem.hasOwnProperty('menu_items')) {
      newMenuItems[index].visible = false;
    } else {
      newMenuItems[index].visible = true;
      if (menuItem.hasOwnProperty('menu_items')) {
        newMenuItems[index].menu_items = dropEmptyMenuItems(menuItem.menu_items, fields, selectedSubMenuItem);
      }
    }
  }
  return newMenuItems;
};

/*
* filter sidebar menu from complete menu structure
*/
const getSubMenu = (menu, selectedMainMenuItem) => {
  let subMenu = [];
  for (const key in menu) {
    if (menu.hasOwnProperty(key) && menu[key].id === selectedMainMenuItem) {
      subMenu = menu[key];
    }
  }
  subMenu = addVisibleToMenuItems(subMenu);
  return subMenu;
};

/**
 * Get the current selected menu item based on the hash, selecting subitems if the main one is empty.
 */
const getSelectedSubMenuItem = (subMenu, fields) => {
  let fallBackMenuItem = subMenu && subMenu.menu_items.hasOwnProperty(0) ? subMenu.menu_items[0].id : 'general';
  let foundAnchorInMenu;

  //get flat array of menu items
  let parsedMenuItems = menuItemParser([], subMenu.menu_items);
  let anchor = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('menu');
  //check if this anchor actually exists in our current submenu. If not, clear it
  foundAnchorInMenu = parsedMenuItems.filter(menu_item => menu_item === anchor);
  if (!foundAnchorInMenu) {
    anchor = false;
  }
  let selectedMenuItem = anchor ? anchor : fallBackMenuItem;
  //check if menu item has fields. If not, try a subitem
  let fieldsInMenu = fields.filter(field => field.menu_id === selectedMenuItem);
  if (fieldsInMenu.length === 0) {
    //look up the current menu item
    let menuItem = getMenuItemByName(selectedMenuItem, subMenu.menu_items);
    if (menuItem && menuItem.menu_items && menuItem.menu_items.hasOwnProperty(0)) {
      selectedMenuItem = menuItem.menu_items[0].id;
    }
  }
  return selectedMenuItem;
};

//Get a menu item by name from the menu array
const getMenuItemByName = (name, menuItems) => {
  for (const key in menuItems) {
    let menuItem = menuItems[key];
    if (menuItem.id === name) {
      return menuItem;
    }
    if (menuItem.menu_items) {
      let found = getMenuItemByName(name, menuItem.menu_items);
      if (found) return found;
    }
  }
  return false;
};
const useMenu = (0,zustand__WEBPACK_IMPORTED_MODULE_2__.create)((set, get) => ({
  menuLoaded: false,
  subMenuLoaded: false,
  menu: [],
  previousMenuItem: false,
  nextMenuItem: false,
  selectedMainMenuItem: false,
  selectedSubMenuItem: false,
  hasProItems: false,
  subMenu: [],
  setSelectedSidebarMenuItem: selectedSubMenuItem => set(state => ({
    selectedSubMenuItem
  })),
  setSelectedMainMenuItem: selectedMainMenuItem => set(state => ({
    selectedMainMenuItem
  })),
  //we need to get the main menu item directly from the anchor, otherwise we have to wait for the menu to load in page.js
  fetchSelectedMainMenuItem: () => {
    let selectedMainMenuItem = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('main') || 'dashboard';
    set(state => ({
      selectedMainMenuItem: selectedMainMenuItem
    }));
  },
  fetchSelectedSubMenuItem: async () => {
    let selectedSubMenuItem = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('menu') || 'general';
    set(state => ({
      selectedSubMenuItem: selectedSubMenuItem
    }));
  },
  fetchMainMenuData: async () => {
    let menu = get().menu;
    const menuLoaded = get().menuLoaded;
    //menu doesnt need to reload on next fetch
    menu = !menuLoaded ? await fetchMenu() : menu;
    const selectedMainMenuItem = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('main') || 'dashboard';
    set(state => ({
      menuLoaded: true,
      menu: menu,
      selectedMainMenuItem: selectedMainMenuItem
    }));
  },
  fetchSubMenuData: async fields => {
    let menu = get().menu;
    const menuLoaded = get().menuLoaded;
    //menu doesnt need to reload on next fetch
    menu = !menuLoaded ? await fetchMenu() : menu;
    const selectedMainMenuItem = (0,_utils_getAnchor__WEBPACK_IMPORTED_MODULE_1__["default"])('main') || 'dashboard';
    let subMenu = getSubMenu(menu, selectedMainMenuItem);
    const selectedSubMenuItem = getSelectedSubMenuItem(subMenu, fields);
    const {
      nextMenuItem,
      previousMenuItem
    } = getPreviousAndNextMenuItems(menu, selectedSubMenuItem);
    subMenu.menu_items = dropEmptyMenuItems(subMenu.menu_items, fields, selectedSubMenuItem);
    const hasProItems = subMenu.menu_items.filter(item => {
      return item.pro === true;
    }).length > 0;
    set(state => ({
      subMenuLoaded: true,
      menuLoaded: true,
      menu: menu,
      nextMenuItem: nextMenuItem,
      previousMenuItem: previousMenuItem,
      selectedMainMenuItem: selectedMainMenuItem,
      selectedSubMenuItem: selectedSubMenuItem,
      subMenu: subMenu,
      hasProItems: hasProItems
    }));
  }
}));
const addVisibleToMenuItems = menu => {
  let newMenuItems = menu.menu_items;
  for (let [index, menuItem] of menu.menu_items.entries()) {
    menuItem.visible = true;
    if (menuItem.hasOwnProperty('menu_items')) {
      menuItem = addVisibleToMenuItems(menuItem);
    }
    newMenuItems[index] = menuItem;
  }
  menu.menu_items = newMenuItems;
  menu.visible = true;
  return menu;
};

/***/ }),

/***/ "./src/utils/api.js":
/*!**************************!*\
  !*** ./src/utils/api.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addGoal: () => (/* binding */ addGoal),
/* harmony export */   deleteGoal: () => (/* binding */ deleteGoal),
/* harmony export */   doAction: () => (/* binding */ doAction),
/* harmony export */   getBlock: () => (/* binding */ getBlock),
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   getFields: () => (/* binding */ getFields),
/* harmony export */   getGoalFields: () => (/* binding */ getGoalFields),
/* harmony export */   getGoals: () => (/* binding */ getGoals),
/* harmony export */   getMenu: () => (/* binding */ getMenu),
/* harmony export */   getPosts: () => (/* binding */ getPosts),
/* harmony export */   setFields: () => (/* binding */ setFields),
/* harmony export */   setGoalFields: () => (/* binding */ setGoalFields),
/* harmony export */   setOption: () => (/* binding */ setOption)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");




const usesPlainPermalinks = () => {
  return burst_settings.site_url.indexOf('?') !== -1;
};
const glue = () => {
  return usesPlainPermalinks() ? '&' : '?';
};
/**
 * Get nonce for burst api. Add random string so requests don't get cached
 * @returns {string}
 */
const getNonce = () => {
  return 'nonce=' + burst_settings.burst_nonce + '&token=' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};
const generateError = function (error) {
  let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Server error', 'burst-statistics');
  if (path) {
    const urlWithoutQueryParams = path.split('?')[0];
    const urlParts = urlWithoutQueryParams.split('/');
    const index = urlParts.indexOf('v1') + 1;
    message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Server error in', 'burst-statistics') + ' ' + urlParts[index] + '/' + urlParts[index + 1];
  }
  message += ': ' + error;
  // wrap the message in a div react component and give it an onclick to copy the text to the clipboard
  // this way the user can easily copy the error message and send it to us
  const messageDiv = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Click to copy', 'burst-statistics'),
    onClick: () => {
      navigator.clipboard.writeText(message);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error copied to clipboard', 'burst-statistics'));
    }
  }, message);
  react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(messageDiv, {
    autoClose: 15000
  });
};
const makeRequest = async function (path) {
  let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let args = {
    path,
    method
  };
  if (method === 'POST') {
    data.nonce = burst_settings.burst_nonce;
    args.data = data;
  }
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()(args).then(response => {
    if (!response.request_success) {
      throw new Error('invalid data error');
    }
    if (response.code) {
      throw new Error(response.message);
    }
    delete response.request_success;
    return response;
  }).catch(error => {
    // If REST API fails, try AJAX request
    return ajaxRequest(method, path, data).catch(() => {
      // If AJAX also fails, generate error
      generateError(error.message, args.path);
      throw error;
    });
  });
};
const ajaxRequest = async function (method, path) {
  let requestData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const url = method === 'GET' ? `${siteUrl('ajax')}&rest_action=${path.replace('?', '&')}` : siteUrl('ajax');
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };
  if (method === 'POST') {
    options.body = JSON.stringify({
      path,
      data: requestData
    }, stripControls);
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      generateError(false, response.statusText);
      throw new Error(response.statusText);
    }
    const responseData = await response.json();
    if (!responseData.data || !responseData.data.hasOwnProperty('request_success')) {
      throw new Error('Invalid data error');
    }
    delete responseData.data.request_success;
    // return promise with the data object
    return Promise.resolve(responseData.data);
  } catch (error) {
    return Promise.reject(new Error('AJAX request failed'));
  }
  ;
};

/**
 * All data elements with 'Control' in the name are dropped, to prevent:
 * TypeError: Converting circular structure to JSON
 * @param key
 * @param value
 * @returns {any|undefined}
 */
const stripControls = (key, value) => {
  if (!key) {
    return value;
  }
  if (key && key.includes("Control")) {
    return undefined;
  }
  if (typeof value === "object") {
    return JSON.parse(JSON.stringify(value, stripControls));
  }
  return value;
};

/**
 * if the site is loaded over https, but the site url is not https, force to use https anyway, because otherwise we get mixed content issues.
 * @returns {*}
 */
const siteUrl = type => {
  let url;
  if (typeof type === 'undefined') {
    url = burst_settings.site_url;
  } else {
    url = burst_settings.admin_ajax_url;
  }
  if (window.location.protocol === "https:" && url.indexOf('https://') === -1) {
    return url.replace('http://', 'https://');
  }
  return url;
};
const setOption = (option, value) => makeRequest('burst/v1/options/set' + glue() + getNonce(), 'POST', {
  option: {
    option,
    value
  }
});
const getFields = () => makeRequest('burst/v1/fields/get' + glue() + getNonce());
const setFields = data => {
  return makeRequest('burst/v1/fields/set' + glue(), 'POST', {
    fields: data
  });
};
const getGoalFields = () => makeRequest('burst/v1/goal_fields/get' + glue() + getNonce());
const setGoalFields = data => {
  return makeRequest('burst/v1/goal_fields/set' + glue() + getNonce(), 'POST', {
    fields: data
  });
};
const getGoals = () => makeRequest('burst/v1/goals/get' + glue() + getNonce());
const deleteGoal = id => makeRequest('burst/v1/goals/delete' + glue() + getNonce(), 'POST', {
  id: id
});
const addGoal = () => makeRequest('burst/v1/goals/add' + glue() + getNonce(), 'POST', {});
const getBlock = block => makeRequest('burst/v1/block/' + block + glue() + getNonce());
const doAction = function (action) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return makeRequest(`burst/v1/do_action/${action}`, 'POST', {
    action_data: data
  }).then(response => {
    return response.hasOwnProperty('data') ? response.data : [];
  });
};
const getData = async (type, startDate, endDate, range, args) => {
  return await makeRequest(`burst/v1/data/${type}${glue() + getNonce()}&date_start=${startDate}&date_end=${endDate}&date_range=${range}`, 'POST', args);
};
const getMenu = () => makeRequest('burst/v1/menu/' + glue() + getNonce());
const getPosts = search => makeRequest(`burst/v1/posts/${glue()}${getNonce()}&search=${search}`).then(response => {
  return response.hasOwnProperty('posts') ? response.posts : [];
});

/***/ }),

/***/ "./src/utils/getAnchor.js":
/*!********************************!*\
  !*** ./src/utils/getAnchor.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * helper function to delay after a promise
 * @param ms
 * @returns {function(*): Promise<unknown>}
 */
const getAnchor = level => {
  let url = window.location.href;
  if (url.indexOf('#') === -1) {
    return false;
  }
  let queryString = url.split('#');
  if (queryString.length === 1) {
    return false;
  }
  let urlPart = queryString[1];

  //for submenu, we have to get the string after the slash.
  if (level === 'menu') {
    //if there is no slash, there is no menu level
    if (urlPart.indexOf('/') === -1) {
      return false;
    } else {
      let urlParts = urlPart.split('/');
      if (urlParts.length <= 1) {
        return false;
      } else {
        return urlParts[1];
      }
    }
  } else {
    //main, just get the first.
    if (urlPart.indexOf('/') === -1) {
      return urlPart;
    } else {
      let urlParts = urlPart.split('/');
      return urlParts[0];
    }
  }
  return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAnchor);

/***/ }),

/***/ "./node_modules/clsx/dist/clsx.m.js":
/*!******************************************!*\
  !*** ./node_modules/clsx/dist/clsx.m.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/superjson/dist/esm/accessDeep.js":
/*!*******************************************************!*\
  !*** ./node_modules/superjson/dist/esm/accessDeep.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDeep: () => (/* binding */ getDeep),
/* harmony export */   setDeep: () => (/* binding */ setDeep)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/superjson/dist/esm/is.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/superjson/dist/esm/util.js");


var getNthKey = function (value, n) {
    var keys = value.keys();
    while (n > 0) {
        keys.next();
        n--;
    }
    return keys.next().value;
};
function validatePath(path) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.includes)(path, '__proto__')) {
        throw new Error('__proto__ is not allowed as a property');
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.includes)(path, 'prototype')) {
        throw new Error('prototype is not allowed as a property');
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.includes)(path, 'constructor')) {
        throw new Error('constructor is not allowed as a property');
    }
}
var getDeep = function (object, path) {
    validatePath(path);
    for (var i = 0; i < path.length; i++) {
        var key = path[i];
        if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSet)(object)) {
            object = getNthKey(object, +key);
        }
        else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isMap)(object)) {
            var row = +key;
            var type = +path[++i] === 0 ? 'key' : 'value';
            var keyOfRow = getNthKey(object, row);
            switch (type) {
                case 'key':
                    object = keyOfRow;
                    break;
                case 'value':
                    object = object.get(keyOfRow);
                    break;
            }
        }
        else {
            object = object[key];
        }
    }
    return object;
};
var setDeep = function (object, path, mapper) {
    validatePath(path);
    if (path.length === 0) {
        return mapper(object);
    }
    var parent = object;
    for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(parent)) {
            var index = +key;
            parent = parent[index];
        }
        else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(parent)) {
            parent = parent[key];
        }
        else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSet)(parent)) {
            var row = +key;
            parent = getNthKey(parent, row);
        }
        else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isMap)(parent)) {
            var isEnd = i === path.length - 2;
            if (isEnd) {
                break;
            }
            var row = +key;
            var type = +path[++i] === 0 ? 'key' : 'value';
            var keyOfRow = getNthKey(parent, row);
            switch (type) {
                case 'key':
                    parent = keyOfRow;
                    break;
                case 'value':
                    parent = parent.get(keyOfRow);
                    break;
            }
        }
    }
    var lastKey = path[path.length - 1];
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
    }
    else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
    }
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSet)(parent)) {
        var oldValue = getNthKey(parent, +lastKey);
        var newValue = mapper(oldValue);
        if (oldValue !== newValue) {
            parent["delete"](oldValue);
            parent.add(newValue);
        }
    }
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isMap)(parent)) {
        var row = +path[path.length - 2];
        var keyToRow = getNthKey(parent, row);
        var type = +lastKey === 0 ? 'key' : 'value';
        switch (type) {
            case 'key': {
                var newKey = mapper(keyToRow);
                parent.set(newKey, parent.get(keyToRow));
                if (newKey !== keyToRow) {
                    parent["delete"](keyToRow);
                }
                break;
            }
            case 'value': {
                parent.set(keyToRow, mapper(parent.get(keyToRow)));
                break;
            }
        }
    }
    return object;
};
//# sourceMappingURL=accessDeep.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/class-registry.js":
/*!***********************************************************!*\
  !*** ./node_modules/superjson/dist/esm/class-registry.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClassRegistry: () => (/* binding */ ClassRegistry)
/* harmony export */ });
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registry */ "./node_modules/superjson/dist/esm/registry.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ClassRegistry = /** @class */ (function (_super) {
    __extends(ClassRegistry, _super);
    function ClassRegistry() {
        var _this = _super.call(this, function (c) { return c.name; }) || this;
        _this.classToAllowedProps = new Map();
        return _this;
    }
    ClassRegistry.prototype.register = function (value, options) {
        if (typeof options === 'object') {
            if (options.allowProps) {
                this.classToAllowedProps.set(value, options.allowProps);
            }
            _super.prototype.register.call(this, value, options.identifier);
        }
        else {
            _super.prototype.register.call(this, value, options);
        }
    };
    ClassRegistry.prototype.getAllowedProps = function (value) {
        return this.classToAllowedProps.get(value);
    };
    return ClassRegistry;
}(_registry__WEBPACK_IMPORTED_MODULE_0__.Registry));

//# sourceMappingURL=class-registry.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/custom-transformer-registry.js":
/*!************************************************************************!*\
  !*** ./node_modules/superjson/dist/esm/custom-transformer-registry.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomTransformerRegistry: () => (/* binding */ CustomTransformerRegistry)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/superjson/dist/esm/util.js");

var CustomTransformerRegistry = /** @class */ (function () {
    function CustomTransformerRegistry() {
        this.transfomers = {};
    }
    CustomTransformerRegistry.prototype.register = function (transformer) {
        this.transfomers[transformer.name] = transformer;
    };
    CustomTransformerRegistry.prototype.findApplicable = function (v) {
        return (0,_util__WEBPACK_IMPORTED_MODULE_0__.find)(this.transfomers, function (transformer) {
            return transformer.isApplicable(v);
        });
    };
    CustomTransformerRegistry.prototype.findByName = function (name) {
        return this.transfomers[name];
    };
    return CustomTransformerRegistry;
}());

//# sourceMappingURL=custom-transformer-registry.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/double-indexed-kv.js":
/*!**************************************************************!*\
  !*** ./node_modules/superjson/dist/esm/double-indexed-kv.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DoubleIndexedKV: () => (/* binding */ DoubleIndexedKV)
/* harmony export */ });
var DoubleIndexedKV = /** @class */ (function () {
    function DoubleIndexedKV() {
        this.keyToValue = new Map();
        this.valueToKey = new Map();
    }
    DoubleIndexedKV.prototype.set = function (key, value) {
        this.keyToValue.set(key, value);
        this.valueToKey.set(value, key);
    };
    DoubleIndexedKV.prototype.getByKey = function (key) {
        return this.keyToValue.get(key);
    };
    DoubleIndexedKV.prototype.getByValue = function (value) {
        return this.valueToKey.get(value);
    };
    DoubleIndexedKV.prototype.clear = function () {
        this.keyToValue.clear();
        this.valueToKey.clear();
    };
    return DoubleIndexedKV;
}());

//# sourceMappingURL=double-indexed-kv.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/superjson/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allowErrorProps: () => (/* binding */ allowErrorProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   deserialize: () => (/* binding */ deserialize),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   registerClass: () => (/* binding */ registerClass),
/* harmony export */   registerCustom: () => (/* binding */ registerCustom),
/* harmony export */   registerSymbol: () => (/* binding */ registerSymbol),
/* harmony export */   serialize: () => (/* binding */ serialize),
/* harmony export */   stringify: () => (/* binding */ stringify)
/* harmony export */ });
/* harmony import */ var _class_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-registry */ "./node_modules/superjson/dist/esm/class-registry.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registry */ "./node_modules/superjson/dist/esm/registry.js");
/* harmony import */ var _custom_transformer_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-transformer-registry */ "./node_modules/superjson/dist/esm/custom-transformer-registry.js");
/* harmony import */ var _plainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plainer */ "./node_modules/superjson/dist/esm/plainer.js");
/* harmony import */ var copy_anything__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! copy-anything */ "./node_modules/copy-anything/dist/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};





var SuperJSON = /** @class */ (function () {
    function SuperJSON() {
        this.classRegistry = new _class_registry__WEBPACK_IMPORTED_MODULE_0__.ClassRegistry();
        this.symbolRegistry = new _registry__WEBPACK_IMPORTED_MODULE_1__.Registry(function (s) { var _a; return (_a = s.description) !== null && _a !== void 0 ? _a : ''; });
        this.customTransformerRegistry = new _custom_transformer_registry__WEBPACK_IMPORTED_MODULE_2__.CustomTransformerRegistry();
        this.allowedErrorProps = [];
    }
    SuperJSON.prototype.serialize = function (object) {
        var identities = new Map();
        var output = (0,_plainer__WEBPACK_IMPORTED_MODULE_3__.walker)(object, identities, this);
        var res = {
            json: output.transformedValue
        };
        if (output.annotations) {
            res.meta = __assign(__assign({}, res.meta), { values: output.annotations });
        }
        var equalityAnnotations = (0,_plainer__WEBPACK_IMPORTED_MODULE_3__.generateReferentialEqualityAnnotations)(identities);
        if (equalityAnnotations) {
            res.meta = __assign(__assign({}, res.meta), { referentialEqualities: equalityAnnotations });
        }
        return res;
    };
    SuperJSON.prototype.deserialize = function (payload) {
        var json = payload.json, meta = payload.meta;
        var result = (0,copy_anything__WEBPACK_IMPORTED_MODULE_4__.copy)(json);
        if (meta === null || meta === void 0 ? void 0 : meta.values) {
            result = (0,_plainer__WEBPACK_IMPORTED_MODULE_3__.applyValueAnnotations)(result, meta.values, this);
        }
        if (meta === null || meta === void 0 ? void 0 : meta.referentialEqualities) {
            result = (0,_plainer__WEBPACK_IMPORTED_MODULE_3__.applyReferentialEqualityAnnotations)(result, meta.referentialEqualities);
        }
        return result;
    };
    SuperJSON.prototype.stringify = function (object) {
        return JSON.stringify(this.serialize(object));
    };
    SuperJSON.prototype.parse = function (string) {
        return this.deserialize(JSON.parse(string));
    };
    SuperJSON.prototype.registerClass = function (v, options) {
        this.classRegistry.register(v, options);
    };
    SuperJSON.prototype.registerSymbol = function (v, identifier) {
        this.symbolRegistry.register(v, identifier);
    };
    SuperJSON.prototype.registerCustom = function (transformer, name) {
        this.customTransformerRegistry.register(__assign({ name: name }, transformer));
    };
    SuperJSON.prototype.allowErrorProps = function () {
        var _a;
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        (_a = this.allowedErrorProps).push.apply(_a, __spreadArray([], __read(props)));
    };
    SuperJSON.defaultInstance = new SuperJSON();
    SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
    SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
    SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
    SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
    SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
    SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
    SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
    SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
    return SuperJSON;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuperJSON);
var serialize = SuperJSON.serialize;
var deserialize = SuperJSON.deserialize;
var stringify = SuperJSON.stringify;
var parse = SuperJSON.parse;
var registerClass = SuperJSON.registerClass;
var registerCustom = SuperJSON.registerCustom;
var registerSymbol = SuperJSON.registerSymbol;
var allowErrorProps = SuperJSON.allowErrorProps;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/is.js":
/*!***********************************************!*\
  !*** ./node_modules/superjson/dist/esm/is.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isBigint: () => (/* binding */ isBigint),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isDate: () => (/* binding */ isDate),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   isError: () => (/* binding */ isError),
/* harmony export */   isInfinite: () => (/* binding */ isInfinite),
/* harmony export */   isMap: () => (/* binding */ isMap),
/* harmony export */   isNaNValue: () => (/* binding */ isNaNValue),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isRegExp: () => (/* binding */ isRegExp),
/* harmony export */   isSet: () => (/* binding */ isSet),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isSymbol: () => (/* binding */ isSymbol),
/* harmony export */   isTypedArray: () => (/* binding */ isTypedArray),
/* harmony export */   isURL: () => (/* binding */ isURL),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });
var getType = function (payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
};
var isUndefined = function (payload) {
    return typeof payload === 'undefined';
};
var isNull = function (payload) { return payload === null; };
var isPlainObject = function (payload) {
    if (typeof payload !== 'object' || payload === null)
        return false;
    if (payload === Object.prototype)
        return false;
    if (Object.getPrototypeOf(payload) === null)
        return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
};
var isEmptyObject = function (payload) {
    return isPlainObject(payload) && Object.keys(payload).length === 0;
};
var isArray = function (payload) {
    return Array.isArray(payload);
};
var isString = function (payload) {
    return typeof payload === 'string';
};
var isNumber = function (payload) {
    return typeof payload === 'number' && !isNaN(payload);
};
var isBoolean = function (payload) {
    return typeof payload === 'boolean';
};
var isRegExp = function (payload) {
    return payload instanceof RegExp;
};
var isMap = function (payload) {
    return payload instanceof Map;
};
var isSet = function (payload) {
    return payload instanceof Set;
};
var isSymbol = function (payload) {
    return getType(payload) === 'Symbol';
};
var isDate = function (payload) {
    return payload instanceof Date && !isNaN(payload.valueOf());
};
var isError = function (payload) {
    return payload instanceof Error;
};
var isNaNValue = function (payload) {
    return typeof payload === 'number' && isNaN(payload);
};
var isPrimitive = function (payload) {
    return isBoolean(payload) ||
        isNull(payload) ||
        isUndefined(payload) ||
        isNumber(payload) ||
        isString(payload) ||
        isSymbol(payload);
};
var isBigint = function (payload) {
    return typeof payload === 'bigint';
};
var isInfinite = function (payload) {
    return payload === Infinity || payload === -Infinity;
};
var isTypedArray = function (payload) {
    return ArrayBuffer.isView(payload) && !(payload instanceof DataView);
};
var isURL = function (payload) { return payload instanceof URL; };
//# sourceMappingURL=is.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/pathstringifier.js":
/*!************************************************************!*\
  !*** ./node_modules/superjson/dist/esm/pathstringifier.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeKey: () => (/* binding */ escapeKey),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   stringifyPath: () => (/* binding */ stringifyPath)
/* harmony export */ });
var escapeKey = function (key) { return key.replace(/\./g, '\\.'); };
var stringifyPath = function (path) {
    return path
        .map(String)
        .map(escapeKey)
        .join('.');
};
var parsePath = function (string) {
    var result = [];
    var segment = '';
    for (var i = 0; i < string.length; i++) {
        var char = string.charAt(i);
        var isEscapedDot = char === '\\' && string.charAt(i + 1) === '.';
        if (isEscapedDot) {
            segment += '.';
            i++;
            continue;
        }
        var isEndOfSegment = char === '.';
        if (isEndOfSegment) {
            result.push(segment);
            segment = '';
            continue;
        }
        segment += char;
    }
    var lastSegment = segment;
    result.push(lastSegment);
    return result;
};
//# sourceMappingURL=pathstringifier.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/plainer.js":
/*!****************************************************!*\
  !*** ./node_modules/superjson/dist/esm/plainer.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyReferentialEqualityAnnotations: () => (/* binding */ applyReferentialEqualityAnnotations),
/* harmony export */   applyValueAnnotations: () => (/* binding */ applyValueAnnotations),
/* harmony export */   generateReferentialEqualityAnnotations: () => (/* binding */ generateReferentialEqualityAnnotations),
/* harmony export */   walker: () => (/* binding */ walker)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/superjson/dist/esm/is.js");
/* harmony import */ var _pathstringifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathstringifier */ "./node_modules/superjson/dist/esm/pathstringifier.js");
/* harmony import */ var _transformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformer */ "./node_modules/superjson/dist/esm/transformer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/superjson/dist/esm/util.js");
/* harmony import */ var _accessDeep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./accessDeep */ "./node_modules/superjson/dist/esm/accessDeep.js");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};






function traverse(tree, walker, origin) {
    if (origin === void 0) { origin = []; }
    if (!tree) {
        return;
    }
    if (!(0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(tree)) {
        (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(tree, function (subtree, key) {
            return traverse(subtree, walker, __spreadArray(__spreadArray([], __read(origin)), __read((0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.parsePath)(key))));
        });
        return;
    }
    var _a = __read(tree, 2), nodeValue = _a[0], children = _a[1];
    if (children) {
        (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(children, function (child, key) {
            traverse(child, walker, __spreadArray(__spreadArray([], __read(origin)), __read((0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.parsePath)(key))));
        });
    }
    walker(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, function (type, path) {
        plain = (0,_accessDeep__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, path, function (v) { return (0,_transformer__WEBPACK_IMPORTED_MODULE_2__.untransformValue)(v, type, superJson); });
    });
    return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
        var object = (0,_accessDeep__WEBPACK_IMPORTED_MODULE_4__.getDeep)(plain, (0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.parsePath)(path));
        identicalPaths.map(_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.parsePath).forEach(function (identicalObjectPath) {
            plain = (0,_accessDeep__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, identicalObjectPath, function () { return object; });
        });
    }
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(annotations)) {
        var _a = __read(annotations, 2), root = _a[0], other = _a[1];
        root.forEach(function (identicalPath) {
            plain = (0,_accessDeep__WEBPACK_IMPORTED_MODULE_4__.setDeep)(plain, (0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.parsePath)(identicalPath), function () { return plain; });
        });
        if (other) {
            (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(other, apply);
        }
    }
    else {
        (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(annotations, apply);
    }
    return plain;
}
var isDeep = function (object, superJson) {
    return (0,_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(object) ||
        (0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(object) ||
        (0,_is__WEBPACK_IMPORTED_MODULE_0__.isMap)(object) ||
        (0,_is__WEBPACK_IMPORTED_MODULE_0__.isSet)(object) ||
        (0,_transformer__WEBPACK_IMPORTED_MODULE_2__.isInstanceOfRegisteredClass)(object, superJson);
};
function addIdentity(object, path, identities) {
    var existingSet = identities.get(object);
    if (existingSet) {
        existingSet.push(path);
    }
    else {
        identities.set(object, [path]);
    }
}
function generateReferentialEqualityAnnotations(identitites) {
    var result = {};
    var rootEqualityPaths = undefined;
    identitites.forEach(function (paths) {
        if (paths.length <= 1) {
            return;
        }
        var _a = __read(paths
            .map(function (path) { return path.map(String); })
            .sort(function (a, b) { return a.length - b.length; })), shortestPath = _a[0], identicalPaths = _a.slice(1);
        if (shortestPath.length === 0) {
            rootEqualityPaths = identicalPaths.map(_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.stringifyPath);
        }
        else {
            result[(0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.stringifyPath)(shortestPath)] = identicalPaths.map(_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.stringifyPath);
        }
    });
    if (rootEqualityPaths) {
        if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(result)) {
            return [rootEqualityPaths];
        }
        else {
            return [rootEqualityPaths, result];
        }
    }
    else {
        return (0,_is__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(result) ? undefined : result;
    }
}
var walker = function (object, identities, superJson, path, objectsInThisPath) {
    var _a;
    if (path === void 0) { path = []; }
    if (objectsInThisPath === void 0) { objectsInThisPath = []; }
    if (!(0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(object)) {
        addIdentity(object, path, identities);
    }
    if (!isDeep(object, superJson)) {
        var transformed_1 = (0,_transformer__WEBPACK_IMPORTED_MODULE_2__.transformValue)(object, superJson);
        if (transformed_1) {
            return {
                transformedValue: transformed_1.value,
                annotations: [transformed_1.type]
            };
        }
        else {
            return {
                transformedValue: object
            };
        }
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_3__.includes)(objectsInThisPath, object)) {
        return {
            transformedValue: null
        };
    }
    var transformationResult = (0,_transformer__WEBPACK_IMPORTED_MODULE_2__.transformValue)(object, superJson);
    var transformed = (_a = transformationResult === null || transformationResult === void 0 ? void 0 : transformationResult.value) !== null && _a !== void 0 ? _a : object;
    if (!(0,_is__WEBPACK_IMPORTED_MODULE_0__.isPrimitive)(object)) {
        objectsInThisPath = __spreadArray(__spreadArray([], __read(objectsInThisPath)), [object]);
    }
    var transformedValue = (0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(transformed) ? [] : {};
    var innerAnnotations = {};
    (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(transformed, function (value, index) {
        var recursiveResult = walker(value, identities, superJson, __spreadArray(__spreadArray([], __read(path)), [index]), objectsInThisPath);
        transformedValue[index] = recursiveResult.transformedValue;
        if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(recursiveResult.annotations)) {
            innerAnnotations[index] = recursiveResult.annotations;
        }
        else if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(recursiveResult.annotations)) {
            (0,_util__WEBPACK_IMPORTED_MODULE_3__.forEach)(recursiveResult.annotations, function (tree, key) {
                innerAnnotations[(0,_pathstringifier__WEBPACK_IMPORTED_MODULE_1__.escapeKey)(index) + '.' + key] = tree;
            });
        }
    });
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject)(innerAnnotations)) {
        return {
            transformedValue: transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type]
                : undefined
        };
    }
    else {
        return {
            transformedValue: transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type, innerAnnotations]
                : innerAnnotations
        };
    }
};
//# sourceMappingURL=plainer.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/registry.js":
/*!*****************************************************!*\
  !*** ./node_modules/superjson/dist/esm/registry.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Registry: () => (/* binding */ Registry)
/* harmony export */ });
/* harmony import */ var _double_indexed_kv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./double-indexed-kv */ "./node_modules/superjson/dist/esm/double-indexed-kv.js");

var Registry = /** @class */ (function () {
    function Registry(generateIdentifier) {
        this.generateIdentifier = generateIdentifier;
        this.kv = new _double_indexed_kv__WEBPACK_IMPORTED_MODULE_0__.DoubleIndexedKV();
    }
    Registry.prototype.register = function (value, identifier) {
        if (this.kv.getByValue(value)) {
            return;
        }
        if (!identifier) {
            identifier = this.generateIdentifier(value);
        }
        this.kv.set(identifier, value);
    };
    Registry.prototype.clear = function () {
        this.kv.clear();
    };
    Registry.prototype.getIdentifier = function (value) {
        return this.kv.getByValue(value);
    };
    Registry.prototype.getValue = function (identifier) {
        return this.kv.getByKey(identifier);
    };
    return Registry;
}());

//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/transformer.js":
/*!********************************************************!*\
  !*** ./node_modules/superjson/dist/esm/transformer.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInstanceOfRegisteredClass: () => (/* binding */ isInstanceOfRegisteredClass),
/* harmony export */   transformValue: () => (/* binding */ transformValue),
/* harmony export */   untransformValue: () => (/* binding */ untransformValue)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./node_modules/superjson/dist/esm/is.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/superjson/dist/esm/util.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
        isApplicable: isApplicable,
        annotation: annotation,
        transform: transform,
        untransform: untransform
    };
}
var simpleRules = [
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isUndefined, 'undefined', function () { return null; }, function () { return undefined; }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isBigint, 'bigint', function (v) { return v.toString(); }, function (v) {
        if (typeof BigInt !== 'undefined') {
            return BigInt(v);
        }
        console.error('Please add a BigInt polyfill.');
        return v;
    }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isDate, 'Date', function (v) { return v.toISOString(); }, function (v) { return new Date(v); }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isError, 'Error', function (v, superJson) {
        var baseError = {
            name: v.name,
            message: v.message
        };
        superJson.allowedErrorProps.forEach(function (prop) {
            baseError[prop] = v[prop];
        });
        return baseError;
    }, function (v, superJson) {
        var e = new Error(v.message);
        e.name = v.name;
        e.stack = v.stack;
        superJson.allowedErrorProps.forEach(function (prop) {
            e[prop] = v[prop];
        });
        return e;
    }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isRegExp, 'regexp', function (v) { return '' + v; }, function (regex) {
        var body = regex.slice(1, regex.lastIndexOf('/'));
        var flags = regex.slice(regex.lastIndexOf('/') + 1);
        return new RegExp(body, flags);
    }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isSet, 'set', 
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    function (v) { return __spreadArray([], __read(v.values())); }, function (v) { return new Set(v); }),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isMap, 'map', function (v) { return __spreadArray([], __read(v.entries())); }, function (v) { return new Map(v); }),
    simpleTransformation(function (v) { return (0,_is__WEBPACK_IMPORTED_MODULE_0__.isNaNValue)(v) || (0,_is__WEBPACK_IMPORTED_MODULE_0__.isInfinite)(v); }, 'number', function (v) {
        if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isNaNValue)(v)) {
            return 'NaN';
        }
        if (v > 0) {
            return 'Infinity';
        }
        else {
            return '-Infinity';
        }
    }, Number),
    simpleTransformation(function (v) { return v === 0 && 1 / v === -Infinity; }, 'number', function () {
        return '-0';
    }, Number),
    simpleTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isURL, 'URL', function (v) { return v.toString(); }, function (v) { return new URL(v); }),
];
function compositeTransformation(isApplicable, annotation, transform, untransform) {
    return {
        isApplicable: isApplicable,
        annotation: annotation,
        transform: transform,
        untransform: untransform
    };
}
var symbolRule = compositeTransformation(function (s, superJson) {
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(s)) {
        var isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
        return isRegistered;
    }
    return false;
}, function (s, superJson) {
    var identifier = superJson.symbolRegistry.getIdentifier(s);
    return ['symbol', identifier];
}, function (v) { return v.description; }, function (_, a, superJson) {
    var value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
        throw new Error('Trying to deserialize unknown symbol');
    }
    return value;
});
var constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray,
].reduce(function (obj, ctor) {
    obj[ctor.name] = ctor;
    return obj;
}, {});
var typedArrayRule = compositeTransformation(_is__WEBPACK_IMPORTED_MODULE_0__.isTypedArray, function (v) { return ['typed-array', v.constructor.name]; }, function (v) { return __spreadArray([], __read(v)); }, function (v, a) {
    var ctor = constructorToName[a[1]];
    if (!ctor) {
        throw new Error('Trying to deserialize unknown typed array');
    }
    return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
    if (potentialClass === null || potentialClass === void 0 ? void 0 : potentialClass.constructor) {
        var isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
        return isRegistered;
    }
    return false;
}
var classRule = compositeTransformation(isInstanceOfRegisteredClass, function (clazz, superJson) {
    var identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ['class', identifier];
}, function (clazz, superJson) {
    var allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
        return __assign({}, clazz);
    }
    var result = {};
    allowedProps.forEach(function (prop) {
        result[prop] = clazz[prop];
    });
    return result;
}, function (v, a, superJson) {
    var clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
        throw new Error('Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564');
    }
    return Object.assign(Object.create(clazz.prototype), v);
});
var customRule = compositeTransformation(function (value, superJson) {
    return !!superJson.customTransformerRegistry.findApplicable(value);
}, function (value, superJson) {
    var transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ['custom', transformer.name];
}, function (value, superJson) {
    var transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
}, function (v, a, superJson) {
    var transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
        throw new Error('Trying to deserialize unknown custom value');
    }
    return transformer.deserialize(v);
});
var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
var transformValue = function (value, superJson) {
    var applicableCompositeRule = (0,_util__WEBPACK_IMPORTED_MODULE_1__.findArr)(compositeRules, function (rule) {
        return rule.isApplicable(value, superJson);
    });
    if (applicableCompositeRule) {
        return {
            value: applicableCompositeRule.transform(value, superJson),
            type: applicableCompositeRule.annotation(value, superJson)
        };
    }
    var applicableSimpleRule = (0,_util__WEBPACK_IMPORTED_MODULE_1__.findArr)(simpleRules, function (rule) {
        return rule.isApplicable(value, superJson);
    });
    if (applicableSimpleRule) {
        return {
            value: applicableSimpleRule.transform(value, superJson),
            type: applicableSimpleRule.annotation
        };
    }
    return undefined;
};
var simpleRulesByAnnotation = {};
simpleRules.forEach(function (rule) {
    simpleRulesByAnnotation[rule.annotation] = rule;
});
var untransformValue = function (json, type, superJson) {
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isArray)(type)) {
        switch (type[0]) {
            case 'symbol':
                return symbolRule.untransform(json, type, superJson);
            case 'class':
                return classRule.untransform(json, type, superJson);
            case 'custom':
                return customRule.untransform(json, type, superJson);
            case 'typed-array':
                return typedArrayRule.untransform(json, type, superJson);
            default:
                throw new Error('Unknown transformation: ' + type);
        }
    }
    else {
        var transformation = simpleRulesByAnnotation[type];
        if (!transformation) {
            throw new Error('Unknown transformation: ' + type);
        }
        return transformation.untransform(json, superJson);
    }
};
//# sourceMappingURL=transformer.js.map

/***/ }),

/***/ "./node_modules/superjson/dist/esm/util.js":
/*!*************************************************!*\
  !*** ./node_modules/superjson/dist/esm/util.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findArr: () => (/* binding */ findArr),
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   includes: () => (/* binding */ includes)
/* harmony export */ });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
function valuesOfObj(record) {
    if ('values' in Object) {
        // eslint-disable-next-line es5/no-es6-methods
        return Object.values(record);
    }
    var values = [];
    // eslint-disable-next-line no-restricted-syntax
    for (var key in record) {
        if (record.hasOwnProperty(key)) {
            values.push(record[key]);
        }
    }
    return values;
}
function find(record, predicate) {
    var values = valuesOfObj(record);
    if ('find' in values) {
        // eslint-disable-next-line es5/no-es6-methods
        return values.find(predicate);
    }
    var valuesNotNever = values;
    for (var i = 0; i < valuesNotNever.length; i++) {
        var value = valuesNotNever[i];
        if (predicate(value)) {
            return value;
        }
    }
    return undefined;
}
function forEach(record, run) {
    Object.entries(record).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return run(value, key);
    });
}
function includes(arr, value) {
    return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
    for (var i = 0; i < record.length; i++) {
        var value = record[i];
        if (predicate(value)) {
            return value;
        }
    }
    return undefined;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");
var shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/use-sync-external-store/shim/index.js");

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var useSyncExternalStore = shim.useSyncExternalStore;

// for CommonJS interop.

var useRef = React.useRef,
    useEffect = React.useEffect,
    useMemo = React.useMemo,
    useDebugValue = React.useDebugValue; // Same as useSyncExternalStore, but supports selector and isEqual arguments.

function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  // Use this to track the rendered snapshot.
  var instRef = useRef(null);
  var inst;

  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }

  var _useMemo = useMemo(function () {
    // Track the memoized state using closure variables that are local to this
    // memoized instance of a getSnapshot function. Intentionally not using a
    // useRef hook, because that state would be shared across all concurrent
    // copies of the hook/component.
    var hasMemo = false;
    var memoizedSnapshot;
    var memoizedSelection;

    var memoizedSelector = function (nextSnapshot) {
      if (!hasMemo) {
        // The first time the hook is called, there is no memoized result.
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;

        var _nextSelection = selector(nextSnapshot);

        if (isEqual !== undefined) {
          // Even if the selector has changed, the currently rendered selection
          // may be equal to the new selection. We should attempt to reuse the
          // current value if possible, to preserve downstream memoizations.
          if (inst.hasValue) {
            var currentSelection = inst.value;

            if (isEqual(currentSelection, _nextSelection)) {
              memoizedSelection = currentSelection;
              return currentSelection;
            }
          }
        }

        memoizedSelection = _nextSelection;
        return _nextSelection;
      } // We may be able to reuse the previous invocation's result.


      // We may be able to reuse the previous invocation's result.
      var prevSnapshot = memoizedSnapshot;
      var prevSelection = memoizedSelection;

      if (objectIs(prevSnapshot, nextSnapshot)) {
        // The snapshot is the same as last time. Reuse the previous selection.
        return prevSelection;
      } // The snapshot has changed, so we need to compute a new selection.


      // The snapshot has changed, so we need to compute a new selection.
      var nextSelection = selector(nextSnapshot); // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.

      // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    }; // Assigning this to a constant so that Flow knows it can't change.


    // Assigning this to a constant so that Flow knows it can't change.
    var maybeGetServerSnapshot = getServerSnapshot === undefined ? null : getServerSnapshot;

    var getSnapshotWithSelector = function () {
      return memoizedSelector(getSnapshot());
    };

    var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? undefined : function () {
      return memoizedSelector(maybeGetServerSnapshot());
    };
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]),
      getSelection = _useMemo[0],
      getServerSelection = _useMemo[1];

  var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
  useEffect(function () {
    inst.hasValue = true;
    inst.value = value;
  }, [value]);
  useDebugValue(value);
  return value;
}

exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@tanstack/match-sorter-utils/build/lib/index.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/match-sorter-utils/build/lib/index.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareItems: () => (/* binding */ compareItems),
/* harmony export */   rankItem: () => (/* binding */ rankItem),
/* harmony export */   rankings: () => (/* binding */ rankings)
/* harmony export */ });
/**
 * match-sorter-utils
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const characterMap = {
  À: 'A',
  Á: 'A',
  Â: 'A',
  Ã: 'A',
  Ä: 'A',
  Å: 'A',
  Ấ: 'A',
  Ắ: 'A',
  Ẳ: 'A',
  Ẵ: 'A',
  Ặ: 'A',
  Æ: 'AE',
  Ầ: 'A',
  Ằ: 'A',
  Ȃ: 'A',
  Ç: 'C',
  Ḉ: 'C',
  È: 'E',
  É: 'E',
  Ê: 'E',
  Ë: 'E',
  Ế: 'E',
  Ḗ: 'E',
  Ề: 'E',
  Ḕ: 'E',
  Ḝ: 'E',
  Ȇ: 'E',
  Ì: 'I',
  Í: 'I',
  Î: 'I',
  Ï: 'I',
  Ḯ: 'I',
  Ȋ: 'I',
  Ð: 'D',
  Ñ: 'N',
  Ò: 'O',
  Ó: 'O',
  Ô: 'O',
  Õ: 'O',
  Ö: 'O',
  Ø: 'O',
  Ố: 'O',
  Ṍ: 'O',
  Ṓ: 'O',
  Ȏ: 'O',
  Ù: 'U',
  Ú: 'U',
  Û: 'U',
  Ü: 'U',
  Ý: 'Y',
  à: 'a',
  á: 'a',
  â: 'a',
  ã: 'a',
  ä: 'a',
  å: 'a',
  ấ: 'a',
  ắ: 'a',
  ẳ: 'a',
  ẵ: 'a',
  ặ: 'a',
  æ: 'ae',
  ầ: 'a',
  ằ: 'a',
  ȃ: 'a',
  ç: 'c',
  ḉ: 'c',
  è: 'e',
  é: 'e',
  ê: 'e',
  ë: 'e',
  ế: 'e',
  ḗ: 'e',
  ề: 'e',
  ḕ: 'e',
  ḝ: 'e',
  ȇ: 'e',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  ḯ: 'i',
  ȋ: 'i',
  ð: 'd',
  ñ: 'n',
  ò: 'o',
  ó: 'o',
  ô: 'o',
  õ: 'o',
  ö: 'o',
  ø: 'o',
  ố: 'o',
  ṍ: 'o',
  ṓ: 'o',
  ȏ: 'o',
  ù: 'u',
  ú: 'u',
  û: 'u',
  ü: 'u',
  ý: 'y',
  ÿ: 'y',
  Ā: 'A',
  ā: 'a',
  Ă: 'A',
  ă: 'a',
  Ą: 'A',
  ą: 'a',
  Ć: 'C',
  ć: 'c',
  Ĉ: 'C',
  ĉ: 'c',
  Ċ: 'C',
  ċ: 'c',
  Č: 'C',
  č: 'c',
  C̆: 'C',
  c̆: 'c',
  Ď: 'D',
  ď: 'd',
  Đ: 'D',
  đ: 'd',
  Ē: 'E',
  ē: 'e',
  Ĕ: 'E',
  ĕ: 'e',
  Ė: 'E',
  ė: 'e',
  Ę: 'E',
  ę: 'e',
  Ě: 'E',
  ě: 'e',
  Ĝ: 'G',
  Ǵ: 'G',
  ĝ: 'g',
  ǵ: 'g',
  Ğ: 'G',
  ğ: 'g',
  Ġ: 'G',
  ġ: 'g',
  Ģ: 'G',
  ģ: 'g',
  Ĥ: 'H',
  ĥ: 'h',
  Ħ: 'H',
  ħ: 'h',
  Ḫ: 'H',
  ḫ: 'h',
  Ĩ: 'I',
  ĩ: 'i',
  Ī: 'I',
  ī: 'i',
  Ĭ: 'I',
  ĭ: 'i',
  Į: 'I',
  į: 'i',
  İ: 'I',
  ı: 'i',
  Ĳ: 'IJ',
  ĳ: 'ij',
  Ĵ: 'J',
  ĵ: 'j',
  Ķ: 'K',
  ķ: 'k',
  Ḱ: 'K',
  ḱ: 'k',
  K̆: 'K',
  k̆: 'k',
  Ĺ: 'L',
  ĺ: 'l',
  Ļ: 'L',
  ļ: 'l',
  Ľ: 'L',
  ľ: 'l',
  Ŀ: 'L',
  ŀ: 'l',
  Ł: 'l',
  ł: 'l',
  Ḿ: 'M',
  ḿ: 'm',
  M̆: 'M',
  m̆: 'm',
  Ń: 'N',
  ń: 'n',
  Ņ: 'N',
  ņ: 'n',
  Ň: 'N',
  ň: 'n',
  ŉ: 'n',
  N̆: 'N',
  n̆: 'n',
  Ō: 'O',
  ō: 'o',
  Ŏ: 'O',
  ŏ: 'o',
  Ő: 'O',
  ő: 'o',
  Œ: 'OE',
  œ: 'oe',
  P̆: 'P',
  p̆: 'p',
  Ŕ: 'R',
  ŕ: 'r',
  Ŗ: 'R',
  ŗ: 'r',
  Ř: 'R',
  ř: 'r',
  R̆: 'R',
  r̆: 'r',
  Ȓ: 'R',
  ȓ: 'r',
  Ś: 'S',
  ś: 's',
  Ŝ: 'S',
  ŝ: 's',
  Ş: 'S',
  Ș: 'S',
  ș: 's',
  ş: 's',
  Š: 'S',
  š: 's',
  Ţ: 'T',
  ţ: 't',
  ț: 't',
  Ț: 'T',
  Ť: 'T',
  ť: 't',
  Ŧ: 'T',
  ŧ: 't',
  T̆: 'T',
  t̆: 't',
  Ũ: 'U',
  ũ: 'u',
  Ū: 'U',
  ū: 'u',
  Ŭ: 'U',
  ŭ: 'u',
  Ů: 'U',
  ů: 'u',
  Ű: 'U',
  ű: 'u',
  Ų: 'U',
  ų: 'u',
  Ȗ: 'U',
  ȗ: 'u',
  V̆: 'V',
  v̆: 'v',
  Ŵ: 'W',
  ŵ: 'w',
  Ẃ: 'W',
  ẃ: 'w',
  X̆: 'X',
  x̆: 'x',
  Ŷ: 'Y',
  ŷ: 'y',
  Ÿ: 'Y',
  Y̆: 'Y',
  y̆: 'y',
  Ź: 'Z',
  ź: 'z',
  Ż: 'Z',
  ż: 'z',
  Ž: 'Z',
  ž: 'z',
  ſ: 's',
  ƒ: 'f',
  Ơ: 'O',
  ơ: 'o',
  Ư: 'U',
  ư: 'u',
  Ǎ: 'A',
  ǎ: 'a',
  Ǐ: 'I',
  ǐ: 'i',
  Ǒ: 'O',
  ǒ: 'o',
  Ǔ: 'U',
  ǔ: 'u',
  Ǖ: 'U',
  ǖ: 'u',
  Ǘ: 'U',
  ǘ: 'u',
  Ǚ: 'U',
  ǚ: 'u',
  Ǜ: 'U',
  ǜ: 'u',
  Ứ: 'U',
  ứ: 'u',
  Ṹ: 'U',
  ṹ: 'u',
  Ǻ: 'A',
  ǻ: 'a',
  Ǽ: 'AE',
  ǽ: 'ae',
  Ǿ: 'O',
  ǿ: 'o',
  Þ: 'TH',
  þ: 'th',
  Ṕ: 'P',
  ṕ: 'p',
  Ṥ: 'S',
  ṥ: 's',
  X́: 'X',
  x́: 'x',
  Ѓ: 'Г',
  ѓ: 'г',
  Ќ: 'К',
  ќ: 'к',
  A̋: 'A',
  a̋: 'a',
  E̋: 'E',
  e̋: 'e',
  I̋: 'I',
  i̋: 'i',
  Ǹ: 'N',
  ǹ: 'n',
  Ồ: 'O',
  ồ: 'o',
  Ṑ: 'O',
  ṑ: 'o',
  Ừ: 'U',
  ừ: 'u',
  Ẁ: 'W',
  ẁ: 'w',
  Ỳ: 'Y',
  ỳ: 'y',
  Ȁ: 'A',
  ȁ: 'a',
  Ȅ: 'E',
  ȅ: 'e',
  Ȉ: 'I',
  ȉ: 'i',
  Ȍ: 'O',
  ȍ: 'o',
  Ȑ: 'R',
  ȑ: 'r',
  Ȕ: 'U',
  ȕ: 'u',
  B̌: 'B',
  b̌: 'b',
  Č̣: 'C',
  č̣: 'c',
  Ê̌: 'E',
  ê̌: 'e',
  F̌: 'F',
  f̌: 'f',
  Ǧ: 'G',
  ǧ: 'g',
  Ȟ: 'H',
  ȟ: 'h',
  J̌: 'J',
  ǰ: 'j',
  Ǩ: 'K',
  ǩ: 'k',
  M̌: 'M',
  m̌: 'm',
  P̌: 'P',
  p̌: 'p',
  Q̌: 'Q',
  q̌: 'q',
  Ř̩: 'R',
  ř̩: 'r',
  Ṧ: 'S',
  ṧ: 's',
  V̌: 'V',
  v̌: 'v',
  W̌: 'W',
  w̌: 'w',
  X̌: 'X',
  x̌: 'x',
  Y̌: 'Y',
  y̌: 'y',
  A̧: 'A',
  a̧: 'a',
  B̧: 'B',
  b̧: 'b',
  Ḑ: 'D',
  ḑ: 'd',
  Ȩ: 'E',
  ȩ: 'e',
  Ɛ̧: 'E',
  ɛ̧: 'e',
  Ḩ: 'H',
  ḩ: 'h',
  I̧: 'I',
  i̧: 'i',
  Ɨ̧: 'I',
  ɨ̧: 'i',
  M̧: 'M',
  m̧: 'm',
  O̧: 'O',
  o̧: 'o',
  Q̧: 'Q',
  q̧: 'q',
  U̧: 'U',
  u̧: 'u',
  X̧: 'X',
  x̧: 'x',
  Z̧: 'Z',
  z̧: 'z'
};
const chars = Object.keys(characterMap).join('|');
const allAccents = new RegExp(chars, 'g');
function removeAccents(str) {
  return str.replace(allAccents, match => {
    return characterMap[match];
  });
}

/**
 * @name match-sorter
 * @license MIT license.
 * @copyright (c) 2099 Kent C. Dodds
 * @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
 */
const rankings = {
  CASE_SENSITIVE_EQUAL: 7,
  EQUAL: 6,
  STARTS_WITH: 5,
  WORD_STARTS_WITH: 4,
  CONTAINS: 3,
  ACRONYM: 2,
  MATCHES: 1,
  NO_MATCH: 0
};
/**
 * Gets the highest ranking for value for the given item based on its values for the given keys
 * @param {*} item - the item to rank
 * @param {Array} keys - the keys to get values from the item for the ranking
 * @param {String} value - the value to rank against
 * @param {Object} options - options to control the ranking
 * @return {{rank: Number, accessorIndex: Number, accessorThreshold: Number}} - the highest ranking
 */
function rankItem(item, value, options) {
  var _options$threshold;
  options = options || {};
  options.threshold = (_options$threshold = options.threshold) != null ? _options$threshold : rankings.MATCHES;
  if (!options.accessors) {
    // if keys is not specified, then we assume the item given is ready to be matched
    const rank = getMatchRanking(item, value, options);
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: item,
      rank,
      accessorIndex: -1,
      accessorThreshold: options.threshold,
      passed: rank >= options.threshold
    };
  }
  const valuesToRank = getAllValuesToRank(item, options.accessors);
  const rankingInfo = {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    accessorIndex: -1,
    accessorThreshold: options.threshold,
    passed: false
  };
  for (let i = 0; i < valuesToRank.length; i++) {
    const rankValue = valuesToRank[i];
    let newRank = getMatchRanking(rankValue.itemValue, value, options);
    const {
      minRanking,
      maxRanking,
      threshold = options.threshold
    } = rankValue.attributes;
    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }
    newRank = Math.min(newRank, maxRanking);
    if (newRank >= threshold && newRank > rankingInfo.rank) {
      rankingInfo.rank = newRank;
      rankingInfo.passed = true;
      rankingInfo.accessorIndex = i;
      rankingInfo.accessorThreshold = threshold;
      rankingInfo.rankedValue = rankValue.itemValue;
    }
  }
  return rankingInfo;
}

/**
 * Gives a rankings score based on how well the two strings match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @param {Object} options - options for the match (like keepDiacritics for comparison)
 * @returns {Number} the ranking for how well stringToRank matches testString
 */
function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options);

  // too long
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }

  // case sensitive equals
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }

  // Lower casing before further comparison
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();

  // case insensitive equals
  if (testString === stringToRank) {
    return rankings.EQUAL;
  }

  // starts with
  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  }

  // word starts with
  if (testString.includes(` ${stringToRank}`)) {
    return rankings.WORD_STARTS_WITH;
  }

  // contains
  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    // If the only character in the given stringToRank
    //   isn't even contained in the testString, then
    //   it's definitely not a match.
    return rankings.NO_MATCH;
  }

  // acronym
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }

  // will return a number between rankings.MATCHES and
  // rankings.MATCHES + 1 depending  on how close of a match it is.
  return getClosenessRanking(testString, stringToRank);
}

/**
 * Generates an acronym for a string.
 *
 * @param {String} string the string for which to produce the acronym
 * @returns {String} the acronym
 */
function getAcronym(string) {
  let acronym = '';
  const wordsInString = string.split(' ');
  wordsInString.forEach(wordInString => {
    const splitByHyphenWords = wordInString.split('-');
    splitByHyphenWords.forEach(splitByHyphenWord => {
      acronym += splitByHyphenWord.substr(0, 1);
    });
  });
  return acronym;
}

/**
 * Returns a score based on how spread apart the
 * characters from the stringToRank are within the testString.
 * A number close to rankings.MATCHES represents a loose match. A number close
 * to rankings.MATCHES + 1 represents a tighter match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @returns {Number} the number between rankings.MATCHES and
 * rankings.MATCHES + 1 for how well stringToRank matches testString
 */
function getClosenessRanking(testString, stringToRank) {
  let matchingInOrderCharCount = 0;
  let charNumber = 0;
  function findMatchingCharacter(matchChar, string, index) {
    for (let j = index, J = string.length; j < J; j++) {
      const stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread) {
    const spreadPercentage = 1 / spread;
    const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }
  const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (let i = 1, I = stringToRank.length; i < I; i++) {
    const matchChar = stringToRank[i];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    const found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }
  const spread = charNumber - firstIndex;
  return getRanking(spread);
}

/**
 * Sorts items that have a rank, index, and accessorIndex
 * @param {Object} a - the first item to sort
 * @param {Object} b - the second item to sort
 * @return {Number} -1 if a should come first, 1 if b should come first, 0 if equal
 */
function compareItems(a, b) {
  return a.rank === b.rank ? 0 : a.rank > b.rank ? -1 : 1;
}

/**
 * Prepares value for comparison by stringifying it, removing diacritics (if specified)
 * @param {String} value - the value to clean
 * @param {Object} options - {keepDiacritics: whether to remove diacritics}
 * @return {String} the prepared value
 */
function prepareValueForComparison(value, _ref) {
  let {
    keepDiacritics
  } = _ref;
  // value might not actually be a string at this point (we don't get to choose)
  // so part of preparing the value for comparison is ensure that it is a string
  value = `${value}`; // toString
  if (!keepDiacritics) {
    value = removeAccents(value);
  }
  return value;
}

/**
 * Gets value for key in item at arbitrarily nested keypath
 * @param {Object} item - the item
 * @param {Object|Function} key - the potentially nested keypath or property callback
 * @return {Array} - an array containing the value(s) at the nested keypath
 */
function getItemValues(item, accessor) {
  let accessorFn = accessor;
  if (typeof accessor === 'object') {
    accessorFn = accessor.accessor;
  }
  const value = accessorFn(item);

  // because `value` can also be undefined
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [String(value)];
}

/**
 * Gets all the values for the given keys in the given item and returns an array of those values
 * @param item - the item from which the values will be retrieved
 * @param keys - the keys to use to retrieve the values
 * @return objects with {itemValue, attributes}
 */
function getAllValuesToRank(item, accessors) {
  const allValues = [];
  for (let j = 0, J = accessors.length; j < J; j++) {
    const accessor = accessors[j];
    const attributes = getAccessorAttributes(accessor);
    const itemValues = getItemValues(item, accessor);
    for (let i = 0, I = itemValues.length; i < I; i++) {
      allValues.push({
        itemValue: itemValues[i],
        attributes
      });
    }
  }
  return allValues;
}
const defaultKeyAttributes = {
  maxRanking: Infinity,
  minRanking: -Infinity
};
/**
 * Gets all the attributes for the given accessor
 * @param accessor - the accessor from which the attributes will be retrieved
 * @return object containing the accessor's attributes
 */
function getAccessorAttributes(accessor) {
  if (typeof accessor === 'function') {
    return defaultKeyAttributes;
  }
  return {
    ...defaultKeyAttributes,
    ...accessor
  };
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/focusManager.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/focusManager.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusManager: () => (/* binding */ FocusManager),
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* harmony import */ var _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.mjs */ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");



class FocusManager extends _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor() {
    super();

    this.setup = onFocus => {
      // addEventListener does not exist in React Native, but window does
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onFocus(); // Listen to visibillitychange and focus


        window.addEventListener('visibilitychange', listener, false);
        window.addEventListener('focus', listener, false);
        return () => {
          // Be sure to unsubscribe if a new handler is set
          window.removeEventListener('visibilitychange', listener);
          window.removeEventListener('focus', listener);
        };
      }

      return;
    };
  }

  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }

  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;

      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = undefined;
    }
  }

  setEventListener(setup) {
    var _this$cleanup2;

    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(focused => {
      if (typeof focused === 'boolean') {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }

  setFocused(focused) {
    this.focused = focused;

    if (focused) {
      this.onFocus();
    }
  }

  onFocus() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }

  isFocused() {
    if (typeof this.focused === 'boolean') {
      return this.focused;
    } // document global can be unavailable in react native


    if (typeof document === 'undefined') {
      return true;
    }

    return [undefined, 'visible', 'prerender'].includes(document.visibilityState);
  }

}
const focusManager = new FocusManager();


//# sourceMappingURL=focusManager.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNextPageParam: () => (/* binding */ getNextPageParam),
/* harmony export */   getPreviousPageParam: () => (/* binding */ getPreviousPageParam),
/* harmony export */   hasNextPage: () => (/* binding */ hasNextPage),
/* harmony export */   hasPreviousPage: () => (/* binding */ hasPreviousPage),
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
function infiniteQueryBehavior() {
  return {
    onFetch: context => {
      context.fetchFn = () => {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;

        const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'forward';
        const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'backward';
        const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        let newPageParams = oldPageParams;
        let cancelled = false;

        const addSignalProperty = object => {
          Object.defineProperty(object, 'signal', {
            enumerable: true,
            get: () => {
              var _context$signal;

              if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                cancelled = true;
              } else {
                var _context$signal2;

                (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener('abort', () => {
                  cancelled = true;
                });
              }

              return context.signal;
            }
          });
        }; // Get query function


        const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn for queryKey '" + context.options.queryHash + "'"));

        const buildNewPages = (pages, param, page, previous) => {
          newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
          return previous ? [page, ...pages] : [...pages, page];
        }; // Create function to fetch a page


        const fetchPage = (pages, manual, param, previous) => {
          if (cancelled) {
            return Promise.reject('Cancelled');
          }

          if (typeof param === 'undefined' && !manual && pages.length) {
            return Promise.resolve(pages);
          }

          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const queryFnResult = queryFn(queryFnContext);
          const promise = Promise.resolve(queryFnResult).then(page => buildNewPages(pages, param, page, previous));
          return promise;
        };

        let promise; // Fetch first page?

        if (!oldPages.length) {
          promise = fetchPage([]);
        } // Fetch next page?
        else if (isFetchingNextPage) {
          const manual = typeof pageParam !== 'undefined';
          const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } // Fetch previous page?
        else if (isFetchingPreviousPage) {
          const manual = typeof pageParam !== 'undefined';
          const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param, true);
        } // Refetch pages
        else {
          newPageParams = [];
          const manual = typeof context.options.getNextPageParam === 'undefined';
          const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true; // Fetch first page

          promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0])); // Fetch remaining pages

          for (let i = 1; i < oldPages.length; i++) {
            promise = promise.then(pages => {
              const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;

              if (shouldFetchNextPage) {
                const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                return fetchPage(pages, manual, param);
              }

              return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
            });
          }
        }

        const finalPromise = promise.then(pages => ({
          pages,
          pageParams: newPageParams
        }));
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}
/**
 * Checks if there is a next page.
 * Returns `undefined` if it cannot be determined.
 */

function hasNextPage(options, pages) {
  if (options.getNextPageParam && Array.isArray(pages)) {
    const nextPageParam = getNextPageParam(options, pages);
    return typeof nextPageParam !== 'undefined' && nextPageParam !== null && nextPageParam !== false;
  }

  return;
}
/**
 * Checks if there is a previous page.
 * Returns `undefined` if it cannot be determined.
 */

function hasPreviousPage(options, pages) {
  if (options.getPreviousPageParam && Array.isArray(pages)) {
    const previousPageParam = getPreviousPageParam(options, pages);
    return typeof previousPageParam !== 'undefined' && previousPageParam !== null && previousPageParam !== false;
  }

  return;
}


//# sourceMappingURL=infiniteQueryBehavior.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/logger.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/logger.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultLogger: () => (/* binding */ defaultLogger)
/* harmony export */ });
const defaultLogger = console;


//# sourceMappingURL=logger.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/mutation.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/mutation.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation),
/* harmony export */   getDefaultState: () => (/* binding */ getDefaultState)
/* harmony export */ });
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.mjs */ "./node_modules/@tanstack/query-core/build/lib/logger.mjs");
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _removable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.mjs */ "./node_modules/@tanstack/query-core/build/lib/removable.mjs");
/* harmony import */ var _retryer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer.mjs */ "./node_modules/@tanstack/query-core/build/lib/retryer.mjs");





// CLASS
class Mutation extends _removable_mjs__WEBPACK_IMPORTED_MODULE_0__.Removable {
  constructor(config) {
    super();
    this.defaultOptions = config.defaultOptions;
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.logger = config.logger || _logger_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultLogger;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }

  setOptions(options) {
    this.options = { ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }

  get meta() {
    return this.options.meta;
  }

  setState(state) {
    this.dispatch({
      type: 'setState',
      state
    });
  }

  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer); // Stop the mutation from being garbage collected

      this.clearGcTimeout();
      this.mutationCache.notify({
        type: 'observerAdded',
        mutation: this,
        observer
      });
    }
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(x => x !== observer);
    this.scheduleGc();
    this.mutationCache.notify({
      type: 'observerRemoved',
      mutation: this,
      observer
    });
  }

  optionalRemove() {
    if (!this.observers.length) {
      if (this.state.status === 'loading') {
        this.scheduleGc();
      } else {
        this.mutationCache.remove(this);
      }
    }
  }

  continue() {
    var _this$retryer$continu, _this$retryer;

    return (_this$retryer$continu = (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.continue()) != null ? _this$retryer$continu : this.execute();
  }

  async execute() {
    const executeMutation = () => {
      var _this$options$retry;

      this.retryer = (0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_2__.createRetryer)({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject('No mutationFn found');
          }

          return this.options.mutationFn(this.state.variables);
        },
        onFail: (failureCount, error) => {
          this.dispatch({
            type: 'failed',
            failureCount,
            error
          });
        },
        onPause: () => {
          this.dispatch({
            type: 'pause'
          });
        },
        onContinue: () => {
          this.dispatch({
            type: 'continue'
          });
        },
        retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      });
      return this.retryer.promise;
    };

    const restored = this.state.status === 'loading';

    try {
      var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onSettl, _this$options3;

      if (!restored) {
        var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;

        this.dispatch({
          type: 'loading',
          variables: this.options.variables
        }); // Notify cache callback

        await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
        const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));

        if (context !== this.state.context) {
          this.dispatch({
            type: 'loading',
            context,
            variables: this.state.variables
          });
        }
      }

      const data = await executeMutation(); // Notify cache callback

      await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
      await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context)); // Notify cache callback

      await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, data, null, this.state.variables, this.state.context, this));
      await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
      this.dispatch({
        type: 'success',
        data
      });
      return data;
    } catch (error) {
      try {
        var _this$mutationCache$c7, _this$mutationCache$c8, _this$options$onError, _this$options4, _this$mutationCache$c9, _this$mutationCache$c10, _this$options$onSettl2, _this$options5;

        // Notify cache callback
        await ((_this$mutationCache$c7 = (_this$mutationCache$c8 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c7.call(_this$mutationCache$c8, error, this.state.variables, this.state.context, this));

        if (true) {
          this.logger.error(error);
        }

        await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context)); // Notify cache callback

        await ((_this$mutationCache$c9 = (_this$mutationCache$c10 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c9.call(_this$mutationCache$c10, undefined, error, this.state.variables, this.state.context, this));
        await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, undefined, error, this.state.variables, this.state.context));
        throw error;
      } finally {
        this.dispatch({
          type: 'error',
          error: error
        });
      }
    }
  }

  dispatch(action) {
    const reducer = state => {
      switch (action.type) {
        case 'failed':
          return { ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };

        case 'pause':
          return { ...state,
            isPaused: true
          };

        case 'continue':
          return { ...state,
            isPaused: false
          };

        case 'loading':
          return { ...state,
            context: action.context,
            data: undefined,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !(0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_2__.canFetch)(this.options.networkMode),
            status: 'loading',
            variables: action.variables
          };

        case 'success':
          return { ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: 'success',
            isPaused: false
          };

        case 'error':
          return { ...state,
            data: undefined,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: 'error'
          };

        case 'setState':
          return { ...state,
            ...action.state
          };
      }
    };

    this.state = reducer(this.state);
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.observers.forEach(observer => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify({
        mutation: this,
        type: 'updated',
        action
      });
    });
  }

}
function getDefaultState() {
  return {
    context: undefined,
    data: undefined,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: 'idle',
    variables: undefined
  };
}


//# sourceMappingURL=mutation.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/mutationCache.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/mutationCache.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _mutation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation.mjs */ "./node_modules/@tanstack/query-core/build/lib/mutation.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");
/* harmony import */ var _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.mjs */ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");





// CLASS
class MutationCache extends _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.mutations = [];
    this.mutationId = 0;
  }

  build(client, options, state) {
    const mutation = new _mutation_mjs__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      logger: client.getLogger(),
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : undefined
    });
    this.add(mutation);
    return mutation;
  }

  add(mutation) {
    this.mutations.push(mutation);
    this.notify({
      type: 'added',
      mutation
    });
  }

  remove(mutation) {
    this.mutations = this.mutations.filter(x => x !== mutation);
    this.notify({
      type: 'removed',
      mutation
    });
  }

  clear() {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.mutations.forEach(mutation => {
        this.remove(mutation);
      });
    });
  }

  getAll() {
    return this.mutations;
  }

  find(filters) {
    if (typeof filters.exact === 'undefined') {
      filters.exact = true;
    }

    return this.mutations.find(mutation => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }

  findAll(filters) {
    return this.mutations.filter(mutation => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }

  notify(event) {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }

  resumePausedMutations() {
    var _this$resuming;

    this.resuming = ((_this$resuming = this.resuming) != null ? _this$resuming : Promise.resolve()).then(() => {
      const pausedMutations = this.mutations.filter(x => x.state.isPaused);
      return _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.noop)), Promise.resolve()));
    }).then(() => {
      this.resuming = undefined;
    });
    return this.resuming;
  }

}


//# sourceMappingURL=mutationCache.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotifyManager: () => (/* binding */ createNotifyManager),
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");


function createNotifyManager() {
  let queue = [];
  let transactions = 0;

  let notifyFn = callback => {
    callback();
  };

  let batchNotifyFn = callback => {
    callback();
  };

  const batch = callback => {
    let result;
    transactions++;

    try {
      result = callback();
    } finally {
      transactions--;

      if (!transactions) {
        flush();
      }
    }

    return result;
  };

  const schedule = callback => {
    if (transactions) {
      queue.push(callback);
    } else {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(() => {
        notifyFn(callback);
      });
    }
  };
  /**
   * All calls to the wrapped function will be batched.
   */


  const batchCalls = callback => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };

  const flush = () => {
    const originalQueue = queue;
    queue = [];

    if (originalQueue.length) {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.scheduleMicrotask)(() => {
        batchNotifyFn(() => {
          originalQueue.forEach(callback => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  /**
   * Use this method to set a custom notify function.
   * This can be used to for example wrap notifications with `React.act` while running tests.
   */


  const setNotifyFunction = fn => {
    notifyFn = fn;
  };
  /**
   * Use this method to set a custom function to batch notifications together into a single tick.
   * By default React Query will use the batch function provided by ReactDOM or React Native.
   */


  const setBatchNotifyFunction = fn => {
    batchNotifyFn = fn;
  };

  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction
  };
} // SINGLETON

const notifyManager = createNotifyManager();


//# sourceMappingURL=notifyManager.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/onlineManager.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/onlineManager.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnlineManager: () => (/* binding */ OnlineManager),
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* harmony import */ var _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.mjs */ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");



const onlineEvents = ['online', 'offline'];
class OnlineManager extends _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor() {
    super();

    this.setup = onOnline => {
      // addEventListener does not exist in React Native, but window does
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onOnline(); // Listen to online


        onlineEvents.forEach(event => {
          window.addEventListener(event, listener, false);
        });
        return () => {
          // Be sure to unsubscribe if a new handler is set
          onlineEvents.forEach(event => {
            window.removeEventListener(event, listener);
          });
        };
      }

      return;
    };
  }

  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }

  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;

      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = undefined;
    }
  }

  setEventListener(setup) {
    var _this$cleanup2;

    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(online => {
      if (typeof online === 'boolean') {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }

  setOnline(online) {
    this.online = online;

    if (online) {
      this.onOnline();
    }
  }

  onOnline() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }

  isOnline() {
    if (typeof this.online === 'boolean') {
      return this.online;
    }

    if (typeof navigator === 'undefined' || typeof navigator.onLine === 'undefined') {
      return true;
    }

    return navigator.onLine;
  }

}
const onlineManager = new OnlineManager();


//# sourceMappingURL=onlineManager.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/query.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/query.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.mjs */ "./node_modules/@tanstack/query-core/build/lib/logger.mjs");
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _retryer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./retryer.mjs */ "./node_modules/@tanstack/query-core/build/lib/retryer.mjs");
/* harmony import */ var _removable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.mjs */ "./node_modules/@tanstack/query-core/build/lib/removable.mjs");






// CLASS
class Query extends _removable_mjs__WEBPACK_IMPORTED_MODULE_0__.Removable {
  constructor(config) {
    super();
    this.abortSignalConsumed = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.logger = config.logger || _logger_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultLogger;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || getDefaultState(this.options);
    this.state = this.initialState;
    this.scheduleGc();
  }

  get meta() {
    return this.options.meta;
  }

  setOptions(options) {
    this.options = { ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }

  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === 'idle') {
      this.cache.remove(this);
    }
  }

  setData(newData, options) {
    const data = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.replaceData)(this.state.data, newData, this.options); // Set data and mark it as cached

    this.dispatch({
      data,
      type: 'success',
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }

  setState(state, setStateOptions) {
    this.dispatch({
      type: 'setState',
      state,
      setStateOptions
    });
  }

  cancel(options) {
    var _this$retryer;

    const promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.noop).catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.noop) : Promise.resolve();
  }

  destroy() {
    super.destroy();
    this.cancel({
      silent: true
    });
  }

  reset() {
    this.destroy();
    this.setState(this.initialState);
  }

  isActive() {
    return this.observers.some(observer => observer.options.enabled !== false);
  }

  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }

  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some(observer => observer.getCurrentResult().isStale);
  }

  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  }

  onFocus() {
    var _this$retryer2;

    const observer = this.observers.find(x => x.shouldFetchOnWindowFocus());

    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    } // Continue fetch if currently paused


    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  }

  onOnline() {
    var _this$retryer3;

    const observer = this.observers.find(x => x.shouldFetchOnReconnect());

    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    } // Continue fetch if currently paused


    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  }

  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer); // Stop the query from being garbage collected

      this.clearGcTimeout();
      this.cache.notify({
        type: 'observerAdded',
        query: this,
        observer
      });
    }
  }

  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter(x => x !== observer);

      if (!this.observers.length) {
        // If the transport layer does not support cancellation
        // we'll let the query continue so the result can be cached
        if (this.retryer) {
          if (this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }

        this.scheduleGc();
      }

      this.cache.notify({
        type: 'observerRemoved',
        query: this,
        observer
      });
    }
  }

  getObserversCount() {
    return this.observers.length;
  }

  invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: 'invalidate'
      });
    }
  }

  fetch(options, fetchOptions) {
    var _this$options$behavio, _context$fetchOptions;

    if (this.state.fetchStatus !== 'idle') {
      if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
        // Silently cancel current fetch if the user wants to cancel refetches
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;

        // make sure that retries that were potentially cancelled due to unmounts can continue
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry(); // Return current promise if we are already fetching

        return this.promise;
      }
    } // Update config if passed, otherwise the config from the last execution is used


    if (options) {
      this.setOptions(options);
    } // Use the options from the first observer with a query function if no function is found.
    // This can happen when the query is hydrated or created with setQueryData.


    if (!this.options.queryFn) {
      const observer = this.observers.find(x => x.options.queryFn);

      if (observer) {
        this.setOptions(observer.options);
      }
    }

    if (!Array.isArray(this.options.queryKey)) {
      if (true) {
        this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
      }
    }

    const abortController = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.getAbortController)(); // Create query function context

    const queryFnContext = {
      queryKey: this.queryKey,
      pageParam: undefined,
      meta: this.meta
    }; // Adds an enumerable signal property to the object that
    // which sets abortSignalConsumed to true when the signal
    // is read.

    const addSignalProperty = object => {
      Object.defineProperty(object, 'signal', {
        enumerable: true,
        get: () => {
          if (abortController) {
            this.abortSignalConsumed = true;
            return abortController.signal;
          }

          return undefined;
        }
      });
    };

    addSignalProperty(queryFnContext); // Create fetch function

    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject("Missing queryFn for queryKey '" + this.options.queryHash + "'");
      }

      this.abortSignalConsumed = false;
      return this.options.queryFn(queryFnContext);
    }; // Trigger behavior hook


    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context); // Store state in case the current fetch needs to be reverted

    this.revertState = this.state; // Set to fetching state if not already in it

    if (this.state.fetchStatus === 'idle' || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;

      this.dispatch({
        type: 'fetch',
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }

    const onError = error => {
      // Optimistically update state if needed
      if (!((0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_3__.isCancelledError)(error) && error.silent)) {
        this.dispatch({
          type: 'error',
          error: error
        });
      }

      if (!(0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_3__.isCancelledError)(error)) {
        var _this$cache$config$on, _this$cache$config, _this$cache$config$on2, _this$cache$config2;

        // Notify cache callback
        (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
        (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, this.state.data, error, this);

        if (true) {
          this.logger.error(error);
        }
      }

      if (!this.isFetchingOptimistic) {
        // Schedule query gc after fetching
        this.scheduleGc();
      }

      this.isFetchingOptimistic = false;
    }; // Try to fetch the data


    this.retryer = (0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_3__.createRetryer)({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
      onSuccess: data => {
        var _this$cache$config$on3, _this$cache$config3, _this$cache$config$on4, _this$cache$config4;

        if (typeof data === 'undefined') {
          if (true) {
            this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
          }

          onError(new Error(this.queryHash + " data is undefined"));
          return;
        }

        this.setData(data); // Notify cache callback

        (_this$cache$config$on3 = (_this$cache$config3 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on3.call(_this$cache$config3, data, this);
        (_this$cache$config$on4 = (_this$cache$config4 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on4.call(_this$cache$config4, data, this.state.error, this);

        if (!this.isFetchingOptimistic) {
          // Schedule query gc after fetching
          this.scheduleGc();
        }

        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.dispatch({
          type: 'failed',
          failureCount,
          error
        });
      },
      onPause: () => {
        this.dispatch({
          type: 'pause'
        });
      },
      onContinue: () => {
        this.dispatch({
          type: 'continue'
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }

  dispatch(action) {
    const reducer = state => {
      var _action$meta, _action$dataUpdatedAt;

      switch (action.type) {
        case 'failed':
          return { ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };

        case 'pause':
          return { ...state,
            fetchStatus: 'paused'
          };

        case 'continue':
          return { ...state,
            fetchStatus: 'fetching'
          };

        case 'fetch':
          return { ...state,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
            fetchStatus: (0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_3__.canFetch)(this.options.networkMode) ? 'fetching' : 'paused',
            ...(!state.dataUpdatedAt && {
              error: null,
              status: 'loading'
            })
          };

        case 'success':
          return { ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
            error: null,
            isInvalidated: false,
            status: 'success',
            ...(!action.manual && {
              fetchStatus: 'idle',
              fetchFailureCount: 0,
              fetchFailureReason: null
            })
          };

        case 'error':
          const error = action.error;

          if ((0,_retryer_mjs__WEBPACK_IMPORTED_MODULE_3__.isCancelledError)(error) && error.revert && this.revertState) {
            return { ...this.revertState
            };
          }

          return { ...state,
            error: error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: 'idle',
            status: 'error'
          };

        case 'invalidate':
          return { ...state,
            isInvalidated: true
          };

        case 'setState':
          return { ...state,
            ...action.state
          };
      }
    };

    this.state = reducer(this.state);
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_4__.notifyManager.batch(() => {
      this.observers.forEach(observer => {
        observer.onQueryUpdate(action);
      });
      this.cache.notify({
        query: this,
        type: 'updated',
        action
      });
    });
  }

}

function getDefaultState(options) {
  const data = typeof options.initialData === 'function' ? options.initialData() : options.initialData;
  const hasData = typeof data !== 'undefined';
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === 'function' ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? 'success' : 'loading',
    fetchStatus: 'idle'
  };
}


//# sourceMappingURL=query.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/queryCache.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/queryCache.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");
/* harmony import */ var _query_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query.mjs */ "./node_modules/@tanstack/query-core/build/lib/query.mjs");
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.mjs */ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");





// CLASS
class QueryCache extends _subscribable_mjs__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.queries = [];
    this.queriesMap = {};
  }

  build(client, options, state) {
    var _options$queryHash;

    const queryKey = options.queryKey;
    const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    let query = this.get(queryHash);

    if (!query) {
      query = new _query_mjs__WEBPACK_IMPORTED_MODULE_2__.Query({
        cache: this,
        logger: client.getLogger(),
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }

    return query;
  }

  add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: 'added',
        query
      });
    }
  }

  remove(query) {
    const queryInMap = this.queriesMap[query.queryHash];

    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter(x => x !== query);

      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }

      this.notify({
        type: 'removed',
        query
      });
    }
  }

  clear() {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.queries.forEach(query => {
        this.remove(query);
      });
    });
  }

  get(queryHash) {
    return this.queriesMap[queryHash];
  }

  getAll() {
    return this.queries;
  }

  find(arg1, arg2) {
    const [filters] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2);

    if (typeof filters.exact === 'undefined') {
      filters.exact = true;
    }

    return this.queries.find(query => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query));
  }

  findAll(arg1, arg2) {
    const [filters] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.parseFilterArgs)(arg1, arg2);
    return Object.keys(filters).length > 0 ? this.queries.filter(query => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query)) : this.queries;
  }

  notify(event) {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }

  onFocus() {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.queries.forEach(query => {
        query.onFocus();
      });
    });
  }

  onOnline() {
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.queries.forEach(query => {
        query.onOnline();
      });
    });
  }

}


//# sourceMappingURL=queryCache.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/queryClient.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/queryClient.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");
/* harmony import */ var _queryCache_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryCache.mjs */ "./node_modules/@tanstack/query-core/build/lib/queryCache.mjs");
/* harmony import */ var _mutationCache_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationCache.mjs */ "./node_modules/@tanstack/query-core/build/lib/mutationCache.mjs");
/* harmony import */ var _focusManager_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/focusManager.mjs");
/* harmony import */ var _onlineManager_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onlineManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/onlineManager.mjs");
/* harmony import */ var _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifyManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _infiniteQueryBehavior_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./infiniteQueryBehavior.mjs */ "./node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs");
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.mjs */ "./node_modules/@tanstack/query-core/build/lib/logger.mjs");









// CLASS
class QueryClient {
  constructor(config = {}) {
    this.queryCache = config.queryCache || new _queryCache_mjs__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
    this.mutationCache = config.mutationCache || new _mutationCache_mjs__WEBPACK_IMPORTED_MODULE_1__.MutationCache();
    this.logger = config.logger || _logger_mjs__WEBPACK_IMPORTED_MODULE_2__.defaultLogger;
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
    this.mountCount = 0;

    if ( true && config.logger) {
      this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
    }
  }

  mount() {
    this.mountCount++;
    if (this.mountCount !== 1) return;
    this.unsubscribeFocus = _focusManager_mjs__WEBPACK_IMPORTED_MODULE_3__.focusManager.subscribe(() => {
      if (_focusManager_mjs__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused()) {
        this.resumePausedMutations();
        this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = _onlineManager_mjs__WEBPACK_IMPORTED_MODULE_4__.onlineManager.subscribe(() => {
      if (_onlineManager_mjs__WEBPACK_IMPORTED_MODULE_4__.onlineManager.isOnline()) {
        this.resumePausedMutations();
        this.queryCache.onOnline();
      }
    });
  }

  unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;

    this.mountCount--;
    if (this.mountCount !== 0) return;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    this.unsubscribeFocus = undefined;
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
    this.unsubscribeOnline = undefined;
  }

  isFetching(arg1, arg2) {
    const [filters] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2);
    filters.fetchStatus = 'fetching';
    return this.queryCache.findAll(filters).length;
  }

  isMutating(filters) {
    return this.mutationCache.findAll({ ...filters,
      fetching: true
    }).length;
  }

  getQueryData(queryKey, filters) {
    var _this$queryCache$find;

    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  }

  ensureQueryData(arg1, arg2, arg3) {
    const parsedOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(arg1, arg2, arg3);
    const cachedData = this.getQueryData(parsedOptions.queryKey);
    return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
  }

  getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey,
      state
    }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }

  setQueryData(queryKey, updater, options) {
    const query = this.queryCache.find(queryKey);
    const prevData = query == null ? void 0 : query.state.data;
    const data = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(updater, prevData);

    if (typeof data === 'undefined') {
      return undefined;
    }

    const parsedOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(queryKey);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(data, { ...options,
      manual: true
    });
  }

  setQueriesData(queryKeyOrFilters, updater, options) {
    return _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey
    }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }

  getQueryState(queryKey, filters) {
    var _this$queryCache$find2;

    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  }

  removeQueries(arg1, arg2) {
    const [filters] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2);
    const queryCache = this.queryCache;
    _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach(query => {
        queryCache.remove(query);
      });
    });
  }

  resetQueries(arg1, arg2, arg3) {
    const [filters, options] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3);
    const queryCache = this.queryCache;
    const refetchFilters = {
      type: 'active',
      ...filters
    };
    return _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach(query => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }

  cancelQueries(arg1, arg2, arg3) {
    const [filters, cancelOptions = {}] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3);

    if (typeof cancelOptions.revert === 'undefined') {
      cancelOptions.revert = true;
    }

    const promises = _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => this.queryCache.findAll(filters).map(query => query.cancel(cancelOptions)));
    return Promise.all(promises).then(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop);
  }

  invalidateQueries(arg1, arg2, arg3) {
    const [filters, options] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3);
    return _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => {
      var _ref, _filters$refetchType;

      this.queryCache.findAll(filters).forEach(query => {
        query.invalidate();
      });

      if (filters.refetchType === 'none') {
        return Promise.resolve();
      }

      const refetchFilters = { ...filters,
        type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : 'active'
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }

  refetchQueries(arg1, arg2, arg3) {
    const [filters, options] = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseFilterArgs)(arg1, arg2, arg3);
    const promises = _notifyManager_mjs__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batch(() => this.queryCache.findAll(filters).filter(query => !query.isDisabled()).map(query => {
      var _options$cancelRefetc;

      return query.fetch(undefined, { ...options,
        cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
        meta: {
          refetchPage: filters.refetchPage
        }
      });
    }));
    let promise = Promise.all(promises).then(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop);

    if (!(options != null && options.throwOnError)) {
      promise = promise.catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop);
    }

    return promise;
  }

  fetchQuery(arg1, arg2, arg3) {
    const parsedOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(arg1, arg2, arg3);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions); // https://github.com/tannerlinsley/react-query/issues/652

    if (typeof defaultedOptions.retry === 'undefined') {
      defaultedOptions.retry = false;
    }

    const query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }

  prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop);
  }

  fetchInfiniteQuery(arg1, arg2, arg3) {
    const parsedOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.parseQueryArgs)(arg1, arg2, arg3);
    parsedOptions.behavior = (0,_infiniteQueryBehavior_mjs__WEBPACK_IMPORTED_MODULE_7__.infiniteQueryBehavior)();
    return this.fetchQuery(parsedOptions);
  }

  prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop).catch(_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.noop);
  }

  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }

  getQueryCache() {
    return this.queryCache;
  }

  getMutationCache() {
    return this.mutationCache;
  }

  getLogger() {
    return this.logger;
  }

  getDefaultOptions() {
    return this.defaultOptions;
  }

  setDefaultOptions(options) {
    this.defaultOptions = options;
  }

  setQueryDefaults(queryKey, options) {
    const result = this.queryDefaults.find(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(queryKey) === (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(x.queryKey));

    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  }

  getQueryDefaults(queryKey) {
    if (!queryKey) {
      return undefined;
    } // Get the first matching defaults


    const firstMatchingDefaults = this.queryDefaults.find(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(queryKey, x.queryKey)); // Additional checks and error in dev mode

    if (true) {
      // Retrieve all matching defaults for the given key
      const matchingDefaults = this.queryDefaults.filter(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(queryKey, x.queryKey)); // It is ok not having defaults, but it is error prone to have more than 1 default for a given key

      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
      }
    }

    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }

  setMutationDefaults(mutationKey, options) {
    const result = this.mutationDefaults.find(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(mutationKey) === (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.hashQueryKey)(x.mutationKey));

    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  }

  getMutationDefaults(mutationKey) {
    if (!mutationKey) {
      return undefined;
    } // Get the first matching defaults


    const firstMatchingDefaults = this.mutationDefaults.find(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(mutationKey, x.mutationKey)); // Additional checks and error in dev mode

    if (true) {
      // Retrieve all matching defaults for the given key
      const matchingDefaults = this.mutationDefaults.filter(x => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.partialMatchKey)(mutationKey, x.mutationKey)); // It is ok not having defaults, but it is error prone to have more than 1 default for a given key

      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
      }
    }

    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }

  defaultQueryOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }

    const defaultedOptions = { ...this.defaultOptions.queries,
      ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
      ...options,
      _defaulted: true
    };

    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_5__.hashQueryKeyByOptions)(defaultedOptions.queryKey, defaultedOptions);
    } // dependent default values


    if (typeof defaultedOptions.refetchOnReconnect === 'undefined') {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== 'always';
    }

    if (typeof defaultedOptions.useErrorBoundary === 'undefined') {
      defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
    }

    return defaultedOptions;
  }

  defaultMutationOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }

    return { ...this.defaultOptions.mutations,
      ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
      ...options,
      _defaulted: true
    };
  }

  clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }

}


//# sourceMappingURL=queryClient.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/removable.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/removable.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Removable: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");


class Removable {
  destroy() {
    this.clearGcTimeout();
  }

  scheduleGc() {
    this.clearGcTimeout();

    if ((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isValidTimeout)(this.cacheTime)) {
      this.gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.cacheTime);
    }
  }

  updateCacheTime(newCacheTime) {
    // Default to 5 minutes (Infinity for server-side) if no cache time is set
    this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : _utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isServer ? Infinity : 5 * 60 * 1000);
  }

  clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = undefined;
    }
  }

}


//# sourceMappingURL=removable.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/retryer.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/retryer.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError),
/* harmony export */   canFetch: () => (/* binding */ canFetch),
/* harmony export */   createRetryer: () => (/* binding */ createRetryer),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* harmony import */ var _focusManager_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./focusManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/focusManager.mjs");
/* harmony import */ var _onlineManager_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onlineManager.mjs */ "./node_modules/@tanstack/query-core/build/lib/onlineManager.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/query-core/build/lib/utils.mjs");




function defaultRetryDelay(failureCount) {
  return Math.min(1000 * 2 ** failureCount, 30000);
}

function canFetch(networkMode) {
  return (networkMode != null ? networkMode : 'online') === 'online' ? _onlineManager_mjs__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline() : true;
}
class CancelledError {
  constructor(options) {
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }

}
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });

  const cancel = cancelOptions => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort == null ? void 0 : config.abort();
    }
  };

  const cancelRetry = () => {
    isRetryCancelled = true;
  };

  const continueRetry = () => {
    isRetryCancelled = false;
  };

  const shouldPause = () => !_focusManager_mjs__WEBPACK_IMPORTED_MODULE_1__.focusManager.isFocused() || config.networkMode !== 'always' && !_onlineManager_mjs__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline();

  const resolve = value => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };

  const reject = value => {
    if (!isResolved) {
      isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };

  const pause = () => {
    return new Promise(continueResolve => {
      continueFn = value => {
        const canContinue = isResolved || !shouldPause();

        if (canContinue) {
          continueResolve(value);
        }

        return canContinue;
      };

      config.onPause == null ? void 0 : config.onPause();
    }).then(() => {
      continueFn = undefined;

      if (!isResolved) {
        config.onContinue == null ? void 0 : config.onContinue();
      }
    });
  }; // Create loop function


  const run = () => {
    // Do nothing if already resolved
    if (isResolved) {
      return;
    }

    let promiseOrValue; // Execute query

    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }

    Promise.resolve(promiseOrValue).then(resolve).catch(error => {
      var _config$retry, _config$retryDelay;

      // Stop if the fetch is already resolved
      if (isResolved) {
        return;
      } // Do we need to retry the request?


      const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      const delay = typeof retryDelay === 'function' ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === 'number' && failureCount < retry || typeof retry === 'function' && retry(failureCount, error);

      if (isRetryCancelled || !shouldRetry) {
        // We are done if the query does not need to be retried
        reject(error);
        return;
      }

      failureCount++; // Notify on fail

      config.onFail == null ? void 0 : config.onFail(failureCount, error); // Delay

      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.sleep)(delay) // Pause if the document is not visible or when the device is offline
      .then(() => {
        if (shouldPause()) {
          return pause();
        }

        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  }; // Start loop


  if (canFetch(config.networkMode)) {
    run();
  } else {
    pause().then(run);
  }

  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn == null ? void 0 : continueFn();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}


//# sourceMappingURL=retryer.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/subscribable.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/subscribable.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
class Subscribable {
  constructor() {
    this.listeners = new Set();
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe(listener) {
    const identity = {
      listener
    };
    this.listeners.add(identity);
    this.onSubscribe();
    return () => {
      this.listeners.delete(identity);
      this.onUnsubscribe();
    };
  }

  hasListeners() {
    return this.listeners.size > 0;
  }

  onSubscribe() {// Do nothing
  }

  onUnsubscribe() {// Do nothing
  }

}


//# sourceMappingURL=subscribable.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/lib/utils.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/lib/utils.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   difference: () => (/* binding */ difference),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   getAbortController: () => (/* binding */ getAbortController),
/* harmony export */   hashQueryKey: () => (/* binding */ hashQueryKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isError: () => (/* binding */ isError),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isQueryKey: () => (/* binding */ isQueryKey),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   parseFilterArgs: () => (/* binding */ parseFilterArgs),
/* harmony export */   parseMutationArgs: () => (/* binding */ parseMutationArgs),
/* harmony export */   parseMutationFilterArgs: () => (/* binding */ parseMutationFilterArgs),
/* harmony export */   parseQueryArgs: () => (/* binding */ parseQueryArgs),
/* harmony export */   partialDeepEqual: () => (/* binding */ partialDeepEqual),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceAt: () => (/* binding */ replaceAt),
/* harmony export */   replaceData: () => (/* binding */ replaceData),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   scheduleMicrotask: () => (/* binding */ scheduleMicrotask),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
// TYPES
// UTILS
const isServer = typeof window === 'undefined' || 'Deno' in window;
function noop() {
  return undefined;
}
function functionalUpdate(updater, input) {
  return typeof updater === 'function' ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === 'number' && value >= 0 && value !== Infinity;
}
function difference(array1, array2) {
  return array1.filter(x => !array2.includes(x));
}
function replaceAt(array, index, value) {
  const copy = array.slice(0);
  copy[index] = value;
  return copy;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }

  if (typeof arg2 === 'function') {
    return { ...arg3,
      queryKey: arg1,
      queryFn: arg2
    };
  }

  return { ...arg2,
    queryKey: arg1
  };
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === 'function') {
      return { ...arg3,
        mutationKey: arg1,
        mutationFn: arg2
      };
    }

    return { ...arg2,
      mutationKey: arg1
    };
  }

  if (typeof arg1 === 'function') {
    return { ...arg2,
      mutationFn: arg1
    };
  }

  return { ...arg1
  };
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [{ ...arg2,
    queryKey: arg1
  }, arg3] : [arg1 || {}, arg2];
}
function parseMutationFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [{ ...arg2,
    mutationKey: arg1
  }, arg3] : [arg1 || {}, arg2];
}
function matchQuery(filters, query) {
  const {
    type = 'all',
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;

  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }

  if (type !== 'all') {
    const isActive = query.isActive();

    if (type === 'active' && !isActive) {
      return false;
    }

    if (type === 'inactive' && isActive) {
      return false;
    }
  }

  if (typeof stale === 'boolean' && query.isStale() !== stale) {
    return false;
  }

  if (typeof fetchStatus !== 'undefined' && fetchStatus !== query.state.fetchStatus) {
    return false;
  }

  if (predicate && !predicate(query)) {
    return false;
  }

  return true;
}
function matchMutation(filters, mutation) {
  const {
    exact,
    fetching,
    predicate,
    mutationKey
  } = filters;

  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }

    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }

  if (typeof fetching === 'boolean' && mutation.state.status === 'loading' !== fetching) {
    return false;
  }

  if (predicate && !predicate(mutation)) {
    return false;
  }

  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
/**
 * Default query keys hash function.
 * Hashes the value into a stable hash.
 */

function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
/**
 * Checks if key `b` partially matches with key `a`.
 */

function partialMatchKey(a, b) {
  return partialDeepEqual(a, b);
}
/**
 * Checks if `b` partially matches with `a`.
 */

function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    return !Object.keys(b).some(key => !partialDeepEqual(a[key], b[key]));
  }

  return false;
}
/**
 * This function returns `a` if `b` is deeply equal.
 * If not, it will replace any deeply equal children of `b` with those of `a`.
 * This can be used for structural sharing between JSON values for example.
 */

function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }

  const array = isPlainArray(a) && isPlainArray(b);

  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;

    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);

      if (copy[key] === a[key]) {
        equalItems++;
      }
    }

    return aSize === bSize && equalItems === aSize ? a : copy;
  }

  return b;
}
/**
 * Shallow compare objects. Only works with objects that always have the same properties.
 */

function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }

  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
} // Copied from: https://github.com/jonschlinkert/is-plain-object

function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  } // If has modified constructor


  const ctor = o.constructor;

  if (typeof ctor === 'undefined') {
    return true;
  } // If has modified prototype


  const prot = ctor.prototype;

  if (!hasObjectPrototype(prot)) {
    return false;
  } // If constructor does not have an Object-specific method


  if (!prot.hasOwnProperty('isPrototypeOf')) {
    return false;
  } // Most likely a plain Object


  return true;
}

function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isQueryKey(value) {
  return Array.isArray(value);
}
function isError(value) {
  return value instanceof Error;
}
function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
/**
 * Schedules a microtask.
 * This can be useful to schedule state updates after rendering.
 */

function scheduleMicrotask(callback) {
  sleep(0).then(callback);
}
function getAbortController() {
  if (typeof AbortController === 'function') {
    return new AbortController();
  }

  return;
}
function replaceData(prevData, data, options) {
  // Use prev data if an isDataEqual function is defined and returns `true`
  if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
    return prevData;
  } else if (typeof options.structuralSharing === 'function') {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    // Structurally share data between prev and new data if needed
    return replaceEqualDeep(prevData, data);
  }

  return data;
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/Explorer.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/Explorer.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CopyButton: () => (/* binding */ CopyButton),
/* harmony export */   DefaultRenderer: () => (/* binding */ DefaultRenderer),
/* harmony export */   Entry: () => (/* binding */ Entry),
/* harmony export */   ExpandButton: () => (/* binding */ ExpandButton),
/* harmony export */   Expander: () => (/* binding */ Expander),
/* harmony export */   Info: () => (/* binding */ Info),
/* harmony export */   Label: () => (/* binding */ Label),
/* harmony export */   LabelButton: () => (/* binding */ LabelButton),
/* harmony export */   SubEntries: () => (/* binding */ SubEntries),
/* harmony export */   Value: () => (/* binding */ Value),
/* harmony export */   chunkArray: () => (/* binding */ chunkArray),
/* harmony export */   "default": () => (/* binding */ Explorer)
/* harmony export */ });
/* harmony import */ var _virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_virtual/_rollupPluginBabelHelpers.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/utils.mjs");
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superjson */ "./node_modules/superjson/dist/esm/index.js");
'use client';





const Entry = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('div', {
  fontFamily: 'Menlo, monospace',
  fontSize: '1em',
  lineHeight: '1.7',
  outline: 'none',
  wordBreak: 'break-word'
});
const Label = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('span', {
  color: 'white'
});
const LabelButton = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('button', {
  cursor: 'pointer',
  color: 'white'
});
const ExpandButton = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('button', {
  cursor: 'pointer',
  color: 'inherit',
  font: 'inherit',
  outline: 'inherit',
  background: 'transparent',
  border: 'none',
  padding: 0
});
const CopyButton = ({
  value
}) => {
  const [copyState, setCopyState] = react__WEBPACK_IMPORTED_MODULE_0__.useState('NoCopy');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: copyState === 'NoCopy' ? () => {
      navigator.clipboard.writeText(superjson__WEBPACK_IMPORTED_MODULE_1__["default"].stringify(value)).then(() => {
        setCopyState('SuccessCopy');
        setTimeout(() => {
          setCopyState('NoCopy');
        }, 1500);
      }, err => {
        console.error('Failed to copy: ', err);
        setCopyState('ErrorCopy');
        setTimeout(() => {
          setCopyState('NoCopy');
        }, 1500);
      });
    } : undefined,
    style: {
      cursor: 'pointer',
      color: 'inherit',
      font: 'inherit',
      outline: 'inherit',
      background: 'transparent',
      border: 'none',
      padding: 0
    }
  }, copyState === 'NoCopy' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Copier, null) : copyState === 'SuccessCopy' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CopiedCopier, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ErrorCopier, null));
};
const Value = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('span', (_props, theme) => ({
  color: theme.danger
}));
const SubEntries = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('div', {
  marginLeft: '.1em',
  paddingLeft: '1em',
  borderLeft: '2px solid rgba(0,0,0,.15)'
});
const Info = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.styled)('span', {
  color: 'grey',
  fontSize: '.7em'
});
const Expander = ({
  expanded,
  style = {}
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
  style: {
    display: 'inline-block',
    transition: 'all .1s ease',
    transform: "rotate(" + (expanded ? 90 : 0) + "deg) " + (style.transform || ''),
    ...style
  }
}, "\u25B6");

const Copier = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
  "aria-label": "Copy object to clipboard",
  title: "Copy object to clipboard",
  style: {
    paddingLeft: '1em'
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
  height: "12",
  viewBox: "0 0 16 12",
  width: "10"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  fill: "currentColor",
  d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  fill: "currentColor",
  d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
})));

const ErrorCopier = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
  "aria-label": "Failed copying to clipboard",
  title: "Failed copying to clipboard",
  style: {
    paddingLeft: '1em',
    display: 'flex',
    alignItems: 'center'
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
  height: "12",
  viewBox: "0 0 16 12",
  width: "10",
  display: "block"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  fill: "red",
  d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
  style: {
    color: 'red',
    fontSize: '12px',
    paddingLeft: '4px',
    position: 'relative',
    top: '2px'
  }
}, "See console"));

const CopiedCopier = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
  "aria-label": "Object copied to clipboard",
  title: "Object copied to clipboard",
  style: {
    paddingLeft: '1em',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
  height: "16",
  viewBox: "0 0 16 16",
  width: "16",
  display: "block"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
  fill: "green",
  d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
})));

/**
 * Chunk elements in the array by size
 *
 * when the array cannot be chunked evenly by size, the last chunk will be
 * filled with the remaining elements
 *
 * @example
 * chunkArray(['a','b', 'c', 'd', 'e'], 2) // returns [['a','b'], ['c', 'd'], ['e']]
 */
function chunkArray(array, size) {
  if (size < 1) return [];
  let i = 0;
  const result = [];

  while (i < array.length) {
    result.push(array.slice(i, i + size));
    i = i + size;
  }

  return result;
}
const DefaultRenderer = ({
  handleEntry,
  label,
  value,
  subEntries = [],
  subEntryPages = [],
  type,
  expanded = false,
  copyable = false,
  toggleExpanded,
  pageSize
}) => {
  const [expandedPages, setExpandedPages] = react__WEBPACK_IMPORTED_MODULE_0__.useState([]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Entry, {
    key: label
  }, subEntryPages.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ExpandButton, {
    onClick: () => toggleExpanded()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Expander, {
    expanded: expanded
  }), " ", label, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Info, null, String(type).toLowerCase() === 'iterable' ? '(Iterable) ' : '', subEntries.length, " ", subEntries.length > 1 ? "items" : "item")), copyable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CopyButton, {
    value: value
  }) : null, expanded ? subEntryPages.length === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubEntries, null, subEntries.map(handleEntry)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubEntries, null, subEntryPages.map((entries, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    key: index
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Entry, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LabelButton, {
    onClick: () => setExpandedPages(old => old.includes(index) ? old.filter(d => d !== index) : [...old, index])
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Expander, {
    expanded: expanded
  }), " [", index * pageSize, " ...", ' ', index * pageSize + pageSize - 1, "]"), expandedPages.includes(index) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubEntries, null, entries.map(handleEntry)) : null)))) : null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, null, label, ":"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Value, null, (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.displayValue)(value))));
};

function isIterable(x) {
  return Symbol.iterator in x;
}

function Explorer({
  value,
  defaultExpanded,
  renderer = DefaultRenderer,
  pageSize = 100,
  copyable = false,
  ...rest
}) {
  const [expanded, setExpanded] = react__WEBPACK_IMPORTED_MODULE_0__.useState(Boolean(defaultExpanded));
  const toggleExpanded = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => setExpanded(old => !old), []);
  let type = typeof value;
  let subEntries = [];

  const makeProperty = sub => {
    const subDefaultExpanded = defaultExpanded === true ? {
      [sub.label]: true
    } : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
    return { ...sub,
      defaultExpanded: subDefaultExpanded
    };
  };

  if (Array.isArray(value)) {
    type = 'array';
    subEntries = value.map((d, i) => makeProperty({
      label: i.toString(),
      value: d
    }));
  } else if (value !== null && typeof value === 'object' && isIterable(value) && typeof value[Symbol.iterator] === 'function') {
    type = 'Iterable';
    subEntries = Array.from(value, (val, i) => makeProperty({
      label: i.toString(),
      value: val
    }));
  } else if (typeof value === 'object' && value !== null) {
    type = 'object';
    subEntries = Object.entries(value).map(([key, val]) => makeProperty({
      label: key,
      value: val
    }));
  }

  const subEntryPages = chunkArray(subEntries, pageSize);
  return renderer({
    handleEntry: entry => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Explorer, (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__["extends"])({
      key: entry.label,
      value: value,
      renderer: renderer,
      copyable: copyable
    }, rest, entry)),
    type,
    subEntries,
    subEntryPages,
    value,
    expanded,
    copyable,
    toggleExpanded,
    pageSize,
    ...rest
  });
}


//# sourceMappingURL=Explorer.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/Logo.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/Logo.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var _virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_virtual/_rollupPluginBabelHelpers.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");



function Logo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__["extends"])({
    width: "40px",
    height: "40px",
    viewBox: "0 0 190 190",
    version: "1.1"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    transform: "translate(-33.000000, 0.000000)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M72.7239712,61.3436237 C69.631224,46.362877 68.9675112,34.8727722 70.9666331,26.5293551 C72.1555965,21.5671678 74.3293088,17.5190846 77.6346064,14.5984631 C81.1241394,11.5150478 85.5360327,10.0020122 90.493257,10.0020122 C98.6712013,10.0020122 107.26826,13.7273214 116.455725,20.8044264 C120.20312,23.6910458 124.092437,27.170411 128.131651,31.2444746 C128.45314,30.8310265 128.816542,30.4410453 129.22143,30.0806152 C140.64098,19.9149716 150.255245,13.5989272 158.478408,11.1636507 C163.367899,9.715636 167.958526,9.57768202 172.138936,10.983031 C176.551631,12.4664684 180.06766,15.5329489 182.548314,19.8281091 C186.642288,26.9166735 187.721918,36.2310983 186.195595,47.7320243 C185.573451,52.4199112 184.50985,57.5263831 183.007094,63.0593153 C183.574045,63.1277086 184.142416,63.2532808 184.705041,63.4395297 C199.193932,68.2358678 209.453582,73.3937462 215.665021,79.2882839 C219.360669,82.7953831 221.773972,86.6998434 222.646365,91.0218204 C223.567176,95.5836746 222.669313,100.159332 220.191548,104.451297 C216.105211,111.529614 208.591643,117.11221 197.887587,121.534031 C193.589552,123.309539 188.726579,124.917559 183.293259,126.363748 C183.541176,126.92292 183.733521,127.516759 183.862138,128.139758 C186.954886,143.120505 187.618598,154.61061 185.619477,162.954027 C184.430513,167.916214 182.256801,171.964297 178.951503,174.884919 C175.46197,177.968334 171.050077,179.48137 166.092853,179.48137 C157.914908,179.48137 149.31785,175.756061 140.130385,168.678956 C136.343104,165.761613 132.410866,162.238839 128.325434,158.108619 C127.905075,158.765474 127.388968,159.376011 126.77857,159.919385 C115.35902,170.085028 105.744755,176.401073 97.5215915,178.836349 C92.6321009,180.284364 88.0414736,180.422318 83.8610636,179.016969 C79.4483686,177.533532 75.9323404,174.467051 73.4516862,170.171891 C69.3577116,163.083327 68.2780823,153.768902 69.8044053,142.267976 C70.449038,137.410634 71.56762,132.103898 73.1575891,126.339009 C72.5361041,126.276104 71.9120754,126.144816 71.2949591,125.940529 C56.8060684,121.144191 46.5464184,115.986312 40.3349789,110.091775 C36.6393312,106.584675 34.2260275,102.680215 33.3536352,98.3582381 C32.4328237,93.7963839 33.3306866,89.2207269 35.8084524,84.9287618 C39.8947886,77.8504443 47.4083565,72.2678481 58.1124133,67.8460273 C62.5385143,66.0176154 67.5637208,64.366822 73.1939394,62.8874674 C72.9933393,62.3969171 72.8349374,61.8811235 72.7239712,61.3436237 Z",
    fill: "#002C4B",
    fillRule: "nonzero",
    transform: "translate(128.000000, 95.000000) scale(-1, 1) translate(-128.000000, -95.000000) "
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M113.396882,64 L142.608177,64 C144.399254,64 146.053521,64.958025 146.944933,66.5115174 L161.577138,92.0115174 C162.461464,93.5526583 162.461464,95.4473417 161.577138,96.9884826 L146.944933,122.488483 C146.053521,124.041975 144.399254,125 142.608177,125 L113.396882,125 C111.605806,125 109.951539,124.041975 109.060126,122.488483 L94.4279211,96.9884826 C93.543596,95.4473417 93.543596,93.5526583 94.4279211,92.0115174 L109.060126,66.5115174 C109.951539,64.958025 111.605806,64 113.396882,64 Z M138.987827,70.2765273 C140.779849,70.2765273 142.434839,71.2355558 143.325899,72.7903404 L154.343038,92.0138131 C155.225607,93.5537825 155.225607,95.4462175 154.343038,96.9861869 L143.325899,116.20966 C142.434839,117.764444 140.779849,118.723473 138.987827,118.723473 L117.017233,118.723473 C115.225211,118.723473 113.570221,117.764444 112.67916,116.20966 L101.662022,96.9861869 C100.779452,95.4462175 100.779452,93.5537825 101.662022,92.0138131 L112.67916,72.7903404 C113.570221,71.2355558 115.225211,70.2765273 117.017233,70.2765273 L138.987827,70.2765273 Z M135.080648,77.1414791 L120.924411,77.1414791 C119.134228,77.1414791 117.480644,78.0985567 116.5889,79.6508285 L116.5889,79.6508285 L109.489217,92.0093494 C108.603232,93.5515958 108.603232,95.4484042 109.489217,96.9906506 L109.489217,96.9906506 L116.5889,109.349172 C117.480644,110.901443 119.134228,111.858521 120.924411,111.858521 L120.924411,111.858521 L135.080648,111.858521 C136.870831,111.858521 138.524416,110.901443 139.41616,109.349172 L139.41616,109.349172 L146.515843,96.9906506 C147.401828,95.4484042 147.401828,93.5515958 146.515843,92.0093494 L146.515843,92.0093494 L139.41616,79.6508285 C138.524416,78.0985567 136.870831,77.1414791 135.080648,77.1414791 L135.080648,77.1414791 Z M131.319186,83.7122186 C133.108028,83.7122186 134.760587,84.6678753 135.652827,86.2183156 L138.983552,92.0060969 C139.87203,93.5500005 139.87203,95.4499995 138.983552,96.9939031 L135.652827,102.781684 C134.760587,104.332125 133.108028,105.287781 131.319186,105.287781 L124.685874,105.287781 C122.897032,105.287781 121.244473,104.332125 120.352233,102.781684 L117.021508,96.9939031 C116.13303,95.4499995 116.13303,93.5500005 117.021508,92.0060969 L120.352233,86.2183156 C121.244473,84.6678753 122.897032,83.7122186 124.685874,83.7122186 L131.319186,83.7122186 Z M128.003794,90.1848875 C126.459294,90.1848875 125.034382,91.0072828 124.263005,92.3424437 C123.491732,93.6774232 123.491732,95.3225768 124.263005,96.6575563 C125.034382,97.9927172 126.459294,98.8151125 128.001266,98.8151125 L128.001266,98.8151125 C129.545766,98.8151125 130.970678,97.9927172 131.742055,96.6575563 C132.513327,95.3225768 132.513327,93.6774232 131.742055,92.3424437 C130.970678,91.0072828 129.545766,90.1848875 128.003794,90.1848875 L128.003794,90.1848875 Z M93,94.5009646 L100.767764,94.5009646",
    fill: "#FFD94C"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M87.8601729,108.357758 C89.1715224,107.608286 90.8360246,108.074601 91.5779424,109.399303 L91.5779424,109.399303 L92.0525843,110.24352 C95.8563392,116.982993 99.8190116,123.380176 103.940602,129.435068 C108.807881,136.585427 114.28184,143.82411 120.362479,151.151115 C121.316878,152.30114 121.184944,154.011176 120.065686,154.997937 L120.065686,154.997937 L119.454208,155.534625 C99.3465389,173.103314 86.2778188,176.612552 80.2480482,166.062341 C74.3500652,155.742717 76.4844915,136.982888 86.6513274,109.782853 C86.876818,109.179582 87.3045861,108.675291 87.8601729,108.357758 Z M173.534177,129.041504 C174.986131,128.785177 176.375496,129.742138 176.65963,131.194242 L176.65963,131.194242 L176.812815,131.986376 C181.782365,157.995459 178.283348,171 166.315764,171 C154.609745,171 139.708724,159.909007 121.612702,137.727022 C121.211349,137.235047 120.994572,136.617371 121,135.981509 C121.013158,134.480686 122.235785,133.274651 123.730918,133.287756 L123.730918,133.287756 L124.684654,133.294531 C132.305698,133.335994 139.714387,133.071591 146.910723,132.501323 C155.409039,131.82788 164.283523,130.674607 173.534177,129.041504 Z M180.408726,73.8119663 C180.932139,72.4026903 182.508386,71.6634537 183.954581,72.149012 L183.954581,72.149012 L184.742552,72.4154854 C210.583763,81.217922 220.402356,90.8916805 214.198332,101.436761 C208.129904,111.751366 190.484347,119.260339 161.26166,123.963678 C160.613529,124.067994 159.948643,123.945969 159.382735,123.618843 C158.047025,122.846729 157.602046,121.158214 158.388848,119.847438 L158.388848,119.847438 L158.889328,119.0105 C162.877183,112.31633 166.481358,105.654262 169.701854,99.0242957 C173.50501,91.1948179 177.073967,82.7907081 180.408726,73.8119663 Z M94.7383398,66.0363218 C95.3864708,65.9320063 96.0513565,66.0540315 96.6172646,66.3811573 C97.9529754,67.153271 98.3979538,68.8417862 97.6111517,70.1525615 L97.6111517,70.1525615 L97.1106718,70.9895001 C93.1228168,77.6836699 89.5186416,84.3457379 86.2981462,90.9757043 C82.49499,98.8051821 78.9260328,107.209292 75.5912744,116.188034 C75.0678608,117.59731 73.4916142,118.336546 72.045419,117.850988 L72.045419,117.850988 L71.2574475,117.584515 C45.4162372,108.782078 35.597644,99.1083195 41.8016679,88.5632391 C47.8700957,78.2486335 65.515653,70.7396611 94.7383398,66.0363218 Z M136.545792,34.4653746 C156.653461,16.8966864 169.722181,13.3874478 175.751952,23.9376587 C181.649935,34.2572826 179.515508,53.0171122 169.348673,80.2171474 C169.123182,80.8204179 168.695414,81.324709 168.139827,81.6422422 C166.828478,82.3917144 165.163975,81.9253986 164.422058,80.6006966 L164.422058,80.6006966 L163.947416,79.7564798 C160.143661,73.0170065 156.180988,66.6198239 152.059398,60.564932 C147.192119,53.4145727 141.71816,46.1758903 135.637521,38.8488847 C134.683122,37.6988602 134.815056,35.9888243 135.934314,35.0020629 L135.934314,35.0020629 Z M90.6842361,18 C102.390255,18 117.291276,29.0909926 135.387298,51.2729777 C135.788651,51.7649527 136.005428,52.3826288 136,53.0184911 C135.986842,54.5193144 134.764215,55.7253489 133.269082,55.7122445 L133.269082,55.7122445 L132.315346,55.7054689 C124.694302,55.6640063 117.285613,55.9284091 110.089277,56.4986773 C101.590961,57.17212 92.7164767,58.325393 83.4658235,59.9584962 C82.0138691,60.2148231 80.6245044,59.2578618 80.3403697,57.805758 L80.3403697,57.805758 L80.1871846,57.0136235 C75.2176347,31.0045412 78.7166519,18 90.6842361,18 Z",
    fill: "#FF4154"
  }))));
}


//# sourceMappingURL=Logo.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extends": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}


//# sourceMappingURL=_rollupPluginBabelHelpers.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/devtools.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/devtools.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactQueryDevtools: () => (/* binding */ ReactQueryDevtools),
/* harmony export */   ReactQueryDevtoolsPanel: () => (/* binding */ ReactQueryDevtoolsPanel)
/* harmony export */ });
/* harmony import */ var _virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_virtual/_rollupPluginBabelHelpers.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/lib/onlineManager.mjs");
/* harmony import */ var _tanstack_match_sorter_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/match-sorter-utils */ "./node_modules/@tanstack/match-sorter-utils/build/lib/index.mjs");
/* harmony import */ var _useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useLocalStorage.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/useLocalStorage.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/utils.mjs");
/* harmony import */ var _styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styledComponents.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/styledComponents.mjs");
/* harmony import */ var _screenreader_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./screenreader.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/screenreader.mjs");
/* harmony import */ var _theme_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./theme.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/theme.mjs");
/* harmony import */ var _Explorer_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Explorer.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/Explorer.mjs");
/* harmony import */ var _Logo_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Logo.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/Logo.mjs");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
'use client';














function ReactQueryDevtools({
  initialIsOpen,
  panelProps = {},
  closeButtonProps = {},
  toggleButtonProps = {},
  position = 'bottom-left',
  containerElement: Container = 'aside',
  context,
  styleNonce,
  panelPosition: initialPanelPosition = 'bottom',
  errorTypes = []
}) {
  const rootRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const panelRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const [isOpen, setIsOpen] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsOpen', initialIsOpen);
  const [devtoolsHeight, setDevtoolsHeight] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsHeight', _utils_mjs__WEBPACK_IMPORTED_MODULE_3__.defaultPanelSize);
  const [devtoolsWidth, setDevtoolsWidth] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsWidth', _utils_mjs__WEBPACK_IMPORTED_MODULE_3__.defaultPanelSize);
  const [panelPosition = 'bottom', setPanelPosition] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsPanelPosition', initialPanelPosition);
  const [isResolvedOpen, setIsResolvedOpen] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const [isResizing, setIsResizing] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const isMounted = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.useIsMounted)();

  const handleDragStart = (panelElement, startEvent) => {
    if (!panelElement) return;
    if (startEvent.button !== 0) return; // Only allow left click for drag

    const isVertical = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.isVerticalSide)(panelPosition);
    setIsResizing(true);
    const {
      height,
      width
    } = panelElement.getBoundingClientRect();
    const startX = startEvent.clientX;
    const startY = startEvent.clientY;
    let newSize = 0;

    const run = moveEvent => {
      // prevent mouse selecting stuff with mouse drag
      moveEvent.preventDefault(); // calculate the correct size based on mouse position and current panel position
      // hint: it is different formula for the opposite sides

      if (isVertical) {
        newSize = width + (panelPosition === 'right' ? startX - moveEvent.clientX : moveEvent.clientX - startX);
        setDevtoolsWidth(newSize);
      } else {
        newSize = height + (panelPosition === 'bottom' ? startY - moveEvent.clientY : moveEvent.clientY - startY);
        setDevtoolsHeight(newSize);
      }

      if (newSize < _utils_mjs__WEBPACK_IMPORTED_MODULE_3__.minPanelSize) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    const unsub = () => {
      if (isResizing) {
        setIsResizing(false);
      }

      document.removeEventListener('mousemove', run, false);
      document.removeEventListener('mouseUp', unsub, false);
    };

    document.addEventListener('mousemove', run, false);
    document.addEventListener('mouseup', unsub, false);
  };

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    setIsResolvedOpen(isOpen != null ? isOpen : false);
  }, [isOpen, isResolvedOpen, setIsResolvedOpen]); // Toggle panel visibility before/after transition (depending on direction).
  // Prevents focusing in a closed panel.

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const ref = panelRef.current;

    if (ref) {
      const handlePanelTransitionStart = () => {
        if (isResolvedOpen) {
          ref.style.visibility = 'visible';
        }
      };

      const handlePanelTransitionEnd = () => {
        if (!isResolvedOpen) {
          ref.style.visibility = 'hidden';
        }
      };

      ref.addEventListener('transitionstart', handlePanelTransitionStart);
      ref.addEventListener('transitionend', handlePanelTransitionEnd);
      return () => {
        ref.removeEventListener('transitionstart', handlePanelTransitionStart);
        ref.removeEventListener('transitionend', handlePanelTransitionEnd);
      };
    }

    return;
  }, [isResolvedOpen]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    var _rootRef$current;

    if (isResolvedOpen && (_rootRef$current = rootRef.current) != null && _rootRef$current.parentElement) {
      const {
        parentElement
      } = rootRef.current;
      const styleProp = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getSidedProp)('padding', panelPosition);
      const isVertical = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.isVerticalSide)(panelPosition);

      const previousPaddings = (({
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight
      }) => ({
        padding,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight
      }))(parentElement.style);

      const run = () => {
        // reset the padding
        parentElement.style.padding = '0px';
        parentElement.style.paddingTop = '0px';
        parentElement.style.paddingBottom = '0px';
        parentElement.style.paddingLeft = '0px';
        parentElement.style.paddingRight = '0px'; // set the new padding based on the new panel position

        parentElement.style[styleProp] = (isVertical ? devtoolsWidth : devtoolsHeight) + "px";
      };

      run();

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', run);
        return () => {
          window.removeEventListener('resize', run);
          Object.entries(previousPaddings).forEach(([property, previousValue]) => {
            parentElement.style[property] = previousValue;
          });
        };
      }
    }

    return;
  }, [isResolvedOpen, panelPosition, devtoolsHeight, devtoolsWidth]);
  const {
    style: panelStyle = {},
    ...otherPanelProps
  } = panelProps;
  const {
    style: toggleButtonStyle = {},
    onClick: onToggleClick,
    ...otherToggleButtonProps
  } = toggleButtonProps; // get computed style based on panel position

  const style = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getSidePanelStyle)({
    position: panelPosition,
    devtoolsTheme: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme,
    isOpen: isResolvedOpen,
    height: devtoolsHeight,
    width: devtoolsWidth,
    isResizing,
    panelStyle
  }); // Do not render on the server

  if (!isMounted()) return null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Container, {
    ref: rootRef,
    className: "ReactQueryDevtools",
    "aria-label": "React Query Devtools"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_mjs__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {
    theme: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReactQueryDevtoolsPanel, (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__["extends"])({
    ref: panelRef,
    context: context,
    styleNonce: styleNonce,
    position: panelPosition,
    onPositionChange: setPanelPosition,
    showCloseButton: true,
    closeButtonProps: closeButtonProps
  }, otherPanelProps, {
    style: style,
    isOpen: isResolvedOpen,
    setIsOpen: setIsOpen,
    onDragStart: e => handleDragStart(panelRef.current, e),
    errorTypes: errorTypes
  }))), !isResolvedOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__["extends"])({
    type: "button"
  }, otherToggleButtonProps, {
    "aria-label": "Open React Query Devtools",
    "aria-controls": "ReactQueryDevtoolsPanel",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    onClick: e => {
      setIsOpen(true);
      onToggleClick == null ? void 0 : onToggleClick(e);
    },
    style: {
      background: 'none',
      border: 0,
      padding: 0,
      position: 'fixed',
      zIndex: 99999,
      display: 'inline-flex',
      fontSize: '1.5em',
      margin: '.5em',
      cursor: 'pointer',
      width: 'fit-content',
      ...(position === 'top-right' ? {
        top: '0',
        right: '0'
      } : position === 'top-left' ? {
        top: '0',
        left: '0'
      } : position === 'bottom-right' ? {
        bottom: '0',
        right: '0'
      } : {
        bottom: '0',
        left: '0'
      }),
      ...toggleButtonStyle
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Logo_mjs__WEBPACK_IMPORTED_MODULE_6__["default"], {
    "aria-hidden": true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_screenreader_mjs__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: "Open React Query Devtools"
  })) : null);
}

const useSubscribeToQueryCache = (queryCache, getSnapshot, skip = false) => {
  return (0,use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(onStoreChange => {
    if (!skip) return queryCache.subscribe(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.notifyManager.batchCalls(onStoreChange));
    return () => {
      return;
    };
  }, [queryCache, skip]), getSnapshot, getSnapshot);
};

const ReactQueryDevtoolsPanel = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function ReactQueryDevtoolsPanel(props, ref) {
  const {
    isOpen = true,
    styleNonce,
    setIsOpen,
    context,
    onDragStart,
    onPositionChange,
    showCloseButton,
    position,
    closeButtonProps = {},
    errorTypes = [],
    ...panelProps
  } = props;
  const {
    onClick: onCloseClick,
    ...otherCloseButtonProps
  } = closeButtonProps;
  const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient)({
    context
  });
  const queryCache = queryClient.getQueryCache();
  const [sort, setSort] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsSortFn', Object.keys(_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.sortFns)[0]);
  const [filter, setFilter] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsFilter', '');
  const [baseSort, setBaseSort] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsBaseSort', 1);
  const sortFn = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _utils_mjs__WEBPACK_IMPORTED_MODULE_3__.sortFns[sort], [sort]);
  const queriesCount = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().length, !isOpen);
  const [activeQueryHash, setActiveQueryHash] = (0,_useLocalStorage_mjs__WEBPACK_IMPORTED_MODULE_2__["default"])('reactQueryDevtoolsActiveQueryHash', '');
  const queries = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const unsortedQueries = queryCache.getAll();

    if (queriesCount === 0) {
      return [];
    }

    const filtered = filter ? unsortedQueries.filter(item => (0,_tanstack_match_sorter_utils__WEBPACK_IMPORTED_MODULE_10__.rankItem)(item.queryHash, filter).passed) : [...unsortedQueries];
    const sorted = sortFn ? filtered.sort((a, b) => sortFn(a, b) * baseSort) : filtered;
    return sorted;
  }, [baseSort, sortFn, filter, queriesCount, queryCache]);
  const [isMockOffline, setMockOffline] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_theme_mjs__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {
    theme: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Panel, (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__["extends"])({
    ref: ref,
    className: "ReactQueryDevtoolsPanel",
    "aria-label": "React Query Devtools Panel",
    id: "ReactQueryDevtoolsPanel"
  }, panelProps, {
    style: {
      height: _utils_mjs__WEBPACK_IMPORTED_MODULE_3__.defaultPanelSize,
      position: 'relative',
      ...panelProps.style
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", {
    nonce: styleNonce,
    dangerouslySetInnerHTML: {
      __html: "\n            .ReactQueryDevtoolsPanel * {\n              scrollbar-color: " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt + " " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.gray + ";\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar, .ReactQueryDevtoolsPanel scrollbar {\n              width: 1em;\n              height: 1em;\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar-track, .ReactQueryDevtoolsPanel scrollbar-track {\n              background: " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt + ";\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar-thumb, .ReactQueryDevtoolsPanel scrollbar-thumb {\n              background: " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.gray + ";\n              border-radius: .5em;\n              border: 3px solid " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt + ";\n            }\n          "
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getResizeHandleStyle)(position),
    onMouseDown: onDragStart
  }), isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      flex: '1 1 500px',
      minHeight: '40%',
      maxHeight: '100%',
      overflow: 'auto',
      borderRight: "1px solid " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.grayAlt,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '.5em',
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    "aria-label": "Close React Query Devtools",
    "aria-controls": "ReactQueryDevtoolsPanel",
    "aria-haspopup": "true",
    "aria-expanded": "true",
    onClick: () => setIsOpen(false),
    style: {
      display: 'inline-flex',
      background: 'none',
      border: 0,
      padding: 0,
      marginRight: '.5em',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Logo_mjs__WEBPACK_IMPORTED_MODULE_6__["default"], {
    "aria-hidden": true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_screenreader_mjs__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: "Close React Query Devtools"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '.5em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(QueryStatusCount, {
    queryCache: queryCache
  }), position && onPositionChange ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Select, {
    "aria-label": "Panel position",
    value: position,
    style: {
      marginInlineStart: '.5em'
    },
    onChange: e => onPositionChange(e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "left"
  }, "Left"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "right"
  }, "Right"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "top"
  }, "Top"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "bottom"
  }, "Bottom")) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.5em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Input, {
    placeholder: "Filter",
    "aria-label": "Filter by queryhash",
    value: filter != null ? filter : '',
    onChange: e => setFilter(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Escape') setFilter('');
    },
    style: {
      flex: '1',
      width: '100%'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Select, {
    "aria-label": "Sort queries",
    value: sort,
    onChange: e => setSort(e.target.value),
    style: {
      flex: '1',
      minWidth: 75,
      marginRight: '.5em'
    }
  }, Object.keys(_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.sortFns).map(key => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    key: key,
    value: key
  }, "Sort by ", key))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => setBaseSort(old => old * -1),
    style: {
      padding: '.3em .4em',
      marginRight: '.5em'
    }
  }, baseSort === 1 ? '⬆ Asc' : '⬇ Desc'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    title: "Clear cache",
    "aria-label": "Clear cache",
    type: "button",
    onClick: () => queryCache.clear(),
    style: {
      padding: '.3em .4em',
      marginRight: '.5em'
    }
  }, "Clear"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => {
      if (isMockOffline) {
        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.onlineManager.setOnline(undefined);
        setMockOffline(false);
        window.dispatchEvent(new Event('online'));
      } else {
        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_12__.onlineManager.setOnline(false);
        setMockOffline(true);
      }
    },
    "aria-label": isMockOffline ? 'Restore offline mock' : 'Mock offline behavior',
    title: isMockOffline ? 'Restore offline mock' : 'Mock offline behavior',
    style: {
      padding: '0',
      height: '2em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "2em",
    height: "2em",
    viewBox: "0 0 24 24",
    stroke: isMockOffline ? _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.danger : 'currentColor',
    fill: "none"
  }, isMockOffline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("line", {
    x1: "12",
    y1: "18",
    x2: "12.01",
    y2: "18"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M9.172 15.172a4 4 0 0 1 5.656 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M6.343 12.343a7.963 7.963 0 0 1 3.864 -2.14m4.163 .155a7.965 7.965 0 0 1 3.287 2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M3.515 9.515a12 12 0 0 1 3.544 -2.455m3.101 -.92a12 12 0 0 1 10.325 3.374"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("line", {
    x1: "3",
    y1: "3",
    x2: "21",
    y2: "21"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("line", {
    x1: "12",
    y1: "18",
    x2: "12.01",
    y2: "18"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M9.172 15.172a4 4 0 0 1 5.656 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M6.343 12.343a8 8 0 0 1 11.314 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_screenreader_mjs__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: isMockOffline ? 'Restore offline mock' : 'Mock offline behavior'
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      overflowY: 'auto',
      flex: '1'
    }
  }, queries.map(query => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(QueryRow, {
      queryKey: query.queryKey,
      activeQueryHash: activeQueryHash,
      setActiveQueryHash: setActiveQueryHash,
      key: query.queryHash,
      queryCache: queryCache
    });
  }))), activeQueryHash && isOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActiveQuery, {
    activeQueryHash: activeQueryHash,
    queryCache: queryCache,
    queryClient: queryClient,
    errorTypes: errorTypes
  }) : null, showCloseButton ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__["extends"])({
    type: "button",
    "aria-controls": "ReactQueryDevtoolsPanel",
    "aria-haspopup": "true",
    "aria-expanded": "true"
  }, otherCloseButtonProps, {
    style: {
      position: 'absolute',
      zIndex: 99999,
      margin: '.5em',
      bottom: 0,
      left: 0,
      ...otherCloseButtonProps.style
    },
    onClick: e => {
      setIsOpen(false);
      onCloseClick == null ? void 0 : onCloseClick(e);
    }
  }), "Close") : null));
});

const ActiveQuery = ({
  queryCache,
  activeQueryHash,
  queryClient,
  errorTypes
}) => {
  var _useSubscribeToQueryC, _useSubscribeToQueryC2;

  const activeQuery = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().find(query => query.queryHash === activeQueryHash));
  const activeQueryState = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$getAll$fi;

    return (_queryCache$getAll$fi = queryCache.getAll().find(query => query.queryHash === activeQueryHash)) == null ? void 0 : _queryCache$getAll$fi.state;
  });
  const isStale = (_useSubscribeToQueryC = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$getAll$fi2;

    return (_queryCache$getAll$fi2 = queryCache.getAll().find(query => query.queryHash === activeQueryHash)) == null ? void 0 : _queryCache$getAll$fi2.isStale();
  })) != null ? _useSubscribeToQueryC : false;
  const observerCount = (_useSubscribeToQueryC2 = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$getAll$fi3;

    return (_queryCache$getAll$fi3 = queryCache.getAll().find(query => query.queryHash === activeQueryHash)) == null ? void 0 : _queryCache$getAll$fi3.getObserversCount();
  })) != null ? _useSubscribeToQueryC2 : 0;

  const handleRefetch = () => {
    const promise = activeQuery == null ? void 0 : activeQuery.fetch();
    promise == null ? void 0 : promise.catch(noop);
  };

  const currentErrorTypeName = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (activeQuery && activeQueryState != null && activeQueryState.error) {
      const errorType = errorTypes.find(type => {
        var _activeQueryState$err;

        return type.initializer(activeQuery).toString() === ((_activeQueryState$err = activeQueryState.error) == null ? void 0 : _activeQueryState$err.toString());
      });
      return errorType == null ? void 0 : errorType.name;
    }

    return undefined;
  }, [activeQuery, activeQueryState == null ? void 0 : activeQueryState.error, errorTypes]);

  if (!activeQuery || !activeQueryState) {
    return null;
  }

  const triggerError = errorType => {
    var _errorType$initialize;

    const error = (_errorType$initialize = errorType == null ? void 0 : errorType.initializer(activeQuery)) != null ? _errorType$initialize : new Error('Unknown error from devtools');
    const __previousQueryOptions = activeQuery.options;
    activeQuery.setState({
      status: 'error',
      error,
      fetchMeta: { ...activeQuery.state.fetchMeta,
        __previousQueryOptions
      }
    });
  };

  const restoreQueryAfterLoadingOrError = () => {
    activeQuery.fetch(activeQuery.state.fetchMeta.__previousQueryOptions, {
      // Make sure this fetch will cancel the previous one
      cancelRefetch: true
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.ActiveQueryPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '.5em',
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt,
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, "Query Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '.5em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      marginBottom: '.5em',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, {
    style: {
      lineHeight: '1.8em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    style: {
      margin: 0,
      padding: 0,
      overflow: 'auto'
    }
  }, (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.displayValue)(activeQuery.queryKey, true))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      padding: '0.3em .6em',
      borderRadius: '0.4em',
      fontWeight: 'bold',
      textShadow: '0 2px 10px black',
      background: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusColor)({
        queryState: activeQueryState,
        isStale: isStale,
        observerCount: observerCount,
        theme: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme
      }),
      flexShrink: 0
    }
  }, (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(activeQuery))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      marginBottom: '.5em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, "Observers: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, observerCount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, "Last Updated:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, new Date(activeQueryState.dataUpdatedAt).toLocaleTimeString()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt,
      padding: '.5em',
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, "Actions"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '0.5em',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5em',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: handleRefetch,
    disabled: activeQueryState.fetchStatus === 'fetching',
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.active
    }
  }, "Refetch"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => queryClient.invalidateQueries(activeQuery),
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.warning,
      color: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.inputTextColor
    }
  }, "Invalidate"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => queryClient.resetQueries(activeQuery),
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.gray
    }
  }, "Reset"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => queryClient.removeQueries(activeQuery),
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.danger
    }
  }, "Remove"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => {
      var _activeQuery$state$fe;

      // Return early if the query is already restoring
      if (activeQuery.state.fetchStatus === 'fetching' && typeof ((_activeQuery$state$fe = activeQuery.state.fetchMeta) == null ? void 0 : _activeQuery$state$fe.__previousQueryOptions) === 'undefined') {
        return;
      }

      if (activeQuery.state.data === undefined) {
        restoreQueryAfterLoadingOrError();
      } else {
        const __previousQueryOptions = activeQuery.options; // Trigger a fetch in order to trigger suspense as well.

        activeQuery.fetch({ ...__previousQueryOptions,
          queryFn: () => {
            return new Promise(() => {// Never resolve
            });
          },
          cacheTime: -1
        });
        activeQuery.setState({
          data: undefined,
          status: 'loading',
          fetchMeta: { ...activeQuery.state.fetchMeta,
            __previousQueryOptions
          }
        });
      }
    },
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.paused
    }
  }, activeQuery.state.status === 'loading' ? 'Restore' : 'Trigger', ' ', "loading"), ' ', errorTypes.length === 0 || activeQuery.state.status === 'error' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Button, {
    type: "button",
    onClick: () => {
      if (!activeQuery.state.error) {
        triggerError();
      } else {
        queryClient.resetQueries(activeQuery);
      }
    },
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.danger
    }
  }, activeQuery.state.status === 'error' ? 'Restore' : 'Trigger', " error") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Trigger error:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Select, {
    value: currentErrorTypeName != null ? currentErrorTypeName : '',
    style: {
      marginInlineStart: '.5em'
    },
    onChange: e => {
      const errorType = errorTypes.find(t => t.name === e.target.value);
      triggerError(errorType);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    key: "",
    value: ""
  }), errorTypes.map(errorType => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    key: errorType.name,
    value: errorType.name
  }, errorType.name))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt,
      padding: '.5em',
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, "Data Explorer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '.5em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Explorer_mjs__WEBPACK_IMPORTED_MODULE_13__["default"], {
    label: "Data",
    value: activeQueryState.data,
    defaultExpanded: {},
    copyable: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.backgroundAlt,
      padding: '.5em',
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, "Query Explorer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      padding: '.5em'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Explorer_mjs__WEBPACK_IMPORTED_MODULE_13__["default"], {
    label: "Query",
    value: activeQuery,
    defaultExpanded: {
      queryKey: true
    }
  })));
};

const QueryStatusCount = ({
  queryCache
}) => {
  const hasFresh = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().filter(q => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(q) === 'fresh').length);
  const hasFetching = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().filter(q => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(q) === 'fetching').length);
  const hasPaused = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().filter(q => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(q) === 'paused').length);
  const hasStale = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().filter(q => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(q) === 'stale').length);
  const hasInactive = useSubscribeToQueryCache(queryCache, () => queryCache.getAll().filter(q => (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusLabel)(q) === 'inactive').length);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKeys, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKey, {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.success,
      opacity: hasFresh ? 1 : 0.3
    }
  }, "fresh ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, "(", hasFresh, ")")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKey, {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.active,
      opacity: hasFetching ? 1 : 0.3
    }
  }, "fetching ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, "(", hasFetching, ")")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKey, {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.paused,
      opacity: hasPaused ? 1 : 0.3
    }
  }, "paused ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, "(", hasPaused, ")")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKey, {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.warning,
      color: 'black',
      textShadow: '0',
      opacity: hasStale ? 1 : 0.3
    }
  }, "stale ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, "(", hasStale, ")")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.QueryKey, {
    style: {
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.gray,
      opacity: hasInactive ? 1 : 0.3
    }
  }, "inactive ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, null, "(", hasInactive, ")")));
};

const QueryRow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(({
  queryKey,
  setActiveQueryHash,
  activeQueryHash,
  queryCache
}) => {
  var _useSubscribeToQueryC3, _useSubscribeToQueryC4, _useSubscribeToQueryC5, _useSubscribeToQueryC6;

  const queryHash = (_useSubscribeToQueryC3 = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$find;

    return (_queryCache$find = queryCache.find(queryKey)) == null ? void 0 : _queryCache$find.queryHash;
  })) != null ? _useSubscribeToQueryC3 : '';
  const queryState = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$find2;

    return (_queryCache$find2 = queryCache.find(queryKey)) == null ? void 0 : _queryCache$find2.state;
  });
  const isStale = (_useSubscribeToQueryC4 = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$find3;

    return (_queryCache$find3 = queryCache.find(queryKey)) == null ? void 0 : _queryCache$find3.isStale();
  })) != null ? _useSubscribeToQueryC4 : false;
  const isDisabled = (_useSubscribeToQueryC5 = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$find4;

    return (_queryCache$find4 = queryCache.find(queryKey)) == null ? void 0 : _queryCache$find4.isDisabled();
  })) != null ? _useSubscribeToQueryC5 : false;
  const observerCount = (_useSubscribeToQueryC6 = useSubscribeToQueryCache(queryCache, () => {
    var _queryCache$find5;

    return (_queryCache$find5 = queryCache.find(queryKey)) == null ? void 0 : _queryCache$find5.getObserversCount();
  })) != null ? _useSubscribeToQueryC6 : 0;

  if (!queryState) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    role: "button",
    "aria-label": "Open query details for " + queryHash,
    onClick: () => setActiveQueryHash(activeQueryHash === queryHash ? '' : queryHash),
    style: {
      display: 'flex',
      borderBottom: "solid 1px " + _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.grayAlt,
      cursor: 'pointer',
      background: queryHash === activeQueryHash ? 'rgba(255,255,255,.1)' : undefined
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      flex: '0 0 auto',
      width: '2em',
      height: '2em',
      background: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.getQueryStatusColor)({
        queryState,
        isStale,
        observerCount,
        theme: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme
      }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      textShadow: isStale ? '0' : '0 0 10px black',
      color: isStale ? 'black' : 'white'
    }
  }, observerCount), isDisabled ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      flex: '0 0 auto',
      height: '2em',
      background: _theme_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultTheme.gray,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      padding: '0 0.5em'
    }
  }, "disabled") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_styledComponents_mjs__WEBPACK_IMPORTED_MODULE_11__.Code, {
    style: {
      padding: '.5em'
    }
  }, "" + queryHash));
});
QueryRow.displayName = 'QueryRow'; // eslint-disable-next-line @typescript-eslint/no-empty-function

function noop() {}


//# sourceMappingURL=devtools.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/index.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/index.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactQueryDevtools: () => (/* binding */ ReactQueryDevtools),
/* harmony export */   ReactQueryDevtoolsPanel: () => (/* binding */ ReactQueryDevtoolsPanel)
/* harmony export */ });
/* harmony import */ var _devtools_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./devtools.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/devtools.mjs");
'use client';


const ReactQueryDevtools =  false ? 0 : _devtools_mjs__WEBPACK_IMPORTED_MODULE_0__.ReactQueryDevtools;
const ReactQueryDevtoolsPanel =  false ? 0 : _devtools_mjs__WEBPACK_IMPORTED_MODULE_0__.ReactQueryDevtoolsPanel;


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/screenreader.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/screenreader.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScreenReader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function ScreenReader({
  text
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      position: 'absolute',
      width: '0.1px',
      height: '0.1px',
      overflow: 'hidden'
    }
  }, text);
}


//# sourceMappingURL=screenreader.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/styledComponents.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/styledComponents.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveQueryPanel: () => (/* binding */ ActiveQueryPanel),
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   Code: () => (/* binding */ Code),
/* harmony export */   Input: () => (/* binding */ Input),
/* harmony export */   Panel: () => (/* binding */ Panel),
/* harmony export */   QueryKey: () => (/* binding */ QueryKey),
/* harmony export */   QueryKeys: () => (/* binding */ QueryKeys),
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/utils.mjs");


const Panel = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('div', (_props, theme) => ({
  fontSize: 'clamp(12px, 1.5vw, 14px)',
  fontFamily: "sans-serif",
  display: 'flex',
  backgroundColor: theme.background,
  color: theme.foreground
}), {
  '(max-width: 700px)': {
    flexDirection: 'column'
  },
  '(max-width: 600px)': {
    fontSize: '.9em' // flexDirection: 'column',

  }
});
const ActiveQueryPanel = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('div', () => ({
  flex: '1 1 500px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  height: '100%'
}), {
  '(max-width: 700px)': (_props, theme) => ({
    borderTop: "2px solid " + theme.gray
  })
});
const Button = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('button', (props, theme) => ({
  appearance: 'none',
  fontSize: '.9em',
  fontWeight: 'bold',
  background: theme.gray,
  border: '0',
  borderRadius: '.3em',
  color: 'white',
  padding: '.5em',
  opacity: props.disabled ? '.5' : undefined,
  cursor: 'pointer'
}));
const QueryKeys = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('span', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5em',
  fontSize: '0.9em'
});
const QueryKey = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '.2em .4em',
  fontWeight: 'bold',
  textShadow: '0 0 10px black',
  borderRadius: '.2em'
});
const Code = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('code', {
  fontSize: '.9em',
  color: 'inherit',
  background: 'inherit'
});
const Input = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('input', (_props, theme) => ({
  backgroundColor: theme.inputBackgroundColor,
  border: 0,
  borderRadius: '.2em',
  color: theme.inputTextColor,
  fontSize: '.9em',
  lineHeight: "1.3",
  padding: '.3em .4em'
}));
const Select = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.styled)('select', (_props, theme) => ({
  display: "inline-block",
  fontSize: ".9em",
  fontFamily: "sans-serif",
  fontWeight: 'normal',
  lineHeight: "1.3",
  padding: ".3em 1.5em .3em .5em",
  height: 'auto',
  border: 0,
  borderRadius: ".2em",
  appearance: "none",
  WebkitAppearance: 'none',
  backgroundColor: theme.inputBackgroundColor,
  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23444444'><polygon points='0,25 100,25 50,75'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right .55em center",
  backgroundSize: ".65em auto, 100%",
  color: theme.inputTextColor
}), {
  '(max-width: 500px)': {
    display: 'none'
  }
});


//# sourceMappingURL=styledComponents.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/theme.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/theme.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),
/* harmony export */   defaultTheme: () => (/* binding */ defaultTheme),
/* harmony export */   useTheme: () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var _virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_virtual/_rollupPluginBabelHelpers.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/_virtual/_rollupPluginBabelHelpers.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';



const defaultTheme = {
  background: '#0b1521',
  backgroundAlt: '#132337',
  foreground: 'white',
  gray: '#3f4e60',
  grayAlt: '#222e3e',
  inputBackgroundColor: '#fff',
  inputTextColor: '#000',
  success: '#00ab52',
  danger: '#ff0085',
  active: '#006bff',
  paused: '#8c49eb',
  warning: '#ffb200'
};
const ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultTheme);
function ThemeProvider({
  theme,
  ...rest
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ThemeContext.Provider, (0,_virtual_rollupPluginBabelHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__["extends"])({
    value: theme
  }, rest));
}
function useTheme() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(ThemeContext);
}


//# sourceMappingURL=theme.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/useLocalStorage.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/useLocalStorage.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useLocalStorage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


const getItem = key => {
  try {
    const itemValue = localStorage.getItem(key);

    if (typeof itemValue === 'string') {
      return JSON.parse(itemValue);
    }

    return undefined;
  } catch {
    return undefined;
  }
};

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const initialValue = getItem(key);

    if (typeof initialValue === 'undefined' || initialValue === null) {
      setValue(typeof defaultValue === 'function' ? defaultValue() : defaultValue);
    } else {
      setValue(initialValue);
    }
  }, [defaultValue, key]);
  const setter = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(updater => {
    setValue(old => {
      let newVal = updater;

      if (typeof updater == 'function') {
        newVal = updater(old);
      }

      try {
        localStorage.setItem(key, JSON.stringify(newVal));
      } catch {}

      return newVal;
    });
  }, [key]);
  return [value, setter];
}


//# sourceMappingURL=useLocalStorage.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/useMediaQuery.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/useMediaQuery.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useMediaQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


function useMediaQuery(query) {
  // Keep track of the preference in state, start with the current match
  const [isMatch, setIsMatch] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }

    return;
  }); // Watch for changes

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create a matcher
      const matcher = window.matchMedia(query); // Create our handler

      const onChange = ({
        matches
      }) => setIsMatch(matches); // Listen for changes


      matcher.addListener(onChange);
      return () => {
        // Stop listening for changes
        matcher.removeListener(onChange);
      };
    }

    return;
  }, [isMatch, query, setIsMatch]);
  return isMatch;
}


//# sourceMappingURL=useMediaQuery.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query-devtools/build/lib/utils.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query-devtools/build/lib/utils.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultPanelSize: () => (/* binding */ defaultPanelSize),
/* harmony export */   displayValue: () => (/* binding */ displayValue),
/* harmony export */   getOppositeSide: () => (/* binding */ getOppositeSide),
/* harmony export */   getQueryStatusColor: () => (/* binding */ getQueryStatusColor),
/* harmony export */   getQueryStatusLabel: () => (/* binding */ getQueryStatusLabel),
/* harmony export */   getResizeHandleStyle: () => (/* binding */ getResizeHandleStyle),
/* harmony export */   getSidePanelStyle: () => (/* binding */ getSidePanelStyle),
/* harmony export */   getSidedProp: () => (/* binding */ getSidedProp),
/* harmony export */   isVerticalSide: () => (/* binding */ isVerticalSide),
/* harmony export */   minPanelSize: () => (/* binding */ minPanelSize),
/* harmony export */   sides: () => (/* binding */ sides),
/* harmony export */   sortFns: () => (/* binding */ sortFns),
/* harmony export */   styled: () => (/* binding */ styled),
/* harmony export */   useIsMounted: () => (/* binding */ useIsMounted)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! superjson */ "./node_modules/superjson/dist/esm/index.js");
/* harmony import */ var _theme_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/theme.mjs");
/* harmony import */ var _useMediaQuery_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useMediaQuery.mjs */ "./node_modules/@tanstack/react-query-devtools/build/lib/useMediaQuery.mjs");





function getQueryStatusColor({
  queryState,
  observerCount,
  isStale,
  theme
}) {
  return queryState.fetchStatus === 'fetching' ? theme.active : !observerCount ? theme.gray : queryState.fetchStatus === 'paused' ? theme.paused : isStale ? theme.warning : theme.success;
}
function getQueryStatusLabel(query) {
  return query.state.fetchStatus === 'fetching' ? 'fetching' : !query.getObserversCount() ? 'inactive' : query.state.fetchStatus === 'paused' ? 'paused' : query.isStale() ? 'stale' : 'fresh';
}
function styled(type, newStyles, queries = {}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(({
    style,
    ...rest
  }, ref) => {
    const theme = (0,_theme_mjs__WEBPACK_IMPORTED_MODULE_2__.useTheme)();
    const mediaStyles = Object.entries(queries).reduce((current, [key, value]) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return (0,_useMediaQuery_mjs__WEBPACK_IMPORTED_MODULE_3__["default"])(key) ? { ...current,
        ...(typeof value === 'function' ? value(rest, theme) : value)
      } : current;
    }, {});
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(type, { ...rest,
      style: { ...(typeof newStyles === 'function' ? newStyles(rest, theme) : newStyles),
        ...style,
        ...mediaStyles
      },
      ref
    });
  });
}
function useIsMounted() {
  const mountedRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const isMounted = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => mountedRef.current, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return isMounted;
}
/**
 * Displays a string regardless the type of the data
 * @param {unknown} value Value to be stringified
 * @param {boolean} beautify Formats json to multiline
 */

const displayValue = (value, beautify = false) => {
  const {
    json
  } = superjson__WEBPACK_IMPORTED_MODULE_1__["default"].serialize(value);
  return JSON.stringify(json, null, beautify ? 2 : undefined);
}; // Sorting functions

const getStatusRank = q => q.state.fetchStatus !== 'idle' ? 0 : !q.getObserversCount() ? 3 : q.isStale() ? 2 : 1;

const queryHashSort = (a, b) => a.queryHash.localeCompare(b.queryHash);

const dateSort = (a, b) => a.state.dataUpdatedAt < b.state.dataUpdatedAt ? 1 : -1;

const statusAndDateSort = (a, b) => {
  if (getStatusRank(a) === getStatusRank(b)) {
    return dateSort(a, b);
  }

  return getStatusRank(a) > getStatusRank(b) ? 1 : -1;
};

const sortFns = {
  'Status > Last Updated': statusAndDateSort,
  'Query Hash': queryHashSort,
  'Last Updated': dateSort
};
const minPanelSize = 70;
const defaultPanelSize = 500;
const sides = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

/**
 * Check if the given side is vertical (left/right)
 */
function isVerticalSide(side) {
  return ['left', 'right'].includes(side);
}
/**
 * Get the opposite side, eg 'left' => 'right'. 'top' => 'bottom', etc
 */

function getOppositeSide(side) {
  return sides[side];
}
/**
 * Given as css prop it will return a sided css prop based on a given side
 * Example given `border` and `right` it return `borderRight`
 */

function getSidedProp(prop, side) {
  return "" + prop + (side.charAt(0).toUpperCase() + side.slice(1));
}
function getSidePanelStyle({
  position = 'bottom',
  height,
  width,
  devtoolsTheme,
  isOpen,
  isResizing,
  panelStyle
}) {
  const oppositeSide = getOppositeSide(position);
  const borderSide = getSidedProp('border', oppositeSide);
  const isVertical = isVerticalSide(position);
  return { ...panelStyle,
    direction: 'ltr',
    position: 'fixed',
    [position]: 0,
    [borderSide]: "1px solid " + devtoolsTheme.gray,
    transformOrigin: oppositeSide,
    boxShadow: '0 0 20px rgba(0,0,0,.3)',
    zIndex: 99999,
    // visibility will be toggled after transitions, but set initial state here
    visibility: isOpen ? 'visible' : 'hidden',
    ...(isResizing ? {
      transition: "none"
    } : {
      transition: "all .2s ease"
    }),
    ...(isOpen ? {
      opacity: 1,
      pointerEvents: 'all',
      transform: isVertical ? "translateX(0) scale(1)" : "translateY(0) scale(1)"
    } : {
      opacity: 0,
      pointerEvents: 'none',
      transform: isVertical ? "translateX(15px) scale(1.02)" : "translateY(15px) scale(1.02)"
    }),
    ...(isVertical ? {
      top: 0,
      height: '100vh',
      maxWidth: '90%',
      width: typeof width === 'number' && width >= minPanelSize ? width : defaultPanelSize
    } : {
      left: 0,
      width: '100%',
      maxHeight: '90%',
      height: typeof height === 'number' && height >= minPanelSize ? height : defaultPanelSize
    })
  };
}
/**
 * Get resize handle style based on a given side
 */

function getResizeHandleStyle(position = 'bottom') {
  const isVertical = isVerticalSide(position);
  const oppositeSide = getOppositeSide(position);
  const marginSide = getSidedProp('margin', oppositeSide);
  return {
    position: 'absolute',
    cursor: isVertical ? 'col-resize' : 'row-resize',
    zIndex: 100000,
    [oppositeSide]: 0,
    [marginSide]: "-4px",
    ...(isVertical ? {
      top: 0,
      height: '100%',
      width: '4px'
    } : {
      width: '100%',
      height: '4px'
    })
  };
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   defaultContext: () => (/* binding */ defaultContext),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
'use client';


const defaultContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(undefined);
const QueryClientSharingContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(false); // If we are given a context, we will use it.
// Otherwise, if contextSharing is on, we share the first and at least one
// instance of the context across the window
// to ensure that if React Query is used across
// different bundles or microfrontends they will
// all use the same **instance** of context, regardless
// of module scoping.

function getQueryClientContext(context, contextSharing) {
  if (context) {
    return context;
  }

  if (contextSharing && typeof window !== 'undefined') {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }

    return window.ReactQueryClientContext;
  }

  return defaultContext;
}

const useQueryClient = ({
  context
} = {}) => {
  const queryClient = react__WEBPACK_IMPORTED_MODULE_0__.useContext(getQueryClientContext(context, react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientSharingContext)));

  if (!queryClient) {
    throw new Error('No QueryClient set, use QueryClientProvider to set one');
  }

  return queryClient;
};
const QueryClientProvider = ({
  client,
  children,
  context,
  contextSharing = false
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);

  if ( true && contextSharing) {
    client.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");
  }

  const Context = getQueryClientContext(context, contextSharing);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(QueryClientSharingContext.Provider, {
    value: !context && contextSharing
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Context.Provider, {
    value: client
  }, children));
};


//# sourceMappingURL=QueryClientProvider.mjs.map


/***/ }),

/***/ "./node_modules/copy-anything/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/copy-anything/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copy: () => (/* binding */ copy)
/* harmony export */ });
/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ "./node_modules/is-what/dist/index.js");


function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target, options = {}) {
  if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}




/***/ }),

/***/ "./node_modules/immer/dist/immer.esm.mjs":
/*!***********************************************!*\
  !*** ./node_modules/immer/dist/immer.esm.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Immer: () => (/* binding */ un),
/* harmony export */   applyPatches: () => (/* binding */ pn),
/* harmony export */   castDraft: () => (/* binding */ K),
/* harmony export */   castImmutable: () => (/* binding */ $),
/* harmony export */   createDraft: () => (/* binding */ ln),
/* harmony export */   current: () => (/* binding */ R),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   enableAllPlugins: () => (/* binding */ J),
/* harmony export */   enableES5: () => (/* binding */ F),
/* harmony export */   enableMapSet: () => (/* binding */ C),
/* harmony export */   enablePatches: () => (/* binding */ T),
/* harmony export */   finishDraft: () => (/* binding */ dn),
/* harmony export */   freeze: () => (/* binding */ d),
/* harmony export */   immerable: () => (/* binding */ L),
/* harmony export */   isDraft: () => (/* binding */ r),
/* harmony export */   isDraftable: () => (/* binding */ t),
/* harmony export */   nothing: () => (/* binding */ H),
/* harmony export */   original: () => (/* binding */ e),
/* harmony export */   produce: () => (/* binding */ fn),
/* harmony export */   produceWithPatches: () => (/* binding */ cn),
/* harmony export */   setAutoFreeze: () => (/* binding */ sn),
/* harmony export */   setUseProxies: () => (/* binding */ vn)
/* harmony export */ });
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(true){var i=Y[n],o=i?"function"==typeof i?i.apply(null,t):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[Q]}function t(n){var r;return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!(null===(r=n.constructor)||void 0===r?void 0:r[L])||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?n.add(t):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)||(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0)),n}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return false||U||n(0),U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function g(n){O(n),n.p.forEach(S),n.p=null}function O(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.g=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.O||b("ES5").S(e,r,o),o?(i[Q].P&&(g(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o,u=o,a=!1;3===e.i&&(u=new Set(o),o.clear(),a=!0),i(u,(function(r,i){return A(n,e,o,r,i,t,a)})),x(n,o,!1),t&&n.u&&b("Patches").N(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s,v){if( true&&c===o&&n(5),r(c)){var p=M(e,c,s&&i&&3!==i.i&&!u(i.R,a)?s.concat(a):void 0);if(f(o,a,p),!r(p))return;e.m=!1}else v&&o.add(c);if(t(c)&&!y(c)){if(!e.h.D&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),!n.l&&n.h.D&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function N(n,r,t){var e=s(r)?b("MapSet").F(r,t):v(r)?b("MapSet").T(r,t):n.O?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function R(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=D(r,c),u.I=!1}else e=D(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function D(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function F(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return true&&f(r),en.get(r,n)},set:function(r){var t=this[Q]; true&&f(t),en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.g&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,R:{},l:r,t:n,k:i,o:null,g:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.R,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=i[s];"string"!=typeof p&&"number"!=typeof p&&(p=""+p),0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},N:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.R,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.R,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.R=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=N(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.g&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,R:void 0,t:n,k:this,C:!1,g:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.R.set(n,!0),t.o.set(n,r),t.R.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.R.set(n,!1):r.R.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.R=new Map,i(n.t,(function(r){n.R.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=N(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,g:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{F:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){F(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=N(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.R[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&(void 0!==t||r in n.o)||Number.isNaN(t)&&Number.isNaN(n.o[r])||(n.o[r]=t,n.R[r]=!0),!0},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.R[r]=!1,E(n),k(n)):delete n.R[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return true&&isNaN(parseInt(t))&&n(13),on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return true&&"length"!==t&&isNaN(parseInt(t))&&n(14),en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.O=B,this.D=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=N(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?g(c):O(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw g(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.D&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=R(e));var i=w(this),o=N(this,e,void 0);return o[Q].C=!0,O(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; true&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.D=n},i.setUseProxies=function(r){r&&!B&&n(20),this.O=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fn);
//# sourceMappingURL=immer.esm.js.map


/***/ }),

/***/ "./node_modules/is-what/dist/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-what/dist/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getType: () => (/* binding */ getType),
/* harmony export */   isAnyObject: () => (/* binding */ isAnyObject),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isBlob: () => (/* binding */ isBlob),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isDate: () => (/* binding */ isDate),
/* harmony export */   isEmptyArray: () => (/* binding */ isEmptyArray),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   isEmptyString: () => (/* binding */ isEmptyString),
/* harmony export */   isError: () => (/* binding */ isError),
/* harmony export */   isFile: () => (/* binding */ isFile),
/* harmony export */   isFullArray: () => (/* binding */ isFullArray),
/* harmony export */   isFullObject: () => (/* binding */ isFullObject),
/* harmony export */   isFullString: () => (/* binding */ isFullString),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isInstanceOf: () => (/* binding */ isInstanceOf),
/* harmony export */   isMap: () => (/* binding */ isMap),
/* harmony export */   isNaNValue: () => (/* binding */ isNaNValue),
/* harmony export */   isNegativeNumber: () => (/* binding */ isNegativeNumber),
/* harmony export */   isNull: () => (/* binding */ isNull),
/* harmony export */   isNullOrUndefined: () => (/* binding */ isNullOrUndefined),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isObjectLike: () => (/* binding */ isObjectLike),
/* harmony export */   isOneOf: () => (/* binding */ isOneOf),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPositiveNumber: () => (/* binding */ isPositiveNumber),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isPromise: () => (/* binding */ isPromise),
/* harmony export */   isRegExp: () => (/* binding */ isRegExp),
/* harmony export */   isSet: () => (/* binding */ isSet),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isSymbol: () => (/* binding */ isSymbol),
/* harmony export */   isType: () => (/* binding */ isType),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined),
/* harmony export */   isWeakMap: () => (/* binding */ isWeakMap),
/* harmony export */   isWeakSet: () => (/* binding */ isWeakSet)
/* harmony export */ });
function getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
function isUndefined(payload) {
  return getType(payload) === "Undefined";
}
function isNull(payload) {
  return getType(payload) === "Null";
}
function isPlainObject(payload) {
  if (getType(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function isObject(payload) {
  return isPlainObject(payload);
}
function isEmptyObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length === 0;
}
function isFullObject(payload) {
  return isPlainObject(payload) && Object.keys(payload).length > 0;
}
function isAnyObject(payload) {
  return getType(payload) === "Object";
}
function isObjectLike(payload) {
  return isAnyObject(payload);
}
function isFunction(payload) {
  return typeof payload === "function";
}
function isArray(payload) {
  return getType(payload) === "Array";
}
function isFullArray(payload) {
  return isArray(payload) && payload.length > 0;
}
function isEmptyArray(payload) {
  return isArray(payload) && payload.length === 0;
}
function isString(payload) {
  return getType(payload) === "String";
}
function isFullString(payload) {
  return isString(payload) && payload !== "";
}
function isEmptyString(payload) {
  return payload === "";
}
function isNumber(payload) {
  return getType(payload) === "Number" && !isNaN(payload);
}
function isPositiveNumber(payload) {
  return isNumber(payload) && payload > 0;
}
function isNegativeNumber(payload) {
  return isNumber(payload) && payload < 0;
}
function isBoolean(payload) {
  return getType(payload) === "Boolean";
}
function isRegExp(payload) {
  return getType(payload) === "RegExp";
}
function isMap(payload) {
  return getType(payload) === "Map";
}
function isWeakMap(payload) {
  return getType(payload) === "WeakMap";
}
function isSet(payload) {
  return getType(payload) === "Set";
}
function isWeakSet(payload) {
  return getType(payload) === "WeakSet";
}
function isSymbol(payload) {
  return getType(payload) === "Symbol";
}
function isDate(payload) {
  return getType(payload) === "Date" && !isNaN(payload);
}
function isBlob(payload) {
  return getType(payload) === "Blob";
}
function isFile(payload) {
  return getType(payload) === "File";
}
function isPromise(payload) {
  return getType(payload) === "Promise";
}
function isError(payload) {
  return getType(payload) === "Error";
}
function isNaNValue(payload) {
  return getType(payload) === "Number" && isNaN(payload);
}
function isPrimitive(payload) {
  return isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
}
const isNullOrUndefined = isOneOf(isNull, isUndefined);
function isOneOf(a, b, c, d, e) {
  return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
}
function isType(payload, type) {
  if (!(type instanceof Function)) {
    throw new TypeError("Type must be a function");
  }
  if (!Object.prototype.hasOwnProperty.call(type, "prototype")) {
    throw new TypeError("Type is not a class");
  }
  const name = type.name;
  return getType(payload) === name || Boolean(payload && payload.constructor === type);
}
function isInstanceOf(value, classOrClassName) {
  if (typeof classOrClassName === "function") {
    for (let p = value; p; p = Object.getPrototypeOf(p)) {
      if (isType(p, classOrClassName)) {
        return true;
      }
    }
    return false;
  } else {
    for (let p = value; p; p = Object.getPrototypeOf(p)) {
      if (getType(p) === classOrClassName) {
        return true;
      }
    }
    return false;
  }
}




/***/ }),

/***/ "./node_modules/react-toastify/dist/react-toastify.esm.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/react-toastify/dist/react-toastify.esm.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bounce: () => (/* binding */ R),
/* harmony export */   Flip: () => (/* binding */ $),
/* harmony export */   Icons: () => (/* binding */ E),
/* harmony export */   Slide: () => (/* binding */ w),
/* harmony export */   ToastContainer: () => (/* binding */ k),
/* harmony export */   Zoom: () => (/* binding */ x),
/* harmony export */   collapseToast: () => (/* binding */ g),
/* harmony export */   cssTransition: () => (/* binding */ h),
/* harmony export */   toast: () => (/* binding */ Q),
/* harmony export */   useToast: () => (/* binding */ _),
/* harmony export */   useToastContainer: () => (/* binding */ C)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
'use client';
const u=t=>"number"==typeof t&&!isNaN(t),d=t=>"string"==typeof t,p=t=>"function"==typeof t,m=t=>d(t)||p(t)?t:null,f=t=>(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)||d(t)||p(t)||u(t);function g(t,e,n){void 0===n&&(n=300);const{scrollHeight:o,style:s}=t;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(e,n)})})}function h(e){let{enter:a,exit:r,appendPosition:i=!1,collapse:l=!0,collapseDuration:c=300}=e;return function(e){let{children:u,position:d,preventExitTransition:p,done:m,nodeRef:f,isIn:h}=e;const y=i?`${a}--${d}`:a,v=i?`${r}--${d}`:r,T=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{const t=f.current,e=y.split(" "),n=o=>{o.target===f.current&&(t.dispatchEvent(new Event("d")),t.removeEventListener("animationend",n),t.removeEventListener("animationcancel",n),0===T.current&&"animationcancel"!==o.type&&t.classList.remove(...e))};t.classList.add(...e),t.addEventListener("animationend",n),t.addEventListener("animationcancel",n)},[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{const t=f.current,e=()=>{t.removeEventListener("animationend",e),l?g(t,m,c):m()};h||(p?e():(T.current=1,t.className+=` ${v}`,t.addEventListener("animationend",e)))},[h]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,u)}}function y(t,e){return null!=t?{content:t.content,containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,status:e}:{}}const v={list:new Map,emitQueue:new Map,on(t,e){return this.list.has(t)||this.list.set(t,[]),this.list.get(t).push(e),this},off(t,e){if(e){const n=this.list.get(t).filter(t=>t!==e);return this.list.set(t,n),this}return this.list.delete(t),this},cancelEmit(t){const e=this.emitQueue.get(t);return e&&(e.forEach(clearTimeout),this.emitQueue.delete(t)),this},emit(t){this.list.has(t)&&this.list.get(t).forEach(e=>{const n=setTimeout(()=>{e(...[].slice.call(arguments,1))},0);this.emitQueue.has(t)||this.emitQueue.set(t,[]),this.emitQueue.get(t).push(n)})}},T=e=>{let{theme:n,type:o,...s}=e;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===n?"currentColor":`var(--toastify-icon-color-${o})`,...s})},E={info:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(T,{...e},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"Toastify__spinner"})}};function C(t){const[,o]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(t=>t+1,0),[l,c]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map).current,T=t=>-1!==l.indexOf(t),C=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:t,containerId:null,isToastActive:T,getToast:t=>h.get(t)}).current;function b(t){let{containerId:e}=t;const{limit:n}=C.props;!n||e&&C.containerId!==e||(C.count-=C.queue.length,C.queue=[])}function I(t){c(e=>null==t?[]:e.filter(e=>e!==t))}function _(){const{toastContent:t,toastProps:e,staleId:n}=C.queue.shift();O(t,e,n)}function L(t,n){let{delay:s,staleId:r,...i}=n;if(!f(t)||function(t){return!g.current||C.props.enableMultiContainer&&t.containerId!==C.props.containerId||h.has(t.toastId)&&null==t.updateId}(i))return;const{toastId:l,updateId:c,data:T}=i,{props:b}=C,L=()=>I(l),N=null==c;N&&C.count++;const M={...b,style:b.toastStyle,key:C.toastKey++,...Object.fromEntries(Object.entries(i).filter(t=>{let[e,n]=t;return null!=n})),toastId:l,updateId:c,data:T,closeToast:L,isIn:!1,className:m(i.className||b.toastClassName),bodyClassName:m(i.bodyClassName||b.bodyClassName),progressClassName:m(i.progressClassName||b.progressClassName),autoClose:!i.isLoading&&(R=i.autoClose,w=b.autoClose,!1===R||u(R)&&R>0?R:w),deleteToast(){const t=y(h.get(l),"removed");h.delete(l),v.emit(4,t);const e=C.queue.length;if(C.count=null==l?C.count-C.displayedToast:C.count-1,C.count<0&&(C.count=0),e>0){const t=null==l?C.props.limit:1;if(1===e||1===t)C.displayedToast++,_();else{const n=t>e?e:t;C.displayedToast=n;for(let t=0;t<n;t++)_()}}else o()}};var R,w;M.iconOut=function(t){let{theme:n,type:o,isLoading:s,icon:r}=t,i=null;const l={theme:n,type:o};return!1===r||(p(r)?i=r(l):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(r)?i=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(r,l):d(r)||u(r)?i=r:s?i=E.spinner():(t=>t in E)(o)&&(i=E[o](l))),i}(M),p(i.onOpen)&&(M.onOpen=i.onOpen),p(i.onClose)&&(M.onClose=i.onClose),M.closeButton=b.closeButton,!1===i.closeButton||f(i.closeButton)?M.closeButton=i.closeButton:!0===i.closeButton&&(M.closeButton=!f(b.closeButton)||b.closeButton);let x=t;(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t)&&!d(t.type)?x=(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(t,{closeToast:L,toastProps:M,data:T}):p(t)&&(x=t({closeToast:L,toastProps:M,data:T})),b.limit&&b.limit>0&&C.count>b.limit&&N?C.queue.push({toastContent:x,toastProps:M,staleId:r}):u(s)?setTimeout(()=>{O(x,M,r)},s):O(x,M,r)}function O(t,e,n){const{toastId:o}=e;n&&h.delete(n);const s={content:t,props:e};h.set(o,s),c(t=>[...t,o].filter(t=>t!==n)),v.emit(4,y(s,null==s.props.updateId?"added":"updated"))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(C.containerId=t.containerId,v.cancelEmit(3).on(0,L).on(1,t=>g.current&&I(t)).on(5,b).emit(2,C),()=>{h.clear(),v.emit(3,C)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{C.props=t,C.isToastActive=T,C.displayedToast=l.length}),{getToastToRender:function(e){const n=new Map,o=Array.from(h.values());return t.newestOnTop&&o.reverse(),o.forEach(t=>{const{position:e}=t.props;n.has(e)||n.set(e,[]),n.get(e).push(t)}),Array.from(n,t=>e(t[0],t[1]))},containerRef:g,isToastActive:T}}function b(t){return t.targetTouches&&t.targetTouches.length>=1?t.targetTouches[0].clientX:t.clientX}function I(t){return t.targetTouches&&t.targetTouches.length>=1?t.targetTouches[0].clientY:t.clientY}function _(t){const[o,a]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),[r,l]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),u=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(t),{autoClose:m,pauseOnHover:f,closeToast:g,onClick:h,closeOnClick:y}=t;function v(e){if(t.draggable){"touchstart"===e.nativeEvent.type&&e.nativeEvent.preventDefault(),u.didMove=!1,document.addEventListener("mousemove",_),document.addEventListener("mouseup",L),document.addEventListener("touchmove",_),document.addEventListener("touchend",L);const n=c.current;u.canCloseOnClick=!0,u.canDrag=!0,u.boundingRect=n.getBoundingClientRect(),n.style.transition="",u.x=b(e.nativeEvent),u.y=I(e.nativeEvent),"x"===t.draggableDirection?(u.start=u.x,u.removalDistance=n.offsetWidth*(t.draggablePercent/100)):(u.start=u.y,u.removalDistance=n.offsetHeight*(80===t.draggablePercent?1.5*t.draggablePercent:t.draggablePercent/100))}}function T(e){if(u.boundingRect){const{top:n,bottom:o,left:s,right:a}=u.boundingRect;"touchend"!==e.nativeEvent.type&&t.pauseOnHover&&u.x>=s&&u.x<=a&&u.y>=n&&u.y<=o?C():E()}}function E(){a(!0)}function C(){a(!1)}function _(e){const n=c.current;u.canDrag&&n&&(u.didMove=!0,o&&C(),u.x=b(e),u.y=I(e),u.delta="x"===t.draggableDirection?u.x-u.start:u.y-u.start,u.start!==u.x&&(u.canCloseOnClick=!1),n.style.transform=`translate${t.draggableDirection}(${u.delta}px)`,n.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function L(){document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",L),document.removeEventListener("touchmove",_),document.removeEventListener("touchend",L);const e=c.current;if(u.canDrag&&u.didMove&&e){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return l(!0),void t.closeToast();e.style.transition="transform 0.2s, opacity 0.2s",e.style.transform=`translate${t.draggableDirection}(0)`,e.style.opacity="1"}}(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{d.current=t}),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(c.current&&c.current.addEventListener("d",E,{once:!0}),p(t.onOpen)&&t.onOpen((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t.children)&&t.children.props),()=>{const t=d.current;p(t.onClose)&&t.onClose((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(t.children)&&t.children.props)}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(t.pauseOnFocusLoss&&(document.hasFocus()||C(),window.addEventListener("focus",E),window.addEventListener("blur",C)),()=>{t.pauseOnFocusLoss&&(window.removeEventListener("focus",E),window.removeEventListener("blur",C))}),[t.pauseOnFocusLoss]);const O={onMouseDown:v,onTouchStart:v,onMouseUp:T,onTouchEnd:T};return m&&f&&(O.onMouseEnter=C,O.onMouseLeave=E),y&&(O.onClick=t=>{h&&h(t),u.canCloseOnClick&&g()}),{playToast:E,pauseToast:C,isRunning:o,preventExitTransition:r,toastRef:c,eventHandlers:O}}function L(e){let{closeToast:n,theme:o,ariaLabel:s="close"}=e;return react__WEBPACK_IMPORTED_MODULE_0__.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:t=>{t.stopPropagation(),n(t)},"aria-label":s},react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function O(e){let{delay:n,isRunning:o,closeToast:s,type:a="default",hide:r,className:i,style:l,controlledProgress:u,progress:d,rtl:m,isIn:f,theme:g}=e;const h=r||u&&0===d,y={...l,animationDuration:`${n}ms`,animationPlayState:o?"running":"paused",opacity:h?0:1};u&&(y.transform=`scaleX(${d})`);const v=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":m}),T=p(i)?i({rtl:m,type:a,defaultClassName:v}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(v,i);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{role:"progressbar","aria-hidden":h?"true":"false","aria-label":"notification timer",className:T,style:y,[u&&d>=1?"onTransitionEnd":"onAnimationEnd"]:u&&d<1?null:()=>{f&&s()}})}const N=n=>{const{isRunning:o,preventExitTransition:s,toastRef:r,eventHandlers:i}=_(n),{closeButton:l,children:u,autoClose:d,onClick:m,type:f,hideProgressBar:g,closeToast:h,transition:y,position:v,className:T,style:E,bodyClassName:C,bodyStyle:b,progressClassName:I,progressStyle:N,updateId:M,role:R,progress:w,rtl:x,toastId:$,deleteToast:k,isIn:P,isLoading:B,iconOut:D,closeOnClick:A,theme:z}=n,F=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast",`Toastify__toast-theme--${z}`,`Toastify__toast--${f}`,{"Toastify__toast--rtl":x},{"Toastify__toast--close-on-click":A}),H=p(T)?T({rtl:x,position:v,type:f,defaultClassName:F}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(F,T),S=!!w||!d,q={closeToast:h,type:f,theme:z};let Q=null;return!1===l||(Q=p(l)?l(q):(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(l)?(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(l,q):L(q)),react__WEBPACK_IMPORTED_MODULE_0__.createElement(y,{isIn:P,done:k,position:v,preventExitTransition:s,nodeRef:r},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{id:$,onClick:m,className:H,...i,style:E,ref:r},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{...P&&{role:R},className:p(C)?C({type:f}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast-body",C),style:b},null!=D&&react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!B})},D),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,u)),Q,react__WEBPACK_IMPORTED_MODULE_0__.createElement(O,{...M&&!S?{key:`pb-${M}`}:{},rtl:x,theme:z,delay:d,isRunning:o,isIn:P,closeToast:h,hide:g,type:f,style:N,className:I,controlledProgress:S,progress:w||0})))},M=function(t,e){return void 0===e&&(e=!1),{enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}},R=h(M("bounce",!0)),w=h(M("slide",!0)),x=h(M("zoom")),$=h(M("flip")),k=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((e,n)=>{const{getToastToRender:o,containerRef:a,isToastActive:r}=C(e),{className:i,style:l,rtl:u,containerId:d}=e;function f(t){const e=(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])("Toastify__toast-container",`Toastify__toast-container--${t}`,{"Toastify__toast-container--rtl":u});return p(i)?i({position:t,rtl:u,defaultClassName:e}):(0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(e,m(i))}return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{n&&(n.current=a.current)},[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{ref:a,className:"Toastify",id:d},o((e,n)=>{const o=n.length?{...l}:{...l,pointerEvents:"none"};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:f(e),style:o,key:`container-${e}`},n.map((e,o)=>{let{content:s,props:a}=e;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(N,{...a,isIn:r(a.toastId),style:{...a.style,"--nth":o+1,"--len":n.length},key:`toast-${a.key}`},s)}))}))});k.displayName="ToastContainer",k.defaultProps={position:"top-right",transition:R,autoClose:5e3,closeButton:L,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let P,B=new Map,D=[],A=1;function z(){return""+A++}function F(t){return t&&(d(t.toastId)||u(t.toastId))?t.toastId:z()}function H(t,e){return B.size>0?v.emit(0,t,e):D.push({content:t,options:e}),e.toastId}function S(t,e){return{...e,type:e&&e.type||t,toastId:F(e)}}function q(t){return(e,n)=>H(e,S(t,n))}function Q(t,e){return H(t,S("default",e))}Q.loading=(t,e)=>H(t,S("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),Q.promise=function(t,e,n){let o,{pending:s,error:a,success:r}=e;s&&(o=d(s)?Q.loading(s,n):Q.loading(s.render,{...n,...s}));const i={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(t,e,s)=>{if(null==e)return void Q.dismiss(o);const a={type:t,...i,...n,data:s},r=d(e)?{render:e}:e;return o?Q.update(o,{...a,...r}):Q(r.render,{...a,...r}),s},c=p(t)?t():t;return c.then(t=>l("success",r,t)).catch(t=>l("error",a,t)),c},Q.success=q("success"),Q.info=q("info"),Q.error=q("error"),Q.warning=q("warning"),Q.warn=Q.warning,Q.dark=(t,e)=>H(t,S("default",{theme:"dark",...e})),Q.dismiss=t=>{B.size>0?v.emit(1,t):D=D.filter(e=>null!=t&&e.options.toastId!==t)},Q.clearWaitingQueue=function(t){return void 0===t&&(t={}),v.emit(5,t)},Q.isActive=t=>{let e=!1;return B.forEach(n=>{n.isToastActive&&n.isToastActive(t)&&(e=!0)}),e},Q.update=function(t,e){void 0===e&&(e={}),setTimeout(()=>{const n=function(t,e){let{containerId:n}=e;const o=B.get(n||P);return o&&o.getToast(t)}(t,e);if(n){const{props:o,content:s}=n,a={delay:100,...o,...e,toastId:e.toastId||t,updateId:z()};a.toastId!==t&&(a.staleId=t);const r=a.render||s;delete a.render,H(r,a)}},0)},Q.done=t=>{Q.update(t,{progress:1})},Q.onChange=t=>(v.on(4,t),()=>{v.off(4,t)}),Q.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},Q.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},v.on(2,t=>{P=t.containerId||t,B.set(P,t),D.forEach(t=>{v.emit(0,t.content,t.options)}),D=[]}).on(3,t=>{B.delete(t.containerId||t),0===B.size&&v.off(0).off(1).off(5)});
//# sourceMappingURL=react-toastify.esm.mjs.map


/***/ }),

/***/ "./node_modules/zustand/esm/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/zustand/esm/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   createStore: () => (/* reexport safe */ zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore),
/* harmony export */   "default": () => (/* binding */ react),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/use-sync-external-store/shim/with-selector.js");





const { useSyncExternalStoreWithSelector } = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__;
function useStore(api, selector = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(slice);
  return slice;
}
const createImpl = (createState) => {
  if (( false ? 0 : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore)(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var react = (createState) => {
  if (( false ? 0 : void 0) !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."
    );
  }
  return create(createState);
};




/***/ }),

/***/ "./node_modules/zustand/esm/vanilla.mjs":
/*!**********************************************!*\
  !*** ./node_modules/zustand/esm/vanilla.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   "default": () => (/* binding */ vanilla)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if (( false ? 0 : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var vanilla = (createState) => {
  if (( false ? 0 : void 0) !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'."
    );
  }
  return createStore(createState);
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "burst-statistics:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkburst_statistics"] = self["webpackChunkburst_statistics"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Page */ "./src/components/Page.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/lib/queryCache.mjs");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/lib/queryClient.mjs");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs");
/* harmony import */ var _tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query-devtools */ "./node_modules/@tanstack/react-query-devtools/build/lib/index.mjs");







const HOUR_IN_SECONDS = 3600;
const queryCache = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryCache({
  onError: error => {
    // any error handling code...
  }
});
let config = {
  defaultOptions: {
    queries: {
      staleTime: HOUR_IN_SECONDS * 1000,
      // ms
      refetchOnWindowFocus: false,
      retry: false
    }
  }
};
// merge queryCache with config
config = {
  ...config,
  ...{
    queryCache
  }
};
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClient(config);
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('burst-statistics');
  if (container) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().StrictMode), null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClientProvider, {
      client: queryClient
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-wrapper"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Page__WEBPACK_IMPORTED_MODULE_2__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_query_devtools__WEBPACK_IMPORTED_MODULE_7__.ReactQueryDevtools, null))), container);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map