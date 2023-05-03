import {Button, TextareaControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
  useState
} from 'react';
import InputWarning from '../../common/InputWarning';

const IpBlock = (props) => {
  const [warning, setWarning] = useState(false);
  let field = props.field;
  let fieldValue = field.value;
  const ip = burst_settings.current_ip;

  const checkInputForWarmings = (fieldValue) => {
    if (fieldValue.includes(ip)) {
      setWarning(
          __('Your IP address is:', 'burst-statistics') +
          " '" +
          ip +
          "'. " +
          __('Which is already in the list.', 'burst-statistics'),
      );
      return true;
    }

    setWarning(false);
    return false;
  }
  /**
   * Check if IP is in a valid format. Or is already in the list.
   * @param fieldValue
   */
  const onChangeIpHandler = (fieldValue) => {
    const error = checkInputForWarmings(fieldValue);
    if (error) {
      return;
    }
    props.onChange(fieldValue);
  };

  const onClickAddIPHandler= () => {
    let input = document.getElementById('ip_address');
    let inputValue = input.value;
    const error = checkInputForWarmings(fieldValue);
    if (error) {
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
    props.onChange(inputValue);
  }


    return (
      <>
        <TextareaControl
            label={field.label}
            help={field.comment}
            placeholder={"127.0.0.1\n192.168.0.1"}
            value={fieldValue}
            onChange={(fieldValue) => onChangeIpHandler(fieldValue)}
            id="ip_address"
        />
        <Button
            className="burst-button burst-button--secondary button-add-ip"
            onClick={onClickAddIPHandler}
        >
          {__('Add current IP address', 'burst-statistics')}
        </Button>
        {warning !== false && (
            <InputWarning
                message={warning}
                onTimeout={() => setWarning(false)}
            />
        )}
      </>
    );
}

export default IpBlock;