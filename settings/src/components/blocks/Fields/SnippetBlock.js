import {__} from '@wordpress/i18n';
import {toast} from 'react-toastify';
import CodeBlock from '../../common/CodeBlock';
import {useSnippetStore} from '../../../store/useSnippetStore';
import Icon from '../../../utils/Icon';
import {useEffect} from '@wordpress/element';

const SnippetBlock = ( fields ) => {

  const {timeme, burst} = useSnippetStore();

  useEffect( () => {

    // reload snippet in store
    useSnippetStore.getState().loadSnippet().then( r =>
      console.log( 'Snippet reloaded' )
    );
  }, [ fields ]);

  return (
      <>
        <details>
          <summary><span><h5>{__( 'Instructions for installing Burst on your website',
              'burst-statistics' )}</h5></span> <Icon name={'chevron-down'}
                                                     size={18}/></summary>
          <div className="burst-details-content">

            <p>
              {__(
                  'Place these two scripts on the website you would like to track. Both scripts are required for Burst to work correctly.',
                  'burst-statistics' )}
            </p>
            <br/>
            <p>
              <b>
                {__( 'Time on Page script', 'burst-statistics' )}
              </b>
            </p>
            <CodeBlock>{timeme}</CodeBlock>
            <p>
              {__(
                  'Paste it into the <head> section of your website\'s HTML, near the top after the opening <head> tag. This ensures accurate tracking of time spent on each page.',
                  'burst-statistics' )}
            </p>
            <br/>
            <p>
              <b>
                {__( 'Tracking script', 'burst-statistics' )}
              </b>
            </p>
            <CodeBlock>{burst}</CodeBlock>
            <p>
              {__( 'You have two options on where to paste this script.',
                  'burst-statistics' )}
              <ol>
                <li>
              {__( 'Paste it into the <head> section of your website\'s HTML, near the top after the opening <head> tag. This ensures accurate tracking of all users on your website.',
                  'burst-statistics' )}
                </li>
                <li>
              {__( 'Paste it into the <body> section of your website\'s HTML, near the bottom before the closing </body> tag. This could improve the performance of your website, but may result in less accurate tracking.',
                  'burst-statistics' )}
                </li>
              </ol>
            </p>
            <br />
            <p>
              {__( 'Now you are ready to start tracking your website visitors!', 'burst-statistics' )}
            </p>
          </div>
        </details>
      </>
  )
      ;
};

export default SnippetBlock;
