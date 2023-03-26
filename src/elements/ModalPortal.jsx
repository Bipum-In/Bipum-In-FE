import ReactDOM from 'react-dom';

export default function ModalPortal({ children }) {
  const el = document.getElementById('modal-root');

  return ReactDOM.createPortal(children, el);
}
