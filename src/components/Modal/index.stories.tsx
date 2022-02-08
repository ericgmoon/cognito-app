import React from 'react';

import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../Button';

import Modal from '.';

const TriggerButton = (modalArgs: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        handleClose={handleClose}
        {...modalArgs}
      />
    </>
  );
};

const CustomUIComponent = ({ closeModal }: {closeModal?: () => void}) => (
  <Box sx={{
    width: '100%', display: 'flex', justifyContent: 'center',
  }}
  >
    <Button
      sx={{ width: '80%' }}
      onClick={closeModal}
    >
      Woof
    </Button>
  </Box>
);

export default {
  title: 'Components/Modal',
  component: TriggerButton,
} as ComponentMeta<typeof TriggerButton>;

const Template: ComponentStory<typeof TriggerButton> = (args) => <TriggerButton {...args} />;

export const Message = Template.bind({});
Message.args = {
  title: 'Hello World',
  description: 'This is a hello to the world. When the days are cold and the cards all fold...',
  buttons: [
    {
      label: 'Close',
      color: 'error',
      closeOnClick: true,
    },
  ],
};

export const MultipleButtons = Template.bind({});
MultipleButtons.args = {
  title: 'Want to go ahead?',
  description: 'Pick between going ahead and returning to the status quo...',
  buttons: [
    {
      label: 'Proceed',
      color: 'success',
      closeOnClick: true,
    },
    {
      label: 'Cancel',
      color: 'error',
      closeOnClick: true,
    },
  ],
};

export const CustomUI = Template.bind({});
CustomUI.args = {
  title: 'What does the fox say?',
  children: <CustomUIComponent />,
  buttons: [
    {
      label: 'Yes',
      color: 'success',
      closeOnClick: true,
    },
    {
      label: 'No',
      color: 'error',
      closeOnClick: true,
    },
  ],
};
