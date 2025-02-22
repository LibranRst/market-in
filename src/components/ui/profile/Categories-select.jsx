import { useState } from 'react';
import { Controller } from 'react-hook-form';
import PopoverCustom from '../Popover-custom';

const CategorySelect = ({ categories, control, error }) => {
  const [previewCategories, setPreviewCategories] = useState([]);

  const handlePreviewCategories = (category) => {
    if (previewCategories.includes(category)) {
      setPreviewCategories(previewCategories.filter((c) => c !== category));
    } else {
      setPreviewCategories([...previewCategories, category]);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-4 space-y-1">
        <PopoverCustom
          title="Select Categories"
          description="Categories for your products."
          className={error ? 'border-red-500' : ''}
        >
          <div className="flex flex-wrap gap-1">
            {categories?.map((category) => (
              <Controller
                key={category.id}
                control={control}
                name={`categories.${category.id}`}
                render={({ field }) => {
                  return (
                    <div
                      className={`relative rounded-xl border border-input transition-all active:scale-90 ${field.value ? 'bg-primary  text-primary-foreground' : 'bg-transparent hover:bg-accent'} cursor-pointer px-1 py-1 text-sm `}
                    >
                      <label htmlFor={`category-${category.id}`}>
                        {category.name}
                      </label>
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        className={`absolute left-0  h-full w-full cursor-pointer opacity-0`}
                        checked={field.value || false}
                        onClick={() => handlePreviewCategories(category.name)}
                        {...field}
                      />
                    </div>
                  );
                }}
              />
            ))}
          </div>
        </PopoverCustom>
        <div className="flex max-h-[56px] w-full flex-wrap gap-1 overflow-auto">
          {previewCategories?.map((category) => (
            <div
              key={category}
              className="shrink-0 rounded-md border border-input bg-card px-1 py-1 text-xs text-card-foreground"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
