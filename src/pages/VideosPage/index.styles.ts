import { Typography } from '@mui/material';
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

const UtilHeadingWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const UtilHeadingIconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.palette.secondary.main};
`;

const UtilHeading = styled(Typography)`
    && {
        color: ${({ theme }) => theme.palette.secondary.main};
        font-weight: bold;
    }
`;

const ResourcesList = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ResourceLinkWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const NewWindowIconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 4px;
`;

const UtilDividerGap = styled.div`
    height: ${({ theme }) => theme.spacing(2)};
`;

export { TitleBarContainer,
  AboutWrapper,
  ColumnContainer,
  PlayerColumn,
  UtilColumn,
  UtilHeadingIconWrapper,
  BreadcrumbsWrapper,
  UtilHeadingWrapper,
  UtilHeading,
  ResourcesList,
  NewWindowIconWrapper,
  ResourceLinkWrapper,
  UtilDividerGap };
