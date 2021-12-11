import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignUpPage from '.';

export default {
  title: 'Pages/SignUpPage',
  component: SignUpPage,
} as ComponentMeta<typeof SignUpPage>;

const Template: ComponentStory<typeof SignUpPage> = () => <SignUpPage />;

export const Default = Template.bind({});
