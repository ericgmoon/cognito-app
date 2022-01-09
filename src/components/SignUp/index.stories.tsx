import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SignUp from '.';

export default {
  title: 'Components/SignUp',
  component: SignUp,
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const Default = Template.bind({});
