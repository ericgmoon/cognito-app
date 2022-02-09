import { Button, Typography } from '@mui/material';
import styled from 'styled-components';

const RootContainer = styled.div`
  width: 100%;
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-orientation: row;
`;

interface CalendarEntryContainerProps {
  columnCount: number,
  isToday: boolean | undefined,
}

const CalendarEntryContainer = styled.div<CalendarEntryContainerProps>`
  width: calc(100% / ${({ columnCount }) => columnCount});
  background-color: ${({ isToday, theme }) => (isToday ? theme.palette.gray.main : 'transparent')};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

const DateHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.dark};
`;

const CellContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  max-width: 90%;
  display: flex;
  justify-content: center;
`;

interface TextProps {
  isToday: boolean | undefined,
}

const Subtitle = styled(Typography)<TextProps>`
  && {
    font-weight: ${({ isToday }) => (isToday ? 600 : 500)};
  }
`;

const NoDataContainer = styled(Typography)`
  && {
    text-align: center;
    margin-top: 48px;
    margin-bottom: 48px;
    user-select: none;
  }
`;

const CalendarToolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

const TodayButton = styled(Button)`
  && {
    height: 36px;
    margin-left: ${({ theme }) => theme.spacing(1)};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;

export { RootContainer,
  ColumnContainer,
  CalendarEntryContainer,
  DateHeader,
  CellContainer,
  CalendarToolbar,
  Subtitle,
  TodayButton,
  NoDataContainer };
