import React, { useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Divider, ListItemIcon, Menu, MenuItem,
} from '@mui/material';

import {
  Avatar, Gap, MenuLabel, NameLabel, PillContainer,
} from './index.styles';

interface ProfilePillProps {
  onProfileClick?: () => void,
  onSettingsClick?: () => void,
  onSignOutClick?: () => void,
}

const ProfilePill = ({ onProfileClick, onSettingsClick, onSignOutClick }: ProfilePillProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const onClick = (event: React.MouseEvent<HTMLElement>) => setAnchor(event.currentTarget);

  const onClose = () => setAnchor(null);

  return (
    <>
      <PillContainer open={open} onClick={onClick}>
        <Avatar />
        <NameLabel variant="caption">John</NameLabel>
        <Gap />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </PillContainer>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={onClose}
        onClick={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onProfileClick} disableRipple>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <MenuLabel variant="body2">
            Profile
          </MenuLabel>
        </MenuItem>
        <MenuItem onClick={onSettingsClick} disableRipple>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <MenuLabel variant="body2">
            Settings
          </MenuLabel>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onSignOutClick} disableRipple>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <MenuLabel variant="body2">
            Sign Out
          </MenuLabel>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfilePill;
