import React from 'react';

import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Breadcrumbs from '../../components/Breadcrumbs';
import { ProtectedPageLayout } from '../../components/PageLayout';
import YouTubePlayer from '../../components/YouTubePlayer';
import routes from '../routes.json';

import {
  BreadcrumbsWrapper,
  ColumnContainer, NavColumn, PlayerColumn, TitleBarContainer,
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

const VideosPage = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ProtectedPageLayout title="Videos">
      <BreadcrumbsWrapper>
        <Breadcrumbs
          title="Atomic Spectra"
          path={[
            {
              text: 'Videos',
              key: 'root',
            },
            {
              text: 'Chemistry',
              key: 'chem',
            },
            {
              text: 'Module 1',
              key: 'chemMod1',
            },
          ]}
          map={routes.videos}
        />
      </BreadcrumbsWrapper>
      <ColumnContainer stack={!isMd}>
        <PlayerColumn stack={!isMd}>
          <YouTubePlayer
            videoId="m8xSZ9Fr4c0"
          />
          <TitleBar
            title="Atomic Spectra"
            author="Eric Moon"
            uploadDate={new Date()}
          />
        </PlayerColumn>
        <NavColumn stack={!isMd} />
      </ColumnContainer>
    </ProtectedPageLayout>
  );
};
export default VideosPage;
