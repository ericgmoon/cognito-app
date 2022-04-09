import ReactYouTube from 'react-youtube';
import styled from 'styled-components';

const FrameContainer = styled.div`
  display: block;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
`;

const StyledReactYoutube = styled(ReactYouTube)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export { FrameContainer, StyledReactYoutube };
