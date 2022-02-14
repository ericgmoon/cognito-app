import React from 'react';

import { ProtectedPageLayout } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';

const HomePage = () => (
  <ProtectedPageLayout title="Home">
    <WeekCalendar startDatetime={new Date().getTime()} />
  </ProtectedPageLayout>
);
export default HomePage;
