import { Link } from 'react-router-dom';
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { Button } from '../Button';
import { useLogout } from '../../../hooks/auth/useLogout';
import { useTheme } from '../../Theme-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';
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
} from '../Dropdown-menu';
import Avatar from '../Avatar';
import Spinner from '../loading/Spinner';

const UserDropdown = ({ user }) => {
  const { logout, isLoading } = useLogout();
  const { theme, setTheme } = useTheme();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-[500] outline-none transition-colors hover:bg-accent">
          <Avatar type="user">
            <Avatar.Image src={user?.imageUrl} name={user?.name} />
          </Avatar>
          <p className="w-36 truncate text-left">{user?.username}</p>
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
          <Button size="sm" onClick={logout} disabled={isLoading}>
            Yes, i'm sure {isLoading && <Spinner className="ml-1 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDropdown;
