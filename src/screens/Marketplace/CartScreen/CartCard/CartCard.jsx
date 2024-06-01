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
        borderRadius: 3,
      }}
      elevation={0}
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
              <ButtonGroup
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: 2,
                }}
                variant='contained'
              >
                <Button
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'Futura',
                    borderRadius: 2,
                  }}
                  onClick={() => {
                    subtractProduct(index);
                  }}
                >
                  -
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'Futura',
                  }}
                >
                  {product.quantity}
                </Button>
                <Button
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'Futura',
                    borderRadius: 2,
                  }}
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
