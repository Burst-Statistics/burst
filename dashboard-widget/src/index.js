import {
    render
} from '@wordpress/element';
import DashboardWidget from "./components/DashboardWidget/DashboardWidget";
import '../../assets/css/variables.scss';

import {
    QueryClient,
    QueryCache,
    QueryClientProvider,
} from '@tanstack/react-query'

const HOUR_IN_SECONDS = 3600;
const queryCache = new QueryCache({
    onError: (error) => {
        // any error handling code...
    }
});
let config = {
    defaultOptions: {
        queries: {
            staleTime: HOUR_IN_SECONDS * 1000, // ms
            refetchOnWindowFocus: false,
            retry: false,
        },
    }
}
// merge queryCache with config
config = {...config, ...{queryCache}};

const queryClient = new QueryClient(config);
document.addEventListener( 'DOMContentLoaded', () => {
    const container = document.getElementById( 'burst-widget-root' );
    if ( container ) {
        render(
            <QueryClientProvider client={queryClient}>
                <DashboardWidget/>
            </QueryClientProvider>,
            container
        );
     }
});