import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginBtn.scss';

export default class LoginButton extends React.Component<{}, { isLoggedIn: boolean}> {

  constructor(props: any) {
    super(props)

    this.state = {
      isLoggedIn: false,
    };

    this.localStorageUpdated = this.localStorageUpdated.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const isTokenPresent = !!localStorage.getItem('token');
      this.setState({ isLoggedIn: isTokenPresent });

      window.addEventListener('storage', this.localStorageUpdated)
    }
  }

  componentWillUnmount() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', this.localStorageUpdated)
      }
  }

  localStorageUpdated() {
    if (!localStorage.getItem('token')) {
      this.setState({ isLoggedIn: false });
    }

    else if (!this.state.isLoggedIn) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    window.dispatchEvent( new Event('storage') );
  }

  render () {
    if (this.state.isLoggedIn) {
      return (
        <div className="Login" data-testid="Login">
          <Link to="/">
            <Button id="loginbtn" onClick={ this.handleLogout } >Logout</Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="Login" data-testid="Login">
        <Link to="/login">
          <Button id="loginbtn">Login</Button>
        </Link>
      </div>
    );
  }
};

