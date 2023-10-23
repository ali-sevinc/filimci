import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      variants={{
        hide: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="flex items-center justify-center"
    >
      <div className="my-12 h-16 w-16 animate-spin rounded-full border-[0.6rem] border-b-slate-400 border-l-transparent border-r-slate-400 border-t-slate-400 bg-transparent " />
    </motion.div>
  );
}

export default Loader;
