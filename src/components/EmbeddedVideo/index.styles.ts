import styled from 'styled-components';

const FrameContainer = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
`;

const Frame = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export { FrameContainer, Frame };
