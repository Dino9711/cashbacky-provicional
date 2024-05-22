import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { IconUser } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'sonner';
import authProvider from '../../../auth/authProvider';
import { URL_SERVER } from '../../../helpers/ProviderUrl';

export const MyProfileComponent = () => {
  const [disabledSaveButton, setDisabledSaveButton] = useState(false);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const [values, setValues] = useState({ ...user_data });
  const [payload, setPayload] = useState({});

  const history = useHistory();

  const handleCloseSession = () => {
    authProvider.logout();
    history.push('/login');
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCustomer = async () => {
    try {
      const response = await axios.put(
        `${URL_SERVER}customers/${user_data._id}`,
        payload,
      );

      if (response.data.ok) {
        toast.success('Usuario editado correctamente');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error al editar usuario');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
      }}
    >
      {payload !== null && payload !== undefined && (
        <Card
          sx={{
            width: '100%',
            maxWidth: '400px',
            margin: 'auto',
            backgroundColor: 'rgba(189,181,218,0.6)',
            borderRadius: 3,
          }}
          elevation={0}
        >
          <CardHeader
            title={user_data.name}
            subheader={user_data._id}
            avatar={<IconUser />}
            action={
              <FormControlLabel
                control={<Switch checked={disabledSaveButton} />}
                onChange={(e) => setDisabledSaveButton(e.target.checked)}
                label='Edit'
              />
            }
          />
          <Divider variant='middle' />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Name'
                  variant='outlined'
                  disabled={!disabledSaveButton}
                  fullWidth
                  name='name'
                  onChange={handleChange}
                  value={values.name}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Lastname'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  disabled={!disabledSaveButton}
                  name='name'
                  value={values.lastnames}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='E-Mail'
                  variant='outlined'
                  fullWidth
                  name='name'
                  onChange={handleChange}
                  disabled={!disabledSaveButton}
                  value={values.email}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  disabled={!disabledSaveButton}
                  name='name'
                  value={values.phone}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Username'
                  variant='outlined'
                  fullWidth
                  onChange={handleChange}
                  disabled={!disabledSaveButton}
                  name='name'
                  value={values.username}
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
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant='contained'
              disableElevation
              onClick={handleCloseSession}
              color='error'
              sx={{
                borderRadius: 2,
              }}
            >
              Close Session
            </Button>
            <Button
              variant='contained'
              disableElevation
              disabled={!disabledSaveButton}
              onClick={handleEditCustomer}
              color='success'
              sx={{
                borderRadius: 2,
              }}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};
