import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import FixedLengthField from '.';

export default {
  title: 'Components/FixedLengthField',
  component: FixedLengthField,
} as ComponentMeta<typeof FixedLengthField>;

const Template: ComponentStory<typeof FixedLengthField> = (args) => <FixedLengthField {...args} />;

export const Default = Template.bind({});

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  prefix: '+61',
  displayedPrefix: '04',
  maxLength: 8,
  numbersOnly: true,
};
