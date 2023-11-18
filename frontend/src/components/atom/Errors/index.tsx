import { ErrorMessage } from '@hookform/error-message';
import { X } from '@phosphor-icons/react';

interface ErrorsProps {
  name: string;
  errors: any;
  className?: string;
}

const Errors = ({ errors, name, className }: ErrorsProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={(data) => {
        return (
          <div
            className={
              className
                ? className
                : 'absolute mt-1 flex items-center text-state-red'
            }
          >
            <X className="mr-1" /> {data.message}
          </div>
        );
      }}
    />
  );
};

export default Errors;
