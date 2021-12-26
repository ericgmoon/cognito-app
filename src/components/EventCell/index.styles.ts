import { Typography } from '@mui/material';
import styled from 'styled-components';

interface ColorProps {
  color: 'primary' | 'chemistry' | 'physics';
}

const RootContainer = styled.div`
  width: 156px;
  height: 96px;
  background-color: ${({ theme }) => theme.palette.gray.main};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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

export { RootContainer, Header, HeaderText, Content, ContentText };
