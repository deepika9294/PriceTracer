import { Route, Redirect } from 'react-router-dom';
// import React, {useState, useEffect } from 'react';


const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={
          props => {
            if (user) {
              return <Component {...rest} {...props} />
            } else {
              return <Redirect to= "/" />
            }
          }
        } />
      )
}

export default ProtectedRoute;