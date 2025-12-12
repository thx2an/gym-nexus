import React from 'react';

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-bg-subtle border border-borderColor-light rounded-xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, action }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-text-strong">{title}</h3>
      {action && <div>{action}</div>}
    </div>
  );
};
