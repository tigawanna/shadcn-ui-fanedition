import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (
  props?:
    | (import('class-variance-authority').ConfigVariants<{
        variant: {
          default: string;
          destructive: string;
          outline: string;
          secondary: string;
          ghost: string;
          link: string;
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
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map
