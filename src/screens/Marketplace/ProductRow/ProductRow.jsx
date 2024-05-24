import { Stack } from '@mui/material';
import React from 'react';
import { ProductPreview } from './Product/ProductPreview';

export const ProductRow = ({ products }) => {
  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        justifyContent='space-between'
        sx={{
          overflowX: 'auto',
        }}
        padding={2}
      >
        {products.slice(0, 5).map((product) => (
          <ProductPreview product={product} key={product._id} />
        ))}
      </Stack>
    </>
  );
};
