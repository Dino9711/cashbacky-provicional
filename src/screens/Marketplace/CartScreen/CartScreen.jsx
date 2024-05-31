import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { CartCard } from './CartCard/CartCard';

export const CartScreen = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart'));
  const [cart, setCart] = useState(initialCart);
  const [products, setProducts] = useState(initialCart.cartList || []);
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState('0.00');
  const [totals, setTotals] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user_data'));

  const subtractProduct = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity -= 1;
    if (newProducts[index].quantity === 0) {
      newProducts.splice(index, 1);
      setProducts(newProducts);
      return;
    }

    const newTotals = [...totals];
    const newPrice = newProducts[index].price * newProducts[index].quantity;
    newTotals[index].total_price = newPrice;
    newTotals[index].display_price = NumberToCurrency(newPrice);

    setTotals(newTotals);
    setProducts(newProducts);
  };

  const addProduct = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    const newTotals = [...totals];
    const newPrice = totals[index].total_price + products[index].price;
    newTotals[index].total_price = newPrice;
    newTotals[index].display_price = NumberToCurrency(newPrice);
    setTotals(newTotals);
    setProducts(newProducts);
  };

  const goToCheckOut = async () => {
    const payload = {
      branch: cart.branchId,
      customer: userData._id,
      payment: total,
      products_for_db: products.map((product) => {
        return {
          _id: product._id,
          quantity: product.quantity,
        };
      }),
      product_ids: products.map((product) => product._id),
      products_for_stripe: products.map((product) => {
        return {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        };
      }),
    };
    console.log('payload', payload);
    try {
      const response = await axios.post(`${URL_SERVER}stripe_session`, payload);
      console.log('res', response);
      if (response.data.ok) {
        alert('Order created successfully');
        window.location.href = response.data.stripe_session_url;
      } else {
        alert('Error creating order');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cart) return;
    const newTotal = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotal(newTotal);
    if (totals.length > 0) return;
    const newTotals = products.map((product) => {
      const totalPrice = product.price * product.quantity;
      return {
        total_price: totalPrice,
        display_price: NumberToCurrency(totalPrice),
      };
    });
    setTotals(newTotals);
  }, [products, cart]);

  useEffect(() => {
    const newDisplayTotal = NumberToCurrency(total);
    setDisplayTotal(newDisplayTotal);
  }, [total]);
  if (!cart || totals.length === 0) return <h1>Cart is empty</h1>;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {products.map((product, index) => (
            <CartCard
              key={product._id}
              product={product}
              index={index}
              subtractProduct={subtractProduct}
              addProduct={addProduct}
              displayPrice={totals[index].display_price}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBlock: '10px',
          }}
        >
          <Typography>Total:&nbsp;</Typography>
          <Typography fontWeight='bold'>{displayTotal}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              total > 0 && goToCheckOut();
            }}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
