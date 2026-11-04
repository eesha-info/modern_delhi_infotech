import React from 'react';
import { useAppTheme } from '../../context/ThemeContext';

const ProgressCircle = ({ progress = 0.75, size = 40 }) => {
  const { colors } = useAppTheme();
  const angle = Number(progress) * 360;

  return (
    <div
      style={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="flex-shrink-0"
    />
  );
};

export default ProgressCircle;
