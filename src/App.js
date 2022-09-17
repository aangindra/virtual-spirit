import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Home from "./Home";
import {
  NotificationProvider,
  NotificationContext,
} from "./components/Notification";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NotificationProvider>
      <motion.div
        animate={mounted ? "visible" : "invisible"}
        initial="invisible"
        variants={{
          invisible: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        transition={{ duration: 0.5, delay: 0 }}
        id="re-page-wrap"
      >
        <div className="bg-neutral-100 w-full min-h-screen">
          <Home />
        </div>
      </motion.div>
      <ToastContainer />
    </NotificationProvider>
  );
};

export default App;

export const useNotification = () => {
  return useContext(NotificationContext);
};
