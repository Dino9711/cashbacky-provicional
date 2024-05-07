import { Loyalty } from '@mui/icons-material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import StoreIcon from '@mui/icons-material/Store';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { IconCreditCard, IconUser } from '@tabler/icons-react';
import React from 'react';
import { BranchesComponent } from './components/BranchesComponent';
import { MyCardsComponent } from './components/MyCardsComponent';
import { MyProfileComponent } from './components/MyProfileComponent';
import { PromotionsComponent } from './components/PromotionsComponent';
import { TransactionsComponent } from './components/TransactionsComponent';

export const CustomerScreen = () => {
  const [value, setValue] = React.useState('cards');

  const components = {
    branches: <BranchesComponent />,
    cards: <MyCardsComponent />,
    transactions: <TransactionsComponent />,
    profile: <MyProfileComponent />,
    promotions: <PromotionsComponent />,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {components[value]}
      <BottomNavigation
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#d6e4e7',
          borderRadius: '12px 12px 0 0',
        }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label='Branches'
          value='branches'
          icon={<StoreIcon />}
        />
        <BottomNavigationAction
          label='Promotions'
          value='promotions'
          icon={<Loyalty />}
        />
        <BottomNavigationAction
          label='My Cards'
          value='cards'
          icon={<IconCreditCard />}
        />
        <BottomNavigationAction
          label='Transactions'
          value='transactions'
          icon={<DehazeIcon />}
        />
        <BottomNavigationAction
          label='My Profile'
          value='profile'
          icon={<IconUser />}
        />
      </BottomNavigation>
    </>
  );
};
