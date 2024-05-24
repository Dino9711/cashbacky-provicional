import { Store } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardComponent } from '../../../components/CardComponent';
import { ProductRow } from '../ProductRow/ProductRow';

export const MarketplaceBranches = ({ branch }) => {
  const history = useHistory();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '50px',
      }}
    >
      <CardComponent
        title={branch.branch.name}
        subheader={`Porcentaje de Cashback: ${branch.branch.cashback_percentage}%`}
        icon={<Store />}
        style={{
          overflowX: 'auto',
        }}
      >
        <Divider variant='middle' />
        <Box>
          <div
            onClick={() => {
              history.push(`/marketplace/branches/${branch.branch._id}`);
            }}
          >
            <ProductRow products={branch.products} />
          </div>
        </Box>
      </CardComponent>
      {/* <StoreComponent products={branch.products} /> */}
    </Box>
  );
};
