import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const badgeVariants: (
  props?:
    | (import('class-variance-authority').ConfigVariants<{
        variant: {
          default: string;
          secondary: string;
          destructive: string;
          outline: string;
        };
      }> &
        import('class-variance-authority/dist/types').ClassProp)
    | undefined
) => string;
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
declare function Badge({ className, variant, ...props }: BadgeProps): React.JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map
