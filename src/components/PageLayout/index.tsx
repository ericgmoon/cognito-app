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

interface PageLayoutProps {
  children: React.ReactNode,
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
}: PageLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Check the current authentication state
  useEffect(() => {
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

  const content = (
    <>
      {decorate && <AppBar />}
      {children}
    </>
  );

  return (
    <>
      {redirectOnAuth && (<Navigate replace to={redirects.onAuthRedirect} />)}
      {redirectOnAuthless && (<Navigate replace to={redirects.onAuthlessRedirect} />)}
      {loading ? <LoadingScreen /> : content}
    </>
  );
};

interface AuthPageLayoutProps {
  children: React.ReactNode,
}

export const AuthPageLayout = ({ children }: AuthPageLayoutProps) => (
  <PageLayout redirects={{ onAuthRedirect: '/' }}>
    {children}
  </PageLayout>
);

interface ProtectedPageLayoutProps {
  children: React.ReactNode,
}

export const ProtectedPageLayout = ({ children }: ProtectedPageLayoutProps) => (
  <PageLayout redirects={{ onAuthlessRedirect: '/signin' }} decorate>
    {children}
  </PageLayout>
);
