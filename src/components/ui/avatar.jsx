import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/helpers';
import Spinner from './loading/spinner';

const avatarVariants = cva('overflow-hidden rounded-full relative', {
  variants: {
    type: {
      user: 'h-8 w-8',
      profile: 'group h-[200px] w-[200px]',
    },
  },
  defaultVariants: {
    type: 'user',
  },
});

const Avatar = ({ children, type, className, onChange = null }) => {
  return (
    <div className={cn(avatarVariants({ type, className }))}>
      {children}
      {type === 'profile' && onChange && (
        <>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            className="absolute top-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={onChange}
          />
          <label
            htmlFor="avatar"
            className="absolute top-0 z-30 flex h-full w-full cursor-pointer items-center justify-center font-semibold  text-white opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100"
          >
            CHANGE
          </label>
        </>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center bg-black/20">
      <Spinner className="h-14 w-14" />
    </div>
  );
};

const Image = ({ src, className, name, textSize = 'xs' }) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt="user"
          className={cn(
            'h-full w-full object-cover transition-opacity',
            className,
          )}
        />
      ) : (
        name && (
          <div
            className={`flex h-full w-full items-center justify-center bg-blue-400 text-center text-${textSize} font-semibold text-white`}
          >
            {getInitials(name)}
          </div>
        )
      )}
    </>
  );
};

Avatar.Image = Image;
Avatar.Loading = Loading;

export default Avatar;
