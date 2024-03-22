interface IModalProps {
  isOpen: boolean,
  onClose: () => void,
  content: string;
}

const Modal = ({ isOpen, onClose, content }: IModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content}
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
