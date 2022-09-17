import { toast } from "react-toastify";

export const handleError = (error) => {
  if (!error.message) {
    error.message = "Unknown error! Please try again later.";
  }
  console.warn("Handling error:", error.message);
  return toast.error(error.message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    newestOnTop: true,
  });
};
