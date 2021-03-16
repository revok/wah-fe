import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Route, Link } from 'react-router-dom'
import Login from '../pages/login/Login';
import Admin from '../pages/admin/Admin';
import Survey from '../pages/survey/Survey';
import AssessmentIcon from '@material-ui/icons/Assessment'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar id="toolbar">

          <Link to="/">
            <IconButton edge="start" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>

          <Link to="/admin">
            <IconButton edge="start" aria-label="admin">
              <AssessmentIcon />
            </IconButton>
          </Link>

          <Box flexGrow="1">
            <Typography align="center">
              JOYTRON 5000
            </Typography>
          </Box>

          <Link to="/login">
            <Button id="loginbtn">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>


      <Container component="main">
        <Box display="flex" justifyContent="center" height="100%">
          <Route exact path='/' component={Survey} />
          <Route path='/login' component={Login} />
          <Route exact path='/admin' component={Admin} />
        </Box>
      </Container>

    </React.Fragment>
  );
}

export default App;
