import React from 'react';

import { ProtectedPageLayout } from '../../components/PageLayout';

const HomePage = () => (
  <ProtectedPageLayout title="Home">
    <p>This is the home page</p>
  </ProtectedPageLayout>
);
export default HomePage;
