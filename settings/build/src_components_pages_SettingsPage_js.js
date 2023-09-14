"use strict";
(self["webpackChunkburst_statistics"] = self["webpackChunkburst_statistics"] || []).push([["src_components_pages_SettingsPage_js"],{

/***/ "./src/components/blocks/Field.js":
/*!****************************************!*\
  !*** ./src/components/blocks/Field.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/useFieldsStore */ "./src/store/useFieldsStore.js");
/* harmony import */ var _utils_Hyperlink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Hyperlink */ "./src/utils/Hyperlink.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _Fields_IpBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Fields/IpBlock */ "./src/components/blocks/Fields/IpBlock.js");
/* harmony import */ var _Fields_UserRoleBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Fields/UserRoleBlock */ "./src/components/blocks/Fields/UserRoleBlock.js");
/* harmony import */ var _Goals_GoalsSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Goals/GoalsSettings */ "./src/components/blocks/Goals/GoalsSettings.js");
/* harmony import */ var _Fields_RadioButtons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Fields/RadioButtons */ "./src/components/blocks/Fields/RadioButtons.js");
/* harmony import */ var _Fields_SelectInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Fields/SelectInput */ "./src/components/blocks/Fields/SelectInput.js");
/* harmony import */ var _Fields_License__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Fields/License */ "./src/components/blocks/Fields/License.js");
/* harmony import */ var _Fields_RestoreArchivesControl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Fields/RestoreArchivesControl */ "./src/components/blocks/Fields/RestoreArchivesControl.js");
/* harmony import */ var _Fields_LabelWrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Fields/LabelWrapper */ "./src/components/blocks/Fields/LabelWrapper.js");














/*
 * https://react-data-table-component.netlify.app
 */
// import DataTable from "react-data-table-component";

const Field = props => {
  const [validated, setValidated] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const updateField = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_2__.useFields)(state => state.updateField);
  const setChangedField = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_2__.useFields)(state => state.setChangedField);
  const fields = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_2__.useFields)(state => state.fields);
  const highLightField = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_2__.useFields)(state => state.highLightField);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let field = props.field;
    validateInput(field, field.value);
  });
  const onChangeHandler = fieldValue => {
    let field = props.field;
    validateInput(field, fieldValue);
    updateField(field.id, fieldValue);
    setChangedField(field.id);
  };
  const validateInput = (field, fieldValue) => {
    //check the pattern
    let valid = true;
    //if the field is required check if it has a value
    if (field.required) {
      valid = fieldValue.length !== 0;
    }
    if (valid && field.type === 'url') {
      let pattern = new RegExp('^(https?:\\/\\/)?' +
      // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      valid = !!pattern.test(fieldValue);
    }
    setValidated(valid);
  };
  let highLightClass = highLightField === props.field.id ? 'burst-field-wrap burst-highlight' : 'burst-field-wrap';
  highLightClass += ' burst-' + props.field.type;
  let field = props.field;
  let fieldValue = field.value;
  let visible;
  let disabled = field.disabled;
  let disabledOptions = [];
  let disabledLabel = '';
  let options = [];
  if (field.options) {
    for (var key in field.options) {
      if (field.options.hasOwnProperty(key)) {
        let item = {};
        item.label = field.options[key];
        item.value = key;
        options.push(item);
      }
    }
  }

  //process pro field
  if (burst_settings.is_pro && field.pro) {
    disabled = false;
  }
  visible = !field.conditionallyDisabled;
  if (!visible) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }
  if (field.type === 'checkbox') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      disabled: disabled,
      checked: field.value == 1,
      label: field.label,
      onChange: fieldValue => onChangeHandler(fieldValue)
    }), field.comment && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        __html: field.comment
      }
    }), field.warning && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'burst-warning'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: 'warning',
      color: 'red'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, field.warning)));
  }
  if (field.type === 'multicheckbox') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, field.parent_label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-parent-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.parent_label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MultiCheckboxControl, {
      index: props.index,
      field: field,
      disabled: disabled
    }), field.comment && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      dangerouslySetInnerHTML: {
        __html: field.comment
      }
    }));
  }
  if (field.type === 'hidden') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      value: field.value
    });
  }
  if (field.type === 'license') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_License__WEBPACK_IMPORTED_MODULE_10__["default"], {
      field: field
    }));
  }
  if (field.type === 'radio') {
    if (Array.isArray(disabled)) {
      disabledOptions = disabled;
      options.forEach(function (option, i) {
        const found = disabledOptions.indexOf(option.value);
        if (found > -1) {
          disabledLabel = option.label;
          options.splice(i, 1);
        }
      });
      disabled = false;
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, field.parent_label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-parent-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.parent_label)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-label-container",
      htmlFor: field.id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Pro, {
      field: field
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
      label: "",
      disabled: disabled,
      onChange: fieldValue => onChangeHandler(fieldValue),
      selected: fieldValue,
      options: options
    }), disabledOptions && disabledOptions.map((option, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      key: i
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      disabled: true,
      type: "radio"
    }), disabledLabel)), field.comment && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, field.comment));
  }
  if (field.type === 'text' || field.type === 'url') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, field.parent_label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-parent-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.parent_label)), validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "success",
      color: "green"
    }), !validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "times"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      help: field.comment,
      placeholder: field.placeholder,
      label: field.label,
      onChange: fieldValue => onChangeHandler(fieldValue),
      value: fieldValue,
      disabled: disabled
    }));
  }
  if (field.type === 'button') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'burst-field-button ' + highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Hyperlink__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "burst-button burst-button--secondary",
      text: field.button_text,
      disabled: disabled,
      url: field.url
    }));
  }
  if (field.type === 'textarea') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "success",
      color: "green"
    }), !validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "times"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
      label: field.label,
      help: field.comment,
      value: fieldValue,
      onChange: fieldValue => onChangeHandler(fieldValue),
      disabled: disabled
    }));
  }
  if (field.type === 'number') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalNumberControl, {
      onChange: fieldValue => onChangeHandler(fieldValue),
      help: field.comment,
      label: field.label,
      value: fieldValue,
      disabled: disabled,
      min: field.min ? field.min : 0
    }));
  }
  if (field.type === 'email') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "success",
      color: "green"
    }), !validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: "times"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      help: field.comment,
      label: field.label,
      onChange: fieldValue => onChangeHandler(fieldValue),
      value: fieldValue,
      disabled: disabled
    }));
  }
  if (field.type === 'select') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_SelectInput__WEBPACK_IMPORTED_MODULE_9__["default"], {
      disabled: disabled,
      label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_LabelWrapper__WEBPACK_IMPORTED_MODULE_12__["default"], {
        field: field
      }),
      onChange: fieldValue => onChangeHandler(fieldValue),
      value: fieldValue,
      options: options,
      field: field
    }), field.warning && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'burst-warning'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      name: 'warning',
      color: 'red'
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, field.warning)));
  }
  if (field.type === 'restore_archives') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_RestoreArchivesControl__WEBPACK_IMPORTED_MODULE_11__["default"], {
      disabled: disabled
    }));
  }
  if (field.type === 'ip_blocklist') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_IpBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
      disabled: disabled,
      field: field,
      label: field.label,
      help: field.comment,
      value: fieldValue,
      onChange: fieldValue => onChangeHandler(fieldValue),
      id: "ip_address"
    }));
  }
  if (field.type === 'user_role_blocklist') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_UserRoleBlock__WEBPACK_IMPORTED_MODULE_6__["default"], {
      disabled: disabled,
      field: field,
      label: field.label,
      help: field.comment,
      value: fieldValue,
      onChange: fieldValue => onChangeHandler(fieldValue),
      id: "user_role_block"
    }));
  }
  if (field.type === 'goals') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Goals_GoalsSettings__WEBPACK_IMPORTED_MODULE_7__["default"], {
      disabled: disabled,
      field: props.field,
      goal_fields: props.goal_fields,
      label: field.label,
      help: field.comment,
      value: fieldValue,
      onChangeHandler: onChangeHandler,
      id: "user_role_block"
    }));
  }
  if (field.type === 'radio-buttons') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: highLightClass
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_RadioButtons__WEBPACK_IMPORTED_MODULE_8__["default"], {
      disabled: disabled,
      field: props.field,
      goal_id: props.goal_id,
      label: field.label,
      help: field.comment,
      value: fieldValue,
      onChange: fieldValue => onChangeHandler(fieldValue),
      className: "radio-buttons"
    }));
  }
  return 'not found field type ' + field.type;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Field);

/***/ }),

/***/ "./src/components/blocks/Fields/ClassId.js":
/*!*************************************************!*\
  !*** ./src/components/blocks/Fields/ClassId.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RadioButtons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RadioButtons */ "./src/components/blocks/Fields/RadioButtons.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TextInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextInput */ "./src/components/blocks/Fields/TextInput.js");





