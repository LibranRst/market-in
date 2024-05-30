import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Separator } from './Separator';
import { cn } from '../../lib/utils';

const PopoverCustom = ({ children, title, description, className }) => {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          'flex h-9 w-fit items-center justify-between whitespace-nowrap rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className,
        )}
      >
        {title}
        <CaretSortIcon className="h-4 w-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[500px] rounded-xl">
        <div className="grid gap-2">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Separator className="my-1" />
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCustom;
