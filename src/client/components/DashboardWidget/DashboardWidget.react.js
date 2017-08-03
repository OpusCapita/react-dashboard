import React, { Component } from 'react';
import Types from 'prop-types';
import './DashboardWidget.less';

const propTypes = {
  collapsible: Types.bool,
  collapsed: Types.bool,
  id: Types.string,
  resizable: Types.bool,
  w: Types.number,
  h: Types.number,
  maxW: Types.number,
  maxH: Types.number,
  minW: Types.number,
  minH: Types.number,
  onMount: Types.func,
  onUnmount: Types.func
};
const defaultProps = {
  collapsible: true,
  collapsed: false,
  resizable: false,
  id: (Math.random() / Math.random()).toString(),
  w: 3,
  h: 1,
  maxW: 2,
  maxH: 4,
  minW: 1,
  minH: 1,
  onMount: () => {},
  onUnmount: () => {}
};

export default
class DashboardWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    let options = {
      collapsible: this.props.collapsible,
      collapsed: this.props.collapsed,
      id: this.props.id,
      resizable: this.props.resizable,
      w: this.props.w,
      h: this.props.h,
      maxW: this.props.maxW,
      maxH: this.props.maxH,
      minW: this.props.minW,
      min: this.props.min
    };

    this.props.onMount(options);
  }

  render() {
    let {
      collapsible,
      collapsed,
      id,
      resizable,
      w,
      h,
      maxW,
      maxH,
      minW,
      minH
    } = this.props;

    return (
      <div
        className="oc-dashboard-widget"
      >
        {this.props.children}
      </div>
    );
  }
}

DashboardWidget.propTypes = propTypes;
DashboardWidget.defaultProps = defaultProps;
