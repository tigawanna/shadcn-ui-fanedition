import { ClassProp, ConfigVariants } from '@/shadcn/lib/clx-types';
import { cva } from 'class-variance-authority';

const variants = {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary',
  },
  size: {
    default: 'h-10 py-2 px-4 rounded',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-15 px-8 rounded-md',
  },
};

type buttonVariants = (
  props?: ConfigVariants<{
    variant: (typeof variants)['variant'];
    size: (typeof variants)['size'];
  }> &
    ClassProp
) => string;

export const buttonVariants: buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants,
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
