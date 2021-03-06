import 'reflect-metadata';
import * as dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axiosInstance from './services/axios.service';
import { Container } from 'typedi';

/*
* Inject the singleton into the DI container.
* This will (would) provide a lot of flexibility at the time of writing unit tests.
*/
Container.set('apiInstance', axiosInstance);

// Load environment variables from .env
// If you're running this through the infra project these variables
// will already be in the environment through docker-compose.
dotenv.config();

ReactDOM.render(
  <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
