import GridItem from '../common/GridItem';
import {__} from '@wordpress/i18n';

const TipsTricksBlock = ( props ) => {
  const items = [
    {
      content: 'Hidden Features of the Insights Graph',
      link: 'https://burst-statistics.com/hidden-features-of-the-insights-graph/'
    },
    {
      content: 'What is Cookieless tracking?',
      link: 'https://burst-statistics.com/definition/what-is-cookieless-tracking/'
    },
    {
      content: 'Why is Burst Privacy-Friendly?',
      link: 'https://burst-statistics.com/why-is-burst-privacy-friendly/'
    },
    {
      content: 'How can I compare metrics?',
      link: 'https://burst-statistics.com/how-can-i-compare-metrics/'
    },
    {
      content: 'What is Bounce Rate?',
      link: 'https://burst-statistics.com/definition/what-is-bounce-rate/'
    },
    {
      content: 'How to set goals?',
      link: 'https://burst-statistics.com/how-to-set-goals/'
    }
  ];
  const src = '?src=plugin-burst-tips-tricks';

  return (
      <GridItem
          className={'burst-column-2'}
          title={__( 'Tips & Tricks', 'burst-statistics' )}
          footer={
            <a href="https://burst-statistics.com/docs/" target="_blank"
               className="burst-button burst-button--secondary" rel="noreferrer">
              {__( 'View all', 'burst-statistics' )}
            </a>
          }
      >
        <div className="burst-tips-tricks-container">
          {items.map( ( item, index ) => (
              <div key={index} className="burst-tips-tricks-element">
                <a href={item.link + src} target="_blank" rel="noopener noreferrer" title={item.content}>
                  <div className="burst-bullet medium" />
                  <div className="burst-tips-tricks-content">{item.content}</div>
                </a>
              </div>
          ) )}
        </div>
      </GridItem>
  );
};
export default TipsTricksBlock;
