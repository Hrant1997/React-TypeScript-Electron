import * as React from 'react';
import {
  TextField,
  Avatar,
  Button,
  Box,
  Typography,
  Container,
  Alert
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import AuthContext from '../../contexts/authContext';
import axios from 'axios'

const Login = () => {
  const { setAuth } = React.useContext(AuthContext)
  const [error, setError] = React.useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const urlParam = new URLSearchParams();
    
    urlParam.append('email', formData.get('email') as string )
    urlParam.append('password', formData.get('password') as string)

    axios.post(`http://localhost:4000/login?${urlParam.toString()}`)
      .then(() => {
        setAuth({ loggedIn: true })
        localStorage.setItem('credentials', urlParam.toString())
      })
      .catch(() => {
        setError(true)
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          { error && <Alert variant='filled' severity="error">Invalid credentials</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login