import { ShoppingCart } from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { CircularCropImage } from '../../../../components/ImageComponents/CircularCropImage';
import { NumberToCurrency } from '../../../../helpers/NumberToCurrency';

export const ProductsCard = ({ product, updateCart }) => {
  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
        }}
        elevation={0}
      >
        <CardContent>
          <Stack
            direction='column'
            spacing={2}
            justifyContent='center'
            alignContent='center'
            alignItems='center'
          >
            <CircularCropImage
              image={product.image}
              width='200px'
              height='200px'
            />
            <Typography
              sx={{
                fontSize: '1.5rem',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              {product.description}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            >
              {NumberToCurrency(product.price)}
            </Typography>
            <Button
              sx={{
                padding: '15px',
                margin: '10px',
                backgroundColor: '#FFD700',
                color: 'black',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  color: 'black',
                },
              }}
            >
              Ver detalles
            </Button>
            <Button
              sx={{
                padding: '15px',
                margin: '10px',
                backgroundColor: '#FFD700',
                color: 'black',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  color: 'black',
                },
              }}
              onClick={() => updateCart(product)}
            >
              <Stack direction='row' spacing={2}>
                <ShoppingCart />
                <Typography fontWeight='bold'> Añadir Al Carrito</Typography>
              </Stack>
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