const ClassId = props => {
  const {
    field,
    goal_id,
    label,
    help,
    value,
    onChangeHandler
  } = props;
  const [classOrId, setClassOrId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(value.attribute || 'class');
  const [classOrIdValue, setClassOrIdValue] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(value.value);
  const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const warningTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  let fields = {
    ...field
  };
  fields.options = {
    'class': {
      type: 'class',
      icon: 'period',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Class', 'burst-statistics'),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add a class to the element', 'burst-statistics')
    },
    'id': {
      type: 'id',
      icon: 'hashtag',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ID', 'burst-statistics'),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add an id to the element', 'burst-statistics')
    }
  };
  const handleRadioButtonChange = value => {
    setClassOrId(value);
    onChangeHandler({
      attribute: value,
      value: classOrIdValue
    });
  };
  const handleTextInputChange = value => {
    const inputValue = event.target.value;
    const strippedValue = inputValue.replace(/[^a-zA-Z0-9-_]/g, ''); // this regex pattern will strip out all characters except for letters, numbers, hyphens, and underscores
    if (inputValue !== strippedValue) {
      let strippedChar = inputValue.replace(strippedValue, '');
      let warning = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`The character '%s' can not be used.`, 'burst-statistics'), strippedChar);
      if (strippedChar === '.' || strippedChar === '#') {
        warning = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`You don't need to prefix the input with a '%s' character.`, 'burst-statistics'), strippedChar, strippedChar);
      }
      setWarning(warning);
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = setTimeout(() => {
        setWarning('');
      }, 6000); // clear the warning state after 6 seconds
    }

    setClassOrIdValue(strippedValue);
    onChangeHandler({
      attribute: classOrId,
      value: strippedValue
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_RadioButtons__WEBPACK_IMPORTED_MODULE_1__["default"], {
    field: fields,
    goal_id: props.goal_id,
    label: props.label,
    value: classOrId,
    onChangeHandler: handleRadioButtonChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TextInput__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: classOrIdValue,
    onChangeHandler: handleTextInputChange,
    field: field,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('What is the name for the') + ' ' + classOrId + '?'
  }), warning && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      transition: 'opacity 0.5s ease-out',
      opacity: 1
    },
    className: "burst-settings-goals__list__item__fields__warning"
  }, warning));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClassId);

/***/ }),

/***/ "./src/components/blocks/Fields/EditableText.js":
/*!******************************************************!*\
  !*** ./src/components/blocks/Fields/EditableText.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditableText)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Tooltip */ "./node_modules/@mui/material/Tooltip/Tooltip.js");




function EditableText(_ref) {
  let {
    value,
    onChange
  } = _ref;
  const [isEditing, setIsEditing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  function handleClick(e) {
    // prevent default click behavior
    e.preventDefault();
    setIsEditing(true);
  }
  function handleBlur() {
    setIsEditing(false);
  }
  function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      // add space to input
      onChange(value + ' ');
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  }
  function handleTextChange(event) {
    event.preventDefault();
    onChange(event.target.value);
  }
  function handleFocus() {
    setIsEditing(true);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-click-to-edit'
  }, isEditing ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: value,
    onChange: handleTextChange,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    ref: inputRef
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Click to edit', 'burst-statistics'),
    arrow: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    tabIndex: "0",
    onClick: handleClick,
    onFocus: handleFocus
  }, value)));
}

/***/ }),

/***/ "./src/components/blocks/Fields/IpBlock.js":
/*!*************************************************!*\
  !*** ./src/components/blocks/Fields/IpBlock.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_InputWarning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/InputWarning */ "./src/components/common/InputWarning.js");





const IpBlock = _ref => {
  let {
    value,
    onChange,
    label,
    comment
  } = _ref;
  const [warning, setWarning] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const fieldValue = value;
  const ip = burst_settings.current_ip;
  const checkInputForWarnings = fieldValue => {
    const ipList = fieldValue.split("\n");
    const ipSet = new Set();
    for (let i = 0; i < ipList.length; i++) {
      if (ipSet.has(ipList[i])) {
        setWarning(`Duplicate IP address found: ${ipList[i]}`);
        return;
      } else {
        ipSet.add(ipList[i]);
      }
    }
    setWarning(false);
  };
  const onChangeIpHandler = fieldValue => {
    onChange(fieldValue);
    checkInputForWarnings(fieldValue);
  };
  const onClickAddIPHandler = () => {
    const ipList = fieldValue.split("\n");
    if (ipList.includes(ip)) {
      setWarning("Your IP is already in the list.");
    } else {
      let updatedIPList = fieldValue;
      updatedIPList += updatedIPList ? `\n${ip}` : ip;
      onChange(updatedIPList);
      setWarning(false);
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    label: label,
    help: comment,
    placeholder: "127.0.0.1\n192.168.0.1",
    value: fieldValue,
    onChange: fieldValue => onChangeIpHandler(fieldValue),
    id: "ip_address"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "burst-button burst-button--secondary button-add-ip",
    onClick: onClickAddIPHandler,
    disabled: fieldValue.includes(ip)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add current IP address', 'burst-statistics')), warning && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_InputWarning__WEBPACK_IMPORTED_MODULE_4__["default"], {
    message: warning,
    onTimeout: () => setWarning(false)
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IpBlock);

/***/ }),

/***/ "./src/components/blocks/Fields/LabelWrapper.js":
/*!******************************************************!*\
  !*** ./src/components/blocks/Fields/LabelWrapper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _Pro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pro */ "./src/components/blocks/Fields/Pro.js");




const LabelWrapper = _ref => {
  let {
    field
  } = _ref;
  let id = field.id;
  let label = field.label;
  let tooltip = field.tooltip;
  let pro = field.pro;
  let required = field.required;
  let type = field.type;
  if (!label || label.length === 0) return null;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-label-container "
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id
  }, label, required && type !== 'radio' && type !== 'document' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-required"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('required', 'burst-statistics'))), tooltip && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "help",
    size: 14,
    tooltip: tooltip
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Pro__WEBPACK_IMPORTED_MODULE_3__["default"], {
    pro: pro,
    id: id
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LabelWrapper);

/***/ }),

/***/ "./src/components/blocks/Fields/License.js":
/*!*************************************************!*\
  !*** ./src/components/blocks/Fields/License.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/api */ "./src/utils/api.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/useFieldsStore */ "./src/store/useFieldsStore.js");
/* harmony import */ var _store_useLicenseStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store/useLicenseStore */ "./src/store/useLicenseStore.js");
/* harmony import */ var _TaskElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TaskElement */ "./src/components/blocks/TaskElement.js");







const License = props => {
  const {
    fields,
    setChangedField,
    updateField
  } = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_3__.useFields)();
  const {
    licenseStatus,
    setLicenseStatus
  } = (0,_store_useLicenseStore__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const [noticesLoaded, setNoticesLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notices, setNotices] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const getLicenseNotices = () => {
    return (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.doAction)('license_notices', {}).then(response => {
      return response;
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getLicenseNotices().then(response => {
      setLicenseStatus(response.licenseStatus);
      setNotices(response.notices);
      setNoticesLoaded(true);
    });
  }, [fields]);
  const onChangeHandler = fieldValue => {
    updateField(field.id, fieldValue);
  };
  const toggleActivation = () => {
    setNoticesLoaded(false);
    if (licenseStatus === 'valid') {
      (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.doAction)('deactivate_license').then(response => {
        setLicenseStatus(response.licenseStatus);
        setNotices(response.notices);
        setNoticesLoaded(true);
      });
    } else {
      let data = {};
      data.license = props.field.value;
      (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.doAction)('activate_license', data).then(response => {
        setLicenseStatus(response.licenseStatus);
        setNotices(response.notices);
        setNoticesLoaded(true);
      });
    }
  };
  let field = props.field;
  const buttonClass = licenseStatus !== 'valid' ? 'button-primary' : 'button-secondary';
  /**
      * There is no "PasswordControl" in WordPress react yet, so we create our own license field.
      */
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-base-control__field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "components-base-control__label",
    htmlFor: field.id
  }, field.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rsssl-license-field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "components-text-control__input",
    type: "password",
    id: field.id,
    value: field.value,
    onChange: e => onChangeHandler(e.target.value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `button ${buttonClass}`,
    onClick: () => toggleActivation()
  }, licenseStatus === 'valid' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Deactivate", "really-simple-ssl")), licenseStatus !== 'valid' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Activate", "really-simple-ssl"))))), !noticesLoaded && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Loading..."), noticesLoaded && notices.map((notice, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TaskElement__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: i,
    index: i,
    notice: notice,
    highLightField: ""
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (License);

/***/ }),

/***/ "./src/components/blocks/Fields/Pro.js":
/*!*********************************************!*\
  !*** ./src/components/blocks/Fields/Pro.js ***!
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



/**
 * Render a premium tag
 */
const Pro = _ref => {
  let {
    pro,
    id
  } = _ref;
  if (burst_settings.is_pro || !pro) {
    return null;
  }
  let url = pro.url ? pro.url : 'https://burst-statistics.io/pricing';
  url += '?' + id;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-pro"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    href: url
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upgrade", "burst-statistics")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pro);

/***/ }),

/***/ "./src/components/blocks/Fields/RadioButtons.js":
/*!******************************************************!*\
  !*** ./src/components/blocks/Fields/RadioButtons.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Tooltip */ "./node_modules/@mui/material/Tooltip/Tooltip.js");




