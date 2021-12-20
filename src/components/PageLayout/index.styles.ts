import { Box } from '@mui/material';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  height: 100vh;
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
  margin-top: 48px;
  margin-left: ${({ open, theme }) => (open ? 0 : `-${theme.shape.drawerWidth}px`)};
  transition: ${({ open, theme }) => (open ?
    theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }) : theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }))};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const SmallMain = styled(Box)<MainProps>`
  margin-top: 48px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Nav = styled(Box)``;

export { LoadingContainer, SmallMain, MediumMain, ContentContainer, Nav };
