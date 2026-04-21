import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { SvgCanvas, SvgText } from './figure-primitives';

export function LineChartFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'line-chart' }>;
}) {
  const points = figure.points.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <SvgCanvas>
      <line
        x1="42"
        y1="34"
        x2="42"
        y2="306"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <line
        x1="42"
        y1="306"
        x2="608"
        y2="306"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />

      <path d={`M ${points} L 608 306 L 42 306 Z`} fill="rgba(34,197,94,0.06)" />
      <polyline
        points={points}
        fill="none"
        stroke={toneColor.success}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {figure.points.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r="5.5"
          fill={
            toneColor[
              point.tone ?? (index < 2 ? 'warning' : index < 4 ? 'primary' : 'success')
            ]
          }
        />
      ))}

      <SvgText
        x={78}
        y={334}
        text={figure.xLabel}
        anchor="start"
        size={12}
        color="rgba(248,250,252,0.58)"
      />
      <SvgText
        x={574}
        y={28}
        text={figure.yLabel}
        anchor="end"
        size={12}
        color="rgba(248,250,252,0.58)"
      />
      <SvgText
        x={320}
        y={334}
        text={figure.footer}
        size={13}
        color="rgba(248,250,252,0.68)"
        maxChars={58}
      />
    </SvgCanvas>
  );
}
