import Box from '@mui/material/Box';
import * as React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import authProvider from '../../auth/authProvider';
import { CustomerScreen } from '../../screens/Customer/CustomerScreen';
import { Login } from '../../screens/login/Login';
import { CartScreen } from '../../screens/Marketplace/CartScreen/CartScreen';
import { StoreComponent } from '../../screens/Marketplace/Store/StoreComponent';
import { SuccessPaymentComponent } from '../../screens/Payments/SuccessPaymentComponent';
import { UserScreen } from '../../screens/User/UserScreen';

export const TabBar = () => {
  const user = JSON.parse(window.localStorage.getItem('username'));
  const history = useHistory();
  let [logged] = authProvider.useAuth();

  const user_type = window.localStorage.getItem('user_type');

  React.useEffect(() => {
    if (
      logged === false &&
      JSON.parse(window.localStorage.getItem('user_data')) === null
    ) {
      console.log('logged out');
      history.push('/login');
    }
  }, [logged]);

  // React.useEffect(() => {
  //   if (JSON.parse(window.localStorage.getItem('user_data')) === null) {
  //     authProvider.logout();
  //     history.push('/login');
  //   }
  // }, []);

  console.log('logged', logged);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Switch>
        {logged === true ? (
          <>
            <Route path='/marketplace/branches/:branchId'>
              <StoreComponent />
            </Route>
            <Route exact path='/cart'>
              <CartScreen />
            </Route>
            <Route exact path='/success-payment'>
              <SuccessPaymentComponent />
            </Route>
            <Route exact path='/'>
              {user_type === 'CUSTOMER' ? <CustomerScreen /> : <UserScreen />}
            </Route>
          </>
        ) : (
          <Route exact path='/login'>
            <Login />
          </Route>
        )}
      </Switch>
    </Box>
  );
};
