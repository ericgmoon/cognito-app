import { Typography } from '@mui/material';
import styled from 'styled-components';

const RootContainer = styled.div`
  width: 100%;
  display: flex;
  flex-orientation: row;
`;

interface CalendarEntryContainerProps {
  countOnScreen: number,
  isToday: boolean | undefined,
}

const CalendarEntryContainer = styled.div<CalendarEntryContainerProps>`
  width: calc(100% / ${({ countOnScreen }) => countOnScreen});
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

export { RootContainer, CalendarEntryContainer, DateHeader, CellContainer, Subtitle };