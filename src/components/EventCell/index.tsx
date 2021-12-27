import React from 'react';

import {
  ActionButton, ButtonContainer, Card, CardContent, Content, ContentText, Header, HeaderText,
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
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray' | undefined,
  },
  disabled?: boolean,
}

const EventCell = ({ startDatetime, duration, color = 'primary', title = '', subtitle = '', actionButton, disabled = false }: EventCellProps) => {
  const startTime = stringifyDatetime(startDatetime);
  const endTime = stringifyDatetime(startDatetime + duration * 60000);

  return (
    <Card long={!!actionButton}>
      <CardContent>
        <Header color={disabled ? 'darkGray' : color}>
          <HeaderText variant="subtitle2">
            {startTime} - {endTime}
          </HeaderText>
        </Header>
        <Content color={disabled ? 'darkGray' : color}>
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
              onClick={disabled ? () => {} : actionButton.onClick}
              color={disabled ? 'darkGray' : (actionButton.color || color)}
              disableRipple
              blockPointer={disabled}
            >
              {actionButton.text}
            </ActionButton>
          </ButtonContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCell;
