import {create} from 'zustand';

// define the store
export const useAcquisitionStore = create((set, get) => ({
  type: 'referrers',
  setType: (type) => set(() => ({ type: type })),
}));