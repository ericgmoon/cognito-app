import React from 'react';

import { ProtectedPageLayout, TitleWrapper } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';

const HomePage = () => (
  <ProtectedPageLayout title="Home">
    <TitleWrapper title="Your Schedule">
      <WeekCalendar startDatetime={new Date().getTime()} />
    </TitleWrapper>
  </ProtectedPageLayout>
);
export default HomePage;
