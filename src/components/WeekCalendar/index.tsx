import React from 'react';

import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import EventCell from '../EventCell';

import {
  CalendarEntryContainer,
  CellContainer,
  DateHeader,
  RootContainer,
  Subtitle,
} from './index.styles';
import { CalendarEntry } from './types';
import { isToday, splitEntriesByDay } from './utils';

const DAYS = [
  'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',
];
const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const TODAY = 'TODAY';

const MS_IN_DAY = 1000 * 60 * 60 * 24;

interface CalendarColumnProps {
  datetime: number,
  contents?: CalendarEntry[],
  countOnScreen: number,
}

const CalendarColumn = ({ datetime, contents = [], countOnScreen }: CalendarColumnProps) => {
  const date = new Date(datetime);
  const today = isToday(datetime);

  const getActionButton = (action: string | undefined) : {
    text: string,
    onClick: () => void,
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray' | undefined,
    online?: boolean,
  } | undefined => {
    switch (action) {
      case 'BOOK':
        return {
          text: 'BOOK',
          onClick: () => {},
          color: 'secondary',
        };
      case 'JOIN':
        return {
          text: 'JOIN',
          onClick: () => {},
          color: 'success',
        };
      case 'CANCEL':
        return {
          text: 'CANCEL',
          onClick: () => {},
          color: 'error',
        };
      case 'FULL':
        return {
          text: 'FULL',
          onClick: () => {},
        };
      default:
        return undefined;
    }
  };

  return (
    <CalendarEntryContainer countOnScreen={countOnScreen} isToday={today}>
      <DateHeader>
        <Typography variant="overline">{date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/{MONTHS[date.getMonth()]}</Typography>
        <Subtitle variant="subtitle2" isToday={today}>
          {today ? TODAY : DAYS[date.getDay()]}
        </Subtitle>
      </DateHeader>
      {contents.map((entry) => (
        <CellContainer>
          <EventCell
            startDatetime={entry.startDatetime}
            duration={entry.duration}
            title={entry.title}
            subtitle={entry.subtitle}
            color={entry.color}
            actionButton={getActionButton(entry.action)}
          />
        </CellContainer>
      ))}
    </CalendarEntryContainer>
  );
};

interface WeekCalendarProps {
  startDatetime?: number,
  data?: CalendarEntry[],
}

const WeekCalendar = ({ startDatetime = new Date().getTime(), data = [] }: WeekCalendarProps) => {
  const startDayDatetime = new Date(startDatetime);
  startDayDatetime.setHours(0, 0, 0, 0);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const displayedDays = Array.from(Array(isMd ? 7 : 3).keys()).map(
    (x) => startDayDatetime.getTime() + MS_IN_DAY * x,
  );

  return (
    <RootContainer>
      {displayedDays.map((dayDatetime) => (
        <CalendarColumn
          key={dayDatetime}
          datetime={Number(dayDatetime)}
          contents={splitEntriesByDay(data)[Number(dayDatetime)]}
          countOnScreen={isMd ? 7 : 3}
        />
      ))}
    </RootContainer>
  );
};

export default WeekCalendar;
