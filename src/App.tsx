import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ path: string; component: React.ComponentType }> = ({
  path,
  component: Component,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      path={path}
      render={() => (isAuthenticated ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

const PublicRoute: React.FC<{ path: string; component: React.ComponentType }> = ({
  path,
  component: Component,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      path={path}
      render={() => (!isAuthenticated ? <Component /> : <Redirect to="/products" />)}
    />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PublicRoute path="/login" component={LoginForm} />
          <PrivateRoute path="/products" component={ProductList} />
          <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App; 