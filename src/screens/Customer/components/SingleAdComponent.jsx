import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';

export const SingleAdComponent = ({ data = null }) => {
  return (
    <>
      {data !== null ? (
        <Card
          sx={{
            borderRadius: 3,
            width: '90vw',
            height: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.125)',
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
            boxShadow: 'none',
            margin: '10px',
            // border: 'solid 2px #48588c',
          }}
          elevation={0}
        >
          <CardHeader title={data.title} subheader={data.branch.name} />
          <Divider variant='middle' />
          <CardContent>
            <Typography
              variant='body1'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {data.description}
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};
