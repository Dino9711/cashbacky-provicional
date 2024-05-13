import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
            border: 'solid 2px #48588c',
            margin: '10px',
            backgroundColor: '#efeef0',
            // border: 'solid 2px #48588c',
          }}
          elevation={0}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <CardMedia
              sx={{
                borderRadius: 2,
              }}
              component='img'
              height='194'
              image={data.image}
              alt={data.title}
            />
          </Box>
          <CardHeader
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              fontFamily: 'Futura',
              '& .MuiCardHeader-title': {
                fontSize: '1.5rem',
              },
              '& .MuiCardHeader-subheader': {
                fontSize: '1rem',
              },
            }}
            title={data.title}
            subheader={data.branch.name}
          />
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
