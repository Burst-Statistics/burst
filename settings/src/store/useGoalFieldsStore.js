import { create } from 'zustand';
import * as burst_api from '../utils/api';
import {produce} from 'immer';
import {validateConditions} from './useFieldsStore';

export const useGoalFieldsStore = create((set, get) => {
  const loadGoalFields = async (id) => {
        //if id is undefined, load all goal fields
        //if an id is passed, we overwrite only the goal fields for this id.
        //this way we can add a new goal, without overwriting the other newly added goals.
        if (typeof id === 'undefined') {
          id = -1;
        }
      burst_api.getGoalFields().then((response) => {
        let goalFields = response.goal_fields;
        if ( id !== -1 ) {
            goalFields = {[id]: goalFields[id]};
        }
        goalFields = updateGoalsFieldWithConditions(goalFields);
        if ( id !== -1 ) {
            set(produce(state => {
              state.goalFields[id] = goalFields[id];
            }));
          } else {
            set({goalFields: goalFields});
          }
      }).catch((error) => {
        console.error(error);
      });
  }

  const setGoalValue = (id, field_id, value) => {
    set(produce(state => {
      if (state.goalFields[id] && state.goalFields[id][field_id].value) {
        state.goalFields[id][field_id].value = value;
      }
      state.goalFields = updateGoalsFieldWithConditions(state.goalFields);

      // find the field in changedGoalValues, or create a new field if it
      // doesn't exist
      const fieldIndex = state.changedGoalValues.findIndex(
          field => field.id === id);
      const field = fieldIndex !== -1
          ? state.changedGoalValues[fieldIndex]
          : {id};

      // update the field with the new value
      field[field_id] = value;

      // update the changedGoalValues array
      if (fieldIndex !== -1) {
        state.changedGoalValues[fieldIndex] = field;
      }
      else {
        state.changedGoalValues.push(field);
      }
    }));
  }
  const saveGoalTitle = async (id, value) => {
    try {
      let goal = {
        'id': id,
        'goal_title': value,
      };
      let data = [];
      data.push(goal);
      await burst_api.setGoalFields(data);
      return Promise.resolve();
    }
    catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  const saveChangedGoalValues = async () => {
    try {
      const changedGoalValues = get().changedGoalValues;

      if (changedGoalValues.length === 0) {
        return Promise.resolve();
      }
      const response = await burst_api.setGoalFields(changedGoalValues);
      set({changedGoalValues: []});


      return Promise.resolve(response);
    }
    catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  // load goalFields on store creation
  loadGoalFields();

  return {
    goalFields: [],
    changedGoalValues: [],
    loadGoalFields,
    setGoalValue,
    saveChangedGoalValues,
    saveGoalTitle,
    setChangedGoalValues: (changedGoalValues) => set({changedGoalValues}),
  };
});

const updateGoalsFieldWithConditions = (goalFields) => {
  if (!goalFields) {
    return {};
  }
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
