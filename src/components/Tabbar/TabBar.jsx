import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Card, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { styled, useTheme } from '@mui/material/styles';
import { IconDeviceDesktop } from '@tabler/icons-react';
import * as React from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
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

  const user_type = window.sessionStorage.getItem('user_type');

  React.useEffect(() => {
    if (!logged && !user) {
      history.push('/login');
    } else {
      history.push('/');
    }
  }, [logged, user, history]);

  React.useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('user_data')) === null) {
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ backgroundColor: '#ffffff' }}
        elevation={0}
        open={open}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '5vh',
          }}
        >
          <Stack
            direction='row'
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {/* {logged && (
              <IconButton
                color='warning'
                onClick={handleDrawerOpen}
                edge='end'
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )} */}
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: 180,
                borderColor: 'primary.main',
                zIndex: -30,
              }}
            >
              {/* <Box
                component='img'
                src={tabbarLogo}
                sx={{
                  height: '100%',
                  width: '100%',
                }}
              /> */}
              <Typography
                variant='h6'
                noWrap
                sx={{
                  color: '#242422',
                  fontFamily: 'Futura',
                }}
              >
                CASHBACKY
              </Typography>
            </Box>
          </Stack>
          {logged && (
            <>
              <IconButton onClick={handleUserMenu}>
                <Avatar alt='Usuario' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    window.localStorage.removeItem('username');
                    authProvider.logout();
                    history.push('/login');
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <NavLink
            to='/maquinas'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconDeviceDesktop />
                </ListItemIcon>
                <ListItemText primary={'PRODUCTOS'} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Card
          elevation={0}
          sx={{
            borderRadius: '15px',
            height: '100%',
            backgroundColor: '#eef2f6',
            minHeight: '85vh',
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
        </Card>
      </Main>
    </Box>
  );
};
