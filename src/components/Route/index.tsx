import React from 'react';

import { Route, RouteProps } from 'react-router';

import { PageLayout } from '../PageLayout';

interface AuthRouteProps extends RouteProps{
  pageTitle: string,
}

export const AuthRoute = (
  { element, pageTitle, ...props }: AuthRouteProps,
) => (
  <Route
    {...props}
    element={(
      <PageLayout redirects={{ onAuthRedirect: '/' }} title={pageTitle}>
        {element || <div />}
      </PageLayout>
    )}
  />
);

interface ProtectedRouteProps extends RouteProps{
  pageTitle: string,
}

export const ProtectedRoute = (
  { element, pageTitle, ...props }: ProtectedRouteProps,
) => (
  <Route
    {...props}
    element={(
      <PageLayout redirects={{ onAuthlessRedirect: '/signin' }} decorate title={pageTitle}>
        {element || <div />}
      </PageLayout>
    )}
  />
);
