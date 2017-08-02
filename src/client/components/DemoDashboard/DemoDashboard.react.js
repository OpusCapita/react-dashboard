import React, { Component, PropTypes } from 'react';
import './DemoDashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

const GridLayout = WidthProvider(ReactGridLayout);

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
      <div className={`oc-demo-dashboard`}>
        <GridLayout
          isDraggable={true}
          isResizable={false}
          layout={[]}
          rowHeight={300}
          cols={4}
          >
          <div key="1" className={`oc-demo-dashboard__widget`}>
            <Collapsible
              title="Attachements 1"
              collapsed={collapsedWidgets.indexOf('attachements-1') !== -1}
              onToggle={() => this.handleWidgetToggle('attachements-1')}
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

          <div key="2" className={`oc-demo-dashboard__widget`}>
            <Collapsible
              title="Attachements 2"
              collapsed={collapsedWidgets.indexOf('attachements-2') !== -1}
              onToggle={() => this.handleWidgetToggle('attachements-2')}
              className={`oc-demo-dashboard__widget`}
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

          <div key="3" className={`oc-demo-dashboard__widget`}>
            <Collapsible
              title="Attachements 3"
              collapsed={collapsedWidgets.indexOf('attachements-3') !== -1}
              onToggle={() => this.handleWidgetToggle('attachements-3')}
              className={`oc-demo-dashboard__widget`}
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

          <div key="4" className={`oc-demo-dashboard__widget`}>
            <Collapsible
              title="Attachements 4"
              collapsed={collapsedWidgets.indexOf('attachements-4') !== -1}
              onToggle={() => this.handleWidgetToggle('attachements-4')}
              className={`oc-demo-dashboard__widget`}
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
        </GridLayout>
      </div>
    );
  }
}

DemoDashboard.propTypes = propTypes;
DemoDashboard.defaultProps = defaultProps;
