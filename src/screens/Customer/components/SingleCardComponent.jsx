import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';
import { URL_SERVER } from '../../../helpers/ProviderUrl';

export const SingleCardComponent = ({ data = null }) => {
  const [openCodeModal, setOpenCodeModal] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const user_data = JSON.parse(sessionStorage.getItem('user_data'));

  const handleCloseModal = () => {
    setOpenCodeModal(false);
    setCurrentCode('');
  };

  const handleGetTransactionCode = async () => {
    try {
      const response = await axios.post(`${URL_SERVER}transaction_codes`, {
        customer: user_data._id,
      });

      if (response.data.ok) {
        setOpenCodeModal(true);
        setCurrentCode(response.data.data.code);
        toast.success('Código de transacción generado correctamente');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error al obtener código de transacción');
    }
  };

  return (
    <>
      {data !== null ? (
        <Card
          onClick={handleGetTransactionCode}
          sx={{
            borderRadius: 3,
            width: '80vw',
            height: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.125)',
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
            boxShadow: 'none',
            // border: 'solid 2px #48588c',
          }}
          elevation={0}
        >
          <CardHeader
            title={data.branch.name}
            subheader={`${user_data.name} ${user_data.lastnames}`}
          />
          <Box
            sx={{
              paddingTop: 2,
              paddingLeft: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {data.card_number}
            </Typography>
          </Box>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >{`${NumberToCurrency(data.points)}`}</Typography>
          </CardActions>
        </Card>
      ) : null}
      <Modal open={openCodeModal} onClose={handleCloseModal}>
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
          <CardHeader
            sx={{
              fontFamily: 'Futura',
            }}
            title='Código de transacción'
          />
          <Divider variant='middle' />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'auto',
              padding: 2,
            }}
          >
            <Typography variant='h6'>{currentCode}</Typography>
          </Box>
        </Card>
      </Modal>
    </>
  );
};
