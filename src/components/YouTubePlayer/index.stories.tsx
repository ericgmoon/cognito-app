import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import YouTubePlayer from '.';

export default {
  title: 'Components/YouTubePlayer',
  component: YouTubePlayer,
} as ComponentMeta<typeof YouTubePlayer>;

const Template: ComponentStory<typeof YouTubePlayer> = (args) => <YouTubePlayer {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoId: 'dPsSrBuMIVs',
};
