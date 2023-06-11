import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { type VariantProps } from 'class-variance-authority';
declare const Sheet: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<
  SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const SheetClose: React.ForwardRefExoticComponent<
  SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
>;
declare const sheetVariants: (
  props?:
    | (import('class-variance-authority').ConfigVariants<{
        position: {
          top: string;
          bottom: string;
          left: string;
          right: string;
        };
        size: {
          content: string;
          default: string;
          sm: string;
          lg: string;
          xl: string;
          full: string;
        };
      }> &
        import('class-variance-authority/dist/types').ClassProp)
    | undefined
) => string;
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
declare const SheetContent: React.ForwardRefExoticComponent<
  DialogContentProps & React.RefAttributes<HTMLDivElement>
>;
declare const SheetHeader: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
  displayName: string;
};
declare const SheetFooter: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
  displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<
  Omit<SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, 'ref'> &
    React.RefAttributes<HTMLHeadingElement>
>;
declare const SheetDescription: React.ForwardRefExoticComponent<
  Omit<SheetPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, 'ref'> &
    React.RefAttributes<HTMLParagraphElement>
>;
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
//# sourceMappingURL=sheet.d.ts.map
