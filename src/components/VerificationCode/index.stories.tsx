import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import VerificationCode from '.';

export default {
  title: 'Components/VerificationCode',
  component: VerificationCode,
} as ComponentMeta<typeof VerificationCode>;

const Template: ComponentStory<typeof VerificationCode> = (args) => <VerificationCode {...args} />;

export const Default = Template.bind({});
