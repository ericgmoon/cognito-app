import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import AppointmentCard from '.';

export default {
  title: 'Components/AppointmentCard',
  component: AppointmentCard,
} as ComponentMeta<typeof AppointmentCard>;

const Template: ComponentStory<typeof AppointmentCard> = () => <AppointmentCard />;

export const Default = Template.bind({});
