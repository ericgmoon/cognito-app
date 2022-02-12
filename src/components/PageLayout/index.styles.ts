import {
  Alert, Box, Typography,
} from '@mui/material';
import styled from 'styled-components';

interface LoadingContainerProps {
  decorate: boolean,
}

const LoadingContainer = styled.div<LoadingContainerProps>`
  height: ${({ decorate, theme }) => (decorate ? `calc(100vh - ${theme.shape.appbarHeight * 2}px)` : '100vh')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface MainProps {
  open: boolean;
}

const MediumMain = styled(Box)<MainProps>`
  width: calc(100% - ${({ theme }) => theme.shape.drawerWidth}px);
  flex-grow: 1;
  margin-top: ${({ theme }) => theme.shape.appbarHeight}px;
  margin-left: ${({ open, theme }) => (open ? `${theme.shape.drawerWidth}px` : 0)};
  transition: ${({ open, theme }) => (open ?
    theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }) : theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }))};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const SmallMain = styled(Box)<MainProps>`
  width: 100%;
  margin-top: ${({ theme }) => theme.shape.appbarHeight}px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Nav = styled(Box)``;

const Title = styled(Typography)`
  && {
    color: ${({ theme }) => theme.palette.secondary.main};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    font-weight: bold;
  }
`;

const SnackbarAlert = styled(Alert)`
  && {
    width: 100%;
  }
`;

export { LoadingContainer, SmallMain, MediumMain, ContentContainer, Nav, Title, SnackbarAlert };
