import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import YouTubeVideo from '.';

export default {
  title: 'Components/YouTubeVideo',
  component: YouTubeVideo,
} as ComponentMeta<typeof YouTubeVideo>;

const Template: ComponentStory<typeof YouTubeVideo> = (args) => <YouTubeVideo {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoId: '1uPyq63aRvg',
};
