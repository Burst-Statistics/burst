// import React, { useState } from 'react'
// import Select from 'react-select'
// import { useEffect, useRef } from "@wordpress/element";
// import {__} from '@wordpress/i18n'
//
// const SelectPage = (props) => {
//   const [options, setOptions] = useState([])
//   const [inputValue, setInputValue] = useState('')
//   const [selectedOption, setSelectedOption] = useState(null)
//   const currentType = useRef(props.field.value);
//
//   useEffect(() => {
//     // Fetch list of pages
//     fetchPages().then(response => {
//       setOptions(response.pages)
//     })
//   }, [])
//
//   const fetchPages = async (search) => {
//     const data = {
//       search: search,
//     };
//     return burst_api.doAction('get_pages_list', data).then( ( response ) => {
//       return response;
//     });
//   }
//
//   const handleSearch = async (search) => {
//     setInputValue(search)
//     const pages = await fetchPages(search)
//     setOptions(pages)
//   }
//
//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption)
//     if (selectedOption.value) {
//       let data = {};
//       data.pageId = selectedOption.value;
//       data.type = props.field.id;
//       burst_api.doAction('update_custom_legal_document_id', data).then( ( response ) => {});
//     }
//     if (selectedOption.label === __('Custom URL', 'complianz-gdpr') ) {
//       setSelectedOption(null)
//     }
//   }
//
//   const handleInputChange = (newValue) => {
//     const inputValue = newValue.replace(/\W/g, '');
//     setInputValue(inputValue);
//     return inputValue;
//   };
//
//   const handleBlur = () => {
//     if (inputValue) {
//       let data = {};
//       data.pageUrl = inputValue;
//       data.type = props.field.id;
//       burst_api.doAction('update_custom_legal_document_url', data).then( ( response ) => {});
//     }
//   }
//
//   const customOptions = [
//     {
//       label: __('Custom URL', 'complianz-gdpr'),
//       value: 'custom',
//     },
//   ]
//   options.push(...customOptions)
//   return (
//       <>
//         <p className={'burst-label'}>{props.field.label}</p>
//       <Select
//           value={selectedOption}
//           onChange={handleChange}
//           onInputChange={handleInputChange}
//           onBlur={handleBlur}
//           onMenuOpen={() => handleSearch(inputValue)}
//           options={options}
//           placeholder={__('Select a page', 'complianz-gdpr')}
//           isClearable={true}
//           isSearchable={true}
//           isCreatable={false}
//       />
//       </>
//   )
// }
//
// export default SelectPage

const SelectPage = (props) => {
  return (
      <h1>test</h1>
  )
}
export default SelectPage