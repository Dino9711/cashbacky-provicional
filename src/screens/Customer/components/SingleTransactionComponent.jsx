import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import React from 'react';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';

export const SingleTransactionComponent = ({ data = null }) => {
  return (
    <>
      {data !== null && (
        <Card
          sx={{
            borderRadius: 3,
            width: '90vw',
            height: 'auto',
            backgroundColor: 'rgba(97, 113, 108, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.125)',
            backgroundImage:
              'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
            boxShadow: 'none',
            margin: '10px',
            // border: 'solid 2px #48588c',
          }}
          elevation={0}
        >
          <CardHeader
            title={moment(data.created_at).format('DD/MM/YYYY HH:MM:ss')}
            subheader={`${data.branch.name}`}
          />
          <Box
            sx={{
              paddingTop: 2,
              paddingLeft: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {`${NumberToCurrency(
                data.action === 'ADD' ? data.points : data.amount,
              )}`}
            </Typography>
          </Box>
          <Divider variant='middle' />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='caption'
              sx={{
                fontFamily: 'Futura',
              }}
              component='div'
            >
              {data._id}
            </Typography>
            <Button
              variant='contained'
              color={data.action === 'ADD' ? 'success' : 'warning'}
              disableElevation
              sx={{
                fontFamily: 'Futura',
                borderRadius: 2,
              }}
            >
              {data.action}
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
