import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar
      newestOnTop 
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const showNotification = (message, type) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default Notification;
