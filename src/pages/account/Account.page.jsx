import { useSearchParams } from 'react-router-dom';
import UpdateUserDataForm from './Updateuserdata-form';
import UpdateEmailForm from './UpdateEmail-form';
import UpdatePasswordForm from './Updatepassword-form';

const AccountPage = () => {
  const [searchParams] = useSearchParams();
  const currentSettings = searchParams.get('settings');

  if (currentSettings === 'user-settings') {
    return <UpdateUserDataForm />;
  }

  if (currentSettings === 'change-email') {
    return <UpdateEmailForm />;
  }

  if (currentSettings === 'change-password') {
    return <UpdatePasswordForm />;
  }
};

export default AccountPage;
