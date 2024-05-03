import { Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';

export const SingleTransaction = ({ data = null }) => {
  return (
    <>
      {data !== null ? (
        <Card
          sx={{
            margin: 1,
            width: '85vw',
            borderRadius: 3,
            height: 'auto',
          }}
          elevation={0}
        >
          <CardContent>
            <Stack direction='row' spacing={2}>
              <Typography align='center' variant='body1'>
                Action {data.action}
              </Typography>
              <Typography align='center' variant='body1'>
                Amount {NumberToCurrency(data.amount)}
              </Typography>
              <Typography align='center' variant='body1'>
                Code {data.transaction_code_id.code}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};
