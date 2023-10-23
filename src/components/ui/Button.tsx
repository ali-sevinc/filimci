import { ReactNode } from "react";

import { motion } from "framer-motion";

interface PropsTypes {
  onClick?: () => void;
  children: ReactNode;
}
function Button({ onClick, children }: PropsTypes) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="min-w-[6rem] rounded-md bg-slate-100 px-2 py-1 text-slate-900 "
    >
      {children}
    </motion.button>
  );
}

export default Button;
