import React from 'react';
import ReactDOM from 'react-dom/client';
import Alert from 'components/common/Alert';

let root = null;

export default function alertModal(completeStyle, message, timeToSecond) {
  const timeSet = timeToSecond * 1000 || 2500;
  const alertComponent = (
    <Alert completeStyle={completeStyle} message={message} duration={timeSet} />
  );
  if (!root) {
    root = ReactDOM.createRoot(document.getElementById('alert-root'));
    root.render(alertComponent);

    const unmount = setTimeout(() => {
      root.unmount(root);
      root = null;
      clearTimeout(unmount);
    }, timeSet + 100);
  }
}

export function alertModalButton(completeStyle, message, callback) {
  const handleUnmountButton = () => {
    root.unmount(root);
    root = null;
    callback();
  };

  if (!root) {
    root = ReactDOM.createRoot(document.getElementById('alert-root'));
    root.render(
      <Alert
        completeStyle={completeStyle}
        message={message}
        onUnmountButton={handleUnmountButton}
      />
    );
  }
}
