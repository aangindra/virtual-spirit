import React from "react";
import { motion } from "framer-motion";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};

const Loader = ({ visible }) => {
  return (
    visible && (
      <div className="absolute right-0 left-0 top-0 bottom-0 z-50 w-full flex items-center justify-center">
        <motion.div
          className="flex w-[10rem] h-[5rem] justify-around"
          variants={ContainerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            className="block w-[2rem] h-[2rem] bg-[#2979FF] rounded-full"
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            className="block w-[2rem] h-[2rem] bg-[#2979FF] rounded-full"
            variants={DotVariants}
            transition={DotTransition}
          />
          <motion.span
            className="block w-[2rem] h-[2rem] bg-[#2979FF] rounded-full"
            variants={DotVariants}
            transition={DotTransition}
          />
        </motion.div>
      </div>
    )
  );
};

export default Loader;
