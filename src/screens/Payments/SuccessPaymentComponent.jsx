import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import successPayment from '../../assets/payment-success.png';

export const SuccessPaymentComponent = () => {
  const handleNavigate = () => {
    window.location.href = '/';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '100%',
      }}
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={0}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            height: '300px',
          }}
        >
          <CardMedia
            component='img'
            image={successPayment}
            alt='Success Payment'
          />
        </Box>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' color='text.primary'>
              Your payment was{' '}
              <strong
                style={{
                  color: '#4caf50',
                }}
              >
                successful!
              </strong>
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Thank you for using our services.
            </Typography>
          </CardContent>
          <Divider variant='middle' />
          <CardActions
            sx={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              disableElevation
              sx={{
                borderRadius: 2,
              }}
              variant='contained'
              onClick={handleNavigate}
            >
              <strong>Go to Marketplace</strong>
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
};
