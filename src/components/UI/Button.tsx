import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-semibold uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent-purple hover:bg-purple-600 text-white focus:ring-accent-purple shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 dark:bg-neutral-dark hover:bg-gray-200 dark:hover:bg-neutral-medium text-neutral-dark dark:text-white focus:ring-gray-400',
    outline: 'border-2 border-neutral-dark dark:border-white text-neutral-dark dark:text-white hover:bg-neutral-dark hover:text-white dark:hover:bg-white dark:hover:text-neutral-dark focus:ring-neutral-dark'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;