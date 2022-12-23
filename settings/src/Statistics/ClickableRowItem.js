import {UseFilter} from '../data/statistics/filters';
import Icon from '../utils/Icon';

export const ClickableRowItem = (props) => {
  console.log('props', props);
  const {page, id} = props;
  const {setPageId} = UseFilter();

  const handleClick = (e) => {
    let id = e.target.attributes['data-page-id'].value;
    setPageId(parseInt(id));
  };

  return (
        <div className={"burst-clickable-row-item"} data-page-id={id} onClick={handleClick}>
          {page}
          <Icon name={'filter'} color={"black"} size={12}/>
        </div>
  );
}