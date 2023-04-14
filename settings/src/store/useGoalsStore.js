import { create } from 'zustand';
import produce from 'immer';
import * as burst_api from '../utils/api';
import {toast} from 'react-toastify';
import {__} from '@wordpress/i18n';
import { useGoalFieldsStore } from './useGoalFieldsStore';

export const useGoalsStore = create((set) => {
  const loadGoals = async () => {
    try {
      const response = await burst_api.getGoals();
      set({goals: response});
    } catch (error) {
      console.error(error);
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
      const data = response[Object.keys(response)[0]];
      const id = Object.keys(response)[0]; // extract the id from the response
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
          delete draft.goals[id];
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