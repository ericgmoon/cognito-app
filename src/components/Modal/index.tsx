import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop, Fade, Modal as MUIModal,
} from '@mui/material';

import {
  Button, ButtonBar, ChildBox, CloseIconButton, Container, Description, Title, TitleContainer,
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
  hideCloseIcon?: boolean,
  title?: string,
  titleColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray' | 'chemistry' | 'physics',
  description?: string,
  buttons?: ModalButton[],
  children?: React.ReactElement,
}

const Modal = ({
  open = false,
  handleClose = () => {},
  hideCloseIcon = false,
  title,
  children = <div />,
  description,
  buttons = [],
  titleColor = 'primary',
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
        {!hideCloseIcon && (
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
        )}
        {title && (
          <TitleContainer color={titleColor}>
            <Title variant="h6">
              {title}
            </Title>
          </TitleContainer>
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
