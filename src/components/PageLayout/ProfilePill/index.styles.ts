import {
  Box, Avatar as MUIAvatar, Typography,
} from '@mui/material';
import styled from 'styled-components';

interface PillContainerProps {
  open: boolean,
}

const PillContainer = styled.div<PillContainerProps>`
  background-color: ${({ theme, open }) => (open ? theme.palette.darkPrimary.dark : 'none')};
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  /* We want the pill to be fully rounded on either end */
  border-radius: ${({ theme }) => Number(theme.shape.borderRadius) * 8}px;
  height: 36px;
  min-width: 128px;
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(1)};
  cursor: pointer;
`;

const NameLabel = styled(Typography)`
  && {
    font-weight: bold;
    user-select: none;
  }
`;

const Avatar = styled(MUIAvatar)`
  && {
    height: 24px;
    width: 24px;
    margin-left: ${({ theme }) => theme.spacing(1)};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;

const Gap = styled(Box)`
  && {
    flex-grow: 1;
  }
`;

const MenuLabel = styled(Typography)`
  && {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.54);
  }
`;

export { PillContainer, NameLabel, Avatar, Gap, MenuLabel };
