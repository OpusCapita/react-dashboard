import React, { Component } from 'react';
import Types from 'prop-types';
import './Dashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import DashboardWidget from '../DashboardWidget';
import sizeMe from 'react-sizeme';
import 'react-grid-layout/css/styles.css';
import demoData from './demo-data';

const GridLayout = WidthProvider(ReactGridLayout);

const propTypes = {
  cols: Types.number,
  rowHeight: Types.number,
  widgetMargin: Types.arrayOf([
    Types.number,
    Types.number
  ]),
  children: Types.arrayOf(Types.node)
};
const defaultProps = {
  cols: 6,
  rowHeight: 52,
  widgetMarigin: [15, 15],
  children: []
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedWidgets: [],
      layout: [],
      initialWidgetsOptions: {}
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

  generateLayout() {

  }

  handleWidgetMount(options) {
    this.setState((prevState) => {
      let initialWidgetsOptions = { ...prevState.initialWidgetsOptions, [options.id]: options };
      return { initialWidgetsOptions };
    });
  }

  handleWidgetCollapse(id) {
    console.log('collapse:', id);
  }

  render() {
    let {
      cols,
      children,
      rowHeight,
      widgetMargin
    } = this.props;

    let {
      collapsedWidgets,
      layout,
      initialWidgetsOptions
    } = this.state;

    console.log(initialWidgetsOptions);

    let wrappedWidgets = children.map((widget, i) => {
      return (
        <div
          key={widget.props.id}
          className="oc-dashboard__widget"
        >
          {{
            ...widget,
            props: {
              ...widget.props,
              onMount: this.handleWidgetMount.bind(this)
            }
          }}
        </div>
      );
    });

    return (
      <div className={`oc-dashboard`}>
        <GridLayout
          isDraggable={true}
          isResizable={false}
          layout={layout}
          margin={widgetMargin}
          rowHeight={52}
          cols={cols}
          autosize={false}
        >
          {wrappedWidgets}
        </GridLayout>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default sizeMe({ refreshRate: 128 })(Dashboard);
