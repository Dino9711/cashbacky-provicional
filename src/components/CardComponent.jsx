import { Card, CardHeader } from '@mui/material';
import React from 'react';

export const CardComponent = ({
  title,
  subheader,
  icon,
  height,
  width,
  style,
  children,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        width: width ?? '90vw',
        height: height ?? 'auto',
        backgroundColor: 'rgba(189,181,218,1)',
        border: '2px solid rgba(255, 255, 255, 0.125)',
        backgroundImage:
          'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
        boxShadow: 'none',
        margin: '10px',
        // border: 'solid 2px #48588c',
        ...style,
      }}
      elevation={0}
    >
      <CardHeader avatar={icon} title={title} subheader={subheader} />
      {children}
    </Card>
  );
};
