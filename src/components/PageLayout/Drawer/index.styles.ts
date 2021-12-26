import {
  Drawer, List, ListItemButton as MUIListItemButton, ListItemText as MUIListItemText, Toolbar,
} from '@mui/material';
import { ListItemTextProps as MUIListItemTextProps } from '@mui/material/ListItemText';
import styled from 'styled-components';

const ToolbarOffset = styled(Toolbar)`
  && {
    height: ${({ theme }) => theme.shape.appbarHeight}px;
    min-height: ${({ theme }) => theme.shape.appbarHeight}px;
  }
`;

const StyledDrawer = styled(Drawer)`
  && {
    & .MuiDrawer-paper {
      box-sizing: border-box;
      width: ${({ theme }) => theme.shape.drawerWidth}px;
      background-color: ${({ theme }) => theme.palette.gray.light};
    }
  }
`;

const ScrollableContainer = styled.div`
  overflow: auto;
`;

const ListHeaderText = styled(MUIListItemText)`
  && {
    & .MuiListItemText-primary {
      font-weight: bold;
      color: ${({ theme }) => theme.palette.highlight.main}
    }
  }
`;

interface ListItemTextProps extends MUIListItemTextProps {
  selected: boolean,
}

const ListItemText = styled(MUIListItemText)<ListItemTextProps>`
  && {
    & .MuiListItemText-primary {
      font-weight: ${({ selected }) => selected && 600};
    }
  }
`;

const StyledList = styled(List)`
  && {
    & .Mui-selected {
      color: ${({ theme }) => theme.palette.primary.dark};
      border-right: 4px solid ${({ theme }) => theme.palette.primary.dark};
      background-color: ${({ theme }) => theme.palette.primary.light};
      &:hover {
        background-color: ${({ theme }) => theme.palette.primary.light}b3;
        border-right: 4px solid ${({ theme }) => theme.palette.primary.dark};
      }
    }
  }
`;

const ListItemButton = styled(MUIListItemButton)`
  && {
    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.light};
      border-right: 4px solid ${({ theme }) => theme.palette.primary.dark}66;
    }
  }
`;

export { StyledList,
  StyledDrawer,
  ToolbarOffset,
  ScrollableContainer,
  ListItemText,
  ListItemButton,
  ListHeaderText };
