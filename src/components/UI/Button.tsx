import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Omit conflicting event handlers from HTMLAttributes
type MotionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>;

interface ButtonProps extends MotionButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  const variantClasses = {
    primary: [
      'bg-blue-600 text-white hover:bg-blue-700',
      'focus:ring-blue-500',
    ],
    secondary: [
      'bg-gray-600 text-white hover:bg-gray-700',
      'focus:ring-gray-500',
    ],
    outline: [
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      'focus:ring-blue-500',
    ],
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = [
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        children
      )}
    </motion.button>
  );
}