const RadioButtons = _ref => {
  let {
    disabled,
    field: {
      id,
      options
    },
    goal_id,
    label,
    help,
    value,
    onChangeHandler,
    className
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `burst-radio-buttons ${className}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-radio-buttons__list"
  }, Object.keys(options).map(key => {
    const {
      type,
      icon,
      label,
      description
    } = options[key];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: description,
      arrow: true,
      key: key,
      enterDelay: 1000
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `${goal_id}-${id}-${type}`,
      className: "burst-radio-buttons__list__item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "radio",
      checked: type === value,
      name: `${goal_id}-${id}`,
      id: `${goal_id}-${id}-${type}`,
      value: type,
      disabled: disabled,
      onChange: e => {
        onChangeHandler(e.target.value);
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `${goal_id}-${id}-${type}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_1__["default"], {
      name: icon,
      size: 18
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-divider"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description))));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioButtons);

/***/ }),

/***/ "./src/components/blocks/Fields/RestoreArchivesControl.js":
/*!****************************************************************!*\
  !*** ./src/components/blocks/Fields/RestoreArchivesControl.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_useArchivesStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/useArchivesStore */ "./src/store/useArchivesStore.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store/useFieldsStore */ "./src/store/useFieldsStore.js");






const RestoreArchivesControl = () => {
  const {
    archives,
    archivesLoaded,
    fetchData,
    deleteArchives,
    downloadUrl,
    startRestoreArchives,
    fetchRestoreArchivesProgress,
    restoring,
    progress
  } = (0,_store_useArchivesStore__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [selectedArchives, setSelectedArchives] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [downloading, setDownloading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const paginationPerPage = 10;
  const [pagination, setPagination] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [indeterminate, setIndeterminate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [entirePageSelected, setEntirePageSelected] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [sortBy, setSortBy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('title');
  const [sortDirection, setSortDirection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('asc');
  const {
    addHelpNotice
  } = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_4__.useFields)();
  const handlePageChange = page => {
    setPagination({
      ...pagination,
      currentPage: page
    });
  };

  //check if there's an export running
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchRestoreArchivesProgress();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (progress < 100 && restoring) {
      fetchRestoreArchivesProgress();
    }
  }, [progress]);
  const [DataTable, setDataTable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    __webpack_require__.e(/*! import() */ "vendors-node_modules_react-data-table-component_dist_index_cjs_js").then(__webpack_require__.bind(__webpack_require__, /*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js")).then(_ref => {
      let {
        default: DataTable
      } = _ref;
      setDataTable(() => DataTable);
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!archivesLoaded) fetchData();
  }, [archivesLoaded]);
  const onDeleteArchives = async ids => {
    setSelectedArchives([]);
    await deleteArchives(ids);
  };
  const onRestoreArchives = async ids => {
    setSelectedArchives([]);
    await startRestoreArchives(ids);
    addHelpNotice('archive_data', 'warning', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Because restoring files can conflict with the archiving functionality, archiving has been disabled.", "burst-statistics"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archiving disabled", 'burst-statistics'));
  };
  const downloadArchives = async () => {
    //filter out all archives that are not included in selectedArchives
    let selectedArchivesCopy = archives.filter(archive => selectedArchives.includes(archive.id));
    setDownloading(true);
    const downloadNext = async () => {
      if (selectedArchivesCopy.length > 0) {
        const archive = selectedArchivesCopy.shift();
        const url = downloadUrl + archive.id;
        try {
          let request = new XMLHttpRequest();
          request.responseType = 'blob';
          request.open('get', url, true);
          request.send();
          request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              let obj = window.URL.createObjectURL(this.response);
              let element = window.document.createElement('a');
              element.setAttribute('href', obj);
              element.setAttribute('download', archive.title);
              window.document.body.appendChild(element);
              //onClick property
              element.click();
              setSelectedArchives(selectedArchivesCopy);
              setDownloading(false);
              setTimeout(function () {
                window.URL.revokeObjectURL(obj);
              }, 60 * 1000);
            }
          };
          await downloadNext();
        } catch (error) {
          console.error(error);
          setDownloading(false);
        }
      } else {
        setDownloading(false);
      }
    };
    await downloadNext();
  };
  const handleSelectEntirePage = selected => {
    if (selected) {
      setEntirePageSelected(true);
      //add all archives on this page to the selectedArchives array
      let currentPage = pagination.currentPage ? pagination.currentPage : 1;
      //get archives from currentPage * paginationPerPage to (currentPage+1) * paginationPerPage
      let filtered = handleFiltering(archives);
      let archivesOnPage = filtered.slice((currentPage - 1) * paginationPerPage, currentPage * paginationPerPage);
      setSelectedArchives(archivesOnPage.map(archive => archive.id));
    } else {
      setEntirePageSelected(false);
      setSelectedArchives([]);
    }
    setIndeterminate(false);
  };
  const onSelectArchive = (selected, id) => {
    let docs = [...selectedArchives];
    if (selected) {
      if (!docs.includes(id)) {
        docs.push(id);
        setSelectedArchives(docs);
      }
    } else {
      //remove the archive from the selected archives
      docs = [...selectedArchives.filter(archiveId => archiveId !== id)];
      setSelectedArchives(docs);
    }
    //check if all archives on this page are selected
    let currentPage = pagination.currentPage ? pagination.currentPage : 1;
    //get archives from currentPage * paginationPerPage to (currentPage+1) * paginationPerPage
    let filtered = handleFiltering(archives);
    let archivesOnPage = filtered.slice((currentPage - 1) * paginationPerPage, currentPage * paginationPerPage);
    let allSelected = true;
    let hasOneSelected = false;
    archivesOnPage.forEach(record => {
      if (!docs.includes(record.id)) {
        allSelected = false;
      } else {
        hasOneSelected = true;
      }
    });
    if (allSelected) {
      setEntirePageSelected(true);
      setIndeterminate(false);
    } else if (!hasOneSelected) {
      setIndeterminate(false);
    } else {
      setEntirePageSelected(false);
      setIndeterminate(true);
    }
  };
  const handleFiltering = archives => {
    let newArchives = [...archives];
    newArchives = handleSort(newArchives, sortBy, sortDirection);
    //sort the plugins by 'sortBy'
    newArchives = newArchives.filter(archive => {
      return archive.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    return newArchives;
  };

  /**
   * Sort the rows by month and year provided in the 'date' column with the format 'YYYYMM'
   * @param rows
   * @param selector
   * @param direction
   */
  const handleSort = (rows, selector, direction) => {
    if (rows.length === 0) return rows;
    const multiplier = direction === 'asc' ? 1 : -1;
    if (direction !== sortDirection) {
      setSortDirection(direction);
    }
    const convertToBytes = size => {
      const units = {
        'B': 1,
        'KB': 1024,
        'MB': 1024 * 1024
      };
      const [value, unit] = size.split(' ');
      return parseFloat(value) * units[unit];
    };
    if (selector.toString().indexOf('title') !== -1 && sortBy !== 'title') {
      setSortBy('title');
    } else if (selector.toString().indexOf('size') !== -1 && sortBy !== 'size') {
      setSortBy('size');
    }
    if (sortBy === 'title') {
      rows.sort((a, b) => {
        // Extract year and month from the id for each row
        const [yearA, monthA] = a.id.replace('.zip', '').split('-').map(Number);
        const [yearB, monthB] = b.id.replace('.zip', '').split('-').map(Number);

        // Compare years, then months
        if (yearA !== yearB) {
          return multiplier * (yearA - yearB);
        }
        return multiplier * (monthA - monthB);
      });
    } else if (sortBy === 'size') {
      rows.sort((a, b) => {
        const sizeA = convertToBytes(a.size);
        const sizeB = convertToBytes(b.size);
        return multiplier * (sizeA - sizeB);
      });
    }
    return rows;
  };
  const columns = [{
    name: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "checkbox",
      className: indeterminate ? "burst-indeterminate" : '',
      checked: entirePageSelected,
      onChange: e => handleSelectEntirePage(e.target.checked)
    }),
    selector: row => row.selectControl,
    grow: 1,
    minWidth: '50px'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Archive', "burst-statistics"),
    selector: row => row.title,
    sortable: true,
    grow: 6
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Size', "burst-statistics"),
    selector: row => row.size,
    sortable: true,
    grow: 2,
    right: true
  }];

  //filter the plugins by search value
  let filteredArchives = handleFiltering(archives);

  //add the controls to the plugins
  let data = [];
  filteredArchives.forEach(archive => {
    let archiveCopy = {
      ...archive
    };
    archiveCopy.selectControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "checkbox",
      disabled: archiveCopy.restoring || restoring,
      checked: selectedArchives.includes(archiveCopy.id),
      onChange: e => onSelectArchive(e.target.checked, archiveCopy.id)
    });
    data.push(archiveCopy);
  });
  let showDownloadButton = selectedArchives.length > 1;
  if (!showDownloadButton && selectedArchives.length === 1) {
    let currentSelected = archives.filter(archive => selectedArchives.includes(archive.id));
    showDownloadButton = currentSelected.hasOwnProperty(0) && currentSelected[0].download_url !== '';
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-table-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-table-header-controls"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "burst-datatable-search",
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search", "burst-statistics"),
    value: searchValue,
    onChange: e => setSearchValue(e.target.value)
  }))), selectedArchives.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-selected-archive"
  }, selectedArchives.length > 1 && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("%s items selected", "burst-statistics").replace("%s", selectedArchives.length), selectedArchives.length === 1 && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("1 item selected", "burst-statistics"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-selected-archive-controls"
  }, showDownloadButton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    disabled: downloading || progress && progress < 100,
    className: "burst-button burst-button--secondary",
    onClick: () => downloadArchives()
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Download", "burst-statistics"), downloading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    name: "loading",
    color: "grey"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    disabled: progress && progress < 100,
    className: "burst-button burst-button--primary",
    onClick: () => onRestoreArchives(selectedArchives)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Restore", "burst-statistics"), progress < 100 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    name: "loading",
    color: "grey"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    disabled: progress && progress < 100,
    className: "burst-button burst-button--tertiary",
    onClick: () => onDeleteArchives(selectedArchives)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete", "burst-statistics")))), progress > 0 && progress < 100 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-selected-archive"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Restore in progress, %s complete", "burst-statistics").replace('%s', progress + '%')), DataTable && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DataTable, {
    columns: columns,
    data: data,
    dense: true,
    paginationPerPage: paginationPerPage,
    onChangePage: handlePageChange,
    paginationState: pagination,
    persistTableHead: true,
    defaultSortFieldId: 2,
    pagination: true,
    paginationRowsPerPageOptions: [10, 25, 50],
    paginationComponentOptions: {
      rowsPerPageText: '',
      rangeSeparatorText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('of', 'burst-statistics'),
      noRowsPerPage: false,
      selectAllRowsItem: true,
      selectAllRowsItemText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'burst-statistics')
    },
    noDataComponent: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-no-archives"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No archives", "burst-statistics")),
    sortFunction: handleSort
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RestoreArchivesControl);

