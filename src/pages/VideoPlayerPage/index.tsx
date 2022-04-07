import React from 'react';

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Breadcrumbs, { PathKeyUnit } from '../../components/Breadcrumbs';
import YouTubePlayer from '../../components/YouTubePlayer';
import routes from '../routes.json';

import {
  AboutWrapper,
  BreadcrumbsWrapper,
  ColumnContainer,
  ListIndexLabel,
  ListLabel,
  PlayerColumn,
  SidebarHeader,
  SidebarHeaderWrapper,
  TitleBarContainer,
  UtilColumn,
} from './index.styles';

const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dd = date.getDate();

  return [
    (dd > 9 ? '' : '0') + dd,
    months[date.getMonth()],
    date.getFullYear(),
  ].join(' ');
};

interface TitleBarProps {
  title: string,
  author: string,
  uploadDate: Date,
}

const TitleBar = ({ title, author, uploadDate } : TitleBarProps) => (
  <TitleBarContainer>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="caption">{author} · {formatDate(uploadDate)}</Typography>
  </TitleBarContainer>
);

type Resource = {
  label: string,
  href: string,
}

type Video = {
  videoId: string,
  title: string,
  href: string,
}

interface SideBarProps {
  resources?: Resource[],
  relatedVideos?: Video[],
  currentVideoId: string,
}

const SideBar = ({ resources = [], relatedVideos = [], currentVideoId } : SideBarProps) => (
  <>
    {resources.length > 0 && (
      <List subheader={(
        <SidebarHeaderWrapper disableSticky>
          <SidebarHeader variant="overline">
            RESOURCES
          </SidebarHeader>
        </SidebarHeaderWrapper>
      )}
      >
        {resources.map((res, index) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={(
                <Typography variant="body2">
                  <ListIndexLabel>{String.fromCharCode(index + 'A'.charCodeAt(0))}</ListIndexLabel>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <ListLabel>
                    {res.label}
                  </ListLabel>
                </Typography>
              )}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )}
    {relatedVideos.length > 0 && (
      <List subheader={(
        <SidebarHeaderWrapper disableSticky>
          <SidebarHeader variant="overline">
            RELATED VIDEOS
          </SidebarHeader>
        </SidebarHeaderWrapper>
      )}
      >
        {relatedVideos.map((vid, index) => (
          <ListItem disablePadding selected={currentVideoId === vid.videoId}>
            <ListItemButton>
              <ListItemText primary={(
                <Typography variant="body2">
                  <ListIndexLabel selected={currentVideoId === vid.videoId}>
                    {index + 1}
                  </ListIndexLabel>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <ListLabel selected={currentVideoId === vid.videoId}>
                    {vid.title}
                  </ListLabel>
                </Typography>
              )}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )}
  </>
);

interface VideoPlayerPageProps {
  videoId: string,
  youtubeId: string,
  title: string,
  author: string,
  uploadDate: Date,
  path: PathKeyUnit[],
  resources?: Resource[],
  relatedVideos?: Video[],
}

const VideoPlayerPage = (
  { videoId,
    youtubeId,
    title,
    author,
    uploadDate,
    path,
    resources = [],
    relatedVideos = [] }: VideoPlayerPageProps,
) => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <BreadcrumbsWrapper>
        <Breadcrumbs
          title={title}
          path={path}
          map={routes.videos}
        />
      </BreadcrumbsWrapper>
      <ColumnContainer stack={!isMd}>
        <PlayerColumn stack={!isMd}>
          <YouTubePlayer
            videoId={youtubeId}
          />
          <TitleBar
            title={title}
            author={author}
            uploadDate={uploadDate}
          />
          <Divider />
          <AboutWrapper>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Typography>
          </AboutWrapper>
          {!isMd && <Divider />}
        </PlayerColumn>
        <UtilColumn stack={!isMd}>
          <SideBar
            resources={resources}
            relatedVideos={relatedVideos}
            currentVideoId={videoId}
          />
        </UtilColumn>
      </ColumnContainer>
    </>
  );
};
export default VideoPlayerPage;
