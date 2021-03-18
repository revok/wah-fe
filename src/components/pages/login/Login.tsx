import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container as DiContainer } from 'typedi';
import ApiService from '../../../services/api.service';
import './Login.scss';

const Login: React.FC = (props) => {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  if (isAuthenticated) {
    return <Redirect to="/admin" />
  }

  const handleSubmit = (event: React.SyntheticEvent ) => {
    event.preventDefault();

    if (username && password) {
      const apiService = DiContainer.get(ApiService);

      if (apiService) {
        apiService
          .authenticateUser({ username, password })
          .then(() => setIsAuthenticated(true));
      }
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
