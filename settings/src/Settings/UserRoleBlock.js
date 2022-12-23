import {useState} from 'react';

const UserRoleBlock = (props) => {
  const [radioValue, setRadioValue] = useState('block-selected');
  let field = props.field;
  let fieldValue = field.value;
  let fields = props.fields;
  let userRoles = burst_settings.user_roles ? burst_settings.user_roles : [];
  let selectedUserRoles = fieldValue ? fieldValue : ['administrator'];

  const onChangeCheckboxHandler = (e) =>  {
    let value = e.target.value;
    let checked = e.target.checked;
    let fieldValue = props.field.value;
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
    props.onChangeHandler(fieldValue);
  }


    return (
        <>
          <label>{field.label}</label>
            {radioValue === 'block-selected' && <div className="burst-user-role-checkbox-blocklist">
              {Object.keys(userRoles).map((key, index) => {
                return (
                    <label key={key}>
                      <input onChange={onChangeCheckboxHandler} checked={selectedUserRoles.includes(key)} type={'checkbox'} id={key} name={'user-role-block'} value={key} />
                      {userRoles[key]}
                    </label>
                )
              })}
            </div>
            }
        </>
    )
}

export default UserRoleBlock;