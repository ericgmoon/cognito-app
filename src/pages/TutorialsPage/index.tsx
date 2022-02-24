import React, { useState } from 'react';

import { ProtectedPageLayout, TitleWrapper } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';
import { useGetTutorialsInRangeQuery } from '../../services/tutorials';

const TutorialsPage = () => {
  const [physArgs] = useState({
    startDatetime: 1645516581081, endDatetime: 1646053200000, course: 'phys11',
  });
  const [chemArgs] = useState({
    startDatetime: 1645516581081, endDatetime: 1646053200000, course: 'chem11',
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
