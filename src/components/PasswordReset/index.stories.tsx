import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import PasswordReset from '.';

export default {
  title: 'Components/PasswordReset',
  component: PasswordReset,
} as ComponentMeta<typeof PasswordReset>;

const Template: ComponentStory<typeof PasswordReset> = (args) => <PasswordReset {...args} />;

export const Default = Template.bind({});
Default.args = {
  onComplete: () => {},
};
