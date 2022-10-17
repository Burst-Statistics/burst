import {Button, TextareaControl} from '@wordpress/components';
import {
  Component,
  useRef,
  useState
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';




const IpBlock = (props) => {
  console.log(props);
  const inputRef = useRef(null);
  // set state warning
  const [warning, setWarning] = useState(false);
  const {
    disabled,
      field,
      fields,
      fieldValue,
      help,
      id,
      label,
      onChangeHandler,
      value
  } = props;

  const onClickAddIPHandler = (e) => {
    let input = document.getElementById('ip_address');
    let inputValue = input.value;
    let ip = burst_settings.current_ip;

    if (inputValue.includes(ip)) {
      setWarning(__('Your IP adress is: ', 'burst-statistics') + " '" +  ip + "'. " + __('Which is already in the list.', 'burst-statistics'));
      return;
    }
    if (ip) {
      if (inputValue) {
        // update value for input
        input.value = inputValue += "\n" + ip;
      } else {
        input.value = ip;
      }
    }
  }

  return (
    <>
      <TextareaControl
          innerRef={inputRef}
          label={field.label}
          help={field.comment}
          value={fieldValue}
          // onChange={(fieldValue) => onChangeHandler(fieldValue)}
          id="ip_address"
      />
      <Button className="button button-secondary button-add-ip"
              onClick={onClickAddIPHandler}>{__('Add current IP Adress',
          'burst-statistics')}</Button>
      { warning !== false && <div className="burst-warning">{warning}</div>
      }
    </>
  )
}

export default IpBlock;