import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignInPage from '.';

export default {
  title: 'Pages/SignInPage',
  component: SignInPage,
} as ComponentMeta<typeof SignInPage>;

const Template: ComponentStory<typeof SignInPage> = () => <SignInPage />;

export const Default = Template.bind({});
