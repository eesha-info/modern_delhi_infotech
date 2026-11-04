import React from 'react';
import { Download } from 'lucide-react';
import { useAppTheme } from '../../context/ThemeContext';

const RevenueChart = ({ totalRevenue = 1480000 }) => {
  const { colors } = useAppTheme();

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Points for 3 curves matching the screenshot curves
  const line1 = [120, 160, 140, 240, 210, 180, 260, 220, 150, 190, 170, 210]; // Pink / US
  const line2 = [80, 110, 100, 180, 150, 120, 210, 170, 110, 140, 120, 160]; // Blue / France
  const line3 = [50, 70, 60, 130, 90, 70, 140, 110, 70, 90, 80, 110]; // Green / Japan

  const width = 650;
  const height = 210;
  const paddingX = 40;
  const paddingY = 25;

  const getPoints = (arr) => {
    const max = 300;
    const step = (width - paddingX * 2) / (arr.length - 1);
    return arr.map((val, i) => {
      const x = paddingX + i * step;
      const y = height - paddingY - (val / max) * (height - paddingY * 2);
      return { x, y };
    });
  };

  const toPath = (points) => {
    return points.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    }, '');
  };

  const p1 = getPoints(line1);
  const p2 = getPoints(line2);
  const p3 = getPoints(line3);

  return (
    <div
      style={{ backgroundColor: colors.primary[400] }}
      className="rounded-lg p-6 shadow-xs flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-2">
        <div>
          <h4
            style={{ color: colors.gray[100] }}
            className="text-base font-bold font-display"
          >
            Revenue Generated
          </h4>
          <div
            style={{ color: colors.greenAccent[500] }}
            className="text-xl font-bold font-display mt-0.5"
          >
            ₹{totalRevenue.toLocaleString()}
          </div>
        </div>

        <button
          style={{ color: colors.greenAccent[500] }}
          className="p-1.5 hover:opacity-75 transition-opacity"
          title="Download Chart Data"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* SVG Multi-curve Line Chart */}
      <div className="w-full overflow-x-auto mt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 select-none">
          {/* Subtle Grid Lines */}
          {[50, 100, 150, 200].map((val, idx) => {
            const y = height - paddingY - (val / 300) * (height - paddingY * 2);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke={colors.primary[500]}
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            );
          })}

          {/* Curves */}
          <path d={toPath(p1)} fill="none" stroke="#e99592" strokeWidth="2.5" />
          <path d={toPath(p2)} fill="none" stroke={colors.blueAccent[400]} strokeWidth="2.5" />
          <path d={toPath(p3)} fill="none" stroke={colors.greenAccent[500]} strokeWidth="2.5" />

          {/* Data Points */}
          {p1.map((p, i) => (
            <circle key={`p1-${i}`} cx={p.x} cy={p.y} r="3" fill="#e99592" />
          ))}
          {p2.map((p, i) => (
            <circle key={`p2-${i}`} cx={p.x} cy={p.y} r="3" fill={colors.blueAccent[400]} />
          ))}
          {p3.map((p, i) => (
            <circle key={`p3-${i}`} cx={p.x} cy={p.y} r="3" fill={colors.greenAccent[500]} />
          ))}

          {/* X Axis Labels */}
          {labels.map((lbl, i) => {
            const x = paddingX + i * ((width - paddingX * 2) / (labels.length - 1));
            return (
              <text
                key={i}
                x={x}
                y={height - 5}
                textAnchor="middle"
                fontSize="10"
                fill={colors.gray[400]}
                fontFamily="sans-serif"
              >
                {lbl}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend Dots on bottom right */}
      <div className="flex items-center justify-end gap-4 mt-2 text-[11px] font-semibold">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e99592]"></span>
          <span>ADIT 1-Yr</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.blueAccent[400] }}></span>
          <span>ADCA 1-Yr</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.greenAccent[500] }}></span>
          <span>Tally / Typing</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;

