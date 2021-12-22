import React from 'react';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { DrawerProps as MUIDrawerProps } from '@mui/material/Drawer';
import { useLocation } from 'react-router-dom';

import {
  ListHeaderText, ScrollableContainer, StyledDrawer, ToolbarOffset,
} from './index.styles';

interface MenuOption {
  icon: React.ReactElement,
  name: string,
  href: string,
}

const homeMenu: MenuOption[] = [
  {
    icon: <HomeIcon />,
    name: 'Home',
    href: '/',
  },
];

const studyMenu: MenuOption[] = [
  {
    icon: <CollectionsBookmarkIcon />,
    name: 'Notes',
    href: '/notes',
  },
  {
    icon: <VideoLibraryIcon />,
    name: 'Videos',
    href: '/videos',
  },
  {
    icon: <QuizIcon />,
    name: 'Quizzes',
    href: '/quizzes',
  },
];

const toolsMenu: MenuOption[] = [
  {
    icon: <VideoCameraFrontIcon />,
    name: 'Tutorials',
    href: '/tutorials',
  },
  {
    icon: <AvTimerIcon />,
    name: 'Tracker',
    href: '/tracker',
  },
  {
    icon: <AnalyticsIcon />,
    name: 'Analytics',
    href: '/analytics',
  },
];

interface MenuListProps {
  source: MenuOption[],
  header?: string | undefined,
  currentPath?: string | undefined,
}

const MenuList = ({ header, source, currentPath }: MenuListProps) => (
  <List>
    {header && (
      <ListItem>
        <ListHeaderText
          primary={header}
          primaryTypographyProps={{ variant: 'overline' }}
        />
      </ListItem>
    )}
    {source.map((item) => (
      <ListItemButton
        selected={item.href === currentPath}
        key={item.name}
        disableRipple
      >
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItemButton>
    ))}
  </List>
);

interface MenuProps {
  currentPath?: string | undefined,
}

const Menu = ({ currentPath }: MenuProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <MenuList source={homeMenu} currentPath={currentPath || pathname} />
      <MenuList header="Study" source={studyMenu} currentPath={currentPath || pathname} />
      <MenuList header="Tools" source={toolsMenu} currentPath={currentPath || pathname} />
    </>
  );
};

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
      <Menu />
    </ScrollableContainer>
  </StyledDrawer>
);

export default Drawer;