/***/ }),

/***/ "./src/components/blocks/Fields/SelectInput.js":
/*!*****************************************************!*\
  !*** ./src/components/blocks/Fields/SelectInput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-select */ "./node_modules/@radix-ui/react-select/dist/index.mjs");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





const SelectInput = _ref => {
  let {
    value = false,
    onChange,
    required,
    defaultValue,
    disabled,
    options = {},
    canBeEmpty = true,
    label,
    innerRef
  } = _ref;
  // convert options to object if array
  if (Array.isArray(options)) {
    let newOptions = {};
    options.map(option => {
      newOptions[option.value] = option.label;
    });
    options = newOptions;
  }
  // add empty option
  if (canBeEmpty) {
    //only add this if no value is selected yet.
    let valueIsEmpty = value === '' || value === false || value === 0;
    if (valueIsEmpty) {
      options = {
        0: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select an option', 'complianz-gdpr'),
        ...options
      };
    }
  } else {
    // set first option as default
    if (!value) {
      value = Object.keys(options)[0];
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-input-group burst-select-group",
    key: label
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "burst-input-group__label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Root, {
    //ref={innerRef}
    value: value,
    defaultValue: defaultValue,
    onValueChange: onChange,
    required: required,
    disabled: disabled && !Array.isArray(disabled)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Trigger, {
    className: "burst-select-group__trigger"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Value, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: 'chevron-down'
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Content, {
    className: "burst-select-group__content",
    position: "popper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ScrollUpButton, {
    className: "burst-select-group__scroll-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: 'chevron-up'
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Viewport, {
    className: "burst-select-group__viewport"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Group, null, Object.entries(options).map(_ref2 => {
    let [optionValue, optionText] = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.Item, {
      disabled: Array.isArray(disabled) && disabled.includes(optionValue),
      className: 'burst-select-group__item',
      key: optionValue,
      value: optionValue
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ItemText, null, optionText));
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_radix_ui_react_select__WEBPACK_IMPORTED_MODULE_4__.ScrollDownButton, {
    className: "burst-select-group__scroll-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: 'chevron-down'
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(SelectInput));

/***/ }),

/***/ "./src/components/blocks/Fields/SelectPage.js":
/*!****************************************************!*\
  !*** ./src/components/blocks/Fields/SelectPage.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_select_async_creatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select/async-creatable */ "./node_modules/react-select/async-creatable/dist/react-select-async-creatable.esm.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/api */ "./src/utils/api.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_7__);








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (props => {
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [posts, setPosts] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [defaultPosts, setDefaultPosts] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [defaultValue, setDefaultValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.value); // add state for defaultValue

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    // set default value from props
    setDefaultValue(props.value);
  }, [props.value]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setIsLoading(true);
    (0,_utils_api__WEBPACK_IMPORTED_MODULE_4__.getPosts)('').then(response => {
      setDefaultPosts(response.map(post => ({
        value: post.page_url,
        label: post.page_url,
        page_id: post.page_id,
        post_title: post.post_title,
        pageviews: post.pageviews
      })));
      setIsLoading(false);
    });
  }, []);
  const loadOptions = lodash_debounce__WEBPACK_IMPORTED_MODULE_7___default()((inputValue, callback) => {
    setIsLoading(true);
    (0,_utils_api__WEBPACK_IMPORTED_MODULE_4__.getPosts)(inputValue).then(response => {
      setPosts(response.map(post => ({
        value: post.page_url,
        label: post.page_url,
        page_id: post.page_id,
        post_title: post.post_title,
        pageviews: post.pageviews
      })));
      setIsLoading(false);
      callback(posts);
    });
  }, 500); // 500ms debounce delay

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: 'burst-label'
  }, props.field.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select_async_creatable__WEBPACK_IMPORTED_MODULE_3__["default"], {
    classNamePrefix: "burst-select",
    onChange: e => {
      props.onChangeHandler(e.value);
    },
    isLoading: isLoading,
    isSearchable: true,
    name: "selectPage",
    cacheOptions: true,
    defaultValue: defaultValue,
    defaultOptions: defaultPosts,
    defaultInputValue: defaultValue,
    loadOptions: loadOptions,
    components: {
      Option: OptionLayout
    },
    theme: theme => ({
      ...theme,
      borderRadius: 'var(--rsp-border-radius-input)',
      colors: {
        ...theme.colors,
        text: 'orangered',
        primary25: 'var(--rsp-green-faded)',
        primary: 'var(--rsp-green)'
      }
    }),
    styles: {
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'var(--rsp-green)' : 'var(--rsp-input-border-color)'
      })
    }
  }));
});
const OptionLayout = props => {
  const {
    innerProps,
    innerRef
  } = props;
  const r = props.data;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("article", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: innerRef
  }, innerProps, {
    className: 'burst-select__custom-option'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("h6", {
    className: 'burst-select__title'
  }, r.label), r.post_title !== 'Untitled' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, " - "), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: 'burst-select__subtitle'
  }, r.post_title, " "))), r.pageviews > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: 'burst-select__pageview-count'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: 'eye',
    size: 12
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_6__.formatNumber)(r.pageviews))));
};

/***/ }),

/***/ "./src/components/blocks/Fields/TextInput.js":
/*!***************************************************!*\
  !*** ./src/components/blocks/Fields/TextInput.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const TextInput = _ref => {
  let {
    name,
    label,
    value,
    onChangeHandler
  } = _ref;
  function handleChange(e) {
    onChangeHandler(e.target.value);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-field"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-label"
  }, label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: name,
    id: name,
    value: value,
    onChange: handleChange
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./src/components/blocks/Fields/UserRoleBlock.js":
/*!*******************************************************!*\
  !*** ./src/components/blocks/Fields/UserRoleBlock.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const UserRoleBlock = props => {
  const [radioValue, setRadioValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('block-selected');
  let field = props.field;
  let fieldValue = field.value;
  let fields = props.fields;
  let userRoles = burst_settings.user_roles ? burst_settings.user_roles : [];
  let selectedUserRoles = fieldValue ? fieldValue : ['administrator'];
  const onChangeCheckboxHandler = e => {
    let value = e.target.value;
    let checked = e.target.checked;
    let fieldValue = [...props.field.value]; // creating a copy of field value array
    let index = fieldValue.indexOf(value);
    if (checked) {
      if (index === -1) {
        fieldValue.push(value);
      }
    } else {
      if (index > -1) {
        fieldValue.splice(index, 1);
      }
    }
    // we are calling this with the updated local fieldValue copy not the prop one.
    props.onChange(fieldValue);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.label), radioValue === 'block-selected' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-user-role-checkbox-blocklist"
  }, Object.keys(userRoles).map((key, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      key: key
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      onChange: onChangeCheckboxHandler,
      checked: selectedUserRoles.includes(key),
      type: 'checkbox',
      id: key,
      name: 'user-role-block',
      value: key
    }), userRoles[key]);
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRoleBlock);

/***/ }),

/***/ "./src/components/blocks/Goals/DeleteGoalModal.js":
/*!********************************************************!*\
  !*** ./src/components/blocks/Goals/DeleteGoalModal.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/Modal */ "./src/components/common/Modal.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/DialogContent */ "./node_modules/@mui/material/DialogContent/DialogContent.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/formatting */ "./src/utils/formatting.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);






const DeleteGoalModal = _ref => {
  let {
    isOpen,
    goal,
    onDelete,
    onClose
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_common_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Delete Goal", 'burst-statistics'),
    onClose: onClose
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Are you sure you want to delete this goal?', 'burst-statistics') + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This action cannot be undone.', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Goal name', 'burst-statistics'), ":"), " ", goal.name, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Status', 'burst-statistics'), ":"), " ", goal.status, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Date created', 'burst-statistics'), ":"), " ", (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_2__.formatUnixToDate)(goal.dateCreated))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_5__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "burst-button burst-button--secondary",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "burst-button burst-button--tertiary",
    onClick: onDelete
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete goal', 'burst-statistics'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteGoalModal);

/***/ }),

/***/ "./src/components/blocks/Goals/GoalField.js":
/*!**************************************************!*\
  !*** ./src/components/blocks/Goals/GoalField.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _Fields_RadioButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fields/RadioButtons */ "./src/components/blocks/Fields/RadioButtons.js");
/* harmony import */ var _Fields_ClassId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Fields/ClassId */ "./src/components/blocks/Fields/ClassId.js");
/* harmony import */ var _Fields_SelectPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Fields/SelectPage */ "./src/components/blocks/Fields/SelectPage.js");







