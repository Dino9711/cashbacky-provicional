import Box from '@mui/material/Box';
import * as React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import authProvider from '../../auth/authProvider';
import { CustomerScreen } from '../../screens/Customer/CustomerScreen';
import { StoreComponent } from '../../screens/Marketplace/Store/StoreComponent';
import { SuccessPaymentComponent } from '../../screens/Payments/SuccessPaymentComponent';
import { UserScreen } from '../../screens/User/UserScreen';
import { Login } from '../../screens/login/Login';

export const TabBar = () => {
  const user = JSON.parse(window.localStorage.getItem('username'));
  const history = useHistory();
  let [logged] = authProvider.useAuth();

  const user_type = window.localStorage.getItem('user_type');

  // React.useEffect(() => {
  //   if (!logged && !user) {
  //     history.push('/login');
  //   }
  // }, [logged, user, history]);

  React.useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('user_data')) === null) {
      authProvider.logout();
      history.push('/login');
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Switch>
        {logged && user_type === 'CUSTOMER' ? (
          <>
            <Route path='/marketplace/branches/:branchId'>
              <StoreComponent />
            </Route>
            <Route exact path='/success-payment'>
              <SuccessPaymentComponent />
            </Route>
            <Route exact path='/'>
              <CustomerScreen />
            </Route>
          </>
        ) : user_type === 'USER' ? (
          <UserScreen />
        ) : (
          <Route exact path='/login'>
            <Login />
          </Route>
        )}
      </Switch>
    </Box>
  );
};
