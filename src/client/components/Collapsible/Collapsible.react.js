import React, { PureComponent } from 'react';
import Types from 'prop-types';
import './Collapsible.less';
import { Button } from '@opuscapita/react-buttons';
import { Motion, spring, presets } from 'react-motion';
import sizeMe from 'react-sizeme';

import showSVG from '!raw-loader!!../../../../external_modules/oc-common-ui-indicators/Plus.svg';
import hideSVG from '!raw-loader!!../../../../external_modules/oc-common-ui-indicators/Minus.svg';

const motionPreset = { stiffness: 140, damping: 20};

class CollapsibleChildren extends PureComponent {
  onSize(size) {
    this.props.onSize();
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
};

CollapsibleChildren = sizeMe({ monitorWidth: false, monitorHeight: true, refreshRate: 128 })(CollapsibleChildren);

const propTypes = {
  className: Types.string,
  collapsed: Types.bool,
  title: Types.string,
  onToggle: Types.func
};
const defaultProps = {
  className: '',
  collapsed: false,
  title: '',
  onToggle: () => {}
};

export default
class Collapsible extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      childHeight: 0
    };
  }

  handleChildHeightChange = (height) => {
    this.setState({ childHeight: height });
  }

  handleHeaderButtonClick = (e) => {
    this.props.onToggle(e);
  }

  render() {
    let {
      className,
      collapsed,
      title
    } = this.props;

    let { childHeight } = this.state;

    let childrenContent = (
      <Motion
        defaultStyle={{ x: collapsed ? 0 : null, y: collapsed ? 0 : 1 }}
        style={{
          x: collapsed ? spring(childHeight, motionPreset) : spring(0, motionPreset),
          y: collapsed ? spring(0, motionPreset) : spring(1, motionPreset)
        }}
      >
        {style => (
          <div
            className={`oc-collapsible__children`}
            style={{
              marginTop: `-${style.x === null ? '0' : style.x}px`,
              opacity: style.y
            }}
          >
            <CollapsibleChildren onSize={size => this.handleChildHeightChange(size.height)}>
              {this.props.children}
            </CollapsibleChildren>
          </div>
        )}
      </Motion>
    );

    let content = (
      <div className={`oc-collapsible ${className}`}>
        <div className={`oc-collapsible__header`}>
          <div className={`oc-collapsible__header-title-container`} title={title}>
            <h5 className={`oc-collapsible__header-title-text`}>{title}</h5>
          </div>
          <div className={`oc-collapsible__header-button`}>
            <Button svg={collapsed ? showSVG : hideSVG} onClick={this.handleHeaderButtonClick} />
          </div>
        </div>
        <div className={`oc-collapsible__children-container`}>
          {childrenContent}
        </div>
      </div>
    );

    return (
      content
    );
  }
}

Collapsible.propTypes = propTypes;
Collapsible.defaultProps = defaultProps;
