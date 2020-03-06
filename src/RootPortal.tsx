import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 * Portals to the root node (body).
 *
 */
const RootPortal = ({ children }: any) => {
  return ReactDOM.createPortal(<>{children}</>, document.body);
};

export default RootPortal;
