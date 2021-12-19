import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { getIsUserAuthenticated } from '../../auth';

import AppBar from './AppBar';
import { LoadingContainer } from './index.styles';

const LoadingScreen = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);

interface ContentProps {
  children: React.ReactNode
  decorate: boolean,
}

const Content = ({ children, decorate }: ContentProps) => (
  <>
    {decorate && (
      <AppBar />
    )}
    {children}
  </>
);

interface PageLayoutProps {
  children: React.ReactNode,
  /**
   * Page title
   */
  title: string,
  /**
   * Redirect paths
   */
  redirects?: {
    onAuthRedirect: string,
    onAuthlessRedirect?: undefined
  } | {
    onAuthRedirect?: undefined,
    onAuthlessRedirect: string
  },
  /**
   * The page remaing in loading mode *at least* while this prop is `true`
   */
  loading?: boolean,
  /**
   * If `true`, page decorations such as the AppBar are rendered in
   */
  decorate?: boolean,
}

export const PageLayout = ({
  children,
  redirects,
  loading: isPageLoading = false,
  decorate = false,
  title,
}: PageLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Check the current authentication state
  useEffect(() => {
    // Update the Browser-recognised page title
    document.title = `${title} - Cognito App`;

    // Check if the user is authenticated to determine redirects
    const getAuthStatus = async () => {
      const authState = await getIsUserAuthenticated();
      setIsAuthenticated(authState);
    };
    getAuthStatus();
  }, []);

  // Stop loading once the authentication state is fetched
  useEffect(() => {
    if (isAuthenticated !== null && !isPageLoading) setLoading(false);
  }, [isAuthenticated]);

  const redirectOnAuth = !!redirects?.onAuthRedirect && isAuthenticated === true;

  const redirectOnAuthless = !!redirects?.onAuthlessRedirect && isAuthenticated === false;

  return (
    <>
      {redirectOnAuth && (<Navigate replace to={redirects.onAuthRedirect} />)}
      {redirectOnAuthless && (<Navigate replace to={redirects.onAuthlessRedirect} />)}
      {loading ? <LoadingScreen /> : <Content decorate={decorate}>{children}</Content>}
    </>
  );
};

interface AuthPageLayoutProps {
  children: React.ReactNode,
  title: string,
}

export const AuthPageLayout = ({ children, title }: AuthPageLayoutProps) => (
  <PageLayout redirects={{ onAuthRedirect: '/' }} title={title}>
    {children}
  </PageLayout>
);

interface ProtectedPageLayoutProps {
  children: React.ReactNode,
  title: string,
}

export const ProtectedPageLayout = ({ children, title }: ProtectedPageLayoutProps) => (
  <PageLayout redirects={{ onAuthlessRedirect: '/signin' }} decorate title={title}>
    {children}
  </PageLayout>
);
