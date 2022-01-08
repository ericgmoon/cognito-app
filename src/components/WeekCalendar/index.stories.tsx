import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import WeekCalendar from '.';

export default {
  title: 'Components/WeekCalendar',
  component: WeekCalendar,
} as ComponentMeta<typeof WeekCalendar>;

const Template: ComponentStory<typeof WeekCalendar> = (args) => <WeekCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  startDatetime: new Date(2021, 11, 25, 12, 30).getTime(),
  data: [
    {
      startDatetime: (new Date(2021, 11, 25, 16, 0)).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'JOIN',
    },
    {
      startDatetime: (new Date(2021, 11, 25, 18, 30)).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'BOOK',
    },
    {
      startDatetime: (new Date(2021, 11, 25, 19, 30)).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'BOOK',
    },
    {
      startDatetime: (new Date(2021, 11, 26, 16, 0)).getTime(),
      duration: 30,
      title: 'Biology',
      subtitle: 'Tutorial',
      action: 'BOOK',
    },
    {
      startDatetime: (new Date(2021, 11, 26, 16, 0)).getTime(),
      duration: 30,
      title: 'Physics',
      subtitle: 'Tutorial',
      color: 'physics',
      action: 'CANCEL',
    },
    {
      startDatetime: (new Date(2021, 11, 27, 20, 0)).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'BOOK',
    },
    {
      startDatetime: (new Date(2021, 11, 30, 12, 0)).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'CANCEL',
    },
  ],
};

export const Today = Template.bind({});
Today.args = {
  startDatetime: new Date().getTime(),
  data: [
    {
      startDatetime: (new Date()).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
      action: 'JOIN',
    },
    {
      startDatetime: (new Date()).getTime(),
      duration: 30,
      title: 'Chemistry',
      subtitle: 'Tutorial',
      color: 'chemistry',
    },
  ],
};
