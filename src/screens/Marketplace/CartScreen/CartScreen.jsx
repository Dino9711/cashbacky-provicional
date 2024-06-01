import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumberToCurrency } from '../../../helpers/NumberToCurrency';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { CartCard } from './CartCard/CartCard';
import { NoProducts } from './NoProducts/NoProducts';

export const CartScreen = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart'));
  const [cart, setCart] = useState(initialCart ?? null);
  const [products, setProducts] = useState(initialCart?.cartList ?? []);
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState('0.00');
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [readyInMinutes, setReadyInMinutes] = useState(false);
  const [totals, setTotals] = useState([]);
  const [productsInitialized, setProductsInitialized] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const subtractProduct = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity -= 1;
    if (newProducts[index].quantity === 0) {
      newProducts.splice(index, 1);
      setProducts(newProducts);
      const newTotals = [...totals];
      newTotals.splice(index, 1);
      setTotals(newTotals);
      setCart({ ...cart, cartList: newProducts });
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

  const getBranchInfo = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}branches/id?id=${cart.branchId}`,
      );
      const data = response.data.data;
      if (response.data.ok) {
        setReadyInMinutes(data.ready_in_minutes);
        if (data.with_delivery) {
          setShowShippingForm(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBranchInfo();
  }, []);

  const goToCheckOut = async () => {
    const payload = {
      branch: cart.branchId,
      customer: userData._id,
      message_for_customer: readyInMinutes ? 'Listo en 35-45 min.' : '',
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

    if (showShippingForm) {
      payload.with_shipping = true;
    }

    try {
      const response = await axios.post(`${URL_SERVER}stripe_session`, payload);
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
    if (productsInitialized) return;
    if (!cart) return;
    if (cart.cartList.length === 0) return;
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
    setProductsInitialized(true);
  }, [products, cart]);

  useEffect(() => {
    const newDisplayTotal = NumberToCurrency(total);
    setDisplayTotal(newDisplayTotal);
  }, [total]);

  useEffect(() => {
    if (products.length === 0) {
      if (!cart) return;
      setCart(null);
      localStorage.removeItem('cart');
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  if (!cart || totals.length === 0) return <NoProducts />;

  return (
    <>
      <Grid container spacing={1}>
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
            sx={{
              backgroundColor: total > 0 ? 'black' : 'gray',
              color: 'white',
              fontFamily: 'Futura',
              borderRadius: 3,
            }}
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
