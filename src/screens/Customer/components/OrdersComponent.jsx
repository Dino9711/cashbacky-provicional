import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import React from 'react';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';

export const OrdersComponent = ({ data = null }) => {
  return (
    <>
      {data !== null && (
        <Card
          sx={{
            borderRadius: 3,
            width: '95vw',
            height: 'auto',
            backgroundColor: 'rgba(189,181,218,1)',
            border: '2px solid rgba(255, 255, 255, 0.125)',
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
            boxShadow: 'none',
            margin: '10px',
          }}
          elevation={0}
        >
          <CardHeader
            title={moment(data.created_at).format('DD/MM/YYYY HH:MM:ss')}
            subheader={`${data.branch.name}`}
          />
          <Box
            sx={{
              padding: 2,
              paddingBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant='outlined'
              color={
                data.status === 'pending'
                  ? 'primary'
                  : data.status === 'canceled'
                  ? 'error'
                  : 'secondary'
              }
              disableElevation
              sx={{
                fontFamily: 'Futura',
                borderRadius: 2,
              }}
            >
              {`Estado de pago: ${data.status}`}
            </Button>
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {`${NumberToCurrency(data.payment)}`}
            </Typography>
          </Box>
          <Divider variant='middle' />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              color={
                data.transaction_status === 'pending'
                  ? 'primary'
                  : data.transaction_status === 'canceled'
                  ? 'error'
                  : 'secondary'
              }
              disableElevation
              sx={{
                fontFamily: 'Futura',
                borderRadius: 2,
              }}
            >
              {data.transaction_status}
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
