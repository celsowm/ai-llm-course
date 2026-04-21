import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { Arrow, SvgCanvas, SvgPill, SvgText } from './figure-primitives';

export function LoopFigure({ figure }: { figure: Extract<FigureSpec, { kind: 'loop' }> }) {
  const topXs = [110, 300, 490];
  const bottomXs = [110, 300, 490];

  return (
    <SvgCanvas>
      {figure.topRow.map((item, index) => (
        <g key={item.label}>
          <SvgPill
            x={topXs[index] - 74}
            y={92}
            w={148}
            h={42}
            label={item.label}
            tone={item.tone ?? 'primary'}
          />
          {index < figure.topRow.length - 1 ? (
            <Arrow
              x1={topXs[index] + 78}
              y1={113}
              x2={topXs[index + 1] - 78}
              y2={113}
              color={toneColor[item.tone ?? 'primary']}
            />
          ) : null}
        </g>
      ))}

      {figure.bottomRow.map((item, index) => (
        <g key={item.label}>
          <SvgPill
            x={bottomXs[index] - 82}
            y={202}
            w={164}
            h={42}
            label={item.label}
            tone={item.tone ?? 'warning'}
          />
          {index < figure.bottomRow.length - 1 ? (
            <Arrow
              x1={bottomXs[index] + 86}
              y1={223}
              x2={bottomXs[index + 1] - 86}
              y2={223}
              color={toneColor[item.tone ?? 'warning']}
            />
          ) : null}
        </g>
      ))}

      <path
        d="M 532 133 C 584 148, 584 196, 532 210"
        fill="none"
        stroke="rgba(248,250,252,0.24)"
        strokeWidth="3"
        strokeDasharray="7 7"
      />
      <path
        d="M 108 202 C 56 186, 56 140, 108 124"
        fill="none"
        stroke="rgba(248,250,252,0.24)"
        strokeWidth="3"
        strokeDasharray="7 7"
      />
      <SvgText
        x={320}
        y={292}
        text={figure.footer}
        size={13}
        color="rgba(248,250,252,0.68)"
        maxChars={54}
      />
    </SvgCanvas>
  );
}
