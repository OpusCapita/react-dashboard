import React, { PureComponent, Children } from 'react';
import Types from 'prop-types';
import isEqual from 'lodash/isEqual';
import './Dashboard.less';
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import 'react-grid-layout/css/styles.css';

const isDef = v => v !== undefined && v !== null;

// does the same thing as this.getWidgetProp but takes into account outer props.layout
const getProp = ({ state, props, widgetId, propName, defaultValue }) => {
  const customProps = props.layout.find(widget => widget.i === widgetId) || {};
  const initialProps = state.initialWidgetsProps[widgetId];
  const modifiedProps = state.modifiedWidgetsProps[widgetId] || {};

  return isDef(modifiedProps[propName]) ? modifiedProps[propName] :
    isDef(customProps[propName]) ? customProps[propName] :
    initialProps[propName] || defaultValue;
}

const breakpointNames = ['lg', 'md', 'sm', 'xs', 'xxs'];

const propTypes = {
  rowHeight: Types.number,
  widgetMargin: Types.arrayOf(Types.number),
  children: Types.arrayOf(Types.node),
  breakpoints: Types.object,
  draggableHandle: Types.string,
  layout: Types.arrayOf(Types.shape({
    i: Types.string,
    h: Types.number,
    w: Types.number,
    x: Types.number,
    y: Types.number
  })),
  size: Types.shape({
    width: Types.number,
    height: Types.number,
    position: Types.number
  }),
  breakpoint: Types.oneOf(breakpointNames),
  cols: Types.shape(Object.keys(breakpointNames).reduce((a, c) => ({ ...a, [c]: Types.number }), {})),
  onChangeLayout: Types.func
};
const defaultProps = {
  rowHeight: 48,
  widgetMargin: [12, 12], // please use even numbers. There is number round fault
  children: [],
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 992, sm: 768, xs: 576, xxs: 0 },
  draggableHandle: 'oc-dashboard__draggable-handle',
  breakpoint: 'sm',
  onChangeLayout: _ => {}
};

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allWidgetsMounted: false,
      widgetPositionsInited: false,
      layout: [],
      initialWidgetsProps: {},
      modifiedWidgetsProps: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.layout, this.props.layout)) {
      this.setState({ layout: this.generateLayout(this.state, nextProps) })
    }
  }

  onChangeLayout = layout => (this.state.allWidgetsMounted && !isEqual(layout, this.state.layout)) &&
    this.props.onChangeLayout(layout);

  getBreakpointKey(width, cols, breakpoints) {
    let breakpointKey = Object.keys(breakpoints).reduce((prevCandidateKey, candidateKey) => {
      let prevCandidateWidth = breakpoints[prevCandidateKey];
      return width >= prevCandidateWidth ? prevCandidateKey : candidateKey;
    }, 'lg');

    return breakpointKey;
  }

  generateLayout(state, props = this.props) {
    const { initialWidgetsProps } = state;
    const layout = Object.keys(initialWidgetsProps).map(widgetId => {
      const collapsed = this.getWidgetProp(state, widgetId, 'collapsed');

      const h = collapsed ? 1 : getProp({
        state,
        props,
        widgetId,
        propName: 'h',
        defaultValue: 4
      });

      const minW = this.getWidgetProp(state, widgetId, 'minW');
      const maxW = this.getWidgetProp(state, widgetId, 'maxW');
      const minH = this.getWidgetProp(state, widgetId, 'minH');
      const maxH = this.getWidgetProp(state, widgetId, 'maxH');

      const { x, y, w } = ['x', 'y', 'w'].reduce((acc, key) => ({
        ...acc,
        [key]: getProp({
          state,
          props,
          widgetId,
          propName: key,
          defaultValue: 0
        })
      }), {})

      const nextWidgetLayout = {
        i: widgetId,
        h,
        w,
        x,
        y,
        ...(isDef(minW) && { minW }),
        ...(isDef(maxW) && { maxW }),
        ...(isDef(minH) && { minH }),
        ...(isDef(maxH) && { maxH })
      };

      return nextWidgetLayout;
    });

    return layout;
  }

  handleWidgetMount(options) {
    let { children } = this.props;

    this.setState((prevState) => {
      let initialWidgetsProps = { ...prevState.initialWidgetsProps, [options.id]: options };
      let layout = this.generateLayout({ ...prevState, initialWidgetsProps });

      let state = {
        ...prevState,
        initialWidgetsProps,
        layout
      };

      state.allWidgetsMounted = Children.toArray(children).every(child => {
        return Object.keys(state.initialWidgetsProps).indexOf(child.props.id) !== -1;
      });

      return state;
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
    let { initialWidgetsProps, modifiedWidgetsProps } = state;

    if (typeof initialWidgetsProps[widgetId] === 'undefined') {
      return;
    }

    let propModified = (
      modifiedWidgetsProps[widgetId] &&
      typeof modifiedWidgetsProps[widgetId][propKey] !== 'undefined'
    );

    let propValue = propModified ?
      modifiedWidgetsProps[widgetId][propKey] :
      initialWidgetsProps[widgetId][propKey];

    return propValue;
  }

  getWidgetProps(state, widgetId) {
    let { initialWidgetsProps } = state;

    if (!Object.keys(initialWidgetsProps).length) {
      return ({ });
    }

    let widgetProps = Object.keys(initialWidgetsProps[widgetId]).reduce((propsAccum, propKey) => {
      let propValue = this.getWidgetProp(state, widgetId, propKey);
      return { ...propsAccum, [propKey]: propValue };
    }, {});

    return widgetProps;
  }

  handleResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    let collapsed = !!(newItem.h <= 1);

    let state = layout.reduce((accumState, widget) => {
      accumState = this.setWidgetProp(accumState, widget.i, 'x', widget.x);
      accumState = this.setWidgetProp(accumState, widget.i, 'y', widget.y);
      return accumState;
    }, this.state);

    state = this.setWidgetProp(state, newItem.i, 'collapsed', collapsed);
    state = this.setWidgetProp(state, newItem.i, 'w', newItem.w);

    if (!collapsed) {
      state = this.setWidgetProp(state, newItem.i, 'h', newItem.h);
    }

    this.onChangeLayout(state.layout);

    this.setState(state);
  }

  handleDragStop(layout, oldItem, newItem, placeholder, e, element) {
    let state = layout.reduce((accumState, widget) => {
      accumState = this.setWidgetProp(accumState, widget.i, 'x', widget.x);
      accumState = this.setWidgetProp(accumState, widget.i, 'y', widget.y);
      return accumState;
    }, this.state);

    this.onChangeLayout(state.layout);

    this.setState(state);
  }

  handleLayoutChange(layout) {
    let { allWidgetsMounted, widgetPositionsInited } = this.state;

    if (allWidgetsMounted && !widgetPositionsInited) {
      let state = layout.reduce((accumState, widget) => {
        accumState = this.setWidgetProp(accumState, widget.i, 'x', widget.x);
        accumState = this.setWidgetProp(accumState, widget.i, 'y', widget.y);
        return accumState;
      }, this.state);

      this.onChangeLayout(state.layout);

      this.setState({ ...state, widgetPositionsInited: true });
    }
  }

  handleWidgetCollapse(widgetId) {
    const collapsed = this.getWidgetProp(this.state, widgetId, 'collapsed');

    const state = this.setWidgetProp(this.state, widgetId, 'collapsed', !collapsed);

    this.onChangeLayout(state.layout);

    this.setState(state);
  }

  render() {
    let {
      children,
      cols,
      rowHeight,
      size,
      widgetMargin,
      draggableHandle,
      breakpoints,
      breakpoint
    } = this.props;

    let {
      layout,
      initialWidgetsProps,
    } = this.state;

    let wrappedWidgets = Children.toArray(children).map((widget, i) => {
      let mergedProps = initialWidgetsProps[widget.props.id] ?
        this.getWidgetProps(this.state, widget.props.id) :
        widget.props;
      let h = getProp({
        state: this.state,
        props: this.props,
        widgetId: widget.props.id,
        propName: 'h',
        defaultValue: 4
      });
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
              onCollapse: this.handleWidgetCollapse.bind(this),
              draggableHandle
            }
          }}
        </div>
      );
    });

    const defaultLayout = layout.map(({ w, x, ...rest }) => ({ w: 12, x: 0, ...rest }));

    const layouts = Object.keys(breakpoints).reduce((acc, bp) => ({
      ...acc,
      [bp]: breakpointNames.indexOf(bp) <= breakpointNames.indexOf(breakpoint) ? layout : defaultLayout
    }), {});

    return (
      <div className={`oc-dashboard`}>
        <ResponsiveReactGridLayout
          isDraggable={true}
          isResizable={true}
          draggableHandle={`.${draggableHandle}`}
          layouts={layouts}
          breakpoints={breakpoints}
          rowHeight={rowHeight}
          cols={cols}
          width={size.width}
          onLayoutChange={this.handleLayoutChange.bind(this)}
          onResizeStop={this.handleResizeStop.bind(this)}
          onDragStop={this.handleDragStop.bind(this)}
        >
          {wrappedWidgets}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default sizeMe({ monitorWidth: true, refreshRate: 128 })(Dashboard);
