import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastSetting = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function NotificationAlert(status, message) {
  if (status === "error") {
    return toast.error(message, { ...toastSetting, className: "toast-error" });
  } else if (status === "success") {
    return toast.success(message, { ...toastSetting, className: "toast-success" });
  } else if (status === "warning") {
    return toast.warning(message, { ...toastSetting, className: "toast-warning" });
  } else if (status === "info") {
    return toast.info(message, { ...toastSetting, className: "toast-info" });
  } else {
    return toast(message, toastSetting);
  }
}
