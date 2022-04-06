import React from 'react';

import WeekCalendar from '../../components/WeekCalendar';

const HomePage = () => (
  <WeekCalendar startDatetime={new Date().getTime()} />
);
export default HomePage;
