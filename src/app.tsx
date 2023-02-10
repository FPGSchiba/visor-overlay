import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { CollapseWrapper } from './components/collapase-wrapper';
import { CreateNew } from './components/functions/create-new';
import { ListAll } from './components/functions/list-all';
import { Search } from './components/functions/search';
import { Home } from './components/home';
import { Login } from './components/login-org';
import { NoAccess } from './components/no-access';
import { NotFound } from './components/not-found';
import PrivateRoute from './components/private-route';
import { Users } from './components/users/users';
import { theme } from './shared/theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import store from './store';

function AppWithCallbackAfterRender() {
  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router >
          <React.StrictMode>
              <CollapseWrapper>
                <div className='content-wrapper-left'>
                  <Routes>
                    <Route path={"/"} element={<PrivateRoute />}>
                      <Route path={"/"} element={<Home />} />
                      <Route path={"/home"} element={<Home />} />
                      <Route path={"/create-new"} element={<CreateNew />} />
                      <Route path={"/list-all"} element={<ListAll />} />
                      <Route path={"/search"} element={<Search />} />
                      <Route path={'/users'} element={<Users />} />
                      <Route path={'/no-access'} element={<NoAccess />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </CollapseWrapper>
          </React.StrictMode>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>);
}

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(<AppWithCallbackAfterRender />);