import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';

export const SingleBranchComponent = ({ data = null }) => {
  const handleCreateCard = async () => {
    try {
      const response = await axios.post(`${URL_SERVER}cards`, {
        branch: data._id,
        customer: JSON.parse(localStorage.getItem('user_data'))._id,
      });

      if (response.data.ok) {
        toast.success('Card created successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error creating card');
    }
  };

  return (
    <>
      {data !== null && (
        <Card
          sx={{
            borderRadius: 3,
            width: '90vw',
            height: 'auto',
            backgroundColor: 'rgba(189,181,218,1)',
            border: '2px solid rgba(255, 255, 255, 0.125)',
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))',
            boxShadow: 'none',
            margin: '10px',
            // border: 'solid 2px #48588c',
          }}
          elevation={0}
        >
          <CardHeader title={data.name} />
          <Box
            sx={{
              paddingTop: 2,
              paddingLeft: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {`Cashback ${data.cashback_percentage}%`}
            </Typography>
          </Box>
          <Divider variant='middle' />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              disableElevation
              onClick={handleCreateCard}
              sx={{
                fontFamily: 'Futura',
                borderRadius: 2,
              }}
            >
              Create Card
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
