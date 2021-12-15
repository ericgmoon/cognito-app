import React from 'react';

import { useNavigate } from 'react-router-dom';

import { signOut } from '../../auth';
import Button from '../../components/Button';
import { ProtectedPageLayout } from '../../components/PageLayout';

// Stub home page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <ProtectedPageLayout>
      <Button onClick={async () => {
        await signOut();
        navigate('/signin');
      }}
      >Sign Out
      </Button>
    </ProtectedPageLayout>
  );
};
export default HomePage;
