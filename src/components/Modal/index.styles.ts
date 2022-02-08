import {
  Box, IconButton, Button as MUIButton, Typography,
} from '@mui/material';
import styled from 'styled-components';

const Container = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: ${({ theme }) => theme.palette.gray.light};
    box-shadow: 24;
    padding: ${({ theme }) => theme.spacing(3)};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  }
`;

const CloseIconButton = styled(IconButton)`
  && {
    align-self: right;
    position: absolute;
    right: ${({ theme }) => theme.spacing(2)};
    top: ${({ theme }) => theme.spacing(2)};
  }
`;

const Title = styled(Typography)`
`;

const Description = styled(Typography)`
  && {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Button = styled(MUIButton)`
  && {
    margin-left: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(-1)};
  }
`;

const ChildBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export { Container, CloseIconButton, Title, Description, ButtonBar, Button, ChildBox };
