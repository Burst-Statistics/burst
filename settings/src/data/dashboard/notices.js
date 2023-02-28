import create from "zustand";
import * as burst_api from "../../utils/api";
import {__} from '@wordpress/i18n';
const useNotices = create(( set, get ) => ({
  filter:'all',
  notices: [],
  filteredNotices: [],
  error: false,
  loading: true,
  setFilter: (filter) => {
    sessionStorage.burst_task_filter = filter;
    set(state => ({ filter }))
  },
  fetchFilter: () => {
    if ( typeof (Storage) !== "undefined" && sessionStorage.burst_task_filter  ) {
      let filter = sessionStorage.burst_task_filter;
      set(state => ({ filter:filter }))
    }
  },
  filterNotices: () => {
  let filteredNotices = [];
    // loop trough notices and remove the ones that are not open
    get().notices.map((notice, i) => {
      if (notice.output.icon === 'warning' || notice.output.icon === 'error' || notice.output.icon === 'open') {
        filteredNotices.push(notice);
      }
    });
    if (filteredNotices.length === 0) {
      filteredNotices[0] = {
        id: 'no-notices',
        output: {
          icon: 'completed',
          label: __('Completed', 'burst-statistics'),
          msg: __('No remaining task to show', 'burst-statistics'),

        }
      }
    }
    set(state => ({ filteredNotices:filteredNotices }))
  },
  getNotices: async () => {
    console.log('getNotices');
    const {error, notices} = await burst_api.runTest('notices').then( ( response ) => {
      return response;
    });
    if ( error ) {
      set(state => ({ error:error }))
    } else {
      set(state => ({
        notices:notices,
        loading: false
      }))
      // run function filteredNotices();
      get().filterNotices();
    }
  },
  dismissNotice: async (noticeId) => {
    let notices = get().notices;
    notices = notices.filter(function (notice) {
      return notice.id !== noticeId;
    });
    set(state => ({ notices:notices }))

    await burst_api.runTest('dismiss_task', noticeId).then(( response ) => {
      // error handling
      response.error && console.error(response.error);
    });
  }
}));

export default useNotices;

