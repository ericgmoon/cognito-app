import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import EventCell from '.';

export default {
  title: 'Components/EventCell',
  component: EventCell,
} as ComponentMeta<typeof EventCell>;

const Template: ComponentStory<typeof EventCell> = (args) => <EventCell {...args} />;

export const Tutorial = Template.bind({});
Tutorial.args = {
  startDatetime: new Date().getTime(),
  duration: 30,
  color: 'chemistry',
  title: 'Chemistry',
  subtitle: 'Tutorial',
};

export const TutorialBook = Template.bind({});
TutorialBook.args = {
  startDatetime: new Date().getTime(),
  duration: 30,
  color: 'chemistry',
  title: 'Chemistry',
  subtitle: 'Tutorial',
  actionButton: {
    text: 'Book',
    onClick: () => {},
  },
};

export const TutorialCancel = Template.bind({});
TutorialBook.args = {
  startDatetime: new Date().getTime(),
  duration: 30,
  color: 'chemistry',
  title: 'Chemistry',
  subtitle: 'Tutorial',
  actionButton: {
    text: 'Cancel',
    onClick: () => {},
    color: 'error',
  },
};
