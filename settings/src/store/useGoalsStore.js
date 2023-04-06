import {create} from 'zustand';
import produce from 'immer';
import {getGoalFields, getGoalValues, setGoalFields} from '../utils/api';
import {validateConditions} from './useFieldsStore';
import * as burst_api from '../utils/api';
import {toast} from 'react-toastify';
import {__} from '@wordpress/i18n';

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
  };

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
  };

  const checkGoalConditions = async (id) => {
    const goalFields = get().goalFields;
  };

  const initGoals = async () => {
    await fetchGoalFields();
  };
  const addGoal = () => {
   // make api call to add goal
    burst_api.addGoal().then((response) => {
      set(produce((state) => {
        state.goalFields[response.id] = state.emptyGoalFields;
      }));
      toast.success(__('Goal added', 'burst-statistics'));
    }).catch((error) => {
      console.error(error);
      toast.error(__('Failed to add goal', 'burst-statistics'));
    });
  };
  const removeGoal = async (id) => {
    try {
      await burst_api.deleteGoal(id);
      set(
          produce((state) => {
            delete state.goalFields[id];
            state.goalFields = updateGoalsFieldWithConditions(state.goalFields);
          }),
      );
      toast.success(`${__('Goal deleted', 'burst-statistics')} (${id})`);
    }
    catch (error) {
      console.error(error);
      toast.error(__('Failed to delete goal', 'burst-statistics'));
    }
  };

  return {
    goalFields: [],
    fetchGoalFields,
    emptyGoalFields: [],
    setGoalValue,
    changedGoalValues: [],
    setChangedGoalValues: (changedGoalValues) => set({changedGoalValues}),
    saveChangedGoalValues,
    initGoals,
    addGoal,
    removeGoal,
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

