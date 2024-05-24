import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { ProductsCard } from './ProductsCard/ProductsCard';

export const StoreComponent = () => {
  const [branch, setBranch] = useState([]);
  const [products, setProducts] = useState([]);
  const { branchId } = useParams();

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

  useEffect(() => {
    getProductsForStore();
  }, []);

  if (!products) return <></>;
  if (products.length === 0) return <></>;
  return (
    <>
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
            <ProductsCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
