import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginPage from '.';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = () => <LoginPage />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Text Field',
};
