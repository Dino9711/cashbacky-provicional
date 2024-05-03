import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import { Toaster } from 'sonner';
import { AppRouter } from './routes/components/Approuter';

function App() {
  return (
    <LocalizationProvider locale={esLocale} dateAdapter={AdapterDateFns}>
      <AppRouter />
      <Toaster />
    </LocalizationProvider>
  );
}

export default App;
