import React from 'react';

import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthRoute, ProtectedRoute } from './components/Route';
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
            <AuthRoute path="/signin" pageTitle="Sign In" element={<SignInPage />} />
            <AuthRoute path="/signup" pageTitle="Sign Up" element={<SignUpPage />} />
            <ProtectedRoute path="/" pageTitle="Home" element={<HomePage />} />
            <ProtectedRoute path="/notes" pageTitle="Notes" element={<NotesPage />} />
            <ProtectedRoute path="/videos" pageTitle="Videos" element={<VideosPage />} />
            <ProtectedRoute path="/quizzes" pageTitle="Quizzes" element={<QuizzesPage />} />
            <ProtectedRoute path="/tutorials" pageTitle="Tutorials" element={<TutorialsPage />} />
            <ProtectedRoute path="/tracker" pageTitle="Tracker" element={<TrackerPage />} />
            <ProtectedRoute path="/analytics" pageTitle="Analytics" element={<AnalyticsPage />} />
          </Routes>
        </BrowserRouter>
      </MUIThemeProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
