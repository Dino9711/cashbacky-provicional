import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import CartFab from './CartFAB/CartFab';
import { ProductsCard } from './ProductsCard/ProductsCard';

export const StoreComponent = () => {
  const [branch, setBranch] = useState([]);
  const [products, setProducts] = useState([]);
  const { branchId } = useParams();

  const initialCart = JSON.parse(localStorage.getItem('cart'));
  const [cart, setCart] = useState(initialCart);
  const [quantity, setQuantity] = useState(0);
  const [disabledCart, setDisabledCart] = useState(
    branchId !== initialCart?.branchId && initialCart !== null,
  );

  const history = useHistory();

  const getProductsForStore = async () => {
    try {
      const response = await axios.get(
        `${URL_SERVER}branches/market/${branchId}`,
      );
      if (response.data.ok) {
        setBranch(response.data.data.branch);
        setProducts(response.data.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    if (cart === null) {
      const newCart = {
        cartList: [{ ...product, quantity: 1 }],
        branchId: branchId,
      };
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setQuantity(1);
    } else {
      const newCartList = cart.cartList;

      if (cart.branchId !== branchId) {
        return alert(
          'No puedes agregar productos de diferentes tiendas al carrito',
        );
      }

      const productIndex = newCartList.findIndex(
        (item) => item._id === product._id,
      );
      if (productIndex === -1) {
        newCartList.push({ ...product, quantity: 1 });
      } else {
        newCartList[productIndex].quantity += 1;
      }
      const newCart = { ...cart, cartList: newCartList };
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);

      setQuantity((oldQ) => oldQ + 1);
    }
  };

  useEffect(() => {
    getProductsForStore();
  }, []);

  useEffect(() => {
    if (cart === null) return;
    if (cart.cartList.length === 0) return;

    const totalQuantity = cart.cartList.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    setQuantity(totalQuantity);
  }, []);

  if (!products) return <></>;
  if (products.length === 0) return <></>;
  return (
    <>
      {quantity > 0 && (
        <CartFab
          quantity={quantity}
          handleClick={() => {
            history.push('/cart');
          }}
        />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: '15px',
            }}
          >
            <Typography sx={{ fontSize: '1.25rem' }}>Tienda de</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {branch.name}
            </Typography>
          </Box>
        </Grid>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductsCard product={product} updateCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
