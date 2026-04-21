import { FigureSpec, VisualTone } from '../../../../core/interfaces/Lesson';
import { toneColor } from './figure-utils';
import { Arrow, SvgCanvas, SvgPill, SvgText } from './figure-primitives';

export function NeuronFocusFigure({
  figure,
}: {
  figure: Extract<FigureSpec, { kind: 'neuron-focus' }>;
}) {
  const map = {
    overview: {
      middle: 'Σ(wi xi) + b',
      middleTone: 'secondary' as VisualTone,
      bottom: 'soma ponderada',
      output: 'estimativa numerica',
      outputTone: 'success' as VisualTone,
    },
    inputs: {
      middle: 'vetor x',
      middleTone: 'primary' as VisualTone,
      bottom: 'features numericas',
      output: 'sinais de entrada',
      outputTone: 'primary' as VisualTone,
    },
    weights: {
      middle: 'w · x',
      middleTone: 'warning' as VisualTone,
      bottom: 'importancia relativa',
      output: 'parametros treinaveis',
      outputTone: 'primary' as VisualTone,
    },
    bias: {
      middle: 'Σ(wi xi) + b',
      middleTone: 'secondary' as VisualTone,
      bottom: 'desloca a decisao',
      output: 'limiar flexivel',
      outputTone: 'primary' as VisualTone,
    },
    activation: {
      middle: 'f(z)',
      middleTone: 'primary' as VisualTone,
      bottom: 'introduz nao linearidade',
      output: 'saida ativada',
      outputTone: 'success' as VisualTone,
    },
    formula: {
      middle: 'y = f(Wx + b)',
      middleTone: 'secondary' as VisualTone,
      bottom: 'bloco completo',
      output: 'equacao final',
      outputTone: 'success' as VisualTone,
    },
  } as const;

  const config = map[figure.emphasis];
  const inputTone: VisualTone = figure.emphasis === 'inputs' ? 'warning' : 'primary';

  return (
    <SvgCanvas>
      {[0, 1, 2].map((index) => {
        const y = 108 + index * 58;
        return (
          <g key={index}>
            <SvgPill
              x={28}
              y={y}
              w={140}
              h={42}
              label={`x${index + 1}`}
              tone={inputTone}
              maxChars={8}
            />
            <Arrow x1={178} y1={y + 21} x2={244} y2={y + 21} color={toneColor[inputTone]} />
          </g>
        );
      })}

      <SvgPill
        x={260}
        y={132}
        w={160}
        h={44}
        label={config.middle}
        tone={config.middleTone}
        maxChars={18}
      />
      <SvgPill
        x={246}
        y={196}
        w={188}
        h={40}
        label={config.bottom}
        tone={config.middleTone}
        maxChars={18}
      />

      <Arrow x1={430} y1={154} x2={488} y2={154} color={toneColor[config.outputTone]} />
      <SvgPill
        x={498}
        y={120}
        w={110}
        h={42}
        label="saida"
        tone={config.outputTone}
        maxChars={8}
      />
      <SvgPill
        x={452}
        y={184}
        w={156}
        h={54}
        label={config.output}
        tone={config.outputTone}
        maxChars={16}
      />

      <SvgText
        x={320}
        y={310}
        text={figure.footer}
        size={13}
        color="rgba(248,250,252,0.68)"
        maxChars={56}
      />
    </SvgCanvas>
  );
}
