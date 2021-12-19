import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import VerificationCode from '.';

export default {
  title: 'Components/VerificationCode',
  component: VerificationCode,
} as ComponentMeta<typeof VerificationCode>;

const Template: ComponentStory<typeof VerificationCode> = () => <VerificationCode />;

export const Default = Template.bind({});
