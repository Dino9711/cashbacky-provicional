import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';

export const AddCashbackModal = ({ open, onClose, setReload, action = '' }) => {
  const initial_values = {
    transaction_code: '',
    amount: '',
    action: 'ADD',
    ticket_invoice: '',
  };

  const [values, setValues] = useState(initial_values);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = async () => {
    let _payload = {
      ...values,
      amount: parseFloat(values.amount),
      action: action,
      branch: JSON.parse(localStorage.getItem('user_data')).branch,
      user: JSON.parse(localStorage.getItem('user_data'))._id,
    };

    try {
      const response = await axios.post(
        `${URL_SERVER}transactions/transactions`,
        _payload,
      );

      if (response.data.ok) {
        toast.success('Cashback registrado correctamente');
        setReload((oldReload) => oldReload + 1);
        setValues(initial_values);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al registrar cashback');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          borderRadius: 3,
          width: '90vw',
        }}
      >
        <CardHeader title={`${action} Cashback`} />
        <Divider variant='middle' />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='Code'
                variant='outlined'
                fullWidth
                name='transaction_code'
                value={values.transaction_code}
                onChange={handleInputChange}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Amount'
                variant='outlined'
                fullWidth
                name='amount'
                type='number'
                value={values.amount}
                onChange={handleInputChange}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Ticket Invoice'
                variant='outlined'
                fullWidth
                required={action === 'ADD' ? true : false}
                name='ticket_invoice'
                type='number'
                value={values.ticket_invoice}
                onChange={handleInputChange}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider variant='middle' />
        <CardActions
          sx={{
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              borderRadius: 2,
            }}
            variant='contained'
            color='success'
            onClick={handleSave}
          >
            Guardar
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
