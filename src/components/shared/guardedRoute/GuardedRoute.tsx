import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container as DiContainer } from 'typedi';
import ApiService from '../../../services/api.service';
import './GuardedRoute.scss';


export default function guardedRoute(ComponentToProtect: any) {
  return class extends React.Component<{}, { isLoading: boolean, redirect: boolean }> {
    constructor(props: any) {
      super(props);

      this.state = {
        isLoading: true,
        redirect: false,
      };
    }

    componentDidMount () {
      const apiService = DiContainer.get(ApiService);

      if (apiService) {
        apiService
          .validateToken()
          .then((isValid) => {
            this.setState({ isLoading: false, redirect: !isValid });
          });
      }
    }

    render () {
      const { isLoading, redirect } = this.state;

      if (isLoading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }

      return <ComponentToProtect {...this.props} />;
    }
  }
}
