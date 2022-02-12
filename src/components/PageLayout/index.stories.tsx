import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import useSnackbar from '../../utils/react/hooks/useSnackbar';
import Button from '../Button';

import { PageLayout } from '.';

const DummyContent = () => {
  const createSnackbar = useSnackbar();

  return (
    <Button onClick={() => createSnackbar('Hello World', 'info')}>Open Snackbar</Button>
  );
};

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>;

const Template: ComponentStory<typeof PageLayout> = (args) => <PageLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <DummyContent />,
};

export const Decorated = Template.bind({});
Decorated.args = {
  decorate: true,
  children: <DummyContent />,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: <>(Insert content here)</>,
};

export const DecoratedLoading = Template.bind({});
DecoratedLoading.args = {
  decorate: true,
  loading: true,
  children: <>(Insert content here)</>,
};
