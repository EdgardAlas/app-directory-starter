import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import { CgSpinner } from 'react-icons/cg';

interface Props extends Omit<ButtonProps, 'asChild'> {
  loading?: boolean;
}

export const ButtonLoading = forwardRef<HTMLButtonElement, Props>(
  ({ className, loading, ...props }, ref) => {
    return (
      <Button
        className={cn('inline-flex items-center gap-2', className)}
        disabled={loading}
        {...props}
        ref={ref}
      >
        {loading ? (
          <CgSpinner
            size={10}
            className='animate-spin'
            style={{
              scale: 1.5,
            }}
          />
        ) : null}
        {props.children}
      </Button>
    );
  }
);

ButtonLoading.displayName = 'ButtonLoading';
