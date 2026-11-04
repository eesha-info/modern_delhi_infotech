import React from 'react';
import { useAppTheme } from '../../context/ThemeContext';
import ProgressCircle from './ProgressCircle';

const StatBox = ({ title, subtitle, icon: Icon, progress = 0.75, increase = '+14%' }) => {
  const { colors } = useAppTheme();

  return (
    <div
      style={{
        backgroundColor: colors.primary[400],
      }}
      className="rounded-lg p-5 flex flex-col justify-between shadow-xs transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          {Icon && (
            <div style={{ color: colors.greenAccent[600] }} className="mb-2">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h3
            style={{ color: colors.gray[100] }}
            className="text-2xl font-bold font-display tracking-tight"
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-col items-end">
          <ProgressCircle progress={progress} size={42} />
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2">
        <span
          style={{ color: colors.greenAccent[500] }}
          className="text-xs font-semibold"
        >
          {subtitle}
        </span>
        <span
          style={{ color: colors.greenAccent[600] }}
          className="text-xs italic font-semibold"
        >
          {increase}
        </span>
      </div>
    </div>
  );
};

export default StatBox;

