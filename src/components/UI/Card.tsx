import { motion } from 'framer-motion';
import type { HTMLAttributes, ReactNode } from 'react';

// Omit conflicting event handlers from HTMLAttributes
type MotionDivProps = Omit<HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>;

interface CardProps extends MotionDivProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  animate = true,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = [
    'rounded-lg',
    'transition-all duration-300',
  ];

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 bg-transparent',
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const classes = [
    ...baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ].join(' ');

  const Component = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: { y: -2 },
    transition: { duration: 0.4 }
  } : {};

  return (
    <Component
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}