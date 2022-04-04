import React from 'react';

import { Options } from 'react-youtube';

import { FrameContainer, StyledReactYoutube } from './index.styles';

interface EmbeddedVideoProps {
  videoId?: string,
}

const YouTubePlayer = ({ videoId }: EmbeddedVideoProps) => {
  const opts: Options = {
    width: '100%',
    height: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      disablekb: 1,
      showinfo: 0,
      cc_load_policy: 1,
      hl: 'en',
      rel: 0,
      modestbranding: 1,
    },
    host: 'https://www.youtube-nocookie.com',
  };

  return (
    <FrameContainer>
      <StyledReactYoutube
        opts={opts}
        videoId={videoId}
      />
    </FrameContainer>
  );
};

export default YouTubePlayer;
