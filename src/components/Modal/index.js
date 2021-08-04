import React from 'react';

const Modal = ({ onClose, children, buttons }) => {
  let modalWrapper;

  setTimeout(() => {
    modalWrapper = document.getElementById('exampleModal');
    modalWrapper.classList.add('show');
  }, 500);

  const modalFade = () => {
    modalWrapper.classList.remove('show');
    setTimeout(() => onClose(), 500);
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" style={{display: 'block'}}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content p-0">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={modalFade}></button>
          </div>
          <div className="modal-body">
          {children}
          </div>
          <div className="modal-footer">
            {buttons}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={modalFade}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;