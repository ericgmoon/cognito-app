import React, { useState } from 'react';

import { ProtectedPageLayout, TitleWrapper } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';
import { useGetTutorialsInRangeQuery } from '../../services/tutorials';

const MSINWEEK = 604800000;
const MSINHOUR = 3600000;

const TutorialsPage = () => {
  const [physArgs] = useState({
    startDatetime: Date.now() - 2 * MSINHOUR, endDatetime: Date.now() + 2 * MSINWEEK, course: 'phys11',
  });
  const [chemArgs] = useState({
    startDatetime: Date.now() - 2 * MSINHOUR, endDatetime: Date.now() + 2 * MSINWEEK, course: 'chem11',
  });
  const { data: physTutorials } = useGetTutorialsInRangeQuery(physArgs);
  const { data: chemTutorials } = useGetTutorialsInRangeQuery(chemArgs);
  return (
    <ProtectedPageLayout title="Tutorials">
      <TitleWrapper title="Your Tutorials">
        <WeekCalendar startDatetime={new Date().getTime()} />
      </TitleWrapper>
      <TitleWrapper title="All Tutorials">
        <WeekCalendar
          startDatetime={new Date().getTime()}
          data={physTutorials?.concat(chemTutorials ?? [])}
        />
      </TitleWrapper>
    </ProtectedPageLayout>
  );
};
export default TutorialsPage;
