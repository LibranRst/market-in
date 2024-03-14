import DynamicBreadcrumb from '@/components/ui/dynamic-breadcrumb';

import CenteredContainer from '@/components/ui/layout/centered-container';
import UpdateUserDataForm from './updateuserdata-form';
import UpdatePasswordForm from './updatepassword-form';

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
