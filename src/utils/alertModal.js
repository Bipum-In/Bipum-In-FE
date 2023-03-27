import React from 'react';
import ReactDOM from 'react-dom/client';
import Alert from '../components/common/Alert';

let root = null;

export default function alertModal(message, timeToSecond) {
  const timeSet = timeToSecond * 1000 || 2500;
  const alertComponent = <Alert message={message} duration={timeSet} />;
  if (!root) {
    root = ReactDOM.createRoot(document.getElementById('modal-root'));
    root.render(alertComponent);

    const unmount = setTimeout(() => {
      root.unmount(root);
      root = null;
      clearTimeout(unmount);
    }, timeSet);
  }
}
