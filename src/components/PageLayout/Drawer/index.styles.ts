import { Drawer, Toolbar } from '@mui/material';
import styled from 'styled-components';

const ToolbarOffset = styled(Toolbar)`
  && {
    height: 48px;
    min-height: 48px;
  }
`;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiDrawer-paper {
      box-sizing: border-box;
      width: 240px;
    }
  }
`;

const ScrollableContainer = styled.div`
  overflow: auto;
`;

export { StyledDrawer, ToolbarOffset, ScrollableContainer };
