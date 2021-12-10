import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextField from '.';

export default {
  title: 'Components/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Text Field',
};
