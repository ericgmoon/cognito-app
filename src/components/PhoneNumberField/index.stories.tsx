import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import PhoneNumberField from '.';

export default {
  title: 'Components/PhoneNumberField',
  component: PhoneNumberField,
} as ComponentMeta<typeof PhoneNumberField>;

const Template: ComponentStory<typeof PhoneNumberField> = (args) => <PhoneNumberField {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   placeholder: 'Text Field',
// };
