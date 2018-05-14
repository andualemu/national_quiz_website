/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import '../style.scss';

class ErrorDisplay extends React.Component {
  render() {
    const r = () => {
      console.log(this.props.match.params.errormessage);
    };
    return (
      <div>{this.props.match.params.errormessage}{r()}</div>

    );
  }
}

export default ErrorDisplay;
