import React from 'react';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { DrawerProps as MUIDrawerProps } from '@mui/material/Drawer';

import {
  ScrollableContainer, StyledDrawer, ToolbarOffset,
} from './index.styles';

interface MenuOption {
  icon: React.ReactElement,
  name: string,
}

const studyMenu: MenuOption[] = [
  {
    icon: <CollectionsBookmarkIcon />,
    name: 'Notes',
  },
  {
    icon: <VideoLibraryIcon />,
    name: 'Videos',
  },
  {
    icon: <QuizIcon />,
    name: 'Quizzes',
  },
];

const toolsMenu: MenuOption[] = [
  {
    icon: <VideoCameraFrontIcon />,
    name: 'Tutorials',
  },
  {
    icon: <AvTimerIcon />,
    name: 'Tracker',
  },
  {
    icon: <AnalyticsIcon />,
    name: 'Analytics',
  },
];

interface DrawerProps extends MUIDrawerProps {
  mode?: 'small' | 'medium',
  onClose?: () => void,
}

const Drawer = ({ mode = 'medium', onClose = () => {}, ...rest }: DrawerProps) => (
  <StyledDrawer
    ModalProps={{
      // Keep Drawer mounted on mobile
      keepMounted: mode === 'small',
    }}
    variant={mode === 'small' ? 'temporary' : 'persistent'}
    onClose={onClose}
    {...rest}
  >
    <ToolbarOffset />
    <ScrollableContainer
      {...(mode === 'small' ? { onClick: onClose, onKeyDown: onClose } : {})}
    >
      <List>
        <ListItem button disableRipple>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {studyMenu.map((option) => (
          <ListItem button key={option.name} disableRipple>
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {toolsMenu.map((option) => (
          <ListItem button key={option.name} disableRipple>
            <ListItemIcon>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.name} />
          </ListItem>
        ))}
      </List>
    </ScrollableContainer>
  </StyledDrawer>
);

export default Drawer;
