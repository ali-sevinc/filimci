import { ReactNode } from "react";

import { motion } from "framer-motion";

interface PropsType {
  children: ReactNode;
  isError?: boolean;
}
function Message({ children, isError }: PropsType) {
  if (isError)
    return (
      <motion.p
        variants={{
          hide: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="px-5 pt-6 text-center text-2xl text-red-500"
      >
        {children}
      </motion.p>
    );
  return (
    <motion.p
      variants={{
        hide: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="px-5 pt-6 text-center text-2xl "
    >
      {children}
    </motion.p>
  );
}

export default Message;
