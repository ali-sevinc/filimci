import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { motion } from "framer-motion";

interface PropsType {
  children: ReactNode;
  onClose: () => void;
}
function Modal({ children, onClose }: PropsType) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed left-0 top-0 z-20 h-screen w-full  backdrop-blur-sm"
      />
      <motion.div
        variants={{
          hide: { opacity: 0, y: -50 },
          show: { opacity: 1, y: 0 },
        }}
        initial="hide"
        animate="show"
        exit="hide"
        className="fixed left-[calc(50%-11rem)] top-52 z-30 w-[22rem]  bg-slate-700 md:left-[calc(50%-22rem)] md:w-[44rem]"
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("modal-overlay")!,
  );
}

export default Modal;
