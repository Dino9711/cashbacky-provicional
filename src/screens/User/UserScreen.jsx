import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'sonner';
import authProvider from '../../auth/authProvider';
import { TableComponent } from '../../components/Table/TableComponent';
import { URL_SERVER } from '../../helpers/ProviderUrl';
import { AddCashbackModal } from './components/AddCashbackModal';

export const UserScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [reload, setReload] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [actionForModal, setActionForModal] = useState('ADD');
  const user_data = JSON.parse(localStorage.getItem('user_data'));

  const history = useHistory();

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenAddModal = (action) => {
    setActionForModal(action);
    setOpenAddModal(true);
  };

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}transactions/user?user=${user_data._id}`,
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error('Error al obtener transacciones');
    }
  };

  useEffect(() => {
    getTransactions();
  }, [reload]);

  const columns = [
    { id: 'action', label: 'Action' },
    { id: 'amount', label: 'Amount', toCurrency: true },
  ];

  const handleCloseSession = () => {
    authProvider.logout();
    history.push('/login');
  };

  return (
    <Box
      sx={{
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '50px',
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '95vw',
          borderRadius: 3,
          backgroundColor: '#d6e4e7',
          marginBottom: '20px',
        }}
      >
        <CardHeader title='Transactions' />
        <Divider variant='middle' />
        <CardContent>
          <Typography align='center' variant='h6'>
            CASH BACKY
          </Typography>
        </CardContent>
        <Divider variant='middle' />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            color='success'
            variant='contained'
            onClick={() => handleOpenAddModal('ADD')}
            sx={{
              borderRadius: 2,
            }}
          >
            Agregar Backys
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => handleOpenAddModal('SUBSTRACT')}
            sx={{
              borderRadius: 2,
            }}
          >
            Canjear Backys
          </Button>
        </CardActions>
      </Card>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          width: '95vw',
          border: 'solid 2px #48588c',
        }}
      >
        <CardHeader title='Last Transactions' />
        <Divider variant='middle' />
        <CardContent
          sx={{
            maxHeight: '350px',
            overflow: 'auto',
          }}
        >
          <TableComponent
            rows={transactions}
            columns={columns}
            pagination={false}
            dense={true}
          />
        </CardContent>
      </Card>
      <Box
        sx={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '50px',
        }}
      >
        <Button
          color='primary'
          variant='outlined'
          sx={{
            borderRadius: 3,
          }}
          onClick={handleCloseSession}
        >
          Close Session
        </Button>
      </Box>
      <AddCashbackModal
        setReload={setReload}
        open={openAddModal}
        onClose={handleCloseAddModal}
        action={actionForModal}
      />
    </Box>
  );
};
