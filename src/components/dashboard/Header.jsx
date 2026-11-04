import React from 'react';
import { useAppTheme } from '../../context/ThemeContext';

const Header = ({ title, subtitle }) => {
  const { colors } = useAppTheme();

  return (
    <div className="mb-6">
      <h2
        style={{ color: colors.gray[100] }}
        className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight"
      >
        {title}
      </h2>
      <p
        style={{ color: colors.greenAccent[400] }}
        className="text-xs sm:text-sm font-semibold mt-0.5"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default Header;

