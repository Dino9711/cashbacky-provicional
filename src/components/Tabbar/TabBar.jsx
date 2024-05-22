import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import authProvider from '../../auth/authProvider';
import { CustomerScreen } from '../../screens/Customer/CustomerScreen';
import { UserScreen } from '../../screens/User/UserScreen';
import { Login } from '../../screens/login/Login';

const drawerWidth = 165;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const TabBar = () => {
  const theme = useTheme();
  const user = JSON.parse(window.localStorage.getItem('username'));
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  let [logged] = authProvider.useAuth();

  const user_type = window.localStorage.getItem('user_type');

  React.useEffect(() => {
    if (!logged && !user) {
      history.push('/login');
    } else {
      history.push('/');
    }
  }, [logged, user, history]);

  React.useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('user_data')) === null) {
      authProvider.logout();
      history.push('/login');
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (!logged && !user) {
      history.push('/login');
    }
  }, [logged, user, history]);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Switch>
        {logged ? (
          <>
            <Route exact path='/'>
              {user_type === 'USER' ? <UserScreen /> : <CustomerScreen />}
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
