import { FormProvider, useFormContext } from 'react-hook-form';
import { Input } from './Input';
import { Label } from './Label';
import { Textarea } from './Textarea';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const Form = ({ children, onSubmit, methods }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

const formInputVariant = cva('', {
  variants: {
    labelPosition: {
      left: 'grid grid-cols-5 gap-4',
      top: 'space-y-1.5',
    },
  },
  defaultVariants: {
    labelPosition: 'top',
  },
});

const FormInput = ({
  isLoading,
  inputType = 'input',
  name,
  label,
  type,
  validation = {},
  placeholder,
  className,
  labelPosition,
  onChange
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const Comp =
    (inputType === 'textarea' && Textarea) || (inputType === 'input' && Input);

  return (
    <div className="flex flex-col" key={name}>
      <div className={cn(formInputVariant({ labelPosition }))}>
        <Label
          htmlFor="username"
          className={labelPosition === 'left' && 'text-right mt-2'}
        >
          {label}
        </Label>
        <div className="col-span-4">
          <Comp
            type={type}
            {...register(name, {
              ...validation,
            })}
            id={name}
            placeholder={placeholder}
            onChange={onChange}
            disabled={isLoading}
            className={cn(`${errors[name] && 'border-red-500'}`, className)}
          />
          {errors[name] && (
            <div className="relative h-2 text-sm text-red-500">
              <p className="absolute top-0 animate-valid-slide-up">
                {errors[name].message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Form, FormInput };
