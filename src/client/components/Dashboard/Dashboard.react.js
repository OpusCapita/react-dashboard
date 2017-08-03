import React, { Component, PropTypes } from 'react';
import './Dashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import demoData from './demo-data';

const GridLayout = WidthProvider(ReactGridLayout);

const propTypes = {};
const defaultProps = {};
const layout = [
  { i: '1', x: 0, y: 0, h: 1, w: 1 },
  { i: '2', x: 3, y: 3, h: 1, w: 1 },
  { i: '3', x: 6, y: 6, h: 1, w: 1 },
  { i: '4', x: 9, y: 9, h: 1, w: 1 },
  { i: '5', x: 12, y: 12, h: 1, w: 1 },
];

export default
class Dashboard extends Component {
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
      <div className={`oc-dashboard`}>
        <GridLayout
          isDraggable={true}
          isResizable={false}
          layout={layout}
          margin={[15, 15]}
          rowHeight={44}
          cols={3}
        >
          <div key="1" className={`oc-dashboard__widget`}>
            <Collapsible
              title="Attachements 1"
              collapsed={collapsedWidgets.indexOf('attachements-1') !== -1}
              onCollapse={() => this.handleWidgetToggle('attachements-1')}
              >
              <AttachementsList
                attachements={demoData.attachements}
              />
            </Collapsible>
          </div>

          <div key="2" className={`oc-dashboard__widget`}>
            <Collapsible
              title="Attachements 2"
              collapsed={collapsedWidgets.indexOf('attachements-2') !== -1}
              onCollapse={() => this.handleWidgetToggle('attachements-2')}
              className={`oc-dashboard__widget`}
            >
              <AttachementsList
                attachements={demoData.attachements}
              />
            </Collapsible>
          </div>

          <div key="3" className={`oc-dashboard__widget`}>
            <Collapsible
              title="Attachements 3"
              collapsed={collapsedWidgets.indexOf('attachements-3') !== -1}
              onCollapse={() => this.handleWidgetToggle('attachements-3')}
              className={`oc-dashboard__widget`}
              >
              <AttachementsList
                attachements={demoData.attachements}
              />
            </Collapsible>
          </div>

          <div key="4" className={`oc-dashboard__widget`}>
            <Collapsible
              title="Attachements 4"
              collapsed={collapsedWidgets.indexOf('attachements-4') !== -1}
              onCollapse={() => this.handleWidgetToggle('attachements-4')}
              className={`oc-dashboard__widget`}
              >
              <AttachementsList
                attachements={demoData.attachements}
              />
            </Collapsible>
          </div>

          <div key="5" className={`oc-dashboard__widget`}>
            <Collapsible
              title="Attachements 5"
              collapsed={collapsedWidgets.indexOf('attachements-5') !== -1}
              onCollapse={() => this.handleWidgetToggle('attachements-5')}
              className={`oc-dashboard__widget`}
              >
              <AttachementsList
                attachements={demoData.attachements}
              />
            </Collapsible>
          </div>
        </GridLayout>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
