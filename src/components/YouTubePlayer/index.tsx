import React from 'react';

import { Options } from 'react-youtube';

import { FrameContainer, StyledReactYoutube } from './index.styles';

interface EmbeddedVideoProps {
  videoId: string,
}

const YouTubePlayer = ({ videoId }: EmbeddedVideoProps) => {
  const opts: Options = {
    width: '100%',
    height: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // Causes the player to not respond to keyboard controls
      disablekb: 1,
      // Causes closed captions to be shown by default
      cc_load_policy: 1,
      // Sets the player's interface language to english
      hl: 'en',
      // Related videos only come from the same channel as the video that was just played
      rel: 0,
      // Hides the YouTube logo
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
