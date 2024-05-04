import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { SingleCardComponent } from './SingleCardComponent';

export const MyCardsComponent = () => {
  const [cards, setCards] = useState([]);
  const user_data = JSON.parse(sessionStorage.getItem('user_data'));

  const handleGetCuscomerCards = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}cards/customer?customer=${user_data._id}`,
      );
      setCards(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Error al obtener tarjetas');
    }
  };

  useEffect(() => {
    handleGetCuscomerCards();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {cards.map((card) => (
          <SingleCardComponent key={card._id} data={card} />
        ))}
      </Box>
    </>
  );
};
