import React from 'react'
import { buttonStyles } from './ButtonForm.css'

type ButtonProps = {
  variant: 'primary' | 'destructive' | 'cancel' | 'subtle'
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  const variantClasses = buttonStyles.variants[variant]
  const buttonText =
    children || variant.charAt(0).toUpperCase() + variant.slice(1)

  return (
    <div className="space-y-4">
      <button className={`${buttonStyles.base} ${variantClasses}`}>
        {buttonText}
      </button>
    </div>
  )
}

export default Button
