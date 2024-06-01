import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

export const ShippingFormComponent = ({
  shippingInfo,
  setShippingInfo,
  goToCheckOut,
}) => {
  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
        }}
        elevation={0}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography fontWeight='bold'>Shipping Information</Typography>
            <Stack spacing={2}>
              <TextField
                label='Calle'
                variant='outlined'
                value={shippingInfo.street}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, street: e.target.value })
                }
              />
              <TextField
                label='Numero'
                variant='outlined'
                value={shippingInfo.number}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, number: e.target.value })
                }
              />
              <TextField
                label='Colonia'
                variant='outlined'
                value={shippingInfo.neighborhood}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    neighborhood: e.target.value,
                  })
                }
              />
              <TextField
                label='Codigo Postal'
                variant='outlined'
                value={shippingInfo.zip}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, zip: e.target.value })
                }
              />
              <TextField
                label='Ciudad'
                variant='outlined'
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
              />
              <TextField
                label='Estado'
                variant='outlined'
                value={shippingInfo.state}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, state: e.target.value })
                }
              />
              <TextField
                label='Pais'
                variant='outlined'
                value={shippingInfo.country}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, country: e.target.value })
                }
              />
              <Divider variant='middle'>
                <Typography fontWeight='bold'>Aditional Information</Typography>
              </Divider>
              <TextField
                label='Nombre de la persona que recibe'
                variant='outlined'
                value={shippingInfo.name}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, name: e.target.value })
                }
              />
              <TextField
                label='Numero de telefono'
                variant='outlined'
                value={shippingInfo.cel_number}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    cel_number: e.target.value,
                  })
                }
              />
            </Stack>
          </Stack>
        </CardContent>
        <Divider variant='middle' />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'black',
              color: 'white',
              fontFamily: 'Futura',
              borderRadius: 3,
            }}
            onClick={goToCheckOut}
          >
            Checkout
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
