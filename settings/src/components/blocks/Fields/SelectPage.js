import React, {useRef, useState} from '@wordpress/element';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../../utils/api';
import Icon from '../../../utils/Icon';
import { formatNumber } from '../../../utils/formatting';
import debounce from 'lodash/debounce';

const fetchPosts = async( inputValue = '' ) => {
  const response = await getPosts( inputValue );

  // Map the response to the expected format
  return ( response || []).map( post => ({
    value: post.page_url,
    label: post.page_url,
    page_id: post.page_id,
    post_title: post.post_title,
    pageviews: post.pageviews
  }) );
};

// Option layout component
const OptionLayout = ({ innerProps, innerRef, data }) => {
  const r = data;
  return (
      <article ref={innerRef} {...innerProps} className={'burst-select__custom-option'}>
        <div>
          <h6 className={'burst-select__title'}>{r.label}</h6>
          {'Untitled' !== r.post_title && <><span> - </span><p className={'burst-select__subtitle'}>{r.post_title}</p></>}
        </div>
        {0 < r.pageviews && <div className={'burst-select__pageview-count'}>
          <Icon name={'eye'} size={12}/>
          <span>{ formatNumber( r.pageviews ) }</span>
        </div>}
      </article>
  );
};

// Main SelectPage component
const SelectPage = ({ value, onChangeHandler, field }) => {
  const [ search, setSearch ] = useState( '' );
  const posts = useQuery(
      [ 'defaultPosts', search ],
      () => fetchPosts( search )
  );

  // cache the first '' empty fetchPosts call so we can use it as the default value
  const firstPosts = useRef( posts.data );
  if ( firstPosts.current === undefined && posts.data !== undefined ) {
    firstPosts.current = posts.data;
  }

  // Load options function with debounce
  const loadOptions = debounce( async( input, callback ) => {
    setSearch( input );
    const response = await fetchPosts( input );
    callback( response );
  }, 500 );

  return (
      <>
        <p className={'burst-label'}>{field.label}</p>
        <AsyncCreatableSelect
            classNamePrefix="burst-select"
            onChange={( e ) => {
 onChangeHandler( e.value );
}}
            isLoading={posts.isLoading}
            isSearchable={true}
            name="selectPage"
            cacheOptions
            defaultValue={value}
            defaultInputValue={value}
            defaultOptions={firstPosts.current}
            loadOptions={loadOptions}
            components={{ Option: OptionLayout }}
            theme={( theme ) => ({
              ...theme,
              borderRadius: 'var(--rsp-border-radius-input)',
              colors: {
                ...theme.colors,
                text: 'orangered',
                primary25: 'var(--rsp-green-faded)',
                primary: 'var(--rsp-green)'
              }
            })}
            styles={{
              control: ( baseStyles, state ) => ({
                ...baseStyles,
                borderColor: state.isFocused ?
                    'var(--rsp-green)' :
                    'var(--rsp-input-border-color)'
              })
            }}
        />
      </>
  );
};

export default SelectPage;
