import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { SvgCanvas, SvgText } from './figure-primitives';

export function VerticalStepsFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'vertical-steps' }>;
}) {
  return (
    <SvgCanvas>
      {figure.steps.map((step, index) => {
        const y = 44 + index * 60;
        const active = !!step.active;
        return (
          <g key={`${step.label}-${index}`}>
            <circle
              cx="76"
              cy={y}
              r="22"
              fill={active ? toneColor.primary : 'rgba(255,255,255,0.04)'}
              stroke={active ? 'none' : 'rgba(255,255,255,0.16)'}
            />
            <SvgText x={76} y={y + 6} text={step.icon ?? `${index + 1}`} size={18} />
            <SvgText
              x={122}
              y={y + 5}
              text={step.label.toUpperCase()}
              anchor="start"
              size={15}
              color={active ? '#f8fafc' : 'rgba(248,250,252,0.72)'}
              maxChars={22}
            />
            {index < figure.steps.length - 1 ? (
              <line
                x1="76"
                y1={y + 24}
                x2="76"
                y2={y + 36}
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="3"
              />
            ) : null}
          </g>
        );
      })}
    </SvgCanvas>
  );
}
