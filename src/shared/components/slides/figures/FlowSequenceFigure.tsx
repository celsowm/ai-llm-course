import { FigureSpec, VisualTone } from '../../../../core/interfaces/Lesson';
import { toneColor, toneFill } from './figure-utils';
import { Arrow, SvgCanvas, SvgPill, SvgText } from './figure-primitives';

export function FlowSequenceFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'flow-sequence' }>;
}) {
  const flowTone: VisualTone = figure.reverse ? 'warning' : 'primary';
  const endTone: VisualTone = figure.reverse ? 'warning' : 'success';

  return (
    <SvgCanvas>
      <SvgPill x={32} y={114} w={120} h={42} label={figure.start} tone={flowTone} />
      <SvgPill x={178} y={114} w={124} h={42} label={figure.middle[0]} tone="secondary" />
      <SvgPill x={338} y={114} w={124} h={42} label={figure.middle[1]} tone="secondary" />
      <SvgPill x={486} y={114} w={120} h={42} label={figure.end} tone={endTone} />
      <Arrow x1={156} y1={135} x2={178} y2={135} color={toneColor[flowTone]} />
      <Arrow x1={304} y1={135} x2={338} y2={135} color={toneColor[flowTone]} />
      <Arrow x1={464} y1={135} x2={486} y2={135} color={toneColor[endTone]} />

      <rect
        x="34"
        y="206"
        width="264"
        height="82"
        rx="20"
        fill={`${toneFill[flowTone]}`}
        stroke={`${toneColor[flowTone]}`}
        strokeOpacity="0.42"
      />
      <SvgText
        x={58}
        y={228}
        text={figure.reverse ? 'backward' : 'forward'}
        anchor="start"
        size={12}
        color="rgba(248,250,252,0.58)"
        maxChars={16}
      />
      <SvgText x={166} y={258} text={figure.primaryNote} size={15} maxChars={24} />

      <rect
        x="344"
        y="206"
        width="264"
        height="82"
        rx="20"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
      />
      <SvgText
        x={368}
        y={228}
        text="effect"
        anchor="start"
        size={12}
        color="rgba(248,250,252,0.58)"
        maxChars={16}
      />
      <SvgText x={476} y={258} text={figure.secondaryNote} size={15} maxChars={24} />
    </SvgCanvas>
  );
}
