import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import emptyCart from '../../../../assets/empty-cart.png';
export const NoProducts = () => {
  const history = useHistory();
  const goBackToMainPage = () => {
    history.push('/');
  };
  return (
    <Stack
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CardMedia component='img' image={emptyCart} alt='empty-cart' />
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center', padding: '15px' }}>
            <Typography variant='h5'>No products in cart</Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={goBackToMainPage}
            >
              Go to store
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
