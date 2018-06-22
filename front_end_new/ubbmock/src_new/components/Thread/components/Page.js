import React from 'react';
import Markdown from '../../utils/CustomMarkdown';

let copy;
// copy = require('../../utils/mockdata').mark;

class Page extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <Markdown>{copy || this.props.data}</Markdown>
    );
  }
}

export default Page;
