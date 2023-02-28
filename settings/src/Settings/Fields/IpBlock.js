import {Button, TextareaControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
  useState
} from 'react';

const IpBlock = (props) => {
  const [warning, setWarning] = useState(false);
  let field = props.field;
  let fieldValue = field.value;

  const onClickAddIPHandler= (e) => {
    let input = document.getElementById('ip_address');
    let inputValue = input.value;
    let ip = burst_settings.current_ip;

    if (inputValue.includes(ip)) {
      setWarning( __('Your IP address is:', 'burst-statistics') + " '" +  ip + "'. " + __('Which is already in the list.', 'burst-statistics') );
      setTimeout(() => {
        setWarning(false);
      } , 5000);
      return;
    }
    if (ip) {
      if (inputValue) {
        // update value for input
        inputValue += "\n" + ip;
      } else {
        inputValue = ip;
      }
    }
    input.value = inputValue;
    props.onChangeHandler(inputValue);
  }


    return (
        <>
          <TextareaControl
              label={field.label}
              help={field.comment}
              placeholder={"127.0.0.1\n192.168.0.1"}
              value={fieldValue}
              onChange={(fieldValue) => props.onChangeHandler(fieldValue)}
              id="ip_address"
          />
          <Button className="button button-secondary button-add-ip"
                  onClick={onClickAddIPHandler}>{__('Add current IP address',
              'burst-statistics')}</Button>
          { warning !== false && <div className="burst-warning">{warning}</div> }
          </>
    );
}

export default IpBlock;