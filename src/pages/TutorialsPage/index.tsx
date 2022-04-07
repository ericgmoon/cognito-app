import React, { useState } from 'react';

import { TitleWrapper } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';
import { useGetTutorialsInRangeQuery } from '../../services/tutorials';

const MSINWEEK = 604800000;
const MSINHOUR = 3600000;

const TutorialsPage = () => {
  const [args] = useState({
    startDatetime: Date.now() - 2 * MSINHOUR, endDatetime: Date.now() + 2 * MSINWEEK, courses: 'phys11,chem11',
  });

  const { data } = useGetTutorialsInRangeQuery(args);
  return (
    <>
      <TitleWrapper title="Your Tutorials">
        <WeekCalendar startDatetime={new Date().getTime()} />
      </TitleWrapper>
      <TitleWrapper title="All Tutorials">
        <WeekCalendar
          startDatetime={new Date().getTime()}
          data={data}
        />
      </TitleWrapper>
    </>
  );
};
export default TutorialsPage;
