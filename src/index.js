import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import RazbiratorService from './services/razbirator-service';
import { RazbiratorServiceProvider } from './components/razbirator-service-context';

import store from './store';

const razbiratorService = new RazbiratorService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <RazbiratorServiceProvider value={razbiratorService}>
        <Router>
          <App />
        </Router>
      </RazbiratorServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);