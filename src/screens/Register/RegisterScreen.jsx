import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../helpers/ProviderUrl';

export const RegisterScreen = () => {
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    password: '',
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`${URL_SERVER}customers`, values);
      if (res.data.ok) {
        toast.success('Usuario registrado correctamente');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '65vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'Futura',
          }}
          gutterBottom
        >
          CASHBACKY
        </Typography>
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            width: '96vw',
            backgroundColor: '#d6e4e7',
          }}
        >
          <CardHeader title='Register' />
          <Divider variant='middle' />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label='Nombre'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={values.name}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Apellido'
                  variant='outlined'
                  fullWidth
                  name='lastname'
                  value={values.lastname}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label='Birthday'
                  value={new Date(values.birthday)}
                  onChange={(newValue) =>
                    setValues({
                      ...values,
                      birthday: newValue,
                    })
                  }
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  name='email'
                  value={values.email}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  name='phone'
                  value={values.phone}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Username'
                  variant='outlined'
                  fullWidth
                  name='username'
                  value={values.username}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Password'
                  variant='outlined'
                  fullWidth
                  name='password'
                  type='password'
                  value={values.password}
                  onChange={handleInputChange}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider variant='middle' />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <Button
              children='Registrarse'
              variant='contained'
              onClick={handleSave}
              color='secondary'
              sx={{
                borderRadius: 3,
              }}
            />
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
