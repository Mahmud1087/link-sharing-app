'use client';

import DashboardLinks from '@/components/dashboard/dashboad-links/DashboardLinks';
import ProfilePage from '@/components/dashboard/profile-page/ProfilePage';
import { useAppContext } from '@/context/AppContext';

const DashboardHomepage = () => {
  const { dashboardPage } = useAppContext();
  return (
    <>
      {dashboardPage === 'dashboard-links' ? (
        <DashboardLinks />
      ) : (
        <ProfilePage />
      )}
    </>
  );
};
export default DashboardHomepage;
