import React from 'react';

import {
  ActionButton, ButtonContainer, Content, ContentText, Header, HeaderText, RootContainer,
} from './index.styles';
import { stringifyDatetime } from './utils';

interface EventCellProps {
  startDatetime: number,
  duration: number,
  color?: 'primary' | 'chemistry' | 'physics',
  title?: string,
  subtitle?: string,
  actionButton?: {
    text: string,
    onClick: () => void,
    color?: 'primary' | 'secondary' | 'error' | undefined,
  }
}

const EventCell = ({ startDatetime, duration, color = 'primary', title = '', subtitle = '', actionButton }: EventCellProps) => {
  const startTime = stringifyDatetime(startDatetime);
  const endTime = stringifyDatetime(startDatetime + duration * 60000);

  return (
    <RootContainer long={!!actionButton}>
      <Header color={color}>
        <HeaderText variant="subtitle2">
          {startTime} - {endTime}
        </HeaderText>
      </Header>
      <Content color={color}>
        <ContentText variant="subtitle2">
          {title}
        </ContentText>
        <ContentText variant="subtitle2">
          {subtitle}
        </ContentText>
      </Content>
      {actionButton && (
        <ButtonContainer>
          <ActionButton
            onClick={actionButton.onClick}
            color={actionButton.color || color}
            disableRipple
          >
            {actionButton.text}
          </ActionButton>
        </ButtonContainer>
      )}
    </RootContainer>
  );
};

export default EventCell;
