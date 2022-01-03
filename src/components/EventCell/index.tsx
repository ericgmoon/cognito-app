import React from 'react';

import {
  ActionButton,
  ButtonContainer,
  Card,
  CardContent,
  Content,
  ContentText,
  Header,
  HeaderText,
  OnlineCircle,
} from './index.styles';
import { stringifyTime } from './utils';

interface OnlineIndicatorProps {
  online?: boolean,
  children: React.ReactElement,
}

const OnlineIndicator = ({ online = false, children }: OnlineIndicatorProps) =>
  (online ? <OnlineCircle variant="dot" color="success">{children}</OnlineCircle> : children);

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
  online?: boolean,
}

const EventCell = ({ startDatetime, duration, color = 'primary', title = '', subtitle = '', actionButton, disabled = false, online }: EventCellProps) => {
  const startTime = stringifyTime(startDatetime);
  const endTime = stringifyTime(startDatetime + duration * 60000);

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
            <OnlineIndicator online={online}>
              <ActionButton
                variant="outlined"
                onClick={disabled ? () => {} : actionButton.onClick}
                color={disabled ? 'darkGray' : (actionButton.color || color)}
                disableRipple
                blockPointer={disabled}
              >
                {actionButton.text}
              </ActionButton>
            </OnlineIndicator>
          </ButtonContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCell;
