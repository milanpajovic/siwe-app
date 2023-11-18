import './style.scss';
import { Noop } from 'react-hook-form';
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { XCircle } from '@phosphor-icons/react';

export type ClearableInputRef = HTMLInputElement & { clear: () => void };

type InputPropsBase = {
  label?: string;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: Noop;
  value?: string | number | undefined;
  name?: string;
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'number'>;
  hideLabel?: boolean;
  min?: number | string;
  max?: number | string;
};

type InputPropsWoClear = InputPropsBase & {
  isClearable?: false;
  onClear?: never;
};

type InputPropsWClear = InputPropsBase & {
  isClearable: true;
  onClear?: () => void;
};

type InputProps = InputPropsWoClear | InputPropsWClear;

/**
 * @prop type - currently supported text, email, number
 * @prop isClearable - toggles input clear functionality
 * @prop onClear(optional) - function to be executed upon clear
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      name,
      value,
      defaultValue,
      placeholder,
      className,
      disabled,
      onChange,
      onBlur,
      hideLabel,
      min,
      max,
      isClearable,
      onClear,
    },
    ref
  ) => {
    const id = useId();
    const [localValue, setLocalValue] = useState(defaultValue ?? '');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      if (isClearable)
        return Object.assign(inputRef.current!, {
          clear: () => {
            setLocalValue('');
            onClear?.();
          },
        });
      else return inputRef.current!;
    });

    return (
      <div
        className={classNames(`input-field ${className}`, {
          'hide-label': hideLabel,
        })}
      >
        {isClearable && localValue && (
          <button
            className="clear"
            type="button"
            onClick={() => {
              setLocalValue('');
              onClear?.();
            }}
          >
            <XCircle weight="fill" size={16} />
          </button>
        )}
        <input
          type={type ?? 'text'}
          value={isClearable ? localValue : value}
          name={name}
          ref={inputRef}
          max={max}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          min={min}
          onChange={(e) => {
            setLocalValue(e.target.value);
            onChange && onChange(e);
          }}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {!hideLabel && <label htmlFor={id}>{label}</label>}
      </div>
    );
  }
);

export default Input;
