import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { FormEventHandler } from 'react';
import { Redirect } from 'react-router-dom'
import './Login.scss';
import axios, { AxiosResponse } from 'axios';

const Login: React.FC = (props) => {
  const BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  if (isAuthenticated) {
    return <Redirect to="/admin" />
  }

  // If we already have a token, validate it.
  axios.get(`${BASE_URL}/user/validateToken`)
  .then(res => {
    setIsAuthenticated(true);
  })

  const handleSubmit = (event: React.SyntheticEvent ) => {
    event.preventDefault();

    if (username && password) {
      axios.post(`${BASE_URL}/user/login`, { username, password })
        .then((response: AxiosResponse) => {
          localStorage.setItem('token', response.data['token']);
          setIsAuthenticated(true);
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again');
        });
    }
  }

  return (
    <div className="form-container">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={ username }
          onChange={ (e: React.ChangeEvent<HTMLInputElement> ) => setUserName(e.target.value) }
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={ password }
          onChange={ (e: React.ChangeEvent<HTMLInputElement> ) => setPassword(e.target.value) }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!(username && password)}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
