import { toast } from 'react-toastify';

export const EmitErrorToast = errors => {
  errors.map(err => toast.error(`Error:  ${err.message}`));
};

export const EmitUpdatedToast = ({ toastId, content }) => {
  toast.update(toastId, {
    type: toast.TYPE.INFO,
    autoClose: 5000,
    render: content
  });
};

export const EmitToastSuccess = content => {
  toast.success(content);
};
