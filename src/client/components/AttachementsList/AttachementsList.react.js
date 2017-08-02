import React, { Component } from 'react';
import Types from 'prop-types';
import './AttachementsList.less';

const propTypes = {
  attachements: Types.arrayOf(Types.shape({
    type: Types.string,
    title: Types.string,
    href: Types.string
  }))
};
const defaultProps = {
  attachements: []
};

export default
class AttachementsList extends Component {
  render() {
    let { attachements } = this.props;

    let attachementsElements = attachements.map((attachement, index) => (
      <li key={index} className="oc-attachements-list__item">
        <a
          className="oc-attachements-list__item-link"
          href={attachement.href || '#'}
          title={`Click to download "${attachement.title}"`}
        >
          {attachement.title}
        </a>
      </li>
    ));

    return (
      <div className="oc-attachements-list">
        <ul className="oc-attachements-list__list">
          {attachementsElements}
        </ul>
      </div>
    );
  }
}

AttachementsList.propTypes = propTypes;
AttachementsList.defaultProps = defaultProps;
