import React, { Component } from 'react';
import Types from 'prop-types';
import './Dashboard.less';
import AttachementsList from '../AttachementsList';
import Collapsible from '../Collapsible';
import ReactGridLayout from 'react-grid-layout';
import DashboardWidget from '../DashboardWidget';
import sizeMe from 'react-sizeme';
import 'react-grid-layout/css/styles.css';
import demoData from './demo-data';

const propTypes = {
  rowHeight: Types.number,
  widgetMargin: Types.arrayOf(Types.number),
  children: Types.arrayOf(Types.node),
  cols: Types.object,
  breakpoints: Types.object
};
const defaultProps = {
  rowHeight: 48,
  widgetMargin: [12, 12], // please use even numbers. Ther is number round fault
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
    // this.handleWidthChange(this.props.size.width);

    // let nextLayout = this.generateLayout(this.state.layout);
    // this.setState({ layout: nextLayout });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.size.width !== nextProps.size.width) {
      this.handleWidthChange(nextProps.size.width);
    }
  }

  handleWidthChange(width) {
    this.setColumnsCount(width);
  }

  generateLayout(state) {
    let { initialWidgetsProps } = state;
    let layout = Object.keys(initialWidgetsProps).map(widgetId => {
      let collapsed = this.getWidgetProp(state, widgetId, 'collapsed');
      let h = collapsed ? 1 : this.getWidgetProp(state, widgetId, 'h');
      let minW = this.getWidgetProp(state, widgetId, 'minW');
      let maxW = this.getWidgetProp(state, widgetId, 'maxW');
      let minH = this.getWidgetProp(state, widgetId, 'minH');
      let maxH = this.getWidgetProp(state, widgetId, 'maxH');

      let nextWidgetLayout = {
        i: widgetId,
        h,
        w: this.getWidgetProp(state, widgetId, 'w'),
        x: this.getWidgetProp(state, widgetId, 'x') || 0,
        y: this.getWidgetProp(state, widgetId, 'y') || 0,
        minW: (typeof minW === 'undefined' || minW === null) ? undefined : minW,
        maxW: (typeof maxW === 'undefined' || minW === null) ? undefined : minW,
        minH: (typeof minH === 'undefined' || minW === null) ? undefined : minW,
        maxH: (typeof maxH === 'undefined' || minW === null) ? undefined : minW
      };

      return nextWidgetLayout;
    });

    return layout;
  }

  setColumnsCount(width) {

  }

  handleWidgetMount(options) {
    this.setState((prevState) => {
      let initialWidgetsProps = { ...prevState.initialWidgetsProps, [options.id]: options };
      let layout = this.generateLayout({ ...prevState, initialWidgetsProps });

      return ({
        ...prevState,
        initialWidgetsProps,
        layout
      });
    });
  }

  setWidgetProp(state, widgetId, propKey, propValue) {
    let widgetProps = state.modifiedWidgetsProps[widgetId] || {};
    let modifiedWidgetsProps = {
      ...state.modifiedWidgetsProps,
      [widgetId]: {
        ...widgetProps,
        [propKey]: propValue
      }
    };

    let nextState = ({
      ...state,
      modifiedWidgetsProps
    });

    let layout = this.generateLayout(nextState);

    return ({ ...nextState, layout });
  }

  getWidgetProp(state, widgetId, propKey) {
    let { initialWidgetsProps, modifiedWidgetsProps, layout } = state;

    if (typeof initialWidgetsProps[widgetId] === 'undefined') {
      return;
    }

    let propModified = (
      modifiedWidgetsProps[widgetId] &&
      typeof modifiedWidgetsProps[widgetId][propKey] !== 'undefined'
    );

    let propValue =  propModified ?
      modifiedWidgetsProps[widgetId][propKey] :
      initialWidgetsProps[widgetId][propKey];

    return propValue;
  }

  getWidgetProps(state, widgetId) {
    let { initialWidgetsProps, modifiedWidgetsProps } = state;

    if(!Object.keys(initialWidgetsProps).length) {
      return ({ });
    }

    let widgetProps = Object.keys(initialWidgetsProps[widgetId]).reduce((propsAccum, propKey) => {
      let propValue = this.getWidgetProp(state, widgetId, propKey);
      return { ...propsAccum, [propKey]: propValue };
    }, {});

    return widgetProps;
  }

  handleResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    let state = this.state;
    let collapsed = !!(newItem.h <= 1);

    state = this.setWidgetProp(state, newItem.i, 'collapsed', collapsed);
    state = this.setWidgetProp(state, newItem.i, 'w', newItem.w);

    if(!collapsed) {
      state = this.setWidgetProp(state, newItem.i, 'h', newItem.h);
    }

    this.setState(state);
  }

  handleDragStop(layout, oldItem, newItem, placeholder, e, element) {
    let state = this.state;

    state = this.setWidgetProp(state, newItem.i, 'x', newItem.x);
    state = this.setWidgetProp(state, newItem.i, 'y', newItem.y);


    this.setState(state);
  }

  handleLayoutChange(layout) {
    // this.setState({ layout: this.generateLayout({ ...this.state, layout }) });
  }

  handleWidgetCollapse(widgetId) {
    let state = this.state;
    let collapsed = this.getWidgetProp(state, widgetId, 'collapsed');

    state = this.setWidgetProp(state, widgetId, 'collapsed', !collapsed);
    this.setState(state);
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

    let wrappedWidgets = children.map((widget, i) => {
      let mergedProps = initialWidgetsProps[widget.props.id] ? this.getWidgetProps(this.state, widget.props.id) : widget.props;
      let h = this.getWidgetProp(this.state, widget.props.id, 'h');
      let maxHeight = `${h * (rowHeight + widgetMargin[1]) - widgetMargin[1]}px`;

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
              style: { maxHeight },

              onMount: this.handleWidgetMount.bind(this),
              onCollapse: this.handleWidgetCollapse.bind(this)
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
          rowHeight={rowHeight}
          cols={12}
          autosize={false}
          width={size.width}
          onLayoutChange={this.handleLayoutChange.bind(this)}
          onResizeStop={this.handleResizeStop.bind(this)}
          onDragStop={this.handleDragStop.bind(this)}
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
