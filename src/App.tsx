import Routes from './routes';
import { theme } from './common/theme';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/authContext';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
