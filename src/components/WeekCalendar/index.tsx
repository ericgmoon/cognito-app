import React, { useRef } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  IconButton, Typography,
} from '@mui/material';

import useDimensions from '../../utils/react/hooks/useDimensions';
import EventCell from '../EventCell';

import {
  CalendarEntryContainer,
  CalendarToolbar,
  CellContainer,
  ColumnContainer,
  DateHeader,
  NoDataContainer,
  RootContainer,
  Subtitle,
  TodayButton,
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
  columnCount: number,
  highlightToday?: boolean,
}

const CalendarColumn = (
  { datetime, contents = [], columnCount, highlightToday = true }: CalendarColumnProps,
) => {
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
          online: true,
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
    <CalendarEntryContainer columnCount={columnCount} isToday={today && highlightToday}>
      <DateHeader>
        <Typography variant="overline">{date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/{MONTHS[date.getMonth()]}</Typography>
        <Subtitle variant="subtitle2" isToday={today && highlightToday}>
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
            disabled={entry.action === 'FULL'}
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

  const ref = useRef<HTMLDivElement>();
  const { width } = useDimensions(ref);
  const columnCount = width > 960 ? 7 : Math.ceil(width / 144);

  const dataByDay = splitEntriesByDay(data);

  const displayedDays = Array.from(Array(columnCount).keys()).map(
    (x) => startDayDatetime.getTime() + MS_IN_DAY * x,
  );

  const getDisplayedCellCount = () => {
    let count = 0;
    displayedDays.forEach((datetime) => {
      if (dataByDay[Number(datetime)]) count += dataByDay[Number(datetime)].length;
    });
    return count;
  };

  return (
    <RootContainer ref={ref as React.RefObject<HTMLDivElement>}>
      <CalendarToolbar>
        <TodayButton
          variant="outlined"
          onClick={() => {}}
          color="darkGray"
          disableRipple
        >
          TODAY
        </TodayButton>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </CalendarToolbar>
      <ColumnContainer>
        {displayedDays.map((datetime) => (
          <CalendarColumn
            key={datetime}
            highlightToday={getDisplayedCellCount() > 0}
            datetime={Number(datetime)}
            contents={dataByDay[Number(datetime)]}
            columnCount={columnCount}
          />
        ))}
      </ColumnContainer>
      {getDisplayedCellCount() === 0 && (
        <NoDataContainer variant="body1">
          Nothing to display
        </NoDataContainer>
      )}
    </RootContainer>
  );
};

export default WeekCalendar;
