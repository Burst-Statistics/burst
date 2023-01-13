import create from 'zustand';
import produce from 'immer';
import {getGoalFields, getGoalValues} from '../../utils/api';
import {
  updateGoalFieldsListWithConditions,
  handleShowSavedSettingsNotice,
} from './fields';

export const useGoals = create((set, get) => ({
  goalFieldsLoaded: false,
  goalFields: [],
  fetchGoalFields: () => {
    return getGoalFields().then((response) => {
      set(state => ({goalFields: response}));
      set(state => ({goalFieldsLoaded: true}));
    }).catch((error) => {
      console.error(error);
    });
  },
  goalValuesLoaded: false,
  goalValues: [],
  setGoalValue: (id, field_id, value) => {
    set(produce(state => {
      if (state.goalValues[id] && state.goalValues[id][field_id]) {
        state.goalValues[id][field_id] = value;
      }
    }));
    // set the changed value
    set(produce(state => {
      // find the index of the field with the same id
      const existingFieldIndex = state.changedGoalValues.findIndex(field => field.id === id);
      if (existingFieldIndex !== -1) {
        // remove the existing field
        state.changedGoalValues.splice(existingFieldIndex, 1);
      }
      // add the updated field
      let field = {};
      field.id = id;
      field[field_id] = value;
      state.changedGoalValues.push(field);
    }));
  },
  changedGoalValues: [],
  fetchGoalValues: () => {
    return getGoalValues().then(async (response) => {
      // foreach goalField, check if it has a value otherwise set default
      let goalFields = get().goalFields;
      let goalValues = response;
      for (const goalId in goalValues) {
        for (const fieldId in goalFields) {
          const field = goalFields[fieldId];
          if (!goalValues[goalId][fieldId]) {
            goalValues[goalId][fieldId] = field.default ? field.default : false;
          }
        }
      }

      set(state => ({goalValues: goalValues}));
      set(state => ({goalValuesLoaded: true}));
    }).catch((error) => {
      console.error(error);
    });
  },
  saveChangedGoalValues: () => {
    console.log('hook onto on save and save changed goal values');
  },
}));