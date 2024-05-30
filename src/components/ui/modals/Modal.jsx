import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../../../hooks/use-outsideclick';

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, close, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: opensWindow }) => {
  const { setOpen } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setOpen(opensWindow) });
};

const Window = ({ children }) => {
  const { open, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (!open) return null;
  return createPortal(
    <div className="animate-fade fixed left-0 top-0 z-[100] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-[4px]">
      <div
        ref={ref}
        className="animate-slide-top relative z-[101] rounded-md bg-white px-[2.2rem] py-[2rem]"
      >
        <button
          onClick={close}
          className="absolute right-2 top-2 rounded-md border-none bg-none p-[.2rem] hover:bg-gray-100"
        >
          <HiXMark size={18} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
