import React, { useRef } from 'react';

import useDimensions from '../../utils/react/hooks/useDimensions';
import Modal from '../Modal';

import {
  Card,
  CardContent,
  Content,
  ContentText,
  ModalContent,
  ModalHeading,
  ModalLine,
  TimeText,
  TimeTextContainer,
  TopModalLine,
} from './index.styles';
import { stringifyDate, stringifyTime } from './utils';

interface EventCellProps {
  startDatetime: number,
  duration: number,
  color?: 'primary' | 'chemistry' | 'physics',
  title?: string,
  properties: {[key: string]: string},
  state?: 'imminent' | 'open' | 'full' | 'booked' | 'readOnly',
  onJoin?: () => void,
  onBook?: () => void,
  onUnbook?: () => void,
}

const EventCell = ({
  startDatetime,
  duration,
  color = 'primary',
  title = '',
  properties,
  state = 'readOnly',
  onJoin = () => {},
  onBook = () => {},
  onUnbook = () => {},
}: EventCellProps) => {
  let buttons: any[] = [];

  switch (state) {
    case 'imminent':
      buttons = [
        {
          label: 'UNBOOK',
          disabled: true,
        }, {
          label: 'JOIN',
          onClick: onJoin,
          color: 'success',
          closeOnClick: true,
        },
      ];
      break;
    case 'open':
      buttons = [{
        label: 'BOOK',
        onClick: onBook,
        color: 'info',
        closeOnClick: true,
      }];
      break;
    case 'booked':
      buttons = [
        {
          label: 'UNBOOK',
          onClick: onUnbook,
          color: 'error',
          closeOnClick: true,
        },
      ];
      break;
    case 'full':
      buttons = [
        {
          label: 'FULL',
          disabled: true,
        },
      ];
      break;
    default:
      break;
  }

  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const startTime = stringifyTime(startDatetime);
  const endTime = stringifyTime(startDatetime + duration * 60000);

  const ref = useRef<HTMLDivElement>();
  const { width } = useDimensions(ref);

  return (
    <>
      <Card ref={ref as React.RefObject<HTMLDivElement>} onClick={openModal}>
        <CardContent>
          <TimeTextContainer color={color}>
            <TimeText variant="subtitle2">
              {width > 144 ? `${startTime} - ${endTime}` : startTime}
            </TimeText>
          </TimeTextContainer>
          <Content color={color}>
            <ContentText variant="subtitle2">
              {title}
            </ContentText>
          </Content>
        </CardContent>
      </Card>
      <Modal
        open={modalOpen}
        handleClose={closeModal}
        title={title}
        titleColor={color}
        buttons={buttons}
      >
        <>
          <TopModalLine>
            <ModalHeading variant="body1">Date:&nbsp;</ModalHeading>
            <ModalContent variant="body1">{stringifyDate(startDatetime)}</ModalContent>
          </TopModalLine>
          <ModalLine>
            <ModalHeading variant="body1">Time:&nbsp;</ModalHeading>
            <ModalContent variant="body1">{`${startTime} - ${endTime}`}</ModalContent>
          </ModalLine>
          {properties && Object.keys(properties).map((key) => (
            <ModalLine>
              <ModalHeading variant="body1">{key}:&nbsp;</ModalHeading>
              <ModalContent variant="body1">{properties[key]}</ModalContent>
            </ModalLine>
          ))}
        </>
      </Modal>
    </>
  );
};

export default EventCell;
