/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapita/react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import Collapsible from '../Collapsible';
import DashboardWidget from '../DashboardWidget';
import AttachementsList from '../AttachementsList';
import demoData from './demo-data';

window.Collapsible = Collapsible;
window.DashboardWidget = DashboardWidget;
window.AttachementsList = AttachementsList;

@showroomScopeDecorator
export default
class DashboardScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoData
    };
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

DashboardScope.contextTypes = {
  i18n: PropTypes.object
};
DashboardScope.childContextTypes = {
  i18n: PropTypes.object
};
