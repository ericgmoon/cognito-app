import {
  Badge, Card as MUICard, CardContent as MUICardContent, Typography,
} from '@mui/material';
import styled from 'styled-components';

interface ColorProps {
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray' | 'chemistry' | 'physics';
}

const Card = styled(MUICard)`
  && {
    width: 100%;
    max-width: 156px;
    height: 96px;
    background-color: ${({ theme }) => theme.palette.gray.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray.dark};
    }
  }
`;

const CardContent = styled(MUICardContent)`
  && {
    padding: 0;
  }
`;

const TimeTextContainer = styled.div<ColorProps>`
  height: 32px;
  background-color: ${({ theme, color }) => theme.palette[color].dark};
  color: ${({ theme, color }) => theme.palette[color].contrastText};
  border-top-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeText = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 0.8rem;
    user-select: none;
  }
`;

const Content = styled.div<ColorProps>`
  height: 64px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  color: ${({ theme, color }) => theme.palette[color].dark};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const ContentText = styled(Typography)`
  && {
    font-weight: bold;
    user-select: none;
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`;

const ButtonContainer = styled.div`
  height: 32px;
  display: flex;
  justify-content: center;
`;

const OnlineCircle = styled(Badge)`
  & .MuiBadge-badge {
    min-width: 12px;
    min-height: 12px;
    border-radius: 6px;
    margin-top: 2px;
    margin-right: 2px;
  }
`;

const TopModalLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalLine = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: row;
`;

const ModalHeading = styled(Typography)`
  && {
    font-weight: 600;
  }
`;

const ModalContent = styled(Typography)`
`;

export { Card,
  CardContent,
  TimeTextContainer,
  TopModalLine,
  TimeText,
  ModalLine,
  ModalHeading,
  ModalContent,
  Content,
  ContentText,
  ButtonContainer,
  OnlineCircle };