const GoalField = props => {
  const {
    field = {},
    goal_id = false,
    value = false,
    setGoalValue
  } = props;
  const [validated, setValidated] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    validateInput(field, value);
  }, []);
  const onChangeHandler = value => {
    let field = props.field;
    validateInput(field, value);
    // if value is validated, set it
    if (validated) {
      setGoalValue(goal_id, field.id, value);
    }
  };
  const validateInput = (field, value) => {
    //check the pattern
    let valid = true;
    //if the field is required check if it has a value
    if (field.required) {
      valid = value.length !== 0;
    }
    if (valid && field.type === 'url') {
      let pattern = new RegExp('^(https?:\\/\\/)?' +
      // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      valid = !!pattern.test(value);
    }
    setValidated(valid);
  };
  let className = 'burst-' + props.field.type;
  let visible;
  let disabled = field.disabled;

  //process pro field
  if (burst_settings.is_pro && field.pro) {
    disabled = false;
  }
  visible = !field.conditionallyDisabled;
  if (!visible) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className,
      style: {
        display: 'none'
      }
    });
  }
  if (field.type === 'hidden') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      value: field.value
    });
  }
  if (field.type === 'text' || field.type === 'url') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className
    }, field.parent_label && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-parent-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, field.parent_label)), validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "success",
      color: "green"
    }), !validated && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: "times"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      help: field.comment,
      placeholder: field.placeholder,
      label: field.label,
      onChange: value => onChangeHandler(value),
      value: value,
      disabled: disabled
    }));
  }
  if (field.type === 'radio-buttons') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_RadioButtons__WEBPACK_IMPORTED_MODULE_3__["default"], {
      disabled: disabled,
      field: props.field,
      goal_id: props.goal_id,
      label: field.label,
      help: field.comment,
      value: value,
      onChangeHandler: value => onChangeHandler(value),
      className: "radio-buttons"
    }));
  }
  if (field.type === 'class-id') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_ClassId__WEBPACK_IMPORTED_MODULE_4__["default"], {
      disabled: disabled,
      field: props.field,
      goal_id: props.goal_id,
      label: field.label,
      help: field.comment,
      value: value,
      onChangeHandler: value => onChangeHandler(value)
    }));
  }
  if (field.type === 'select-page') {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_SelectPage__WEBPACK_IMPORTED_MODULE_5__["default"], {
      disabled: disabled,
      field: props.field,
      goal_id: props.goal_id,
      label: field.label,
      help: field.comment,
      value: value === false ? '' : value,
      onChangeHandler: value => onChangeHandler(value)
    }));
  }
  return 'not found field type ' + field.type;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalField);

/***/ }),

/***/ "./src/components/blocks/Goals/GoalSetup.js":
/*!**************************************************!*\
  !*** ./src/components/blocks/Goals/GoalSetup.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Tooltip */ "./node_modules/@mui/material/Tooltip/Tooltip.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _GoalField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GoalField */ "./src/components/blocks/Goals/GoalField.js");
/* harmony import */ var _Fields_EditableText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Fields/EditableText */ "./src/components/blocks/Fields/EditableText.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_useGoalsStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store/useGoalsStore */ "./src/store/useGoalsStore.js");
/* harmony import */ var _DeleteGoalModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DeleteGoalModal */ "./src/components/blocks/Goals/DeleteGoalModal.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/api */ "./src/utils/api.js");











const GoalSetup = props => {
  const {
    id,
    goal,
    goalFields,
    setGoalValue,
    onRemove,
    onUpdate
  } = props;
  if (!goalFields) {
    return null;
  }
  const [isDeleteModalOpen, setIsDeleteModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(goalFields.goal_status.value === 'active');
  function handleStatusToggle(value) {
    if (burst_settings.goals_information_shown == '0') {
      burst_settings.goals_information_shown = '1';
      (0,_utils_api__WEBPACK_IMPORTED_MODULE_9__.setOption)('goals_information_shown', true);
    }
    setStatus(value);
    setGoalValue(id, 'goal_status', value ? 'active' : 'inactive');
  }
  function handleTitleChange(value) {
    setGoalValue(id, 'goal_title', value);
  }
  let type = goalFields.goal_type.value;
  let iconName = type && goalFields.goal_type.options[type] ? goalFields.goal_type.options[type].icon : 'eye';
  let title = goalFields.goal_title.value ? goalFields.goal_title.value : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('New goal', 'burst-statistics');
  let dateCreated = goal && goal.date_created !== undefined && goal.date_created > 1 ? goal.date_created : 1;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-settings-goals__list__item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("details", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("summary", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: iconName,
    size: 20
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields_EditableText__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: title,
    onChange: handleTitleChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => setIsDeleteModalOpen(true),
    className: "burst-button-icon burst-button-icon--delete"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: 'trash',
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_10__["default"], {
    arrow: true,
    title: status ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Click to de-activate', 'burst-statistics') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Click to activate', 'burst-statistics')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
    checked: status,
    onChange: handleStatusToggle
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: 'chevron-down',
    size: 18
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-settings-goals__list__item__fields"
  }, Object.keys(goalFields).map((i, index) => {
    let field = goalFields[i];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GoalField__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: index,
      field: field,
      goal_id: id,
      value: field.value,
      setGoalValue: setGoalValue
    });
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DeleteGoalModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isOpen: isDeleteModalOpen,
    goal: {
      name: title,
      status: status ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Active', 'burst-statistics') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Inactive', 'burst-statistics'),
      dateCreated: dateCreated
    } // Replace with actual goal data
    ,
    onDelete: () => {
      onRemove(id);
      setIsDeleteModalOpen(false);
    },
    onClose: () => setIsDeleteModalOpen(false)
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalSetup);

/***/ }),

/***/ "./src/components/blocks/Goals/GoalsSettings.js":
/*!******************************************************!*\
  !*** ./src/components/blocks/Goals/GoalsSettings.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_useGoalsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/useGoalsStore */ "./src/store/useGoalsStore.js");
/* harmony import */ var _store_useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/useGoalFieldsStore */ "./src/store/useGoalFieldsStore.js");
/* harmony import */ var _store_useLicenseStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/useLicenseStore */ "./src/store/useLicenseStore.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _Goals_GoalSetup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Goals/GoalSetup */ "./src/components/blocks/Goals/GoalSetup.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);








const GoalsSettings = props => {
  const {
    goals,
    addGoal,
    removeGoal,
    updateGoal
  } = (0,_store_useGoalsStore__WEBPACK_IMPORTED_MODULE_1__.useGoalsStore)();
  const {
    goalFields,
    setGoalValue
  } = (0,_store_useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_2__.useGoalFieldsStore)();
  const {
    licenseStatus
  } = (0,_store_useLicenseStore__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const handleAddGoal = () => {
    addGoal();
  };
  const handleRemoveGoal = id => {
    removeGoal(id);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {}, [goals]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-burst-settings-goals"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-settings-goals__introduction"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Goals are a great way to track your progress and keep you motivated.', 'burst-statistics')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-settings-goals__list"
  }, Object.keys(goals).map((id, index) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Goals_GoalSetup__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: id,
      id: id,
      goal: goals[id],
      goalFields: goalFields[id],
      setGoalValue: setGoalValue,
      onRemove: handleRemoveGoal,
      onUpdate: updateGoal
    });
  }), (licenseStatus === 'valid' || Object.keys(goals).length === 0) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-settings-goals__add-goal'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: 'burst-button burst-button--secondary',
    onClick: handleAddGoal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add goal', 'burst-statistics'))), !burst_settings.is_pro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-settings-goals__upgrade'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: 'goals',
    size: 24
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Want more goals?')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-divider"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Upgrade to Burst Pro')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: 'https://burst-statistics.com/pricing/?src=burst-plugin',
    target: '_blank',
    className: 'burst-button burst-button--black'
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Upgrade to Pro', 'burst-statistics')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoalsSettings);

/***/ }),

/***/ "./src/components/blocks/Help.js":
/*!***************************************!*\
  !*** ./src/components/blocks/Help.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Render a help notice in the sidebar
 */
const Help = props => {
  let notice = props.help;
  if (!notice.title) {
    notice.title = notice.text;
    notice.text = false;
  }
  let openStatus = props.noticesExpanded ? 'open' : '';
  let target = notice.url && notice.url.indexOf("really-simple-ssl.com") !== -1 ? "_blank" : '_self';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, notice.title && notice.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("details", {
    className: "burst-wizard-help-notice burst-" + notice.label.toLowerCase(),
    open: openStatus
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("summary", null, notice.title, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: "chevron-down"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: notice.text
    }
  }), notice.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-help-more-info"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: target,
    href: notice.url
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("More info", "burst-statistics")))), notice.title && !notice.text && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-wizard-help-notice  burst-" + notice.label.toLowerCase()
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, notice.title)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Help);

/***/ }),

/***/ "./src/components/blocks/Menu/Menu.js":
/*!********************************************!*\
  !*** ./src/components/blocks/Menu/Menu.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/components/blocks/Menu/MenuItem.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store/useFieldsStore */ "./src/store/useFieldsStore.js");







/**
 * Menu block, rendering the entire menu
 */
const Menu = props => {
  const subMenuLoaded = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.subMenuLoaded);
  const subMenu = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.subMenu);
  const hasProItems = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.hasProItems);
  const fields = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_4__.useFields)(state => state.fields);
  if (!subMenuLoaded) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-wizard-menu burst-grid-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-grid-item-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
      className: "burst-h4"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-grid-item-content"
    }));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-wizard-menu burst-grid-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "burst-h4"
  }, subMenu.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-wizard-menu-items"
  }, subMenu.menu_items.map((menuItem, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: i,
    menuItem: menuItem
  })), hasProItems && !burst_settings.is_pro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-pro-menu-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    href: burst_settings.upgrade_link,
    className: "burst-button burst-button--black"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go Pro', 'burst-statistics')))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-footer"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);

/***/ }),

