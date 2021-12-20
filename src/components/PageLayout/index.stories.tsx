import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PageLayout } from '.';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args) => <PageLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>(Insert content here)</>,
};

export const Decorated = Template.bind({});
Decorated.args = {
  decorate: true,
  children: <>(Insert content here)</>,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: <>(Insert content here)</>,
};
