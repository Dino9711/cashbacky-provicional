import DehazeIcon from '@mui/icons-material/Dehaze';
import StoreIcon from '@mui/icons-material/Store';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { IconCreditCard } from '@tabler/icons-react';
import React from 'react';
import { BranchesComponent } from './components/BranchesComponent';
import { MyCardsComponent } from './components/MyCardsComponent';
import { TransactionsComponent } from './components/TransactionsComponent';

export const CustomerScreen = () => {
  const [value, setValue] = React.useState('cards');

  const components = {
    branches: <BranchesComponent />,
    cards: <MyCardsComponent />,
    transactions: <TransactionsComponent />,
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
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label='Branches'
          value='branches'
          icon={<StoreIcon />}
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
      </BottomNavigation>
    </>
  );
};
