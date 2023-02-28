import create from 'zustand';
import produce from 'immer';
import {getGoalFields, getGoalValues, setGoalFields} from '../../utils/api';
import {handleShowSavedSettingsNotice, validateConditions} from './fields';
import * as burst_api from '../../utils/api';

export const useGoals = create((set, get) => {
  const fetchGoalFields = async () => {
    try {
      let goalFields = await getGoalFields();
      // loop trough every goal, then loop trough every field and check if it
      // has conditions goalFields =

      set({emptyGoalFields: goalFields[0]}); // set emptyGoalFields to the
                                             // first item in the response
                                             // array
      delete goalFields[0]; // delete the first item in the response array

      let goalFieldsChecked = updateGoalsFieldWithConditions(goalFields);
      set({goalFields: goalFieldsChecked});
    }
    catch (error) {
      console.error(error);
    }
  };

  const setGoalValue = (id, field_id, value) => {
    set(produce(state => {
      if (state.goalFields[id] && state.goalFields[id][field_id].value) {
        state.goalFields[id][field_id].value = value;
      }
      state.goalFields = updateGoalsFieldWithConditions(state.goalFields);

      // find the field in changedGoalValues, or create a new field if it doesn't exist
      const fieldIndex = state.changedGoalValues.findIndex(field => field.id === id);
      const field = fieldIndex !== -1 ? state.changedGoalValues[fieldIndex] : { id };

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
      console.log(changedGoalValues);
      const response = await burst_api.setGoalFields(changedGoalValues);
      if (response.success) {
        handleShowSavedSettingsNotice();
        set({changedGoalValues: []});
      }
      else {
        console.error(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const checkGoalConditions = async (id) => {
    const goalValues = get().goalValues;
    const goalFields = get().goalFields;
  };

  const initGoals = async () => {
    await fetchGoalFields();
    // await fetchGoalValues();
  };

  return {
    goalFields: [],
    fetchGoalFields,
    emptyGoalFields: [],
    setGoalValue,
    changedGoalValues: [],
    saveChangedGoalValues,
    initGoals,
  };
});

const updateGoalsFieldWithConditions = (goalFields) => {
  let newGoalFields = {};
  Object.keys(goalFields).forEach((goalId) => {
    let newFields = {};
    let fields = Object.values(goalFields[goalId]);
    fields.forEach(function(field, i) {
      let enabled = !(field.hasOwnProperty('react_conditions') &&
          !validateConditions(field.react_conditions, fields));
      const newField = {...field};
      newField.conditionallyDisabled = !enabled;
      newFields[field.id] = newField;
    });
    newGoalFields[goalId] = newFields;
  });
  return newGoalFields;
};

//
// export const updateGoalsFieldWithConditions = (goalField, goalValues) => {
//   console.log(goalValues);
//   // Check if the field has react_conditions property
//   if (goalField.react_conditions) {
//     let disabled = false;
//     // Loop through the conditions
//     Object.keys(goalField.react_conditions).forEach(condition => {
//       if (condition.relation === 'AND') {
//         // Check if all conditions are met
//         const andConditions = condition.map(c => {
//           const [key, values] = Object.entries(c)[0];
//           return values.includes(goalValues[key]);
//         });
//         // If any condition is not met, set disabled to true
//         disabled = andConditions.includes(false);
//       }
//       else if (condition.relation === 'OR') {
//         // Check if any condition is met
//         const orConditions = condition.map(c => {
//           const [key, values] = Object.entries(c)[0];
//           return values.includes(goalValues[key]);
//         });
//         // If all conditions are not met, set disabled to true
//         disabled = !orConditions.includes(true);
//       }
//     });
//     // Set the conditionallyDisabled property of the field to 1 if the field
// is disabled and 0 if the field is not disabled console.log(disabled); if
// (disabled) { console.log(goalField.fieldId, 'disabled'); } else {
// console.log(goalField.fieldId, 'enabled'); } return disabled; } return 0; }


