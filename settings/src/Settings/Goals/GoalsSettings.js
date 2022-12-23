import {__} from '@wordpress/i18n';
import GoalSetup from './GoalSetup';
import {useState} from 'react';

const GoalsSettings = (props) => {
  const goal_fields = props.goal_fields;
  const goal_fields_data = {
    2: {
      id: 2,
      goal_title: 'Goal title',
      goal_type: 'clicks',
      goal_page_or_website: 'page',
      goal_url: 'henkie.com',
    },
    3: {
      id: 3,
      goal_title: 'Goal title twee',
      goal_type: 'Views',
      goal_page_or_website: 'website',
    }
  };

  // let selected = props.selectedGoal || goals[0].type;
  return (
      <>
        <div className="burst-burst-settings-goals">
          <div className="burst-settings-goals__introduction">
            {__('Goals are a great way to track your progress and keep you motivated. You can set goals for your daily, weekly, monthly and yearly targets.')}
          </div>
          <div className="burst-settings-goals__list">
            {Object.keys(goal_fields_data).map((goal_id, index) => {
              // map through goal fields
              return (<GoalSetup goal_id={goal_id} goal_data={goal_fields_data[goal_id]} goal_fields={goal_fields} />)
            })}
          </div>
        </div>
      </>
  );
}

export default GoalsSettings;