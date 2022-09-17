import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = (props) => {
  const handleClickModalMask = (e) => {
    if (e) e.preventDefault();
    if (props.closeOnBackdrop && props.onClose) {
      props.onClose();
    }
  };

  const handleClickModalContent = (e) => {
    if (e) e.stopPropagation();
  };

  const handleEscapeKeydown = (e) => {
    if (e.keyCode == 27) {
      handleClickModalMask();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKeydown, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {props.visible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
            }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
            className={`${props.zIndex} modal-mask fixed top-0 left-0 bottom-0 right-0 h-screen w-screen block overflow-y-scroll bg-blur`}
            onClick={handleClickModalMask}
          ></motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {props.visible ? (
          <motion.div
            initial={{ opacity: 0, y: "-2%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "2%" }}
            transition={{
              duration: 0.15,
            }}
            className={`${props.zIndex} fixed top-0 left-0 bottom-0 right-0 h-screen w-screen block overflow-y-scroll bg-blur`}
            onClick={handleClickModalMask}
          >
            <div
              className={
                "mx-auto bg-white rounded-lg mt-24 md:mt-8 lg:mt-8 mb-8 overflow-hidden shadow-lg w-11/12 " +
                (!props.size
                  ? "sm:w-4/12"
                  : props.size === "sm"
                  ? "sm:w-3/12"
                  : props.size === "md"
                  ? "sm:w-5/12"
                  : props.size === "lg"
                  ? "sm:w-9/12"
                  : props.size === "xl"
                  ? "sm:w-10/12"
                  : "w-4/12")
              }
            >
              <div className="modal-content" onClick={handleClickModalContent}>
                {props.children}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Modal;

export const FormModal = ({
  visible,
  onClose,
  onSubmit,
  customTitle,
  title,
  children,
  size,
  submitLabel,
  closeLabel,
  onBack,
  onCustom,
  customButton,
  submitDisabled,
  pageLoading,
  hideSubmitButton,
  hideCloseButton,
  zIndex = "z-50",
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    size={size}
    closeOnBackdrop={true}
    zIndex={zIndex}
  >
    <WithForm onSubmit={onSubmit} className="relative">
      {customTitle ? (
        customTitle
      ) : title ? (
        <div className="modal-header flex text-md md:text-2xl font-bold py-5 px-6 border-b border-gray-300">
          <h4 style={{ margin: 0, padding: 0 }}>{title}</h4>
          {onClose ? (
            <a
              href="#"
              onClick={onClose}
              className="absolute top-0 right-0 mt-5 mr-6"
            >
              <i className="fa fa-times-circle text-2xl text-red-300 transition duration-300 hover:text-red-800"></i>
            </a>
          ) : null}
        </div>
      ) : null}
      <div className={"modal-body py-4 px-6"}>{children}</div>

      {onSubmit ? (
        <div className="modal-footer bg-gray-100 py-4 mt-4 px-4 md:px-6 flex justify-end text-right">
          <button
            onClick={onBack ? onBack : onClose}
            className="flex justify-center gap-1 items-center bg-rose-600 w-20 md:w-32 btn-flat mr-3 md:mr-5 rounded-lg text-white"
          >
            {closeLabel ? (
              closeLabel
            ) : (
              <>
                <IoCloseCircleOutline />
                <span>Cancel</span>
              </>
            )}
          </button>
          {!hideSubmitButton && onSubmit ? (
            <button
              disabled={pageLoading || submitDisabled}
              type="submit"
              className="btn bg-indigo-500 w-24 md:w-32 px-2 py-2 rounded-lg text-white"
            >
              {pageLoading ? (
                <span>Loading...</span>
              ) : submitLabel ? (
                submitLabel
              ) : (
                "Submit"
              )}
            </button>
          ) : null}
          {customButton}
        </div>
      ) : null}
    </WithForm>
  </Modal>
);

const WithForm = ({ onSubmit, children, ...props }) => {
  if (!onSubmit) return <div {...props}>{children}</div>;
  return (
    <form {...props} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
