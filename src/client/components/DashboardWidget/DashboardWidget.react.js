import React, { Component, PropTypes } from 'react';
import './DashboardWidget.less';

const propTypes = {

};
const defaultProps = {

};

export default
class DashboardWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let {
      children
    } = this.props;

    return (
      <div className="oc-dashboard-widget">
      </div>
    );
  }
}

DashboardWidget.propTypes = propTypes;
DashboardWidget.defaultProps = defaultProps;
