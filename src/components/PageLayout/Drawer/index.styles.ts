import {
  Drawer, ListItemText, Toolbar,
} from '@mui/material';
import styled from 'styled-components';

const ToolbarOffset = styled(Toolbar)`
  && {
    height: ${({ theme }) => theme.shape.drawerHeight}px;
    min-height: ${({ theme }) => theme.shape.drawerHeight}px;
  }
`;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiDrawer-paper {
      box-sizing: border-box;
      width: ${({ theme }) => theme.shape.drawerWidth}px;
    }
  }
`;

const ScrollableContainer = styled.div`
  overflow: auto;
`;

const ListHeaderText = styled(ListItemText)`
  && {
    & .MuiListItemText-primary {
      font-weight: bold;
      color: ${({ theme }) => theme.palette.highlight.main}
    }
  }
`;

export { StyledDrawer, ToolbarOffset, ScrollableContainer, ListHeaderText };
