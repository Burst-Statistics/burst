import create from 'zustand';
import apiFetch from '@wordpress/api-fetch';

// define the store
export const useMenu = create(set => ({
  menu: [],
  fetchMenu: async () => {
    const menu = await apiFetch( { path: 'burst/v1/menu/get', method: 'GET' } );
    set(state => ({ menu }));
  },
  selectedMainMenuItem: 'dashboard',
  setSelectedMainMenuItem: (selectedMainMenuItem) => set(state => ({ selectedMainMenuItem })),
}));
