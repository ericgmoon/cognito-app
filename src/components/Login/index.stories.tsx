import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Login from '.';

export default {
  title: 'Cognito/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
