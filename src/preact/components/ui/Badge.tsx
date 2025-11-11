interface BadgeProps {
  variant?:
    | 'neutral'
    | 'secondary'
    | 'success'
    | 'primary'
    | 'danger'
    | 'warning';
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

function Badge({
  variant = 'neutral',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-xs font-medium py-1.5 px-3 transition-colors duration-150';

  const variants = {
    neutral: 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white',
    secondary: 'bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white',
    success: 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
    danger: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
  };

  const variantClasses = variants[variant] || variants.neutral;

  return (
    <span
      className={`${baseStyles} ${variantClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
