import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Modern design system tokens and utilities
export const designTokens = {
  colors: {
    primary: {
      50: '#6366f1',
      100: '#4f46e5',
      500: '#7c3aed',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e293b',
      900: '#111827'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      warning: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 35px rgba(0, 0, 0, 0.15)'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem'
    },
    transitions: {
      fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// Modern utility classes
export const modernUtils = {
  glass: 'backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl',
  gradient: (from: string, to: string) => `bg-gradient-to-r ${from} ${to}`,
  glow: (color: string, intensity: 'sm' | 'md' | 'lg' = 'md') => {
    const intensityMap = {
      sm: 'shadow-lg',
      md: 'shadow-xl',
      lg: 'shadow-2xl'
    };
    return `drop-${intensityMap[intensity]} ${color}`;
  }
};

// Modern component for displaying design tokens
export const DesignSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="design-system-provider"
      style={{
        '--color-primary': (designTokens as any).colors.primary[theme === 'dark' ? 600 : 500],
        '--color-secondary': (designTokens as any).colors.primary[theme === 'dark' ? 700 : 600],
        '--gradient-primary': (designTokens as any).gradient.primary,
        '--shadow-lg': (designTokens as any).shadows.lg,
        '--transition-normal': (designTokens as any).transitions.normal
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default DesignSystemProvider;
