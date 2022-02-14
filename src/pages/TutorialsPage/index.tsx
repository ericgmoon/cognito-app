import React from 'react';

import { ProtectedPageLayout } from '../../components/PageLayout';
import WeekCalendar from '../../components/WeekCalendar';

const TutorialsPage = () => (
  <ProtectedPageLayout title="Tutorials">
    <WeekCalendar startDatetime={new Date().getTime()} />
  </ProtectedPageLayout>
);
export default TutorialsPage;
