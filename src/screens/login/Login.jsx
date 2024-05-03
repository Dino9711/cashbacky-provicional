import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconPassword, IconUser } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authProvider from '../../auth/authProvider';
import { URL_SERVER } from '../../helpers/ProviderUrl';
import { RegisterScreen } from '../Register/RegisterScreen';

export const Login = () => {
  const [user, setUser] = React.useState({
    username: '',
    password: '',
  });
  const [showRegisterScreen, setShowRegisterScreen] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const history = useHistory();

  const windowDimension = 900;
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const handleShowRegisterScreen = () => {
    setShowRegisterScreen(!showRegisterScreen);
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post(`${URL_SERVER}auth/login`, { ...user })
      .then((res) => {
        if (res.data.ok) {
          sessionStorage.setItem('user_type', res.data.user_type);
          sessionStorage.setItem('user_data', JSON.stringify(res.data.data));
          authProvider.login(res.data.token);
          history.push('/');
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  return (
    <>
      {showRegisterScreen ? (
        <RegisterScreen />
      ) : (
        <form onSubmit={login}>
          <Box
            sx={{
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                width: '85vw',
                borderRadius: 3,
              }}
              elevation={0}
            >
              <Stack direction='row' sx={{ height: '100%' }}>
                <Box
                  sx={{
                    width: width > windowDimension ? '50%' : '100%',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title='Iniciar Sesión'
                    subheader='Ingrese sus datos para manejar su cuenta'
                    avatar={
                      <IconUser
                        size={24}
                        strokeWidth={1}
                        color='black'
                        style={{ marginRight: '10px' }}
                      />
                    }
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: '70%',
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Stack
                      spacing={4}
                      sx={{
                        m: 3,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <TextField
                        label='Usuario'
                        helperText='Ingrese su usuario'
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <IconUser />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ required: false }}
                        placeholder='Usuario'
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                      <TextField
                        label='Contraseña'
                        helperText='Ingrese su contraseña'
                        fullWidth
                        type='password'
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <IconPassword />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ required: false }}
                        placeholder='Contraseña'
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </Stack>
                  </Box>
                </Box>
                {width > windowDimension && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '50%',
                      height: '100%',
                    }}
                  >
                    <Typography
                      variant='h3'
                      sx={{
                        fontFamily: 'Futura',
                      }}
                    >
                      CASHBACKY
                    </Typography>
                  </Box>
                )}
              </Stack>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px',
                }}
              >
                <Stack spacing={2} flexDirection={'column'}>
                  <Button
                    children='Iniciar Sesión'
                    variant='contained'
                    onClick={login}
                    color='secondary'
                    sx={{
                      borderRadius: 3,
                    }}
                  />
                  <Typography variant='body2'>¿No tienes cuenta?</Typography>
                  <Button
                    onClick={handleShowRegisterScreen}
                    color='success'
                    variant='contained'
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    Regístrate
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Box>
        </form>
      )}
    </>
  );
};
