import React from 'react';
import { toast } from 'react-toastify';

const ComponentToastBody = ({ title, message }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{title}</span>
      {message && <span className="text-xs text-[#484E54]">{message}</span>}
    </div>
  );
};

export const toastError = ({ title, message }) => {
  return toast(<ComponentToastBody title={title} message={message} />, {
    type: 'error',
  });
};

export const toastWarning = ({ title, message }) => {
  return toast(<ComponentToastBody title={title} message={message} />, {
    type: 'warning',
  });
};

export const toastInfo = ({ title, message }) => {
  return toast(<ComponentToastBody title={title} message={message} />, {
    type: 'info',
  });
};

export const toastSuccess = ({ title, message }) => {
  return toast(<ComponentToastBody title={title} message={message} />, {
    type: 'success',
  });
};
