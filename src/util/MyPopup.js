import React from 'react';
import { Popup } from 'semantic-ui-react';

function MyPopup({ content, children }) {
  return <Popup inverted basic content={content} trigger={children} />;
}

export default MyPopup;
