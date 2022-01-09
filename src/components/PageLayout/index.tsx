import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate } from 'react-router-dom';

import { getIsUserAuthenticated } from '../../auth';
import { useDispatch, useSelector } from '../../redux/hooks';

import AppBar from './AppBar';
import Drawer from './Drawer';
import {
  close, toggle,
} from './drawerOpenSlice';
import {
  ContentContainer, LoadingContainer, MediumMain, Nav, SmallMain,
} from './index.styles';

interface LoadingWrapperProps {
  children: React.ReactElement,
  decorate: boolean,
  loading: boolean,
}

const LoadingWrapper = ({ children, loading, decorate }: LoadingWrapperProps) => (loading ? (
  <LoadingContainer decorate={decorate}>
    <CircularProgress />
  </LoadingContainer>
) : children);

interface ContentProps {
  children: React.ReactElement
  decorate: boolean,
  loading: boolean,
}

const Content = ({ children, decorate, loading }: ContentProps) => {
  const theme = useTheme();
  const open: boolean = useSelector((state) => state.drawerOpen.value);
  const dispatch = useDispatch();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (decorate ? (
    <ContentContainer>
      <AppBar position="fixed" isDrawerOpen={open} onDrawerButtonClick={() => dispatch(toggle())} />
      <Nav component="nav">
        <Drawer
          open={open}
          onClose={() => dispatch(close())}
          mode={isMd ? 'medium' : 'small'}
        />
      </Nav>
      {isMd ? (
        <MediumMain
          component="main"
          open={open}
        >
          <LoadingWrapper loading={loading} decorate={decorate}>
            {children}
          </LoadingWrapper>
        </MediumMain>
      ) : (
        <SmallMain
          component="main"
          open={open}
        >
          <LoadingWrapper loading={loading} decorate={decorate}>
            {children}
          </LoadingWrapper>
        </SmallMain>
      )}
    </ContentContainer>
  ) : (
    <LoadingWrapper loading={loading} decorate={decorate}>
      {children}
    </LoadingWrapper>
  ));
};

interface PageLayoutProps {
  children: React.ReactElement,
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
      <Content decorate={decorate} loading={loading}>{children}</Content>
    </>
  );
};

interface AuthPageLayoutProps {
  children: React.ReactElement,
  title: string,
}

export const AuthPageLayout = ({ children, title }: AuthPageLayoutProps) => (
  <PageLayout redirects={{ onAuthRedirect: '/' }} title={title}>
    {children}
  </PageLayout>
);

interface ProtectedPageLayoutProps {
  children: React.ReactElement,
  title: string,
}

export const ProtectedPageLayout = ({ children, title }: ProtectedPageLayoutProps) => (
  <PageLayout redirects={{ onAuthlessRedirect: '/signin' }} decorate title={title}>
    {children}
  </PageLayout>
);
