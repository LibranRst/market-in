import { cloneElement } from 'react';
import { Label } from './label';

const FormRowVertical = ({ label, children, error, htmlFor }) => {
  return (
    <div className="space-y-1.5">
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
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

export default FormRowVertical;
