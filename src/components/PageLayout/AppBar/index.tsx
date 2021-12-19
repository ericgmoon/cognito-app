import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import {
  Badge, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { signOut } from '../../../auth';
import ProfilePill from '../ProfilePill';

import {
  AppBarDivider, IconButton, ProfilePillContainer, StyledAppBar, Title, Toolbar,
} from './index.styles';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          disableRipple
        >
          <MenuIcon />
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
