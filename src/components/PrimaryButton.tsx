import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const PrimaryButton = ({ 
  children, 
  className, 
  fullWidth = false,
  disabled,
  ...props 
}: PrimaryButtonProps) => {
  return (
    <button
      className={cn(
        "gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
