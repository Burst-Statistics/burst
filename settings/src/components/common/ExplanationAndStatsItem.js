import Icon from '../../utils/Icon';

const ExplanationAndStatsItem = ({ iconKey, title, subtitle, value, change, changeStatus }) => {
  return (
      <div className="block__explanation-and-stats">
        <Icon name={iconKey} />
        <div className="block__explanation-and-stats__left">
          <h3 className="burst-h5">{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="block__explanation-and-stats__right">
          <span className="burst-h4">{value}</span>
          <p className={'uplift ' + changeStatus}>{change}</p>
        </div>
      </div>
  );
};

export default ExplanationAndStatsItem;
