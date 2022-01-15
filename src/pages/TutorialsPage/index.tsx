import React from 'react';

import { ProtectedPageLayout, TitleWrapper } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';

const TutorialsPage = () => (
  <ProtectedPageLayout title="Tutorials">
    <TitleWrapper title="Your Tutorials">
      <WeekCalendar startDatetime={new Date().getTime()} />
    </TitleWrapper>
    <TitleWrapper title="All Tutorials">
      <WeekCalendar startDatetime={new Date().getTime()} />
    </TitleWrapper>
  </ProtectedPageLayout>
);
export default TutorialsPage;
