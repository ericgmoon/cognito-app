import styled, { StyledComponent } from 'styled-components';

export const HelloContainer: StyledComponent<'div', any, {}, never> = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
