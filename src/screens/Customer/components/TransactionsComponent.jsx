import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { SingleTransactionComponent } from './SingleTransactionComponent';

export const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const user_data = JSON.parse(sessionStorage.getItem('user_data'));

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}transactions/customer?customer=${user_data._id}`,
      );

      if (response.data.ok) {
        setTransactions(response.data.data);
        toast.success('Transactions loaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error loading transactions');
    }
  };

  useEffect(() => {
    getTransactions();
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
        {transactions.map((transaction) => (
          <SingleTransactionComponent
            key={transaction._id}
            data={transaction}
          />
        ))}
      </Box>
    </>
  );
};
