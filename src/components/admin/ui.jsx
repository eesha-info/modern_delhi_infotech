import React from 'react';
import { X } from 'lucide-react';
import { useAppTheme } from '../../context/ThemeContext';

// Small themed building blocks shared by the admin management modules.

export const Panel = ({ className = '', children, style }) => {
  const { colors } = useAppTheme();
  return (
    <div style={{ backgroundColor: colors.primary[400], ...style }} className={`rounded-lg shadow-xs ${className}`}>
      {children}
    </div>
  );
};

export const Btn = ({ variant = 'primary', className = '', children, ...props }) => {
  const { colors } = useAppTheme();
  const styles = {
    primary: { backgroundColor: colors.blueAccent[700], color: '#fff' },
    success: { backgroundColor: colors.greenAccent[600], color: '#fff' },
    danger: { backgroundColor: colors.redAccent[600], color: '#fff' },
    ghost: { backgroundColor: colors.primary[500], color: colors.gray[100] },
  };
  return (
    <button
      type="button"
      style={styles[variant]}
      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Field = ({ label, as = 'input', className = '', children, hint, ...props }) => {
  const { colors } = useAppTheme();
  const Tag = as;
  return (
    <label className={`block ${className}`}>
      {label && (
        <span style={{ color: colors.gray[300] }} className="block text-[11px] font-bold uppercase tracking-wider mb-1">
          {label}
        </span>
      )}
      <Tag
        style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }}
        className="w-full rounded-md px-3 py-2 text-sm outline-none border border-transparent focus:border-blue-500"
        {...props}
      >
        {children}
      </Tag>
      {hint && <span style={{ color: colors.gray[400] }} className="block text-[11px] mt-1">{hint}</span>}
    </label>
  );
};

export const Modal = ({ title, onClose, children, footer, wide = false }) => {
  const { colors } = useAppTheme();
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: colors.primary[400], color: colors.gray[100] }}
        className={`w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] flex flex-col rounded-xl shadow-2xl`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="font-bold text-base">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-white/10 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

export const Badge = ({ tone = 'green', children }) => {
  const { colors } = useAppTheme();
  const tones = {
    green: colors.greenAccent[500],
    red: colors.redAccent[400],
    blue: colors.blueAccent[400],
    gray: colors.gray[300],
    amber: '#f59e0b',
  };
  return (
    <span
      style={{ color: tones[tone], backgroundColor: colors.primary[500] }}
      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
    >
      {children}
    </span>
  );
};

export const DataTable = ({ columns, children, empty }) => {
  const { colors } = useAppTheme();
  return (
    <Panel className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr style={{ backgroundColor: colors.primary[500], color: colors.gray[300] }} className="text-[11px] font-bold uppercase tracking-wider">
              {columns.map((c) => (
                <th key={c} className={`py-3 px-4 ${c === 'Actions' ? 'text-right' : ''}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ color: colors.gray[100] }} className="divide-y divide-white/5">{children}</tbody>
        </table>
        {empty && (
          <p style={{ color: colors.gray[400] }} className="text-center text-xs py-10">{empty}</p>
        )}
      </div>
    </Panel>
  );
};

export const Muted = ({ children, className = '' }) => {
  const { colors } = useAppTheme();
  return <span style={{ color: colors.gray[400] }} className={className}>{children}</span>;
};

export const PageHead = ({ title, subtitle, action }) => {
  const { colors } = useAppTheme();
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
      <div>
        <h2 style={{ color: colors.gray[100] }} className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight">
          {title}
        </h2>
        <p style={{ color: colors.greenAccent[400] }} className="text-xs sm:text-sm font-semibold mt-0.5">{subtitle}</p>
      </div>
      {action && <div className="flex flex-wrap gap-2">{action}</div>}
    </div>
  );
};

export const StatTile = ({ label, value, tone }) => {
  const { colors } = useAppTheme();
  const c = { green: colors.greenAccent[500], red: colors.redAccent[400], blue: colors.blueAccent[400] }[tone] || colors.gray[100];
  return (
    <Panel className="p-4">
      <Muted className="text-[11px] font-bold uppercase tracking-wider block">{label}</Muted>
      <div style={{ color: c }} className="text-2xl font-extrabold mt-1">{value}</div>
    </Panel>
  );
};
