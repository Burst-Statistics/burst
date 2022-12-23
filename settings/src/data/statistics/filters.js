import create from 'zustand';

// define the store
export const UseFilter = create(set => ({
  pageId: '',
  setPageId: (pageId) => {
    if (pageId === 0) {
      pageId = '';
    }
    set(state => ({ pageId }))
  },
}));
