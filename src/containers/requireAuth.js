import React from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/signin');
      }
    }
    componentDidMount(nextProps) {
      if (!this.props.auth) {
        this.props.history.push('/signin');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  // connects particular parts of redux state to this component's props
  const mapStateToProps = state => (
    {
      auth: state.auth.authenticated,
    }
  );
  return connect(mapStateToProps, null)(RequireAuth);
}
// export default withRouter(connect(mapStateToProps, null)(RequireAuth));
