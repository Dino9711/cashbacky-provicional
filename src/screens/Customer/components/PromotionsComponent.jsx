import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { SingleAdComponent } from './SingleAdComponent';

export const PromotionsComponent = () => {
  const [ads, setAds] = useState([]);

  const getAds = async () => {
    try {
      const response = await axios.get(`${URL_SERVER}ads`);
      if (response.data.ok) {
        setAds(response.data.data);
        toast.success('Promotions loaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error loading promotions');
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '50px',
        }}
      >
        {ads.length > 0 ? (
          ads.map((ad) => <SingleAdComponent key={ad._id} data={ad} />)
        ) : (
          <Typography
            align='center'
            sx={{
              width: '96vw',
            }}
            variant='h5'
          >
            No promotions available
          </Typography>
        )}
      </Box>
    </>
  );
};
