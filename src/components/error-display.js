/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import '../style.scss';

class ErrorDisplay extends React.Component {
  render() {
    return (
      <div>{this.props.err.errorMessage}</div>
    );
  }
}

export default ErrorDisplay;
