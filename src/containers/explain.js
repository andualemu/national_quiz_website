import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Explain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className={this.props.stylingClass}>
        {this.props.explain}
      </div>
    );
  }
}

// connects particular parts of redux state to this component's props
const mapStateToProps = state => (
  {
  }
);

export default withRouter(connect(mapStateToProps, null)(Explain));
