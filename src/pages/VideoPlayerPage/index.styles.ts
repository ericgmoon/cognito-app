import { ListSubheader, Typography } from '@mui/material';
import styled from 'styled-components';

const TitleBarContainer = styled.div`
    padding-top: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

interface ColumnContainerProps {
  stack: boolean;
}

const ColumnContainer = styled.div<ColumnContainerProps>`
    display: flex;
    flex-direction: ${({ stack }) => (stack ? 'column' : 'row')};
`;

interface Column {
  stack: boolean;
}

const PlayerColumn = styled.div<Column>`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const AboutWrapper = styled.div`
    padding-top: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const UtilColumn = styled.div<Column>`
    display: flex;
    flex-direction: column;
    width: ${({ stack }) => (stack ? '100%' : '40%')};
    margin-top: ${({ stack, theme }) => (stack ? theme.spacing(2) : '0px')};
    margin-left: ${({ stack, theme }) => (stack ? '0px' : theme.spacing(2))};
`;

const BreadcrumbsWrapper = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    margin-left: ${({ theme }) => theme.spacing(1)};
`;

const SidebarHeaderWrapper = styled(ListSubheader)`
    && {
        color: ${({ theme }) => theme.palette.secondary.main};
        user-select: none;
    }
`;

const SidebarHeader = styled(Typography)`
    && {
        font-weight: 600;
    }
`;

interface Selectable {
  selected?: boolean
}

const ListIndexLabel = styled.span<Selectable>`
    color: ${({ theme, selected }) => (selected ? theme.palette.error.main : theme.palette.secondary.main)};
    font-weight: 600;
`;

const ListLabel = styled.span<Selectable>`
    color: ${({ theme, selected }) => (selected ? theme.palette.error.main : 'inherit')};
    font-weight: ${({ selected }) => (selected ? 600 : -1)};
`;

export { TitleBarContainer,
  AboutWrapper,
  ColumnContainer,
  PlayerColumn,
  ListIndexLabel,
  ListLabel,
  SidebarHeaderWrapper,
  SidebarHeader,
  UtilColumn,
  BreadcrumbsWrapper };
