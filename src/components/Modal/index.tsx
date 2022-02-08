import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop, Fade, Modal as MUIModal,
} from '@mui/material';

import {
  Button, ButtonBar, ChildBox, CloseIconButton, Container, Description, Title,
} from './index.styles';

type ModalButton = {
  label: string,
  onClick?: () => void,
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray',
  closeOnClick?: boolean
}

interface ModalProps {
  open: boolean,
  handleClose: (event?: object, reason?: string) => void
  showCloseIcon?: boolean,
  title?: string,
  description?: string,
  buttons?: ModalButton[],
  children?: React.ReactElement,
}

const Modal = ({
  open = false,
  handleClose = () => {},
  showCloseIcon = true,
  title,
  children = <div />,
  description,
  buttons = [],
}: ModalProps) => (
  <MUIModal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Container>
        {showCloseIcon && (
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
        )}
        {title && (
          <Title variant="h6">
            {title}
          </Title>
        )}
        {description && (
          <Description>
            {description}
          </Description>
        )}
        {children && (
          <ChildBox>
            {React.cloneElement(children, { closeModal: handleClose })}
          </ChildBox>
        )}
        {buttons.length > 0 && (
          <ButtonBar>
            {buttons.map((button) => (
              <Button
                onClick={() => {
                  if (button.onClick) button.onClick();
                  if (button.closeOnClick) handleClose();
                }}
                color={button.color}
              >
                {button.label}
              </Button>
            ))}
          </ButtonBar>
        )}
      </Container>
    </Fade>
  </MUIModal>
);

export default Modal;
