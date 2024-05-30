import { useSearchParams } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';
import { useState } from 'react';
import { useCategories } from '../../../hooks/categories/useCategories';
import { toast } from 'sonner';
import { Skeleton } from '../skeleton';

const FilterAccordion = () => {
  const [accordionValue, setAccordionValue] = useState('categories');

  const { categories, isLoading } = useCategories();
  const filterCategories = categories?.map((category) => ({
    value: category?.name,
    label: category?.name,
  }));

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value="categories">
        <AccordionTrigger className={`py-2 text-lg`}>
          Categories
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div className="w-[100px] p-2" key={index}>
                <Skeleton className="h-[16px]" />
              </div>
            ))
          ) : (
            <FilterButtons
              accordionField="categories"
              options={filterCategories}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FilterButtons = ({ accordionField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = searchParams.get(accordionField) || '';

  const handleClick = (value) => {
    if (currentValue.includes(value)) {
      const newValue = currentValue
        .replace(`${value},`, '')
        .replace(`,${value}`, '')
        .replace(value, '');
      if (newValue === '') {
        setSearchParams({});
      } else {
        setSearchParams({ [accordionField]: newValue });
      }
    } else {
      if (currentValue.split(',').length >= 3) {
        toast('You can only select up to 3 categories');
        return;
      }
      const newValue = `${currentValue}${currentValue ? ',' : ''}${value}`;
      setSearchParams({ [accordionField]: newValue });
    }
  };

  return (
    <>
      {options?.map((option) => (
        <button
          key={option.value}
          className={`rounded-xl border px-2 py-1 text-left text-xs transition  active:scale-90 ${currentValue.includes(option.value) ? 'hover:text-primabg-primary-foreground bg-primary text-primary-foreground hover:bg-primary' : 'text-card-foreground hover:bg-accent hover:text-accent-foreground'}  `}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </>
  );
};

export default FilterAccordion;
