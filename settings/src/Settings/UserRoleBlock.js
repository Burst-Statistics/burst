import {Button, TextareaControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
  Component,
} from '@wordpress/element';



class UserRoleBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'block-selected',
    }
    this.onChangeCheckboxHandler = this.onChangeCheckboxHandler.bind(this);
  }

  onChangeCheckboxHandler(e) {
    let value = e.target.value;
    let checked = e.target.checked;
    let fieldValue = this.props.field.value;
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
    this.props.onChangeHandler(fieldValue);
  }

  render(){
    let field = this.props.field;
    let fieldValue = field.value;
    let fields = this.props.fields;
    let userRoles = burst_settings.user_roles ? burst_settings.user_roles : [];
    let selectedUserRoles = fieldValue ? fieldValue : ['administrator'];
    let radioValue = this.state.radioValue;
    return (
        <>
          <label>{field.label}</label>
            {radioValue === 'block-selected' && <div className="burst-user-role-checkbox-blocklist">
              {Object.keys(userRoles).map((key, index) => {
                return (
                    <label key={key}>
                      <input onChange={this.onChangeCheckboxHandler} checked={selectedUserRoles.includes(key)} type={'checkbox'} id={key} name={'user-role-block'} value={key} />
                      {userRoles[key]}
                    </label>
                )
              })}
            </div>
            }
        </>
    )
  }
}

export default UserRoleBlock;