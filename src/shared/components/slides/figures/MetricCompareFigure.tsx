import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor, toneFill } from './figure-utils';
import { SvgCanvas, SvgText } from './figure-primitives';

export function MetricCompareFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'metric-compare' }>;
}) {
  return (
    <SvgCanvas>
      <line
        x1="84"
        y1="292"
        x2="560"
        y2="292"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <line
        x1="84"
        y1="64"
        x2="84"
        y2="292"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />

      <SvgText
        x={180}
        y={74}
        text={figure.leftLabel}
        size={13}
        color="rgba(248,250,252,0.68)"
      />
      <rect
        x="144"
        y={292 - figure.leftHeight}
        width="72"
        height={figure.leftHeight}
        rx="16"
        fill={toneFill.primary}
        stroke={toneColor.primary}
        strokeWidth="1.5"
      />
      <SvgText
        x={180}
        y={292 - figure.leftHeight + 28}
        text={figure.leftValue}
        size={16}
        weight={900}
      />

      <SvgText
        x={460}
        y={74}
        text={figure.rightLabel}
        size={13}
        color="rgba(248,250,252,0.68)"
      />
      <rect
        x="424"
        y={292 - figure.rightHeight}
        width="72"
        height={figure.rightHeight}
        rx="16"
        fill={toneFill.success}
        stroke={toneColor.success}
        strokeWidth="1.5"
      />
      <SvgText
        x={460}
        y={292 - figure.rightHeight + 28}
        text={figure.rightValue}
        size={16}
        weight={900}
      />

      <SvgText
        x={320}
        y={148}
        text={figure.centerLabel}
        size={24}
        color={toneColor.warning}
        weight={900}
      />
      <line
        x1="286"
        y1="162"
        x2="354"
        y2="162"
        stroke={toneColor.warning}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <SvgText
        x={320}
        y={330}
        text={figure.footer}
        size={13}
        color="rgba(248,250,252,0.68)"
        maxChars={56}
      />
    </SvgCanvas>
  );
}
