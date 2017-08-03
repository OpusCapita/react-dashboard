import React, { Component } from 'react';
import Types from 'prop-types';
import './Dashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';
import { Responsive as ReactGridLayout } from 'react-grid-layout';
import DashboardWidget from '../DashboardWidget';
import sizeMe from 'react-sizeme';
import 'react-grid-layout/css/styles.css';
import demoData from './demo-data';

const propTypes = {
  rowHeight: Types.number,
  widgetMargin: Types.arrayOf([
    Types.number,
    Types.number
  ]),
  children: Types.arrayOf(Types.node),
  cols: Types.object,
  breakpoints: Types.object
};
const defaultProps = {
  rowHeight: 52,
  widgetMarigin: [15, 15],
  children: [],
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 992, sm: 768, xs: 576, xxs: 0 }
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

  componentDidMount() {
    this.handleWidthChange(this.props.size.width);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.size.width !== nextProps.size.width) {
      this.handleWidthChange(nextProps.size.width);
    }
  }

  handleWidthChange(width) {
    console.log(width);
    this.setColumnsCount(width);
  }

  generateLayout() {

  }

  setColumnsCount(width) {
    console.log(width);
  }

  handleWidgetMount(options) {
    this.setState((prevState) => {
      let initialWidgetsProps = { ...prevState.initialWidgetsProps, [options.id]: options };
      return { initialWidgetsProps };
    });
  }

  setWidgetProp(widgetId, propKey, propValue) {
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

  getWidgetProp(widgetId, propKey) {
    let { initialWidgetsProps, modifiedWidgetsProps } = this.state;

    let propModified = (
      modifiedWidgetsProps[widgetId] &&
      typeof modifiedWidgetsProps[widgetId][propKey] !== 'undefined'
    );

    let propValue =  propModified ?
      modifiedWidgetsProps[widgetId][propKey] :
      initialWidgetsProps[widgetId][propKey];

    return propValue;
  }

  getWidgetProps(widgetId) {
    let { initialWidgetsProps, modifiedWidgetsProps } = this.state;

    let widgetProps = Object.keys(initialWidgetsProps[widgetId]).reduce((propsAccum, propKey) => {
      let propValue = this.getWidgetProp(widgetId, propKey);
      return { ...propsAccum, [propKey]: propValue };
    }, {});

    return widgetProps;
  }

  render() {
    let {
      children,
      cols,
      rowHeight,
      size,
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
              onCollapse: this.setWidgetProp.bind(this)
            }
          }}
        </div>
      );
    });

    return (
      <div className={`oc-dashboard`}>
        <ReactGridLayout
          isDraggable={true}
          isResizable={true}
          layout={layout}
          margin={widgetMargin}
          rowHeight={52}
          cols={cols}
          autosize={false}
          width={size.width}
        >
          {wrappedWidgets}
        </ReactGridLayout>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default sizeMe({ monitorWidth: true, refreshRate: 128 })(Dashboard);
