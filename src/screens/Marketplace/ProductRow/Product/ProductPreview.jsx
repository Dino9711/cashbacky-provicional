import { Stack, Typography } from '@mui/material';
import React from 'react';
import { CircularCropImage } from '../../../../components/ImageComponents/CircularCropImage';
import { NumberToCurrency } from '../../../../helpers/NumberToCurrency';

export const ProductPreview = ({ product }) => {
  return (
    <>
      <Stack
        direction='column'
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularCropImage image={product.image} />
        <Typography textAlign='center'>{product.name}</Typography>
        <Typography fontWeight='bold'>
          {NumberToCurrency(product.price)}
        </Typography>
      </Stack>
    </>
  );
};
