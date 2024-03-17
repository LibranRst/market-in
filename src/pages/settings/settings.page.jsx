import DynamicBreadcrumb from '@/components/ui/Dynamic-breadcrumb';

import CenteredContainer from '@/components/ui/layout/Centered-container';
import UpdateUserDataForm from './Updateuserdata-form';
import UpdatePasswordForm from './Updatepassword-form';

const SettingsPage = () => {
  return (
    <CenteredContainer className="h-auto items-center gap-4 pb-10">
      <div className="flex w-full max-w-[600px] flex-col gap-5">
        <DynamicBreadcrumb />
        <UpdateUserDataForm />
        <UpdatePasswordForm />
      </div>
    </CenteredContainer>
  );
};

export default SettingsPage;
