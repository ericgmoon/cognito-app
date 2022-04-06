import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import VideosPage from '.';

export default {
  title: 'Pages/VideosPage',
  component: VideosPage,
} as ComponentMeta<typeof VideosPage>;

const Template: ComponentStory<typeof VideosPage> = () => <VideosPage />;

export const Default = Template.bind({});
