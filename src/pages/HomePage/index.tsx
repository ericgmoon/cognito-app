import React from 'react';

import { ProtectedPageLayout } from '../../components/PageLayout';

// Stub home page
const HomePage = () => (
  <ProtectedPageLayout title="Home - Cognito App">
    Hello world
  </ProtectedPageLayout>
);
export default HomePage;
