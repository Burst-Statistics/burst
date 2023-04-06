import React, {useEffect, useState} from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {getPosts} from '../../../utils/api';
import Icon from '../../../utils/Icon';
import {formatNumber} from '../../../utils/formatting';
import debounce from 'lodash/debounce';


export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [defaultPosts, setDefaultPosts] = useState([]);
  const [defaultValue, setDefaultValue] = useState(props.value); // add state for defaultValue

  useEffect(() => {
    // set default value from props
    setDefaultValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setIsLoading(true);
    getPosts('').then((response) => {
      setDefaultPosts(
          response.map((post) => ({
            value: post.page_url,
            label: post.page_url,
            page_id: post.page_id,
            post_title: post.post_title,
            pageviews: post.pageviews,
          }))
      );
      setIsLoading(false);
    });
  }, []);

  const loadOptions = debounce((inputValue, callback) => {
    setIsLoading(true);
    getPosts(inputValue).then((response) => {
      setPosts(
          response.map((post) => ({
            value: post.page_url,
            label: post.page_url,
            page_id: post.page_id,
            post_title: post.post_title,
            pageviews: post.pageviews,
          }))
      );
      setIsLoading(false);
      callback(posts);
    });
  }, 500); // 500ms debounce delay

  return (
      <>
        <p className={'burst-label'}>{props.field.label}</p>
        <AsyncCreatableSelect
            classNamePrefix="burst-select"
            onChange={(e) => {
              props.onChangeHandler(e.value);
            }}
            isLoading={isLoading}
            isSearchable={true}
            name="selectPage"
            cacheOptions
            defaultValue={defaultValue}
            defaultOptions={defaultPosts}
            defaultInputValue={defaultValue}
            loadOptions={loadOptions}
            components={{Option: OptionLayout}}
            theme={(theme) => ({
              ...theme,
              borderRadius: 'var(--rsp-border-radius-input)',
              colors: {
                ...theme.colors,
                text: 'orangered',
                primary25: 'var(--rsp-green-faded)',
                primary: 'var(--rsp-green)',
              },
            })}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused
                    ? 'var(--rsp-green)'
                    : 'var(--rsp-input-border-color)',
              }),
            }}
        />
      </>
  );
};


const OptionLayout = props => {
  const { innerProps, innerRef } = props;
  const r = props.data;
  return (
      <article ref={innerRef} {...innerProps}
               className={'burst-select__custom-option'}>
        <div>
          <h6 className={'burst-select__title'}>{r.label}</h6>
          {r.post_title !== 'Untitled' &&
              <><span> - </span> <p className={'burst-select__subtitle'}>{r.post_title} </p></>}
        </div>

        {r.pageviews > 0 && <div className={'burst-select__pageview-count'}>
          <Icon name={'eye'} size={12}/>
          <span>{
            formatNumber(r.pageviews)
          }</span>
        </div>}
      </article>
  );
};