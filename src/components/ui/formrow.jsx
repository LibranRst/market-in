import { cloneElement } from 'react';
import { Label } from './label';

const FormRow = ({ label, children, error, htmlFor }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Label htmlFor={htmlFor} className="mt-2 text-right">
        {label}
      </Label>
      <div className="col-span-4">
        {cloneElement(children, {
          error,
        })}
        {error && (
          <div className="relative h-2 text-sm text-red-500">
            <p className="absolute top-0 ml-2 animate-valid-slide-up">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

{
  /* <div className={cn(formInputVariant({ labelPosition }))}>
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
      </div> */
}

export default FormRow;
