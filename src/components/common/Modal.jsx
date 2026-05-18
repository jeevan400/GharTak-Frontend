import React from 'react'

function Modal({children, onClose}) {

    const handleModalClose = ()=>{
        onClose(false);
    }
  return (
    <div
      onClick={handleModalClose}
      className="fixed h-screen w-[100%] top-0 left-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-[80%] h-[90%] bg-white rounded-xl"
      >
        {children}
      </div>
    </div>
  )
}

const ModalHeader = ({children, className}) => {
    return(
        <div className={`px-6 py-4 flex justify-between items-center border-b ${className}`}>
            {children}
        </div>
    )
}

const ModalBody = ({children, className}) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}
const ModalFooter = ({children, className}) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
