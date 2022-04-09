import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import VideoPlayerPage from '.';

export default {
  title: 'Pages/VideoPlayerPage',
  component: VideoPlayerPage,
} as ComponentMeta<typeof VideoPlayerPage>;

const Template: ComponentStory<typeof VideoPlayerPage> = (args) => <VideoPlayerPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Atomic Spectra',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
  'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
  'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
  'sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt' +
  'mollit anim id est laborum.',
  host: 'Eric Moon',
  uploadDate: new Date(),
  videoId: 'dummyVideoId4',
  youtubeId: '1uPyq63aRvg',
  path: [
    {
      key: 'root',
    },
    {
      key: 'chem',
    },
    {
      key: 'chemMod1',
    },
  ],
  resources: [
    {
      label: 'M1L3 Lesson Notes',
      href: '/',
    },
    {
      label: 'Atomic Spectra Simulation',
      href: '/',
    },
  ],
  relatedVideos: [
    {
      videoId: 'dummyVideoId1',
      title: 'Separating Mixtures',
      href: '/',
    },
    {
      videoId: 'dummyVideoId2',
      title: 'Significant Figures',
      href: '/',
    },
    {
      videoId: 'dummyVideoId3',
      title: 'Bohr\'s Model',
      href: '/',
    },
    {
      videoId: 'dummyVideoId4',
      title: 'Atomic Spectra',
      href: '/',
    },
    {
      videoId: 'dummyVideoId5',
      title: 'Intermolecular Forces',
      href: '/',
    },
  ],
};
