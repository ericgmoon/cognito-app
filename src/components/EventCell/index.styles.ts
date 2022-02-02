import {
  Badge, Card as MUICard, CardContent as MUICardContent, Typography,
} from '@mui/material';
import styled from 'styled-components';

import Button from '../Button';

interface ColorProps {
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'gray' | 'darkGray' | 'chemistry' | 'physics';
}

interface LongProps {
  long: boolean | undefined,
}

const Card = styled(MUICard)<LongProps>`
  && {
    width: 100%;
    max-width: 156px;
    height: ${({ long }) => (long ? 128 : 96)}px;
    background-color: ${({ theme }) => theme.palette.gray.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
`;

const CardContent = styled(MUICardContent)`
  && {
    padding: 0;
  }
`;

const Header = styled.div<ColorProps>`
  height: 32px;
  background-color: ${({ theme, color }) => theme.palette[color].dark};
  color: ${({ theme, color }) => theme.palette[color].contrastText};
  border-top-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled(Typography)`
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
  }
`;

const ButtonContainer = styled.div`
  height: 32px;
  display: flex;
  justify-content: center;
`;

interface ActionButtonProps extends ColorProps {
  blockPointer: boolean,
}

const ActionButton = styled(Button)<ActionButtonProps>`
  && {
    border-width: 2px;
    width: 96px;
    height: 24px;
    padding: ${({ theme }) => theme.spacing(0)};
    &:hover {
      border-width: 2px;
      cursor: ${({ blockPointer }) => (blockPointer ? 'not-allowed' : 'pointer')};
    }
  }
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

export { Card,
  CardContent,
  Header,
  HeaderText,
  Content,
  ContentText,
  ActionButton,
  ButtonContainer,
  OnlineCircle };
