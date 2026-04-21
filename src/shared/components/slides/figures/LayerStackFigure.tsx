import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { SvgCanvas, SvgText } from './figure-primitives';

export function LayerStackFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'layer-stack' }>;
}) {
  const xs = [92, 246, 394, 544];

  return (
    <SvgCanvas>
      {figure.columns.map((column, index) => (
        <g key={column.label}>
          <SvgText
            x={xs[index]}
            y={44}
            text={column.label}
            size={13}
            color={column.emphasis ? '#f8fafc' : 'rgba(248,250,252,0.68)'}
            maxChars={14}
          />
          {Array.from({ length: column.nodes }).map((_, nodeIndex) => {
            const spacing = column.nodes === 1 ? 0 : 108 / (column.nodes - 1);
            const y = 124 + nodeIndex * spacing;
            const r = column.emphasis ? 12 : 10;
            return (
              <circle
                key={`${column.label}-${nodeIndex}`}
                cx={xs[index]}
                cy={y}
                r={r}
                fill={toneColor[column.tone]}
                fillOpacity={column.emphasis ? 1 : 0.94}
              />
            );
          })}
          {index < figure.columns.length - 1 ? (
            Array.from({
              length: Math.max(column.nodes, figure.columns[index + 1].nodes),
            }).map((_, lineIndex) => {
              const next = figure.columns[index + 1];
              const y1 =
                124 +
                (column.nodes === 1
                  ? 54
                  : (108 / Math.max(column.nodes - 1, 1)) *
                    Math.min(lineIndex, column.nodes - 1));
              const y2 =
                124 +
                (next.nodes === 1
                  ? 54
                  : (108 / Math.max(next.nodes - 1, 1)) *
                    Math.min(lineIndex, next.nodes - 1));
              return (
                <line
                  key={`${column.label}-line-${lineIndex}`}
                  x1={xs[index] + 18}
                  y1={y1}
                  x2={xs[index + 1] - 18}
                  y2={y2}
                  stroke="rgba(148,163,184,0.28)"
                  strokeWidth="1.4"
                />
              );
            })
          ) : null}
        </g>
      ))}

      <SvgText
        x={320}
        y={312}
        text={figure.footer}
        size={13}
        color="rgba(248,250,252,0.68)"
        maxChars={56}
      />
    </SvgCanvas>
  );
}
