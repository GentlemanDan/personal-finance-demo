'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { designTokens } from '@/lib/design-tokens';

interface FabProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function Fab({ onClick, icon, className = '' }: FabProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${className}`}
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: designTokens.colors.brand.primary,
        boxShadow: '0 8px 24px rgba(152, 139, 238, 0.4)',
        color: '#FFFFFF',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,
      }}
      aria-label="Добавить транзакцию"
    >
      {icon || <Plus size={24} strokeWidth={2} />}
    </button>
  );
}
