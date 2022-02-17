import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import EmbeddedVideo from '.';

export default {
  title: 'Components/EmbeddedVideo',
  component: EmbeddedVideo,
} as ComponentMeta<typeof EmbeddedVideo>;

const Template: ComponentStory<typeof EmbeddedVideo> = (args) => <EmbeddedVideo {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://www.youtube.com/embed/sVoHBPYtKbQ',
};
