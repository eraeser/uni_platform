/* eslint-disable react/display-name, import/no-dynamic-require */

import React from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';


const rules = {
  image: (node, children, parent, styles) => {
    let src = {uri:node.attributes.src};

    return (
      <Image
        key={getUniqueID()}
        style={StyleSheet.flatten([{
          flex: 0,
          width: 150,
          height: 150,
        }])}
        source={src}
      />
    )},
};

const CustomMarkdown = (props) => {
  console.log(props.children);
  return (
    <Markdown rules={rules}>{props.children ? props.children : '' }</Markdown>
  );
}

export default CustomMarkdown;
