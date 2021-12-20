import {
  AppBar, Box, IconButton as MUIIconButton, Toolbar as MUIToolbar, Typography,
} from '@mui/material';
import styled from 'styled-components';

const Toolbar = styled(MUIToolbar)`
  && {
    height: 48px;
    min-height: 48px;
  }
`;

const Title = styled(Typography)`
  && {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    user-select: none;
    font-size: small;
  }
`;

const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${({ theme }) => theme.palette.darkPrimary.main};
    /* Paint AppBar above navigation drawer */
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  }
`;

const AppBarDivider = styled(Box)`
  && {
    flex-grow: 1;
  }
`;

const IconButton = styled(MUIIconButton)`
  && {
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;

const ProfilePillContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
`;

export { Toolbar,
  Title,
  StyledAppBar,
  AppBarDivider,
  IconButton,
  ProfilePillContainer };
