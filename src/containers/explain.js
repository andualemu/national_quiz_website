import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Well, Collapse } from 'react-bootstrap';

class Explain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className={this.props.stylingClass}>
        <Button className="explain-button" onClick={() => this.setState({ open: !this.state.open })}>
          <i className="arrow down" /><span>  Explanation</span>
        </Button>
        <Collapse in={this.state.open} appear>
          <div>
            <Well>
              {this.props.explain}
            </Well>
          </div>
        </Collapse>
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
