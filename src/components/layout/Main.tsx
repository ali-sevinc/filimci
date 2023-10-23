import { ReactNode } from "react";

import { motion } from "framer-motion";

interface PropsType {
  children: ReactNode;
}
export default function Main({ children }: PropsType) {
  return (
    <motion.main
      variants={{
        hide: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 },
      }}
      initial="hide"
      animate="show"
      exit="hide"
      className="mx-auto mt-32 grid max-w-4xl flex-grow grid-cols-1 items-start  gap-10  overflow-x-hidden py-12 md:grid-cols-2"
    >
      {children}
    </motion.main>
  );
}
