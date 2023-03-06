import create from 'zustand';
import produce from 'immer';
import {__} from '@wordpress/i18n';

// define the store
export const useFilters = create(set => ({
      filters: {
        page_id: '',
        page_url: '',
        goal_id: '',
        referrer: '',
        device: '',
        browser: '',
        platform: '',
      },
      filtersConf: {
        page_url: {
          label: __('Page', 'burst-statistics'),
          icon: 'page',
        },
        goal_id: {
          label: __('Goal', 'burst-statistics'),
          icon: 'goal',
        },
        referrer: {
          label: __('Referrer URL', 'burst-statistics'),
          icon: 'referrer',
        },
        device: {
          label: __('Device', 'burst-statistics'),
          icon: 'desktop',
        },
        browser: {
          label: __('Browser', 'burst-statistics'),
          icon: 'browser',
        },
        platform: {
          label: __('Operating System', 'burst-statistics'),
          icon: 'operating-system',
        },
      },
      setFilters: (filter, value) => {
        // check if value is not empty or false
        // use zustand to produce a new state
        set(state => produce(state, draft => {
          draft.filters[filter] = value;
        }
        ));

      },
    }))
;
