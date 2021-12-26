import React from 'react';

import {
  Content, ContentText, Header, HeaderText, RootContainer,
} from './index.styles';
import { stringifyDatetime } from './utils';

interface EventCellProps {
  startDatetime: number,
  duration: number,
  color?: 'primary' | 'chemistry' | 'physics',
  title?: string,
  subtitle?: string,
}

const EventCell = ({ startDatetime, duration, color = 'primary', title = '', subtitle = '' }: EventCellProps) => {
  const startTime = stringifyDatetime(startDatetime);
  const endTime = stringifyDatetime(startDatetime + duration * 60000);

  return (
    <RootContainer>
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
    </RootContainer>
  );
};

export default EventCell;
