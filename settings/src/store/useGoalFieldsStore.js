import { create } from 'zustand';
import * as burst_api from '../utils/api';
import produce from 'immer';
import {validateConditions} from './useFieldsStore';
import {useDashboardGoalsStore} from './useDashboardGoalsStore';

export const useGoalFieldsStore = create((set, get) => {
  const loadGoalFields = async () => {
      burst_api.getGoalFields().then((response) => {
        const goalFields = updateGoalsFieldWithConditions(response);
        set({goalFields: goalFields});
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

  const saveChangedGoalValues = async () => {
    try {
      const changedGoalValues = get().changedGoalValues;

      if (changedGoalValues.length === 0) {
        return Promise.resolve();
      }
      const response = await burst_api.setGoalFields(changedGoalValues);
      set({changedGoalValues: []});

      // update the dashboard goals store
      useDashboardGoalsStore.getState().incrementUpdateData();
      useDashboardGoalsStore.getState().incrementUpdateLive();

      loadGoalFields();
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
    setChangedGoalValues: (changedGoalValues) => set({changedGoalValues}),
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
