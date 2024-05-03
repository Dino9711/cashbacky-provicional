import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export const NoCardComponent = () => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        width: '80vw',
        height: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.125)',
        backgroundImage:
          'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
        boxShadow: 'none',
      }}
      elevation={0}
    >
      <CardContent>
        <Typography align='center' variant='h6'>
          Aun no tienes ninguna tarjeta registrada
        </Typography>
      </CardContent>
    </Card>
  );
};
