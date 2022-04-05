import React from 'react';

import {
  Link, Breadcrumbs as MUIBreadcrumbs, Typography,
} from '@mui/material';

type PathHrefUnit = {
  text: string,
  href: string | '/',
  key?: never,
}

type PathKeyUnit = {
  text: string,
  key: string,
  href?: never,
}

type KeyHrefMap = {
  [index: string]: string,
}

interface BreadcrumbsDirectProps {
  title: string,
  path: PathHrefUnit[],
  map?: never
}

interface BreadcrumbsMapProps {
  title: string,
  path: PathKeyUnit[],
  map: KeyHrefMap
}

const Breadcrumbs = ({ title, path, map }: BreadcrumbsDirectProps | BreadcrumbsMapProps) => (
  <MUIBreadcrumbs
    maxItems={3}
    itemsBeforeCollapse={1}
    itemsAfterCollapse={2}
    separator={<Typography variant="caption">/</Typography>}
  >
    {path.map((p) => (
      <Link underline="hover" color="inherit" href={map && p.key ? map[p.key] : p.href}>
        <Typography variant="caption">
          {p.text}
        </Typography>
      </Link>
    ))}
    <Typography variant="caption" color="text.primary">
      {title}
    </Typography>
  </MUIBreadcrumbs>
);

export default Breadcrumbs;
