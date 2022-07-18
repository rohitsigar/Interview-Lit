import { toast } from 'react-toastify';

export const alert = (type, message) => {
  toast(message, {
    type: type
  });
};
