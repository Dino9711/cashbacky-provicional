import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { URL_SERVER } from '../../../helpers/ProviderUrl';
import { SingleBranchComponent } from './SingleBranchComponent';

export const BranchesComponent = () => {
  const [branches, setBranches] = useState([]);

  const getBranches = async () => {
    try {
      const response = await axios.get(`${URL_SERVER}branches`);
      if (response.data.ok) {
        setBranches(response.data.data);
        toast.success('Branches loaded');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error loading branches');
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {branches.map((branch) => (
          <SingleBranchComponent key={branch._id} data={branch} />
        ))}
      </Box>
    </>
  );
};
