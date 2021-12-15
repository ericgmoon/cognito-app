import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { getIsUserAuthenticated } from '../../auth';

import { LoadingContainer } from './index.styles';

const LoadingScreen = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);

interface PageLayoutProps {
  children: React.ReactNode,
  redirects?: {
    onAuthRedirect: string,
    onAuthlessRedirect?: undefined
  } | {
    onAuthRedirect?: undefined,
    onAuthlessRedirect: string
  },
  loading?: boolean,
}

export const PageLayout = ({
  children,
  redirects,
  loading: isPageLoading = false,
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

  return (
    <>
      {redirectOnAuth && (<Navigate replace to={redirects.onAuthRedirect} />)}
      {redirectOnAuthless && (<Navigate replace to={redirects.onAuthlessRedirect} />)}
      {loading ? <LoadingScreen /> : children}
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
  <PageLayout redirects={{ onAuthlessRedirect: '/signin' }}>
    {children}
  </PageLayout>
);
