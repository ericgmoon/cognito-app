import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { Badge, Box } from '@mui/material';
import { AppBarProps as MUIAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';

import { signOut } from '../../../auth';
import ProfilePill from '../ProfilePill';

import {
  AppBarDivider, IconButton, ProfilePillContainer, StyledAppBar, Title, Toolbar,
} from './index.styles';

interface AppBarProps extends MUIAppBarProps {
  isMenuOpen?: boolean,
  onMenuClick: () => void
}

const AppBar = ({ isMenuOpen = false, onMenuClick, ...rest }: AppBarProps) => {
  const navigate = useNavigate();

  return (
    <StyledAppBar {...rest}>
      <Toolbar>
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          disableRipple
          onClick={onMenuClick}
        >
          {isMenuOpen ? <ArrowBackIosNewIcon /> : <MenuIcon />}
        </IconButton>
        <Title variant="h6">
          Cognito App
        </Title>
        <AppBarDivider />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="medium"
            color="inherit"
            disableRipple
          >
            <Badge variant="dot" color="primary">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
          <ProfilePillContainer>
            <ProfilePill
              onSignOutClick={() => {
                signOut();
                navigate('/signin');
              }}
            />
          </ProfilePillContainer>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
