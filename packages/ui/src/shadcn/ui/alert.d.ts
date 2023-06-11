import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const Alert: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<
      (
        props?:
          | (import('class-variance-authority').ConfigVariants<{
              variant: {
                default: string;
                destructive: string;
              };
            }> &
              import('class-variance-authority/dist/types').ClassProp)
          | undefined
      ) => string
    > &
    React.RefAttributes<HTMLDivElement>
>;
declare const AlertTitle: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>
>;
declare const AlertDescription: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>
>;
export { Alert, AlertTitle, AlertDescription };
//# sourceMappingURL=alert.d.ts.map
