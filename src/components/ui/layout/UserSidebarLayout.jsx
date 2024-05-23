import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useUser } from '../../../hooks/auth/useUser';
import { useUpdateUser } from '../../../hooks/auth/useUpdateUser';
import DynamicBreadcrumb from '../Dynamic-breadcrumb';
import Avatar from '../Avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';

const UserSidebarLayout = () => {
  const { user, isLoading } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [accordionValue, setAccordionValue] = useState('account');

  const [avatar, setAvatar] = useState(null); // console.log(avatar);

  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[1];

  useEffect(() => {
    if (avatar) {
      updateUser({ avatar }, { onSuccess: () => setAvatar(null) });
    }
  }, [avatar, updateUser]);

  return (
    <div className="flex flex-col gap-2">
      <DynamicBreadcrumb />
      <div className="flex flex-row gap-3">
        <div className="sticky top-[6rem] flex h-full w-72 shrink-0 flex-col gap-3">
          <div className="flex w-full flex-row items-center gap-2 rounded-xl border p-3">
            <Avatar
              type="user"
              className={'h-20 w-20'}
              onChange={(e) => setAvatar(e.target.files[0])}
            >
              <Avatar.Image
                src={user?.user_metadata?.avatar}
                name={user?.user_metadata?.name}
                textSize="2xl"
              />
              {isLoading || (isUpdating && <Avatar.Loading />)}
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                {user?.user_metadata?.name}
              </h1>
              <h2 className="text-sm text-card-foreground/70">
                @{user?.user_metadata.username}
              </h2>
            </div>
          </div>
          <div className="flex w-full flex-row items-center gap-2 rounded-xl border p-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={accordionValue}
              onValueChange={setAccordionValue}
              defaultValue={currentPath}
            >
              <AccordionItem value="account" className="border-b">
                <AccordionTrigger
                  className={`text-lg ${currentPath === 'account' ? 'text-primary' : 'text-card-foreground'}`}
                >
                  My Account
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <AccordionButtons
                    accordionField="settings"
                    to="/account"
                    options={[
                      { value: 'user-settings', label: 'User Settings' },
                      { value: 'change-email', label: 'Change Email' },
                      { value: 'change-password', label: 'Change Password' },
                    ]}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="orders">
                <AccordionTrigger
                  className={`text-lg ${currentPath === 'orders' ? 'text-primary' : 'text-card-foreground'}`}
                >
                  Orders
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <AccordionButtons
                    accordionField="transactions"
                    to="/orders"
                    options={[
                      { value: 'purchases', label: 'Purchases' },
                      { value: 'sales', label: 'Sales' },
                    ]}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AccordionButtons = ({ accordionField, options, to }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentAccordion = searchParams.get(accordionField);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentPath = pathname.split('/')[1];

  useEffect(() => {
    if (currentAccordion == undefined) {
      const firstOption = options[0].value;
      if (currentPath === to.split('/')[1]) {
        searchParams.set(accordionField, firstOption);
        setSearchParams(searchParams);
      }
    }
  }, [
    currentAccordion,
    options,
    searchParams,
    setSearchParams,
    to,
    accordionField,
    currentPath,
  ]);

  const handleClick = (value) => {
    if (currentPath === to.split('/')[1]) {
      searchParams.set(accordionField, value);
      setSearchParams(searchParams);
    } else {
      navigate(`${to}?${accordionField}=${value}`);
    }
  };

  return (
    <>
      {options.map((option) => (
        <button
          key={option.value}
          className={`rounded-xl p-2 text-left transition-colors hover:bg-accent ${currentAccordion === option.value && 'bg-accent'} `}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </>
  );
};

export default UserSidebarLayout;
