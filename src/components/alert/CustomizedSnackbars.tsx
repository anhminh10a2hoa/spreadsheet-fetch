import React, { useEffect, FC } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { IToastObject } from '@types';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ICustomizedSnackbarsProps {
  toastObj: IToastObject;
}

const CustomizedSnackbars: FC<ICustomizedSnackbarsProps> = ({ toastObj }) => {
  const [openS, setOpenS] = React.useState(false);

  React.useEffect(() => {
    if(toastObj.open && toastObj.type.length > 0 && toastObj.message.length) {
      setOpenS(true)
    }
  }, [toastObj])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenS(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openS} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastObj.type ? toastObj.type : "info"} sx={{ width: '100%' }}>
          {toastObj.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default CustomizedSnackbars;