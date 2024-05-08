import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import { Toaster } from 'sonner';
import { AppRouter } from './routes/components/Approuter';

function App() {
  return (
    <LocalizationProvider locale={esLocale} dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          height: 'auto',
          overflow: 'hidden',
          backgroundColor: '#efeef0',
        }}
      >
        <AppRouter />
      </Box>
      <Toaster position='top-center' />
    </LocalizationProvider>
  );
}

export default App;
