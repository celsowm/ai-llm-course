import { FigureSpec } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { Arrow, SvgCanvas, SvgPanel, SvgPill, SvgText } from './figure-primitives';

export function DualPathFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'dual-path' }>;
}) {
  const leftX = 40;
  const rightX = 360;
  const panelY = 28;
  const panelW = 240;
  const panelH = 274;

  const renderLane = (x: number, lane: typeof figure.left) => (
    <SvgPanel x={x} y={panelY} w={panelW} h={panelH} title={lane.title} tone={lane.tone}>
      {lane.steps.map((step, index) => {
        const y = 76 + index * 72;
        return (
          <g key={`${lane.title}-${step}`}>
            <SvgPill x={x + 28} y={y} w={184} h={42} label={step} tone={lane.tone} />
            {index < lane.steps.length - 1 ? (
              <Arrow
                x1={x + 120}
                y1={y + 46}
                x2={x + 120}
                y2={y + 66}
                color={toneColor[lane.tone]}
              />
            ) : null}
          </g>
        );
      })}
      <SvgText
        x={x + 120}
        y={panelY + panelH - 22}
        text={lane.caption}
        size={12}
        color="rgba(248,250,252,0.58)"
        maxChars={26}
      />
    </SvgPanel>
  );

  return (
    <SvgCanvas>
      {renderLane(leftX, figure.left)}
      {renderLane(rightX, figure.right)}
      <SvgText
        x={320}
        y={178}
        text={figure.centerLabel ?? 'vs'}
        size={22}
        color="rgba(248,250,252,0.68)"
        weight={900}
      />
    </SvgCanvas>
  );
}
