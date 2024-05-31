import { Box, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { OrdersComponent } from './OrdersComponent';
import { SingleTransactionComponent } from './SingleTransactionComponent';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState(0);
  const user_data = JSON.parse(localStorage.getItem('user_data'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}stripe_transactions/customer/${user_data._id}`,
      );

      if (response.data.ok) {
        setOrders(response.data.data);
        toast.success('Orders loaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error loading transactions');
    }
  };

  useEffect(() => {
    getTransactions();
    getOrders();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            justifyContent: 'space-around',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Transacciones' {...a11yProps(0)} />
            <Tab label='Ordenes' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: '50px',
            }}
          >
            {orders.map((transaction) => (
              <OrdersComponent key={transaction._id} data={transaction} />
            ))}
          </Box>
        </CustomTabPanel>
      </Box>
    </>
  );
};
