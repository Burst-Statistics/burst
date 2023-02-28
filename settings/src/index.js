import React from 'react';
import {
    render,
} from '@wordpress/element';
import Page from './Page';

/**
 * Initialize
 */

document.addEventListener( 'DOMContentLoaded', () => {
	const container = document.getElementById( 'burst-statistics' );
	if ( container ) {
		render(
				<React.StrictMode>
					<div className="burst-wrapper">
						<Page />
					</div>
				</React.StrictMode>,
			container
		);
	}
}); 