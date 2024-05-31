import { Loyalty, Shop } from '@mui/icons-material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import StoreIcon from '@mui/icons-material/Store';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { IconCreditCard, IconUser } from '@tabler/icons-react';
import React from 'react';
import { MarketPlaceComponent } from '../Marketplace/MarketPlaceComponent';
import { BranchesComponent } from './components/BranchesComponent';
import { MyCardsComponent } from './components/MyCardsComponent';
import { MyProfileComponent } from './components/MyProfileComponent';
import { PromotionsComponent } from './components/PromotionsComponent';
import { TransactionsComponent } from './components/TransactionsComponent';

export const CustomerScreen = () => {
  const [value, setValue] = React.useState('marketplace');

  const components = {
    branches: <BranchesComponent />,
    cards: <MyCardsComponent />,
    transactions: <TransactionsComponent />,
    profile: <MyProfileComponent />,
    promotions: <PromotionsComponent />,
    marketplace: <MarketPlaceComponent />,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {components[value]}
      </Box>
      <BottomNavigation
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#d3daf0',
          borderRadius: '12px 12px 0 0',
          '& .Mui-selected': {
            color: '#222224',
          },
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '4px',
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Branches'
          value='branches'
          icon={<StoreIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Promotions'
          value='promotions'
          icon={<Loyalty />}
        />
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Cards'
          value='cards'
          icon={<IconCreditCard />}
        />
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Marketplace'
          value='marketplace'
          icon={<Shop />}
        />
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Transactions'
          value='transactions'
          icon={<DehazeIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: '#222224',
            '& .Mui-selected': {
              color: '#222224',
            },
          }}
          label='Profile'
          value='profile'
          icon={<IconUser />}
        />
      </BottomNavigation>
    </>
  );
};
