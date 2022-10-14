import {
  Component,
} from '@wordpress/element';

class Placeholder extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    let lines = this.props.lines;
    if ( !lines ) lines = 4;
    return (
        <div className="burst-placeholder">
          {Array.from({length: lines}).map((item, i) => (<div className="burst-placeholder-line" key={i} ></div>))}
        </div>
    );
  }
}

export default Placeholder;