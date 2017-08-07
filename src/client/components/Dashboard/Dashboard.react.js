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

    // let nextLayout = this.generateLayout(this.state);
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
      let nextWidgetLayout = {
        i: widgetId,
        h,
        w: this.getWidgetProp(state, widgetId, 'w'),
        x: this.getWidgetProp(state, widgetId, 'x') || 0,
        y: this.getWidgetProp(state, widgetId, 'y') || 0,
        minW: this.getWidgetProp(state, widgetId, 'minW'),
        maxW: this.getWidgetProp(state, widgetId, 'maxW'),
        minH: this.getWidgetProp(state, widgetId, 'minH'),
        maxH: this.getWidgetProp(state, widgetId, 'maxH')
      };
      console.log('lehhl', nextWidgetLayout);
      return nextWidgetLayout;
    });

    return layout;
  }

  setColumnsCount(width) {

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

    let nextState = ({
      ...this.state,
      modifiedWidgetsProps
    });

    let layout = this.generateLayout(nextState);

    this.setState({ ...nextState, layout });
  }

  getWidgetProp(state, widgetId, propKey) {
    let { initialWidgetsProps, modifiedWidgetsProps, layout } = state;

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
    // let newLayout = this.generateLayout();
    // this.setState({ layout: newLayout });
  }

  handleDragStop(layout, oldItem, newItem, placeholder, e, element) {
    // let newLayout = this.generateLayout();
    // this.setState(prevState => ({ layout: newLayout }));
  }

  handleLayoutChange(layout) {
    this.setState({ layout });
  }

  handleWidgetCollapse(widgetId) {
    let widgetCollapsed = this.getWidgetProp(this.state, widgetId, 'collapsed');
    this.setWidgetProp(widgetId, 'collapsed', !widgetCollapsed);
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
      let layoutItem = layout.filter(layoutItem => layoutItem.i === widget.props.id)[0];
      let maxHeight = layoutItem ? `${layoutItem.h * (rowHeight + widgetMargin[1]) - widgetMargin[1]}px` : 'initial';

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
