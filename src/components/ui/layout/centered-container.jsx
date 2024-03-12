import { cn } from '@/lib/utils';

const CenteredContainer = ({ children, className, ...props }) => {
  return (
    <div
      className={cn('mt-5 flex h-[calc(100dvh-7rem)] flex-col', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default CenteredContainer;