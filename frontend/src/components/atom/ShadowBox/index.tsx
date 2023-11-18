/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, ReactNode, Ref } from 'react';
import classNames from 'classnames';

interface ShadowBoxProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  titleAlt?: string | ReactNode;
  variant?: 'stepper' | 'box' | 'link';
}

const ShadowBox = forwardRef(
  (
    { variant, title, titleAlt, children, className }: ShadowBoxProps,
    ref: Ref<any>
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          `z-1 relative rounded border border-bone-dark ${className}`,
          {
            'mb-5.5 px-6 py-8': !variant || variant === 'box',
            'px-6 pb-16 pt-6': variant === 'stepper',
            'mb-4 px-6 py-4 hover:bg-bone-lighter': variant === 'link',
          }
        )}
      >
        {(title || titleAlt) && (
          <div className="flex items-center justify-between">
            {title && (
              <h3 className="font-medium text-fingerprint-dark">{title}</h3>
            )}
            {titleAlt && titleAlt}
          </div>
        )}
        {children}
      </div>
    );
  }
);

export default ShadowBox;
