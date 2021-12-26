import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import EventCell from '.';

export default {
  title: 'Components/EventCell',
  component: EventCell,
} as ComponentMeta<typeof EventCell>;

const Template: ComponentStory<typeof EventCell> = (args) => <EventCell {...args} />;

export const Default = Template.bind({});
Default.args = {
  startDatetime: new Date().getTime(),
  duration: 30,
  title: 'Chemistry',
  subtitle: 'Tutorial',
};
