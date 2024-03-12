import DynamicBreadcrumb from '@/components/ui/dynamic-breadcrumb';

import { Card } from '@/components/ui/card';
import CenteredContainer from '@/components/ui/layout/centered-container';
import SettingsForm from './settings.form';

const SettingsPage = () => {
  return (
    <CenteredContainer className="items-center justify-center gap-4">
      <div className="flex w-full max-w-[600px] flex-col gap-2">
        <DynamicBreadcrumb />
        <Card>
          <SettingsForm />
        </Card>
      </div>
    </CenteredContainer>
  );
};

export default SettingsPage;
