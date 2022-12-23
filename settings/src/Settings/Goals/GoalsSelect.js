import {useState} from 'react';
import {__} from '@wordpress/i18n';
import Icon from '../../utils/Icon';

const GoalsSelect = (props) => {
  const {goals, selectedGoal, setSelectedGoal} = props;

  // List all goals as clickable items (use radio buttons)
  return (
    <div className="burst-setting-goals__select">
      <div className="burst-setting-goals__select__list">
        {Object.keys(goals).map((key) => {
          return (
              <>
                <input checked={selected === goals[key].type} type="radio" name={"burst-goals-select"} id={goals[key].type} value={goals[key].type} />
                <label for={goals[key].type} className="burst-setting-goals__select__list__item">
                  <Icon name={goals[key].type} size={18} />
                  <h5>
                    {goals[key].label}
                  </h5>
                  <div className={'burst-divider'} />
                  <p>
                    {goals[key].description}
                  </p>
                </label>
              </>
          );
        }
        )}
      </div>
    </div>
  );
}
export default GoalsSelect;