import { ShoppingCart } from '@mui/icons-material';
import { Badge, Fab } from '@mui/material';
import React from 'react';

const CartFab = ({ quantity, handleClick }) => {
  return (
    <Fab
      color='primary'
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
      onClick={handleClick}
    >
      <Badge badgeContent={quantity} color='error'>
        <ShoppingCart />
      </Badge>
    </Fab>
  );
};

export default CartFab;
