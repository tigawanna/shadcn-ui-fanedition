import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps } from 'class-variance-authority';
declare const toggleVariants: (
  props?:
    | (import('class-variance-authority').ConfigVariants<{
        variant: {
          default: string;
          outline: string;
        };
        size: {
          default: string;
          sm: string;
          lg: string;
        };
      }> &
        import('class-variance-authority/dist/types').ClassProp)
    | undefined
) => string;
declare const Toggle: React.ForwardRefExoticComponent<
  Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, 'ref'> &
    VariantProps<
      (
        props?:
          | (import('class-variance-authority').ConfigVariants<{
              variant: {
                default: string;
                outline: string;
              };
              size: {
                default: string;
                sm: string;
                lg: string;
              };
            }> &
              import('class-variance-authority/dist/types').ClassProp)
          | undefined
      ) => string
    > &
    React.RefAttributes<HTMLButtonElement>
>;
export { Toggle, toggleVariants };
//# sourceMappingURL=toggle.d.ts.map
