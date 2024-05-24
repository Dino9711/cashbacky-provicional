import { Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../helpers/ProviderUrl';
import { MarketplaceBranches } from './MarketplaceBranches/MarketplaceBranches';

export const MarketPlaceComponent = () => {
  const [branches, setBranches] = useState([]);

  const getBranches = async () => {
    try {
      const response = await axios.get(`${URL_SERVER}branches/market/`);
      if (response.data.ok) {
        setBranches(response.data.data);
        toast.success('branches loaded');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error loading branches');
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <>
      {branches.length === 0 ? (
        <> </>
      ) : (
        <>
          <Stack spacing={2} direction='column'>
            {branches.map((branch) => (
              <MarketplaceBranches key={branch._id} branch={branch} />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};
