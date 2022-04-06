import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumbs from '.';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Href = Template.bind({});
Href.args = {
  title: 'Atomic Spectra',
  path: [
    {
      text: 'Chemistry',
      href: '/',
    },
    {
      text: 'Core Topics',
      href: '/',
    },
    {
      text: 'Module 1',
      href: '/',
    },
  ],
};

export const Map = Template.bind({});
Map.args = {
  title: 'Atomic Spectra',
  path: [
    {
      text: 'Chemistry',
      key: 'chemistry',
    },
    {
      text: 'Core Topics',
      key: 'core',
    },
    {
      text: 'Module 1',
      key: 'mod1',
    },
  ],
  map: {
    chemistry: '/',
    core: '/',
    mod1: '/',
  },
};
