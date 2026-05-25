import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type MotionSurfaceProps = PropsWithChildren<{
  as?: 'section' | 'div' | 'article';
  className?: string;
  delay?: number;
  id?: string;
}> & Omit<HTMLMotionProps<'div'>, 'children' | 'className' | 'initial' | 'animate' | 'transition'>;

const easeOut = [0.22, 1, 0.36, 1] as const;

export function MotionSurface({
  as = 'div',
  children,
  className,
  delay = 0,
  ...props
}: MotionSurfaceProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </Component>
  );
}
