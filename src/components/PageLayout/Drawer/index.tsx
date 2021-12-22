import React from 'react';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { DrawerProps as MUIDrawerProps } from '@mui/material/Drawer';

import {
  ListHeaderText, ScrollableContainer, StyledDrawer, ToolbarOffset,
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

interface MenuListProps {
  source: MenuOption[],
  header?: string | undefined,
}

const MenuList = ({ header, source }: MenuListProps) => (
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
      <ListItem button key={item.name} disableRipple>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItem>
    ))}
  </List>
);

const Menu = () => (
  <>
    <MenuList source={[{ icon: <HomeIcon />, name: 'Home' }]} />
    <MenuList header="Study" source={studyMenu} />
    <MenuList header="Tools" source={toolsMenu} />
  </>
);

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
