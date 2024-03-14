import Avatar from '@/components/ui/avatar';

import { Link } from 'react-router-dom';
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../button';
import { useLogout } from '@/hooks/auth/useLogout';
import { useTheme } from '@/components/theme-provider';

const UserDropdown = ({ user }) => {
  const { logout } = useLogout();
  const { theme, setTheme } = useTheme();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-[500] outline-none transition-colors hover:bg-accent">
          <Avatar type="user">
            <Avatar.Image
              src={user?.user_metadata?.avatar}
              name={user?.user_metadata?.username}
            />
          </Avatar>
          <p className="w-36 truncate text-left">
            {user?.user_metadata?.username}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[12.5rem]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem className="flex justify-between">
              <p>Profile</p>
              <IoPersonOutline size={16} />
            </DropdownMenuItem>
          </Link>
          <Link to="/settings">
            <DropdownMenuItem className="flex justify-between">
              <p>Settings</p>
              <IoSettingsOutline size={16} />
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger subPosition="right">
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="flex justify-between">
              <IoLogOutOutline size={16} />
              <p>Logout</p>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Out.</DialogTitle>
          <DialogDescription>
            {' '}
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" onClick={logout}>
            Yes, i'm sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDropdown;
