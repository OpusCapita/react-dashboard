import React, { PureComponent } from 'react';
import Types from 'prop-types';
import SVGIcon from '@opuscapita/react-svg/lib/SVGIcon';
import './FileTypeIcon.less';

const propTypes = {
  fileType: Types.string
};
const defaultProps = {
  fileType: ''
};

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" focusable="false">
  <path stroke="#000" d="M12 4C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4H12zm14 14V7l11 11H26z"></path>
</svg>
`;

export default
class FileTypeIcon extends PureComponent {
  render() {
    return (
      <div className="file-type-icon">
        <SVGIcon svg={svg} color="#fff" />
      </div>
    );
  }
}

FileTypeIcon.propTypes = propTypes;
FileTypeIcon.defaultProps = defaultProps;
