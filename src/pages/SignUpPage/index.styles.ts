import {
  Typography,
} from '@mui/material';
import styled from 'styled-components';

const RootContainer = styled.div`
  max-width: 560px;
  margin: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const Title = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.secondary.dark)};
    font-weight: bold;
    @media (max-width: 899px) {
      align-self: center;
    }
  }
`;

const Logo = styled.img`
  width: 72px;
  margin: ${({ theme }) => theme.spacing(0, 3)};
  @media (max-width: 899px) {
    margin: ${({ theme }) => theme.spacing(3, 3)};
    width: 56px;
    align-self: center;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 899px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled(Typography)`
  && {
    color: ${({ theme }) => (theme.palette.darkGray.main)};
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
`;

export { Title, Logo, HeaderContainer, RootContainer, Container, FooterText };
