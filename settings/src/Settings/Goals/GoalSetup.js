import Icon from '../../utils/Icon';
import Field from '../Field';
import {useState} from 'react';
const GoalSetup = (props) => {
  const {goal_id} = props;
  // make a copy of the goal_fields and set as state
  const [goal_fields, setGoalFields] = useState(props.goal_fields);
  const [goal_data, setGoalData] = useState(props.goal_data);

  const validateConditions = (conditions, fields) => {
    let relation = conditions.relation === 'OR' ? 'OR' : 'AND';
    let conditionApplies = relation==='AND' ? true : false;
    for (const key in conditions) {
      if ( conditions.hasOwnProperty(key) ) {
        let thisConditionApplies = relation==='AND' ? true : false;;
        let subConditionsArray = conditions[key];
        if ( subConditionsArray.hasOwnProperty('relation') ) {
          thisConditionApplies = this.validateConditions(subConditionsArray, fields)
        } else {
          for (let conditionField in subConditionsArray) {
            let invert = conditionField.indexOf('!')===0;
            if ( subConditionsArray.hasOwnProperty(conditionField) ) {
              let conditionValue = subConditionsArray[conditionField];
              conditionField = conditionField.replace('!','');
              let conditionFields = fields.filter(field => field.id === conditionField);
              if (conditionFields.hasOwnProperty(0)){
                if (conditionFields[0].type==='checkbox') {
                  let actualValue = +conditionFields[0].value;
                  conditionValue = +conditionValue;
                  thisConditionApplies = actualValue === conditionValue;
                } else {
                  if (conditionValue.indexOf('EMPTY')!==-1){
                    thisConditionApplies = conditionFields[0].value.length===0;
                  } else {
                    thisConditionApplies = conditionFields[0].value?.toLowerCase() === conditionValue?.toLowerCase();
                  }
                }
              }
            } else {
              console.log("property not found "+conditionField)
            }

            if ( invert ){
              thisConditionApplies = !thisConditionApplies;
            }

          }

        }
        if ( relation === 'AND' ) {
          conditionApplies = conditionApplies && thisConditionApplies;
        } else {
          conditionApplies = conditionApplies || thisConditionApplies;
        }
      }
    }
    return conditionApplies ? 1 : 0;
  }

  const updateFieldsListWithConditions = () => {
    for (const goal_field of goal_fields){

      let enabled = !(goal_field.hasOwnProperty('react_conditions') && !validateConditions(goal_field.react_conditions, goal_fields));

      //we want to update the changed fields if this field has just become visible. Otherwise the new field won't get saved.
      let previouslyDisabled = goal_fields[goal_fields.indexOf(goal_field)].conditionallyDisabled;
      goal_fields[goal_fields.indexOf(goal_field)].conditionallyDisabled = !enabled;
      if ( previouslyDisabled && enabled ) {
        let changedGoals = this.changedGoals;
        if (!in_array(goal_field.id, changedGoals)) {
          changedGoals.push(goal_field.id);
        }
        this.changedGoals = changedGoals;
        this.setState({
          changedGoals:changedGoals,
        });
      }

      goal_fields[goal_fields.indexOf(goal_field)].visible = true;
    }
  }
  const onChangeHandler = (e) => {
    // setGoalData is a function that updates the goal_data state
    setGoalData({ ...goal_data, [e.target.name]: e.target.value });

    // updateFieldsListWithConditions();
  }

  // updateFieldsListWithConditions();

  return (
      <div className="burst-settings-goals__list__item" key={props.goal_id}>
        <details>
          <summary>
            <Icon name={'circle'} size={20} />
            <input type={'text'} name={'goal'} />
            {/*<ToggleControl />*/}
            <Icon name={'chevron-down'} size={18} />
          </summary>
          {Object.keys(goal_fields).map((field_id, index) => {
            // let value = goal_data[goal_id][goal_fields[field_id].id] !== undefined ? goal_data[goal_id][goal_fields[field_id].id] : '';
            let value = 'clicks';
            return (
                <Field
                    key={index}
                    field={goal_fields[field_id]}
                    value={value}
                    goal_id={props.goal_id}
                    // onChangeHandler={(e) => onChangeHandler(e)}
                />
            );
          })}
        </details>
      </div>
  );
}
export default GoalSetup;