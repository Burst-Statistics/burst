import {Component, Fragment} from "@wordpress/element";
import Icon from "../utils/Icon";
import { __ } from '@wordpress/i18n';

/**
 * Render a help notice in the sidebar
 */
class Help extends Component {
    render(){
        let notice = this.props.help;
        if ( !notice.title ){
            notice.title = notice.text;
            notice.text = false;
        }
        let openStatus = this.props.noticesExpanded ? 'open' : '';
        let target = notice.url && notice.url.indexOf("really-simple-ssl.com") !==-1 ? "_blank" : '_self';
        return (
            <Fragment>
                { notice.title && notice.text &&
                    <details className={"burst-wizard-help-notice burst-" + notice.label.toLowerCase()} open={openStatus}>
                        <summary>{notice.title} <Icon name='chevron-down' /></summary>
                        {/*some notices contain html, like for the htaccess notices. A title is required for those options, otherwise the text becomes the title. */}
                        <div dangerouslySetInnerHTML={{__html:notice.text}}></div>
                        {notice.url && <div className="burst-help-more-info"><a target={target} href={notice.url}>{__("More info", "burst-statistics")}</a></div>}
                    </details>
                }
                { notice.title && !notice.text &&
                    <div className={"burst-wizard-help-notice  burst-" + notice.label.toLowerCase()}><p>{notice.title}</p></div>
                }
            </Fragment>

        );
    }
}

export default Help