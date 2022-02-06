import React, { useRef } from 'react';

import useDimensions from '../../utils/react/hooks/useDimensions';

import {
  Card,
  CardContent,
  Content,
  ContentText,
  Header,
  HeaderText,
} from './index.styles';
import { stringifyTime } from './utils';

interface EventCellProps {
  startDatetime: number,
  duration: number,
  color?: 'primary' | 'chemistry' | 'physics',
  title?: string,
  subtitle?: string,
}

const EventCell = ({ startDatetime, duration, color = 'primary', title = '', subtitle = '' }: EventCellProps) => {
  const startTime = stringifyTime(startDatetime);
  const endTime = stringifyTime(startDatetime + duration * 60000);

  const ref = useRef<HTMLDivElement>();
  const { width } = useDimensions(ref);

  return (
    <Card ref={ref as React.RefObject<HTMLDivElement>}>
      <CardContent>
        <Header color={color}>
          <HeaderText variant="subtitle2">
            {width > 144 ? `${startTime} - ${endTime}` : startTime}
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
      </CardContent>
    </Card>
  );
};

export default EventCell;
