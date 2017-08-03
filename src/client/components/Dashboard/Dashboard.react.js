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
      initialWidgetsProps: {},
      modifiedWidgetsProps: {}
    };
  }

  generateLayout() {

  }

  handleWidgetMount(options) {
    this.setState((prevState) => {
      let initialWidgetsProps = { ...prevState.initialWidgetsProps, [options.id]: options };
      return { initialWidgetsProps };
    });
  }

  handleWidgetPropChange(widgetId, propKey, propValue) {
    let widgetProps = this.state.modifiedWidgetsProps[widgetId] || {};
    let modifiedWidgetsProps = {
      ...this.state.modifiedWidgetsProps,
      [widgetId]: {
        ...widgetProps,
        [propKey]: propValue
      }
    };

    this.setState({ modifiedWidgetsProps });
  }

  getWidgetProps(widgetId) {
    let {
      initialWidgetsProps,
      modifiedWidgetsProps
    } = this.state;

    let widgetProps = Object.keys(initialWidgetsProps[widgetId]).reduce((propsAccum, propKey) => {
      let propModified = (
        modifiedWidgetsProps[widgetId] &&
        typeof modifiedWidgetsProps[widgetId][propKey] !== 'undefined'
      );

      let propValue =  propModified ?
        modifiedWidgetsProps[widgetId][propKey] :
        initialWidgetsProps[widgetId][propKey];

      return { ...propsAccum, [propKey]: propValue };
    }, {});

    return widgetProps;
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
      initialWidgetsProps,
      modifiedWidgetsProps
    } = this.state;

    // console.log('init:', initialWidgetsProps);
    // console.log('mod:', modifiedWidgetsProps);

    let wrappedWidgets = children.map((widget, i) => {
      let mergedProps = initialWidgetsProps[widget.props.id] ? this.getWidgetProps(widget.props.id) : widget.props;

      return (
        <div
          key={widget.props.id}
          className="oc-dashboard__widget"
        >
          {{
            ...widget,
            props: {
              ...widget.props,
              ...mergedProps,
              onMount: this.handleWidgetMount.bind(this),
              onCollapse: this.handleWidgetPropChange.bind(this)
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
