import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps {
  authAuto?: boolean;
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ authAuto = false, isPrivate = false, component: Component, ...rest }) => {
  const { userData }  = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if(authAuto){
          return isPrivate === !!userData ? (
            <Component />
            ) : (
              <Redirect to={{
                pathname: isPrivate ? '/' : '/home',
                state: { from: location },
              }} />
              )
        } else {
          return(
            <Component />
          )
        }
      }}
    />
  );
};

export default Route;
