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
      label: 'Chemistry',
      href: '/',
    },
    {
      label: 'Core Topics',
      href: '/',
    },
    {
      label: 'Module 1',
      href: '/',
    },
  ],
};

export const Map = Template.bind({});
Map.args = {
  title: 'Atomic Spectra',
  path: [
    {
      key: 'chemistry',
    },
    {
      key: 'core',
    },
    {
      key: 'mod1',
    },
  ],
  map: {
    chemistry: {
      label: 'Chemistry',
      href: '/',
    },
    core: {
      label: 'Core Topics',
      href: '/',
    },
    mod1: {
      label: 'Module 1',
      href: '/',
    },
  },
};
