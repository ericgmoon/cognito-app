import React from 'react';

import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthPageLayout, ProtectedPageLayout } from './components/PageLayout';
import {
  AnalyticsPage,
  HomePage,
  NotesPage,
  QuizzesPage,
  SignInPage,
  SignUpPage,
  TrackerPage,
  TutorialsPage,
  VideosPage,
} from './pages';
import { store } from './redux/store';
import theme from './theme';

const App = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/signin"
              element={(
                <AuthPageLayout title="Sign In">
                  <SignInPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/signup"
              element={(
                <AuthPageLayout title="Sign Up">
                  <SignUpPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/"
              element={(
                <ProtectedPageLayout title="Home">
                  <HomePage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/notes"
              element={(
                <ProtectedPageLayout title="Notes">
                  <NotesPage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/videos"
              element={(
                <ProtectedPageLayout title="Videos">
                  <VideosPage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/quizzes"
              element={(
                <ProtectedPageLayout title="Quizzes">
                  <QuizzesPage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/tutorials"
              element={(
                <ProtectedPageLayout title="Tutorials">
                  <TutorialsPage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/tracker"
              element={(
                <ProtectedPageLayout title="Tracker">
                  <TrackerPage />
                </ProtectedPageLayout>
              )}
            />
            <Route
              path="/analytics"
              element={(
                <ProtectedPageLayout title="Analytics">
                  <AnalyticsPage />
                </ProtectedPageLayout>
              )}
            />
          </Routes>
        </BrowserRouter>
      </MUIThemeProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
