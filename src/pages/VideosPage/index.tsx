import React from 'react';

import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import {
  Divider, Link, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Breadcrumbs from '../../components/Breadcrumbs';
import { ProtectedPageLayout } from '../../components/PageLayout';
import YouTubePlayer from '../../components/YouTubePlayer';
import routes from '../routes.json';

import {
  AboutWrapper,
  BreadcrumbsWrapper,
  ColumnContainer,
  NewWindowIconWrapper,
  PlayerColumn,
  ResourceLinkWrapper,
  ResourcesList,
  TitleBarContainer,
  UtilColumn,
  UtilDividerGap,
  UtilHeading,
  UtilHeadingIconWrapper,
  UtilHeadingWrapper,
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

interface SideBarProps {
  resources: Resource[]
}

const SideBar = ({ resources = [] } : SideBarProps) => (
  <>
    {resources.length > 0 && (
      <>
        <UtilHeadingWrapper>
          <UtilHeadingIconWrapper>
            <LibraryBooksRoundedIcon />
          </UtilHeadingIconWrapper>
          <UtilHeading variant="h6">
            Resources
          </UtilHeading>
        </UtilHeadingWrapper>
        <ResourcesList>
          {resources.map((res) => (
            <Link href={res.href} color="secondary">
              <ResourceLinkWrapper>
                <Typography variant="body2">
                  {res.label}
                </Typography>
                <NewWindowIconWrapper>
                  <OpenInNewRoundedIcon fontSize="small" />
                </NewWindowIconWrapper>
              </ResourceLinkWrapper>
            </Link>
          ))}
        </ResourcesList>
      </>
    )}
    <Divider />
    <UtilDividerGap />
    <UtilHeadingWrapper>
      <UtilHeadingIconWrapper>
        <VideoLibraryRoundedIcon />
      </UtilHeadingIconWrapper>
      <UtilHeading variant="h6">
        Chapter
      </UtilHeading>
    </UtilHeadingWrapper>
  </>
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
            resources={[
              {
                label: 'M1L3 Lesson Notes',
                href: '/',
              },
            ]}
          />
        </UtilColumn>
      </ColumnContainer>
    </ProtectedPageLayout>
  );
};
export default VideosPage;
