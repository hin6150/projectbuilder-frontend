import React from "react";
import { buttonStyles } from "./ButtonForm.css";

type ButtonProps = {
  variant: "primary" | "destructive" | "cancel" | "subtle";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  const variantClasses = buttonStyles.variants[variant];

  return (
    <button className={`${buttonStyles.base} ${variantClasses}`}>
      {children}
    </button>
  );
};

type ButtonFormProps = {
  variant: "primary" | "destructive" | "cancel" | "subtle";
};

const ButtonForm: React.FC<ButtonFormProps> = ({ variant }) => {
  return (
    <div className="space-y-4">
      <Button variant={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
    </div>
  );
};

export default ButtonForm;