/***/ "./src/components/blocks/Menu/MenuItem.js":
/*!************************************************!*\
  !*** ./src/components/blocks/Menu/MenuItem.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





const MenuItem = props => {
  const selectedSubMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.selectedSubMenuItem);
  const setSelectedSidebarMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.setSelectedSidebarMenuItem);
  const selectedMainMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.selectedMainMenuItem);
  const subMenu = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_3__.useMenu)(state => state.subMenu);
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(props.menuItem.visible);
  const handleClick = () => {
    //if there's a submenu item, we don't make the parent one clickable
    if (!props.menuItem.menu_items) {
      setSelectedSidebarMenuItem(props.menuItem.id);
    }
  };

  /*
   * Menu is selected if the item is the same, or if it is a child.
   */
  let menuIsSelected = selectedSubMenuItem === props.menuItem.id;
  if (props.menuItem.menu_items) {
    for (const item of props.menuItem.menu_items) {
      if (item.id === selectedSubMenuItem) {
        menuIsSelected = true;
      }
    }
  }
  let menuClass = menuIsSelected ? ' burst-active' : '';
  menuClass += props.menuItem.featured ? ' burst-featured' : '';
  menuClass += props.menuItem.pro && !burst_settings.is_pro ? ' burst-pro' : '';

  //make main clickable if it doesn't have a submenu, OR if the submenu is not
  // selected
  const attributes = {};
  let selectedMenuItemIsChildOfThisItem = false;
  if (Array.isArray(props.menuItem.menu_items)) {
    selectedMenuItemIsChildOfThisItem = props.menuItem.menu_items.filter(item => item.id === selectedSubMenuItem).length > 0;
  }
  if (!props.menuItem.menu_items || !selectedMenuItemIsChildOfThisItem) {
    attributes.href = '#' + selectedMainMenuItem + '/' + props.menuItem.id;
    ;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: 'burst-menu-item' + menuClass
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, attributes, {
    onClick: () => handleClick()
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, props.menuItem.title), props.menuItem.featured && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "burst-menu-item-featured-pill"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New', 'burst-statistics')))), props.menuItem.menu_items && menuIsSelected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "burst-submenu-item"
  }, props.menuItem.menu_items.map((subMenuItem, i) => subMenuItem.visible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(MenuItem, {
    key: i,
    menuItem: subMenuItem
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuItem);

/***/ }),

/***/ "./src/components/blocks/Notices.js":
/*!******************************************!*\
  !*** ./src/components/blocks/Notices.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

// /**
//  * Notice after saving was successfull
//  */
// import { SnackbarList } from '@wordpress/components';
// import {
//     useDispatch,
//     useSelect,
// } from '@wordpress/data';
//
// import { store as noticesStore } from '@wordpress/notices';
//
// const Notices = () => {
//     const notices = useSelect(
//         ( select ) =>
//             select( noticesStore )
//                 .getNotices()
//                 .filter( ( notice ) => notice.type === 'snackbar' ),
//         []
//     );
//     const { removeNotice } = useDispatch( noticesStore );
//     return (
//         <SnackbarList
//             className="edit-site-notices"
//             notices={ notices }
//             onRemove={ removeNotice }
//         />
//     );
// };
//
// export default Notices;

const Notices = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notices);

/***/ }),

/***/ "./src/components/blocks/Settings.js":
/*!*******************************************!*\
  !*** ./src/components/blocks/Settings.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/lib */ "./src/utils/lib.js");
/* harmony import */ var _SettingsGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingsGroup */ "./src/components/blocks/SettingsGroup.js");
/* harmony import */ var _Help__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Help */ "./src/components/blocks/Help.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_useFieldsStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/useFieldsStore */ "./src/store/useFieldsStore.js");
/* harmony import */ var _store_useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/useGoalFieldsStore */ "./src/store/useGoalFieldsStore.js");
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_getAnchor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/getAnchor */ "./src/utils/getAnchor.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");













/**
 * Renders the selected settings
 *
 */
const Settings = props => {
  const [noticesExpanded, setNoticesExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const progress = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_5__.useFields)(state => state.progress);
  const fieldsLoaded = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_5__.useFields)(state => state.fieldsLoaded);
  const saveFields = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_5__.useFields)(state => state.saveFields);
  const fields = (0,_store_useFieldsStore__WEBPACK_IMPORTED_MODULE_5__.useFields)(state => state.fields);
  const subMenuLoaded = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_7__.useMenu)(state => state.subMenuLoaded);
  const subMenu = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_7__.useMenu)(state => state.subMenu);
  const selectedSubMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_7__.useMenu)(state => state.selectedSubMenuItem);
  const saveChangedGoalValues = (0,_store_useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_6__.useGoalFieldsStore)(state => state.saveChangedGoalValues);
  const setChangedGoalValues = (0,_store_useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_6__.useGoalFieldsStore)(state => state.setChangedGoalValues);
  const toggleNotices = () => {
    setNoticesExpanded(!noticesExpanded);
  };
  const saveData = async () => {
    // add 500ms timeout so animations work and the user can see the toast
    const response = Promise.all([saveFields(), saveChangedGoalValues(), new Promise(resolve => setTimeout(resolve, 600))]);
    react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.promise(response, {
      pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Saving settings...', 'burst-statistics'),
      success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Settings saved', 'burst-statistics'),
      error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Something went wrong', 'burst-statistics')
    });
    response.then(response => {
      setChangedGoalValues([]);
    });
    // await saveCookies(); // save goals
  };

  const {
    menu_items: menuItems
  } = subMenu;
  if (!subMenuLoaded || !fieldsLoaded || menuItems.length === 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "burst-grid-item burst-grid-item-placeholder burst-column-2"
    });
  }
  let selectedFields = fields.filter(field => field.menu_id === selectedSubMenuItem);
  let groups = [];
  for (const selectedField of selectedFields) {
    if (!(0,_utils_lib__WEBPACK_IMPORTED_MODULE_1__.in_array)(selectedField.group_id, groups)) {
      groups.push(selectedField.group_id);
    }
  }
  let btnSaveText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save', 'burst-statistics');

  //convert progress notices to an array useful for the help blocks
  let notices = [];
  for (const notice of progress.notices) {
    let noticeIsLinkedToField = false;

    //notices that are linked to a field. Only in case of warnings.
    if (notice.show_with_options && notice.output.icon === 'warning') {
      let noticeFields = selectedFields.filter(field => notice.show_with_options.includes(field.id));
      noticeIsLinkedToField = noticeFields.length > 0;
    }
    //notices that are linked to a menu id.
    if (noticeIsLinkedToField || notice.menu_id === selectedSubMenuItem) {
      let help = {};
      help.title = notice.output.title ? notice.output.title : false;
      help.label = notice.output.label;
      help.id = notice.id;
      help.text = notice.output.msg;
      help.url = notice.output.url;
      help.linked_field = notice.show_with_option;
      notices.push(help);
    }
  }

  //help items belonging to a field
  //if field is hidden, hide the notice as well
  for (const notice of selectedFields.filter(field => field.help && !field.conditionallyDisabled)) {
    let help = notice.help;
    //check if the notices array already includes this help item
    //this can happen in case of dynamic fields, like details per purpose
    let existingNotices = notices.filter(noticeItem => noticeItem.id && noticeItem.id === help.id);
    if (existingNotices.length === 0) {
      // if (!help.id ) help['id'] = notice.id;

      notices.push(notice.help);
    }
  }
  notices = notices.filter(notice => notice.label.toLowerCase() !== 'completed');
  const isLicenseBlock = selectedFields[0].id === 'license';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-wizard-settings burst-column-2"
  }, groups.map((group, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SettingsGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: i,
    index: i,
    group: group,
    fields: selectedFields
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-footer"
  }, !isLicenseBlock && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "burst-button burst-button--primary",
    onClick: e => saveData(e)
  }, btnSaveText))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-wizard-help"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-help-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-help-title burst-h4"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Notifications", "burst-statistics")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-help-control",
    onClick: () => toggleNotices()
  }, !noticesExpanded && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Expand all", "burst-statistics"), noticesExpanded && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Collapse all", "burst-statistics"))), notices.map((field, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Help__WEBPACK_IMPORTED_MODULE_3__["default"], {
    key: i,
    noticesExpanded: noticesExpanded,
    index: i,
    help: field,
    fieldId: field.id,
    item: field.help
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ }),

/***/ "./src/components/blocks/SettingsGroup.js":
/*!************************************************!*\
  !*** ./src/components/blocks/SettingsGroup.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ "./src/components/blocks/Field.js");
/* harmony import */ var _utils_Hyperlink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Hyperlink */ "./src/utils/Hyperlink.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/useMenuStore */ "./src/store/useMenuStore.js");
/* harmony import */ var _store_useLicenseStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/useLicenseStore */ "./src/store/useLicenseStore.js");







/**
 * Render a grouped block of settings
 */
