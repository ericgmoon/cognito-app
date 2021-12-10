import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignIn from '.';

export default {
  title: 'Components/SignIn',
  component: SignIn,
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const Default = Template.bind({});
