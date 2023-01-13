import create from 'zustand';
import produce from 'immer';
import {__} from '@wordpress/i18n';

// define the store
export const useFilters = create(set => ({
      filters: {
        page_id: '',
        page_url: '',
        // post_type: '',
        goal_id: '',
        referrer_url: '',
        device: '',
        browser: '',
        platform: '',
      },
      filtersConf: {
        page_id: {
          label: __('Page', 'burst-statistics'),
        },
        page_url: {
          label: __('Page URL', 'burst-statistics'),
        },
        goal_id: {
          label: __('Goal', 'burst-statistics'),
        },
        referrer_url: {
          label: __('Referrer URL', 'burst-statistics'),
        },
        device: {
          label: __('Device', 'burst-statistics'),
        },
        browser: {
          label: __('Browser', 'burst-statistics'),
        },
        platform: {
          label: __('Operating System', 'burst-statistics'),
        },
      },
      setFilters: (filter, value) => {
        // use zustand to produce a new state
        set(state => produce(state, draft => {
          draft.filters[filter] = value;
        }
        ));

      },
    }))
;
