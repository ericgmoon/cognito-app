import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../redux/hooks';
import { getIsUserAuthenticated } from '../../services/auth';

import AppBar from './AppBar';
import Drawer from './Drawer';
import {
  close, toggle,
} from './drawerOpenSlice';
import {
  ContentContainer, LoadingContainer, MediumMain, Nav, SmallMain, Title,
} from './index.styles';

interface LoadingWrapperProps {
  children: React.ReactElement | React.ReactElement[],
  decorate: boolean,
  loading: boolean,
}

const LoadingWrapper = ({ children, loading, decorate }: LoadingWrapperProps) => (loading ? (
  <LoadingContainer decorate={decorate}>
    <CircularProgress />
  </LoadingContainer>
) : (
  // react/jsx-no-useless-fragment is disabled here as LoadingWrapper must return a single element
  // and `children` may be an array of elements
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {children}
  </>
));

interface ContentProps {
  children: React.ReactElement | React.ReactElement[],
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
  children: React.ReactElement | React.ReactElement[],
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
  children: React.ReactElement | React.ReactElement[],
  title: string,
}

export const AuthPageLayout = ({ children, title }: AuthPageLayoutProps) => (
  <PageLayout redirects={{ onAuthRedirect: '/' }} title={title}>
    {children}
  </PageLayout>
);

interface ProtectedPageLayoutProps {
  children: React.ReactElement | React.ReactElement[],
  title: string,
}

export const ProtectedPageLayout = ({ children, title }: ProtectedPageLayoutProps) => (
  <PageLayout redirects={{ onAuthlessRedirect: '/signin' }} decorate title={title}>
    {children}
  </PageLayout>
);

interface TitleWrapperProps {
  children: React.ReactElement | React.ReactElement[],
  title: string,
}

export const TitleWrapper = ({ children, title }: TitleWrapperProps) => (
  <>
    <Title variant="h6">{title}</Title>
    {children}
  </>
);
