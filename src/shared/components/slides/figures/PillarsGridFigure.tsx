import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor, toneFill } from './figure-utils';
import { Arrow, SvgCanvas, SvgText } from './figure-primitives';

export function PillarsGridFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'pillars-grid' }>;
}) {
  const centers = [120, 320, 520];
  const gridPositions = [
    [120, 210],
    [320, 210],
    [120, 284],
    [320, 284],
  ];

  return (
    <SvgCanvas>
      {figure.pipeline.map((item, index) => (
        <g key={item.label}>
          <circle
            cx={centers[index]}
            cy="86"
            r="28"
            fill={toneFill[item.tone ?? 'primary']}
            stroke={toneColor[item.tone ?? 'primary']}
            strokeWidth="2"
          />
          <SvgText x={centers[index]} y={92} text={item.icon} size={21} />
          <SvgText x={centers[index]} y={128} text={item.label} size={13} maxChars={14} />
          {index < figure.pipeline.length - 1 ? (
            <Arrow
              x1={centers[index] + 34}
              y1={86}
              x2={centers[index + 1] - 34}
              y2={86}
              color={toneColor[item.tone ?? 'primary']}
            />
          ) : null}
        </g>
      ))}

      {figure.grid.map((item, index) => {
        const [x, y] = gridPositions[index];
        return (
          <g key={item.label}>
            <rect
              x={x - 82}
              y={y - 24}
              width="164"
              height="48"
              rx="18"
              fill={`${item.color}14`}
              stroke={`${item.color}`}
              strokeOpacity="0.5"
            />
            <SvgText x={x - 48} y={y + 6} text={item.icon} size={18} />
            <SvgText
              x={x + 10}
              y={y + 5}
              text={item.label}
              anchor="start"
              size={13}
              maxChars={14}
            />
          </g>
        );
      })}
    </SvgCanvas>
  );
}
