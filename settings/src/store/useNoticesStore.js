import {create} from "zustand";
import * as burst_api from "../utils/api";
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
      if (notice.output.icon !== 'completed') {
        filteredNotices.push(notice);
      }
    });
    set(state => ({ filteredNotices:filteredNotices }))
  },
  getNotices: async () => {
    try {
      const { notices } = await burst_api.doAction('notices');
      set(state => ({
        notices: notices,
        loading: false
      }));
      get().filterNotices();
    } catch (error) {
      set(state => ({ error: error.message }))
    }
  },
  dismissNotice: async (noticeId) => {
    let notices = get().notices;
    notices = notices.filter(function (notice) {
      return notice.id !== noticeId;
    });
    set(state => ({ notices:notices }))

    await burst_api.doAction('dismiss_task', {id:noticeId}).then(( response ) => {
      // error handling
      response.error && console.error(response.error);
    });
  }
}));

export default useNotices;

