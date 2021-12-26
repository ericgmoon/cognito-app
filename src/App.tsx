import React from 'react';

import './fonts/fonts.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

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
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </BrowserRouter>
      </MUIThemeProvider>
    </ThemeProvider>
  </ReduxProvider>
);

export default App;
