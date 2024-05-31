import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { CircularCropImage } from '../../../../components/ImageComponents/CircularCropImage';
import { NumberToCurrency } from '../../../../helpers/NumberToCurrency';

export const CartCard = ({
  product,
  index,
  subtractProduct,
  addProduct,
  displayPrice,
}) => {
  return (
    <Card
      sx={{
        marginBlock: '10px',
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <CircularCropImage
              image={product.image}
              width='100px'
              height='100px'
            />
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Stack spacing={2}>
              <Typography fontWeight='bold'>{product.name}</Typography>

              <Stack display='flex' flexDirection='row'>
                <Typography fontWeight='bold'> Price:&nbsp;</Typography>
                <Typography>{NumberToCurrency(product.price)}</Typography>
              </Stack>
              <Stack display='flex' flexDirection='row'>
                <Typography fontWeight='bold'> Total:&nbsp;</Typography>
                <Typography>{displayPrice}</Typography>
              </Stack>
              <ButtonGroup variant='contained'>
                <Button
                  onClick={() => {
                    subtractProduct(index);
                  }}
                >
                  -
                </Button>
                <Button>{product.quantity}</Button>
                <Button
                  onClick={() => {
                    addProduct(index);
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
