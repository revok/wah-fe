import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Admin from '../pages/admin/Admin';
import Login from '../pages/login/Login';
import Survey from '../pages/survey/Survey';
import guardedRoute from '../shared/guardedRoute/GuardedRoute';
import LoginButton from '../shared/login/LoginBtn';
import './App.scss';

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

          <Box className="title" flexGrow="1" display="flex" justifyContent="center" alignItems="center">
            <SentimentVerySatisfiedIcon className="logo-icon" />EBLIEZIEJEGIE?
          </Box>

          <LoginButton />
        </Toolbar>
      </AppBar>


      <Container component="main">
        <Box display="flex" justifyContent="center" height="100%">
          <Route exact path='/' component={Survey} />
          <Route path='/login' component={Login} />
          <Route exact path='/admin' component={ guardedRoute(Admin) } />
        </Box>
      </Container>

    </React.Fragment>
  );
}

export default App;
