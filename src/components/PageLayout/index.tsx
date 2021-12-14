import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode,
}

export const PublicPageLayout = ({ children }: PageLayoutProps) => (
  <div>
    {children}
  </div>
);
