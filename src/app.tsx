import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { CollapseWrapper } from './components/collapase-wrapper';
import { Home } from './components/home';
import { Login } from './components/login';
import { NotFound } from './components/not-found';
import PrivateRoute from './components/private-route';
import { theme } from './shared/theme';
import store from './store';

function AppWithCallbackAfterRender() {
  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router >
        <React.StrictMode>
          <CollapseWrapper>
            <div className='content-wrapper'>
              <Routes>
                <Route path={"/"} element={<PrivateRoute />}>
                  <Route path={"/"} element={<Home />} />
                  <Route path={"/home"} element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </CollapseWrapper>
        </React.StrictMode>
      </Router>
    </ThemeProvider>
  </Provider>);
}

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(<AppWithCallbackAfterRender />);