import React, { Component, PropTypes } from 'react';
import './DemoDashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';

const propTypes = {};
const defaultProps = {};

export default
class DemoDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedWidgets: []
    };
  }

  handleWidgetToggle(widgetName) {
    let { collapsedWidgets } = this.state;
    let indexOfWidget = collapsedWidgets.indexOf(widgetName);

    if(indexOfWidget === -1) {
      let nextCollapsedWidgets = collapsedWidgets.concat([widgetName]);
      this.setState({ collapsedWidgets: nextCollapsedWidgets });
    } else {
      let nextCollapsedWidgets = [].
        concat(collapsedWidgets.slice(0, indexOfWidget)).
        concat(collapsedWidgets.slice(indexOfWidget + 1, collapsedWidgets.length));
      this.setState({ collapsedWidgets: nextCollapsedWidgets });
    }
  }

  render() {
    let {
      collapsedWidgets
    } = this.state;

    return (
      <div className="demo-dashboard">
        <Collapsible
          title="Attachements"
          collapsed={collapsedWidgets.indexOf('attachements') !== -1}
          onToggle={() => this.handleWidgetToggle('attachements')}
        >
          <AttachementsList
            attachements={[
              { type: 'pdf', title: 'Invoice image', 'href': 'https://goo.gl/9FgSPD' },
              { title: 'Some attachement 1', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'pdf', title: 'Some attachement 2', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'pdf', title: 'Broken attachement' },
              { title: 'Some attachement 3', 'href': 'https://goo.gl/9FgSPD' },
              { title: 'Some attachement 4', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'png', title: 'Some attachement 5', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'pdf', title: 'Invoice image', 'href': 'https://goo.gl/9FgSPD' },
              { title: 'Some attachement 1', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'pdf', title: 'Some attachement 2', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'pdf', title: 'Broken attachement' },
              { title: 'Some attachement 3', 'href': 'https://goo.gl/9FgSPD' },
              { title: 'Some attachement 4', 'href': 'https://goo.gl/9FgSPD' },
              { type: 'png', title: 'Some attachement 5', 'href': 'https://goo.gl/9FgSPD' }
            ]}
          />
        </Collapsible>
      </div>
    );
  }
}

DemoDashboard.propTypes = propTypes;
DemoDashboard.defaultProps = defaultProps;
