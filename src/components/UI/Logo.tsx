import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 'md', animated = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
  };

  const logoAnimationProps = animated ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.05 },
    transition: { duration: 0.6 }
  } : {};

  const Component = animated ? motion.div : 'div';

  return (
    <Component
      className={`${sizeClasses[size]} ${className}`}
      {...logoAnimationProps}
    >
      <svg
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Logic gate symbol */}
        <motion.path
          d="M8 12 Q8 8, 12 8 L20 8 Q24 8, 24 12 L24 16 Q24 20, 20 20 L12 20 Q8 20, 8 16 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-blue-600"
          animate={animated ? { strokeDasharray: [0, 100] } : undefined}
          transition={animated ? { duration: 2, repeat: Infinity, ease: "linear" } : undefined}
        />
        
        {/* Input lines */}
        <line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
        <line x1="4" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
        
        {/* Output line */}
        <line x1="24" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
        
        {/* Text "Logi" */}
        <text
          x="38"
          y="24"
          className="text-xl font-bold fill-current text-gray-800"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Logi
        </text>
        
        {/* Decorative elements */}
        <motion.circle
          cx="36"
          cy="8"
          r="2"
          className="fill-blue-500"
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          } : undefined}
          transition={animated ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : undefined}
        />
        <motion.circle
          cx="100"
          cy="28"
          r="1.5"
          className="fill-green-500"
          animate={animated ? {
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          } : undefined}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          } : undefined}
        />
      </svg>
    </Component>
  );
}