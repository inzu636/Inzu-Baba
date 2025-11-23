import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading, 
  ...props 
}) => {
  const baseStyles = "w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 text-slate-900 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600",
    outline: "border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, leftIcon, rightElement, className = '', ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">{label}</label>}
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-400 transition-colors">
            {leftIcon}
          </div>
        )}
        <input 
          className={`w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 rounded-xl py-3.5 ${leftIcon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-24' : 'pr-4'} focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
    {children}
  </span>
);