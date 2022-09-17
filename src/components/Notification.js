import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationContext = createContext();

const DEFAULT_NOTIFICATION_STATE = {
  dismissTimeout: 3000,
  children: null,
  message: "",
  type: "success",
  show: false,
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

const useBaseNotification = () => {
  const [notificationState, setNotificationState] = useState(
    DEFAULT_NOTIFICATION_STATE
  );

  useEffect(() => {
    if (notificationState.show) {
      let timer = setTimeout(() => {
        setNotificationState((latestState) => ({
          ...latestState,
          show: false,
        }));
      }, notificationState.dismissTimeout || 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationState.show]);

  const showNotification = ({
    children,
    message,
    type,
    level,
    dismissTimeout,
  }) => {
    let timeout = 1;
    if (notificationState.show) {
      timeout = 150;
      setNotificationState({
        ...notificationState,
        show: false,
      });
    }

    setTimeout(() => {
      const newState = {
        ...notificationState,
        type: level || type || "success",
        children,
        message,
        show: true,
      };
      if (dismissTimeout && dismissTimeout > 0) {
        newState.dismissTimeout = dismissTimeout;
      }
      setNotificationState(newState);
    }, timeout);
  };

  const clearNotifications = (e) => {
    if (e) e.preventDefault();
    setNotificationState({
      ...notificationState,
      show: false,
    });
  };

  const handleError = (error) => {
    if (error.message) {
      if (error.message.indexOf("Network error") >= 0) {
        error.message = "Network error! Please try again later.";
      } else {
        error.message = error.message.replace("GraphQL error: ", "");
      }
    } else {
      error.message = "Unknown error! Please try again later.";
    }
    console.warn("Handling error:", error.message);
    showNotification({
      title: "Terdapat Error",
      message: error.message,
      type: error.type ? error.type : "danger",
    });
  };

  return {
    notificationState,
    showNotification,
    addNotification: showNotification,
    clearNotifications,
    handleError,
  };
};

export const NotificationProvider = ({ children }) => {
  const notification = useBaseNotification();

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <Notification
        {...notification.notificationState}
        onClose={notification.clearNotifications}
      />
    </NotificationContext.Provider>
  );
};

const Notification = ({ message, children, type, show, onClose }) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{
            type: "tween",
            default: { duration: 0.5 },
          }}
          className="z-50 w-full md:w-1/4 fixed bottom-0 right-0 mb-8 md:mr-8 px-8 md:px-0 overflow-y-auto"
        >
          {children || (
            <div
              onClick={onClose}
              className={
                "flex items-center w-full px-6 py-6 text-sm md:text-md rounded-md shadow-lg relative cursor-pointer " +
                (type === "success"
                  ? " text-white bg-emerald-500 hover:bg-emerald-600"
                  : type === "danger" || type === "error"
                  ? " text-white bg-red-600 hover:bg-red-700"
                  : type === "info"
                  ? " text-white bg-orange-600 hover:bg-orange-700"
                  : " text-white bg-primary-500 hover:bg-primary-600")
              }
            >
              {message}
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Notification;
