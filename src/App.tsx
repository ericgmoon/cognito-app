import React from 'react';

import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthPageLayout } from './components/PageLayout';
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
                <AuthPageLayout title="Home">
                  <HomePage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/notes"
              element={(
                <AuthPageLayout title="Notes">
                  <NotesPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/videos"
              element={(
                <AuthPageLayout title="Videos">
                  <VideosPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/quizzes"
              element={(
                <AuthPageLayout title="Quizzes">
                  <QuizzesPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/tutorials"
              element={(
                <AuthPageLayout title="Tutorials">
                  <TutorialsPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/tracker"
              element={(
                <AuthPageLayout title="Tracker">
                  <TrackerPage />
                </AuthPageLayout>
              )}
            />
            <Route
              path="/analytics"
              element={(
                <AuthPageLayout title="Analytics">
                  <AnalyticsPage />
                </AuthPageLayout>
              )}
            />
          </Routes>
        </BrowserRouter>
      </MUIThemeProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
