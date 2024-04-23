import { create } from 'zustand';
import * as burst_api from '../utils/api';
import {toast} from 'react-toastify';
import {__} from '@wordpress/i18n';

export const useSnippetStore = create( ( set ) => {
    const loadSnippet = async() => {
        try {
            const {timeme, burst} = await burst_api.doAction( 'get_snippet', {});
            set({timeme: timeme, burst: burst});
        } catch ( error ) {
            toast.error( __( 'Failed to load snippet', 'burst-statistics' ) );
        }
    };

    // Load goals on store creation
    loadSnippet();

    return {
        timeme: __( 'loading...', 'burst-statistics' ),
        burst: __( 'loading...', 'burst-statistics' ),
        loadSnippet
    };
});
