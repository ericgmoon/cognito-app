import { Drawer, Toolbar } from '@mui/material';
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

export { StyledDrawer, ToolbarOffset, ScrollableContainer };
