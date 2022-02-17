import React from 'react';

import { Frame, FrameContainer } from './index.styles';

interface EmbeddedVideoProps {
  src?: string,
  title?: string,
}

const EmbeddedVideo = ({ src, title }: EmbeddedVideoProps) => (
  <FrameContainer>
    <Frame
      width="960"
      height="540"
      src={src}
      frameBorder="0"
      allow="accelerometer"
      allowFullScreen
      title={title}
    />
  </FrameContainer>
);

export default EmbeddedVideo;
