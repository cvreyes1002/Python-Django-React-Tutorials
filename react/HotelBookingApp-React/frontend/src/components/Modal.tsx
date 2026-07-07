// import './Modal.css'; // We will define the styles below

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Prevent clicks inside the modal from closing it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 flex justify-center items-center z-[1000]" onClick={handleOverlayClick}>
      <div className="bg-white p-10 rounded-lg relative max-w-[400px] w-[90%] shadow-[0_4px_15px_rgba(0,0,0,0.2)] animate-fade-in">
        <button className="absolute top-2.5 right-[15px] bg-transparent border-none text-2xl cursor-pointer" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;