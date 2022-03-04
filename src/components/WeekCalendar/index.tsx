import React, {
  useEffect, useRef, useState,
} from 'react';

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
            color={entry.color}
            state={entry.state}
            properties={entry.properties}
          />
        </CellContainer>
      ))}
    </CalendarEntryContainer>
  );
};

interface WeekCalendarProps {
  startDatetime?: number,
  data?: CalendarEntry[],
  onNavigate?: (startDatetime: number) => void,
}

const WeekCalendar = ({ startDatetime: initStartDatetime = new Date().getTime(),
  data = [], onNavigate = () => {} }: WeekCalendarProps) => {
  // Handle changes in the start datetime
  const [startDatetime, setStartDatetime] = useState(initStartDatetime);
  useEffect(() => {
    // Use onNavigate to request new data from APIs
    onNavigate(startDatetime);
  }, [startDatetime]);

  // Get datetime of the start date at 00:00 time
  const startDayDatetime = new Date(startDatetime);
  startDayDatetime.setHours(0, 0, 0, 0);

  // Handle window resizing
  const ref = useRef<HTMLDivElement>();
  const { width } = useDimensions(ref);
  const columnCount = width > 960 ? 7 : Math.ceil(width / 144);

  // Reformat the data into per-day basis
  const dataByDay = splitEntriesByDay(data);

  // Get a subset of the data based on the currently visible columns
  const visibleDays = Array.from(Array(columnCount).keys()).map(
    (x) => startDayDatetime.getTime() + MS_IN_DAY * x,
  );

  // Returns the number of events currently visible
  const getVisibleCellCount = () => {
    let count = 0;
    visibleDays.forEach((datetime) => {
      if (dataByDay[Number(datetime)]) count += dataByDay[Number(datetime)].length;
    });
    return count;
  };

  // Pushes the calendar range forward by the number of visible columns
  const incrementStart = () => setStartDatetime(startDatetime + (columnCount * MS_IN_DAY));

  // Pushes the calendar range backward by the number of visible columns
  const decrementStart = () => setStartDatetime(startDatetime - (columnCount * MS_IN_DAY));

  // Reset the calendar range to begin from the current day
  const resetStartToToday = () => setStartDatetime(new Date().getTime());

  return (
    <RootContainer ref={ref as React.RefObject<HTMLDivElement>}>
      <CalendarToolbar>
        <TodayButton
          variant="outlined"
          onClick={resetStartToToday}
          color="darkGray"
          disableRipple
        >
          TODAY
        </TodayButton>
        <IconButton onClick={decrementStart}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={incrementStart}>
          <ChevronRightIcon />
        </IconButton>
      </CalendarToolbar>
      <ColumnContainer>
        {visibleDays.map((datetime) => (
          <CalendarColumn
            key={datetime}
            highlightToday={getVisibleCellCount() > 0}
            datetime={Number(datetime)}
            contents={dataByDay[Number(datetime)]}
            columnCount={columnCount}
          />
        ))}
      </ColumnContainer>
      {getVisibleCellCount() === 0 && (
        <NoDataContainer variant="body1">
          Nothing to display
        </NoDataContainer>
      )}
    </RootContainer>
  );
};

export default WeekCalendar;
