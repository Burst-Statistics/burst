import { create } from 'zustand';
import {produce} from 'immer';
import * as burst_api from '../utils/api';
import {toast} from 'react-toastify';
import {__} from '@wordpress/i18n';
import { useGoalFieldsStore } from './useGoalFieldsStore';

export const useGoalsStore = create((set) => {
  const loadGoals = async () => {
    try {
      const {goals} = await burst_api.getGoals();
      set({goals: goals});
    } catch (error) {
      toast.error(__('Failed to load goals', 'burst-statistics'));
    }
  };

  const addGoal = async () => {
    try {
      const response = await toast.promise(burst_api.addGoal(), {
        pending: __('Adding goal...', 'burst-statistics'),
        success: __('Goal added successfully!', 'burst-statistics'),
        error: __('Failed to add goal', 'burst-statistics'),
      });
      const data = response.goal[Object.keys(response)[0]];
      const id = Object.keys(response.goal)[0]; // extract the id from the response
      await useGoalFieldsStore.getState().loadGoalFields();

      set(produce((state) => {
        state.goals[id] = data;
      }));
    } catch (error) {
      console.error(error);
      toast.error(__('Something went wrong', 'burst-statistics'));
    }
  };

  const removeGoal = async (id) => {
    try {
      const response = await toast.promise(burst_api.deleteGoal(id), {
        pending: __('Deleting goal...', 'burst-statistics'),
        success: __('Goal deleted successfully!', 'burst-statistics'),
        error: __('Failed to delete goal', 'burst-statistics'),
      });
      if (response.deleted) {
        set(produce((draft) => {
          // if there is only one goal left we need to update to an empty object
          if (Object.keys(draft.goals).length === 1) {
            draft.goals = {};
          } else {
            delete draft.goals[id];
          }

        }));
      }
    }
    catch (error) {
      console.error(error);
      toast.error(__('Something went wrong', 'burst-statistics'));
    }
  };

  const updateGoal = (id, data) => set(produce((draft) => {
    draft.goals[id] = { ...draft.goals[id], ...data };
  }));

  // Load goals on store creation
  loadGoals();

  return {
    goals: {},
    goalFields: {},
    addGoal,
    removeGoal,
    updateGoal,
  }
});