const SettingsGroup = props => {
  let upgrade = 'https://burst-statistics.com/pricing/?src=burst-plugin';
  const subMenu = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__.useMenu)(state => state.subMenu);
  const selectedSubMenuItem = (0,_store_useMenuStore__WEBPACK_IMPORTED_MODULE_4__.useMenu)(state => state.selectedSubMenuItem);
  const {
    licenseStatus
  } = (0,_store_useLicenseStore__WEBPACK_IMPORTED_MODULE_5__["default"])();
  let selectedFields = [];
  //get all fields with group_id props.group_id
  for (const selectedField of props.fields) {
    if (selectedField.group_id === props.group) {
      selectedFields.push(selectedField);
    }
  }
  let activeGroup;
  //first, set the selected menu item as active group, so we have a default in case there are no groups
  for (const item of subMenu.menu_items) {
    if (item.id === selectedSubMenuItem) {
      activeGroup = item;
    } else if (item.menu_items) {
      activeGroup = item.menu_items.filter(menuItem => menuItem.id === selectedSubMenuItem)[0];
    }
    if (activeGroup) {
      break;
    }
  }

  //now check if we have actual groups
  for (const item of subMenu.menu_items) {
    if (item.id === selectedSubMenuItem && item.hasOwnProperty('groups')) {
      let currentGroup = item.groups.filter(group => group.id === props.group);
      if (currentGroup.length > 0) {
        activeGroup = currentGroup[0];
      }
    }
  }
  let status = 'invalid';
  if (!activeGroup) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
  }
  let msg = activeGroup.pro_text ? activeGroup.pro_text : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Learn more about %sPro%s", "burst-statistics");
  if (burst_settings.is_pro) {
    status = licenseStatus;
    if (status === 'empty' || status === 'deactivated') {
      msg = burst_settings.messageInactive;
    } else {
      msg = burst_settings.messageInvalid;
    }
  }
  let disabled = status !== 'valid' && activeGroup.pro;
  //if a feature can only be used on networkwide or single site setups, pass that info here.
  upgrade = activeGroup.upgrade ? activeGroup.upgrade : upgrade;
  let helplinkText = activeGroup.helpLink_text ? activeGroup.helpLink_text : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Instructions", "burst-statistics");
  let disabledClass = disabled ? 'burst-disabled' : '';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item burst-" + activeGroup.id + ' ' + disabledClass
  }, activeGroup.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "burst-h4"
  }, activeGroup.title), activeGroup.helpLink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-controls"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Hyperlink__WEBPACK_IMPORTED_MODULE_2__["default"], {
    target: "_blank",
    className: "burst-helplink",
    text: helplinkText,
    url: activeGroup.helpLink
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-grid-item-content"
  }, activeGroup.intro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-settings-block-intro"
  }, activeGroup.intro), selectedFields.map((field, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: i,
    index: i,
    field: field,
    fields: selectedFields
  }))), disabled && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-locked"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-locked-overlay"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-task-status burst-pro"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Upgrade", "burst-statistics")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, burst_settings.is_pro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, msg, "\xA0", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "burst-locked-link",
    href: "#settings/license"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Check license", "burst-statistics"))), !burst_settings.is_pro && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_Hyperlink__WEBPACK_IMPORTED_MODULE_2__["default"], {
    target: "_blank",
    text: msg,
    url: upgrade
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsGroup);

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


const TaskElement = props => {
  const handleClick = () => {
    props.highLightField(props.notice.output.highlight_field_id);
  };
  let notice = props.notice;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "burst-task-element"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: 'burst-task-status burst-' + notice.output.icon
  }, notice.output.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "burst-task-message",
    dangerouslySetInnerHTML: {
      __html: notice.output.msg
    }
  }), notice.output.url && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    href: notice.output.url
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("More info", "burst-statistics")), notice.output.highlight_field_id && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-task-enable",
    onClick: handleClick
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Fix", "burst-statistics")), notice.output.plusone && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "burst-plusone"
  }, "1"), notice.output.dismissible && notice.output.status !== 'completed' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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

/***/ "./src/components/common/InputWarning.js":
/*!***********************************************!*\
  !*** ./src/components/common/InputWarning.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const InputWarning = _ref => {
  let {
    type = "warning",
    message,
    timeout = 5000,
    onTimeout = () => {}
  } = _ref;
  const [visible, setVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const timer = setTimeout(() => {
      onTimeout();
      clearTimeout(timer);
    }, timeout);
  }, [timeout, onTimeout]);
  const className = `burst-warning ${type}`;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, message);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputWarning);

/***/ }),

/***/ "./src/components/common/Modal.js":
/*!****************************************!*\
  !*** ./src/components/common/Modal.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/DialogTitle */ "./node_modules/@mui/material/DialogTitle/DialogTitle.js");
/* harmony import */ var _utils_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Icon */ "./src/utils/Icon.js");




const Modal = _ref => {
  let {
    isOpen,
    title,
    onClose,
    children
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"], {
    open: isOpen,
    onClose: onClose,
    sx: {
      borderRadius: 'var(--rsp-border-radius-s)'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_3__["default"], null, title), children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/components/pages/SettingsPage.js":
/*!**********************************************!*\
  !*** ./src/components/pages/SettingsPage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_Menu_Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks/Menu/Menu */ "./src/components/blocks/Menu/Menu.js");
/* harmony import */ var _blocks_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/Settings */ "./src/components/blocks/Settings.js");
/* harmony import */ var _blocks_Notices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blocks/Notices */ "./src/components/blocks/Notices.js");




const SettingsPage = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-content-area burst-grid burst-dashboard'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_Menu_Menu__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_Settings__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_blocks_Notices__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "cmplz-wizard-notices"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsPage);

/***/ }),

/***/ "./src/store/useArchivesStore.js":
/*!***************************************!*\
  !*** ./src/store/useArchivesStore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




const useArchiveStore = (0,zustand__WEBPACK_IMPORTED_MODULE_3__.create)((set, get) => ({
  archivesLoaded: false,
  fetching: false,
  restoring: false,
  progress: false,
  archives: [],
  downloadUrl: '',
  fields: [],
  noData: false,
  deleteArchives: async ids => {
    // get array of archives to delete
    let deleteArchives = get().archives.filter(record => ids.includes(record.id));
    //remove the ids from the archives array
    set(state => ({
      archives: state.archives.filter(record => !ids.includes(record.id))
    }));
    let data = {};
    data.archives = deleteArchives;
    await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise((0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction)('delete_archives', data), {
      pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deleting...', 'burst-statistics'),
      success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Archives deleted successfully!', 'burst-statistics'),
      error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to delete archive', 'burst-statistics')
    });
  },
  fetchData: async () => {
    if (get().fetching) return;
    set({
      fetching: true
    });
    let data = {};
    const {
      archives,
      downloadUrl
    } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction)('get_archives', data).then(response => {
      return response;
    }).catch(error => {
      console.error(error);
    });
    set(() => ({
      archivesLoaded: true,
      archives: archives,
      downloadUrl: downloadUrl,
      fetching: false
    }));
  },
  startRestoreArchives: async selectedArchives => {
    set({
      restoring: true,
      progress: 0
    });

    //set 'selectedArchives' to 'restoring' status
    set(state => ({
      archives: state.archives.map(archive => {
        if (selectedArchives.includes(archive.id)) {
          archive.restoring = true;
        }
        return archive;
      })
    }));
    await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise((0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction)('start_restore_archives', {
      archives: selectedArchives
    }), {
      pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Starting restore...', 'burst-statistics'),
      success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Restore successfully started!', 'burst-statistics'),
      error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to start restore process.', 'burst-statistics')
    });
  },
  fetchRestoreArchivesProgress: async () => {
    set({
      restoring: true
    });
    const {
      progress,
      noData
    } = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.doAction)('get_restore_progress', {}).then(response => {
      return response;
    }).catch(error => {
      console.error(error);
    });
    let restoring = false;
    if (progress < 100) {
      restoring = true;
    }
    set({
      progress: progress,
      restoring: restoring,
      noData: noData
    });
    if (progress === 100) {
      //exclude all archives where restoring = true
      let archives = get().archives.filter(archive => {
        return !archive.restoring;
      });
      set({
        archives: archives
      });
    }
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useArchiveStore);

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
  setGoalId: goal => set({
    goalId: goal
  })
}));

/***/ }),

/***/ "./src/store/useGoalFieldsStore.js":
/*!*****************************************!*\
  !*** ./src/store/useGoalFieldsStore.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGoalFieldsStore: () => (/* binding */ useGoalFieldsStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _useFieldsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useFieldsStore */ "./src/store/useFieldsStore.js");
/* harmony import */ var _useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useDashboardGoalsStore */ "./src/store/useDashboardGoalsStore.js");





const useGoalFieldsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_3__.create)((set, get) => {
  const loadGoalFields = async () => {
    _utils_api__WEBPACK_IMPORTED_MODULE_0__.getGoalFields().then(response => {
      const goalFields = updateGoalsFieldWithConditions(response.goal_fields);
      set({
        goalFields: goalFields
      });
    }).catch(error => {
      console.error(error);
    });
  };
  const setGoalValue = (id, field_id, value) => {
    set((0,immer__WEBPACK_IMPORTED_MODULE_4__.produce)(state => {
      if (state.goalFields[id] && state.goalFields[id][field_id].value) {
        state.goalFields[id][field_id].value = value;
      }
      state.goalFields = updateGoalsFieldWithConditions(state.goalFields);

      // find the field in changedGoalValues, or create a new field if it
      // doesn't exist
      const fieldIndex = state.changedGoalValues.findIndex(field => field.id === id);
      const field = fieldIndex !== -1 ? state.changedGoalValues[fieldIndex] : {
        id
      };

      // update the field with the new value
      field[field_id] = value;

      // update the changedGoalValues array
      if (fieldIndex !== -1) {
        state.changedGoalValues[fieldIndex] = field;
      } else {
        state.changedGoalValues.push(field);
      }
    }));
  };
  const saveChangedGoalValues = async () => {
    try {
      const changedGoalValues = get().changedGoalValues;
      if (changedGoalValues.length === 0) {
        return Promise.resolve();
      }
      const response = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.setGoalFields(changedGoalValues);
      set({
        changedGoalValues: []
      });

      // update the dashboard goals store
      _useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_2__.useDashboardGoalsStore.getState().incrementUpdateData();
      _useDashboardGoalsStore__WEBPACK_IMPORTED_MODULE_2__.useDashboardGoalsStore.getState().incrementUpdateLive();
      loadGoalFields();
      return Promise.resolve(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  // load goalFields on store creation
  loadGoalFields();
  return {
    goalFields: [],
    changedGoalValues: [],
    loadGoalFields,
    setGoalValue,
    saveChangedGoalValues,
    setChangedGoalValues: changedGoalValues => set({
      changedGoalValues
    })
  };
});
const updateGoalsFieldWithConditions = goalFields => {
  if (!goalFields) {
    return {};
  }
  let newGoalFields = {};
  Object.keys(goalFields).forEach(goalId => {
    let newFields = {};
    let fields = Object.values(goalFields[goalId]);
    fields.forEach(function (field, i) {
      let enabled = !(field.hasOwnProperty('react_conditions') && !(0,_useFieldsStore__WEBPACK_IMPORTED_MODULE_1__.validateConditions)(field.react_conditions, fields));
      const newField = {
        ...field
      };
      newField.conditionallyDisabled = !enabled;
      newFields[field.id] = newField;
    });
    newGoalFields[goalId] = newFields;
  });
  return newGoalFields;
};

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
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.esm.mjs");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useGoalFieldsStore */ "./src/store/useGoalFieldsStore.js");






const useGoalsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_4__.create)(set => {
  const loadGoals = async () => {
    try {
      const {
        goals
      } = await _utils_api__WEBPACK_IMPORTED_MODULE_0__.getGoals();
      set({
        goals: goals
      });
    } catch (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load goals', 'burst-statistics'));
    }
  };
  const addGoal = async () => {
    try {
      const response = await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise(_utils_api__WEBPACK_IMPORTED_MODULE_0__.addGoal(), {
        pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Adding goal...', 'burst-statistics'),
        success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Goal added successfully!', 'burst-statistics'),
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to add goal', 'burst-statistics')
      });
      const data = response.goal[Object.keys(response)[0]];
      const id = Object.keys(response.goal)[0]; // extract the id from the response
      await _useGoalFieldsStore__WEBPACK_IMPORTED_MODULE_3__.useGoalFieldsStore.getState().loadGoalFields();
      set((0,immer__WEBPACK_IMPORTED_MODULE_5__.produce)(state => {
        state.goals[id] = data;
      }));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Something went wrong', 'burst-statistics'));
    }
  };
  const removeGoal = async id => {
    try {
      const response = await react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.promise(_utils_api__WEBPACK_IMPORTED_MODULE_0__.deleteGoal(id), {
        pending: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deleting goal...', 'burst-statistics'),
        success: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Goal deleted successfully!', 'burst-statistics'),
        error: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to delete goal', 'burst-statistics')
      });
      if (response.deleted) {
        set((0,immer__WEBPACK_IMPORTED_MODULE_5__.produce)(draft => {
          // if there is only one goal left we need to update to an empty object
          if (Object.keys(draft.goals).length === 1) {
            draft.goals = {};
          } else {
            delete draft.goals[id];
          }
        }));
      }
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Something went wrong', 'burst-statistics'));
    }
  };
  const updateGoal = (id, data) => set((0,immer__WEBPACK_IMPORTED_MODULE_5__.produce)(draft => {
    draft.goals[id] = {
      ...draft.goals[id],
      ...data
    };
  }));

  // Load goals on store creation
  loadGoals();
  return {
    goals: {},
    goalFields: {},
    addGoal,
    removeGoal,
    updateGoal
  };
});

/***/ }),

/***/ "./src/store/useLicenseStore.js":
/*!**************************************!*\
  !*** ./src/store/useLicenseStore.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");

const useLicenseStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((set, get) => ({
  licenseStatus: burst_settings.licenseStatus,
  setLicenseStatus: licenseStatus => set(state => ({
    licenseStatus
  }))
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useLicenseStore);

/***/ }),

/***/ "./src/utils/Hyperlink.js":
/*!********************************!*\
  !*** ./src/utils/Hyperlink.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const Hyperlink = props => {
  let label_pre = '';
  let label_post = '';
  let link_text = '';
  if (props.text.indexOf('%s') !== -1) {
    let parts = props.text.split(/%s/);
    label_pre = parts[0];
    link_text = parts[1];
    label_post = parts[2];
  } else {
    link_text = props.text;
  }
  let className = props.className ? props.className : 'burst-link';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, label_pre, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: className,
    target: props.target,
    href: props.url
  }, link_text), label_post);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hyperlink);

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const iconColors = {
  'black': 'var(--rsp-black)',
  'green': 'var(--rsp-green)',
  'yellow': 'var(--rsp-yellow)',
  'red': 'var(--rsp-red)',
  'green-faded': 'var(--rsp-green-faded)',
  'yellow-faded': 'var(--rsp-yellow-faded)',
  'red-faded': 'var(--rsp-red-faded)',
  'grey': 'var(--rsp-grey-400)'
};
const Icon = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(_ref => {
  let {
    name = 'bullet',
    color = 'black',
    size = 15
  } = _ref;
  // if color is not in array use color value
  const colorVal = iconColors[color] || color;
  let renderedIcon = '';
  if (name === 'bullet' || name === 'dot') {
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
  if (name === 'circle') {
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
  if (name === 'period') {
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
  if (name === 'check') {
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
  if (name === 'warning') {
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
  if (name === 'error') {
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
  if (name === 'times') {
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
  if (name === 'circle-check') {
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
  if (name === 'circle-times') {
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
  if (name === 'chevron-up') {
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
  if (name === 'chevron-down') {
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
  if (name === 'chevron-right') {
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
  if (name === 'chevron-left') {
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
  if (name === 'plus') {
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
  if (name === 'minus') {
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
  if (name === 'sync') {
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
  if (name === 'sync-error') {
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
  if (name === 'shortcode') {
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
  if (name === 'file') {
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
  if (name === 'file-disabled') {
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
  if (name === 'file-download') {
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
  if (name === 'calendar') {
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
  if (name === 'calendar-error') {
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
  if (name === 'website') {
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
  if (name === 'help') {
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
  if (name === 'copy') {
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
  if (name === 'trash') {
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
  if (name === 'visitor') {
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
  if (name === 'visitors') {
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
  if (name === 'visitors-crowd') {
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
  if (name === 'time') {
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
  if (name === 'pageviews') {
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
  if (name === 'referrer') {
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
  if (name === 'sessions') {
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
  if (name === 'bounces' || name === 'bounced_sessions') {
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
  if (name === 'winner') {
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
  if (name === 'live') {
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
  if (name === 'total') {
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
  if (name === 'graph' || name === 'conversion_rate') {
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
  if (name === 'goals' || name === 'conversions') {
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
  if (name === 'goals-empty') {
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
  if (name === 'filter') {
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
  if (name === 'loading') {
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
  if (name === 'desktop') {
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
  if (name === 'tablet') {
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
  if (name === 'mobile') {
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
  if (name === 'other') {
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
  if (name === 'mouse') {
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
  if (name === 'eye') {
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
  if (name === 'page') {
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
  if (name === 'hashtag') {
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
  if (name === 'sun') {
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
  if (name === 'world') {
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
  if (name === 'filters') {
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
  if (name === 'referrers') {
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'burst-icon burst-icon-' + name
  }, renderedIcon.html);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./src/utils/formatting.js":
/*!*********************************!*\
  !*** ./src/utils/formatting.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   formatPercentage: () => (/* binding */ formatPercentage),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   formatUnixToDate: () => (/* binding */ formatUnixToDate),
/* harmony export */   getBouncePercentage: () => (/* binding */ getBouncePercentage),
/* harmony export */   getChangePercentage: () => (/* binding */ getChangePercentage),
/* harmony export */   getDateWithOffset: () => (/* binding */ getDateWithOffset),
/* harmony export */   getPercentage: () => (/* binding */ getPercentage),
/* harmony export */   getRelativeTime: () => (/* binding */ getRelativeTime)
/* harmony export */ });
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Returns a formatted string that represents the relative time between two dates
 * @param {Date | number} relativeDate - The date to compare or a UTC timestamp
 * @param {Date} date - The reference date, defaults to the current date
 * @returns {string} The relative time string
 */
const getRelativeTime = function (relativeDate) {
  let date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  // if relativeDate is a number, we assume it is an UTC timestamp
  if (typeof relativeDate === 'number') {
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
    if (Math.abs(elapsed) > units[u] || u === 'second') {
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
const getPercentage = function (val, total) {
  let format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
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
    signDisplay: "exceptZero"
  }).format(percentage);
  change.status = percentage > 0 ? 'positive' : 'negative';
  return change;
}

/**
 * Calculates the bounce percentage of bounced sessions and total sessions
 * @param {number} bounced_sessions - The number of bounced sessions
 * @param {number} sessions - The total number of sessions
 * @param {boolean} format - If true, returns the bounce percentage as a formatted string, otherwise as a number
 * @returns {string | number} The formatted bounce percentage or the raw bounce percentage
 */
function getBouncePercentage(bounced_sessions, sessions) {
  let format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
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
 * Formats a duration given in milliseconds as a time string in the format 'HH:mm:ss'
 * @param {number} timeInMilliSeconds - The duration in milliseconds
 * @returns {string} The formatted time string
 */
function formatTime() {
  let timeInMilliSeconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
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
function formatNumber(value) {
  let decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  value = Number(value);
  if (isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Formats a percentage value with the specified number of decimal places
 * @param {number} value - The percentage value (not multiplied by 100)
 * @param {number} decimals - The number of decimal places to use
 * @returns {string} The formatted percentage
 */
function formatPercentage(value) {
  let decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  value = Number(value) / 100;
  if (isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: decimals
  }).format(value);
}
function getDateWithOffset() {
  let currentDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
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


/***/ }),

/***/ "./src/utils/lib.js":
/*!**************************!*\
  !*** ./src/utils/lib.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   in_array: () => (/* binding */ in_array)
/* harmony export */ });
const in_array = (needle, haystack) => {
  let length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
};

/***/ })

}]);
//# sourceMappingURL=src_components_pages_SettingsPage_js.js.map