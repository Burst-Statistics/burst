/**
 * Setup event listeners for goals.
 */

let viewportGoals = [];
const burst_goals_setup = () => {
  // loop through goals and remove any that don't match the current path or
  // don't have a path
  for (let i = 0; i < burst.goals.length; i++) {
    let goal = burst.goals[i];
    if (goal.url && (goal.url !== window.location.pathname && goal.url !== '*')) {
      burst.goals.splice(i, 1);
    }
  }
  // loop through all goals and setup event listeners
  for (let i = 0; i < burst.goals.length; i++) {
    let goal = burst.goals[i];
    switch (goal.type) {
      case 'views':
        burst_setup_viewport_tracker(goal);
        break;
      case 'clicks':
      default:
        burst_setup_click_tracker(goal);
        break;
    }
  }

  window.addEventListener('scroll', handle_viewport_goals, true);
};

/**
 * Check if any goals are in the viewport.
 */
const handle_viewport_goals = () => {
  viewportGoals.forEach((goalData, index) => {
    if (burst_is_element_in_viewport(goalData.element)) {
      burst_goal_triggered(goalData.goal);

      // Remove the goal from the viewportGoals array
      viewportGoals.splice(index, 1);
    }
  });
};

/**
 * Setup a viewport tracker for a goal.
 * @param goal
 */
const burst_setup_viewport_tracker = (goal) => {
  let selector = goal.setup.attribute === 'id' ? '#' : '.';
  let elements = document.querySelectorAll( selector + goal.setup.value);

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    // Check if already in viewport
    if (burst_is_element_in_viewport(element)) {
      burst_goal_triggered(goal);
      // remove from list of elements to monitor
    } else {
      // Add to our list of elements to monitor
      viewportGoals.push({element, goal});
    }
  }
};

/**
 * Recursive function to check all parents.
 * @param element
 * @return {boolean|boolean|*}
 */
const is_element_truly_visible = (element) => {
  if (!element) return true;

  const style = window.getComputedStyle(element);

  if (style.display === "none" || style.opacity === "0") {
    return false;
  }

  return is_element_truly_visible(element.parentElement);
};

/**
 * Check if an element is in the viewport.
 * @param element
 * @returns {boolean}
 */
const burst_is_element_in_viewport = (element) => {
  if (!is_element_truly_visible(element)) {
    return false;
  }

  let rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
};

/**
 * Function to check and trigger a goal when an element is in the viewport.
 * @param element
 * @param goal
 */
const burst_listener_view = (element, goal) => {
    if (burst_is_element_in_viewport(element)) {
      burst_goal_triggered(goal);
      // @todo event listener does not get removed
      window.removeEventListener('scroll',
          () => burst_listener_view(element, goal), true);
    }
}

/**
 * Setup a click tracker for a goal.
 * @param goal
 */
const burst_setup_click_tracker = (goal) => {
  let selector = goal.setup.attribute === 'id' ? '#' : '.';

  document.body.addEventListener('click', function(event) {
    if (event.target.matches(selector + goal.setup.value)) {
      burst_goal_triggered(goal);
    }
  });
};

/**
 * Trigger a goal and add to the completed goals array.
 * @param goal
 */
const burst_goal_triggered = (goal) => {
  // if burst_completed_goals does not contain goal.id, add it
  if (burst_completed_goals.indexOf(goal.ID) === -1) {
    burst_completed_goals.push(goal.ID);
    viewportGoals = viewportGoals.filter(goalData => goalData.goal.ID !== goal.ID);
  }
};

/**
 * Default export for goals.
 */
export default () => {
  burst_goals_setup();
};