import React from "react";
import { useSnackbar, SnackbarKey, OptionsObject, SnackbarMessage } from "notistack";
import { IconButton } from "@mui/material";


const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const close = () => {
    closeSnackbar();
  };

  const action = (key:SnackbarKey) => (
    <IconButton onClick={() => closeSnackbar(key)} color="inherit">
      <img src="/assets/Icons/CrossWhite.svg" style={{width:"12px",height:"12px"}}/>
    </IconButton>
  );

  const show = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbar(message, { ...options, variant: "default", action });
  };

  const showSuccessAlert = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbar(message, { ...options, variant: "success", action });
  };

  const info = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbar(message, { ...options, variant: "info", action });
  };

  const warning = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbar(message, { ...options, variant: "warning", action });
  };

  const showErrorAlert = (message: SnackbarMessage, options: OptionsObject = {}) => {
    return enqueueSnackbar(message, { ...options, variant: "error", action });
  };

  return { show, showSuccessAlert, info, warning, showErrorAlert, close };
};

export { useNotification };
