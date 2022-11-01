import {
  Component,
  Fragment,
} from '@wordpress/element';

class PagePlaceholder extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    let plugin_url = burst_settings.plugin_url;
    return (
        <Fragment>
          <div className="burst-header-container">

            <div className="burst-header">
              <img className="burst-logo"
                   src={plugin_url + 'assets/img/burst-logo.svg'}
                   alt="Burst Statistics logo"/>
            </div>
          </div>
          <div className="burst-content-area burst-grid burst-dashboard burst-page-placeholder">
            <div className="burst-grid-item  burst-column-2 burst-row-2 "></div>
            <div className="burst-grid-item burst-row-2"></div>
            <div className="burst-grid-item burst-row-2"></div>
            <div className="burst-grid-item  burst-column-2"></div>
          </div>
        </Fragment>
    );
  }
}

export default PagePlaceholder;

