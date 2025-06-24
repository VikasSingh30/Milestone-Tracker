import { toast } from 'react-toastify';

export const showToast = {
  success: (message) => toast.success(message, {
    className: 'bg-green-500 text-white',
  }),
  error: (message) => toast.error(message, {
    className: 'bg-red-500 text-white',
  }),
  info: (message) => toast.info(message, {
    className: 'bg-blue-500 text-white',
  }),
};