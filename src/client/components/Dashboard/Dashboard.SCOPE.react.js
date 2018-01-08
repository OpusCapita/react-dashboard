/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapita/react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
