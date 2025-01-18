// components/Alert.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  // Default configuration for toasts
  const defaultConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light', // Options: 'light', 'dark', 'colored'
  };

  // Function to show success toast
  const showSuccess = (message, options = {}) => {
    toast.success(message, { ...defaultConfig, ...options });
  };

  // Function to show error toast
  const showError = (message, options = {}) => {
    toast.error(message, { ...defaultConfig, ...options });
  };

  // Function to show info toast
  const showInfo = (message, options = {}) => {
    toast.info(message, { ...defaultConfig, ...options });
  };

  // Function to show warning toast
  const showWarning = (message, options = {}) => {
    toast.warn(message, { ...defaultConfig, ...options });
  };

  // Function to show custom toast
  const showCustom = (message, options = {}) => {
    toast(message, { ...defaultConfig, ...options });
  };

  // Expose methods globally
  return (
    <>
      <ToastContainer />
      {/** Exportable toast functions **/}
      {Object.assign(Alert, {
        success: showSuccess,
        error: showError,
        info: showInfo,
        warning: showWarning,
        custom: showCustom,
      })}
    </>
  );
};

export default Alert;
