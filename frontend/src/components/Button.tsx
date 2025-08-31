import { type LucideIcon } from 'lucide-react'
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

type IconPosition = 'left' | 'right'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  icon?: LucideIcon
  iconPosition?: IconPosition
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles: string =
    'inline-flex items-center justify-center font-medium rounded-lg w-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-500 shadow-md hover:shadow-md transform',
    secondary:
      'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 shadow-sm hover:shadow-md',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  }

  const buttonClasses: string = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const LoadingSpinner: React.FC = () => (
    <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
  )

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && Icon && iconPosition === 'left' && <Icon className='h-4 w-4' />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className='h-4 w-4' />}
    </button>
  )
}

export default Button
