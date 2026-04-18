import { Box } from '@mui/material';
import { useI18n } from '../../../i18n/I18nProvider';

const styles = `
.nad-title {
  letter-spacing: 0.16em;
  font-weight: 800;
}

.nad-math {
  font-family: "Cambria Math", "STIX Two Math", "Times New Roman", serif;
  font-kerning: normal;
  letter-spacing: 0.01em;
}

.nad-glow-cyan {
  filter: drop-shadow(0 0 8px rgba(0,243,255,0.58)) drop-shadow(0 0 18px rgba(0,243,255,0.22));
}

.nad-glow-pink {
  filter: drop-shadow(0 0 8px rgba(255,0,127,0.54)) drop-shadow(0 0 18px rgba(255,0,127,0.2));
}

.nad-pulse-cyan {
  animation: nadPulseCyan 2.4s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-pulse-pink {
  animation: nadPulsePink 2.8s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-float {
  animation: nadFloat 4.8s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-draw-1, .nad-draw-2, .nad-draw-3, .nad-draw-4, .nad-draw-5 {
  stroke-dasharray: 430;
  stroke-dashoffset: 430;
  animation: nadDrawLine 1.25s ease forwards, nadDashFlow 7s linear infinite 1.25s;
}

.nad-draw-2 { animation-delay: 0.15s, 1.4s; }
.nad-draw-3 { animation-delay: 0.3s, 1.55s; }
.nad-draw-4 { animation-delay: 0.45s, 1.7s; }
.nad-draw-5 { animation-delay: 0.6s, 1.85s; }

.nad-fade {
  opacity: 0;
  animation: nadFadeIn 0.9s ease forwards;
}

.nad-d1 { animation-delay: 0.7s; }
.nad-d2 { animation-delay: 1.0s; }
.nad-d3 { animation-delay: 1.25s; }
.nad-l1 { animation-delay: 1.0s; }
.nad-l2 { animation-delay: 1.1s; }
.nad-l3 { animation-delay: 1.2s; }
.nad-l4 { animation-delay: 1.3s; }
.nad-l5 { animation-delay: 1.4s; }
.nad-l6 { animation-delay: 1.5s; }

@keyframes nadDrawLine {
  to { stroke-dashoffset: 0; }
}

@keyframes nadDashFlow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -860; }
}

@keyframes nadPulseCyan {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes nadPulsePink {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

@keyframes nadFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes nadFadeIn {
  to { opacity: 1; }
}
`;

export function NeuronArchitectureDiagram() {
  const { locale } = useI18n();
  const isPt = locale === 'pt-BR';

  const copy = {
    title: isPt ? 'ARQUITETURA NEURAL' : 'NEURAL ARCHITECTURE',
    subtitle: isPt
      ? 'entradas, pesos, viés, soma ponderada, ativação e saída'
      : 'inputs, weights, bias, weighted sum, activation, and output',
    inputs: isPt ? 'Entradas' : 'Inputs',
    weights: isPt ? 'pesos' : 'weights',
    examples: isPt ? 'exemplos: pixels, atributos, medições' : 'examples: pixels, attributes, measurements',
    bias: isPt ? 'viés' : 'bias',
    biasNote: isPt ? 'o viés entra somando ao bloco' : 'bias enters as an additive term',
    weightedSum: isPt ? 'soma ponderada' : 'weighted sum',
    activation: isPt ? 'função de ativação' : 'activation function',
    outputAfterActivation: isPt ? ['saída', 'após', 'ativação'] : ['output', 'after', 'activation'],
    outputFinal: isPt ? 'saída final' : 'final output',
    centerNote: isPt ? 'o neurônio primeiro calcula z e depois aplica f(z)' : 'the neuron first computes z and then applies f(z)',
    legendTitle: isPt ? 'Legenda dos símbolos' : 'Symbol legend',
    legend: isPt
      ? [
          { symbol: 'xᵢ', title: 'entrada', desc: 'valor de entrada', color: '#00f3ff' },
          { symbol: 'wᵢ', title: 'peso', desc: 'importância da entrada', color: '#00f3ff' },
          { symbol: 'b', title: 'viés', desc: 'termo aditivo', color: '#ff8fc5' },
          { symbol: '∑', title: 'somatório', desc: 'soma ponderada', color: '#00f3ff' },
          { symbol: 'f(z)', title: 'ativação', desc: 'não linearidade', color: '#ff8fc5' },
          { symbol: 'y', title: 'saída', desc: 'resultado final', color: '#eaf3ff' },
        ]
      : [
          { symbol: 'xᵢ', title: 'input', desc: 'input value', color: '#00f3ff' },
          { symbol: 'wᵢ', title: 'weight', desc: 'input importance', color: '#00f3ff' },
          { symbol: 'b', title: 'bias', desc: 'additive term', color: '#ff8fc5' },
          { symbol: '∑', title: 'sum', desc: 'weighted sum', color: '#00f3ff' },
          { symbol: 'f(z)', title: 'activation', desc: 'non-linearity', color: '#ff8fc5' },
          { symbol: 'y', title: 'output', desc: 'final result', color: '#eaf3ff' },
        ],
  };

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 420, display: 'flex', flexDirection: 'column', gap: 1.1 }}>
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 900 560" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-label={isPt ? 'Diagrama do neurônio artificial com animação' : 'Animated artificial neuron diagram'}>
        <style>{styles}</style>
        <defs>
          <linearGradient id="nadGlassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff007f" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.13" />
          </linearGradient>

          <marker id="nadArrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#00f3ff" />
          </marker>

          <marker id="nadArrowPink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff007f" />
          </marker>
        </defs>

        <rect x="16" y="16" width="868" height="528" rx="34" fill="rgba(10,14,26,0.56)" stroke="rgba(255,255,255,0.08)" />

        <text x="450" y="50" textAnchor="middle" className="nad-title" fill="#ffffff" fontSize="30">
          {copy.title.split(' ')[0]} <tspan fill="#ff007f" className="nad-glow-pink">{copy.title.split(' ').slice(1).join(' ')}</tspan>
        </text>
        <text x="450" y="74" textAnchor="middle" fill="#a7bbca" fontSize="13">
          {copy.subtitle}
        </text>

        <g transform="translate(46, 0)">
          <text x="50" y="112" fill="#b5c7d5" fontSize="16">{copy.inputs}</text>
          <text x="242" y="112" fill="#89dce5" fontSize="15">{copy.weights}</text>

          <g className="nad-fade nad-d1">
            <circle cx="108" cy="184" r="31" fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
            <circle cx="108" cy="286" r="31" fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
            <circle cx="108" cy="388" r="31" fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
            <text x="108" y="190" textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">x₁</text>
            <text x="108" y="292" textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">x₂</text>
            <text x="108" y="394" textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">xₙ</text>

            <path d="M 146 184 C 214 184, 230 198, 270 220" stroke="#00f3ff" strokeWidth="3.4" fill="none" markerEnd="url(#nadArrowCyan)" className="nad-draw-1 nad-glow-cyan" />
            <path d="M 146 286 C 216 286, 230 286, 270 286" stroke="#00f3ff" strokeWidth="3.4" fill="none" markerEnd="url(#nadArrowCyan)" className="nad-draw-2 nad-glow-cyan" />
            <path d="M 146 388 C 214 388, 230 374, 270 352" stroke="#00f3ff" strokeWidth="3.4" fill="none" markerEnd="url(#nadArrowCyan)" className="nad-draw-3 nad-glow-cyan" />

            <text x="220" y="206" fill="#00f3ff" fontSize="17" fontWeight="700" className="nad-math nad-glow-cyan">w₁</text>
            <text x="220" y="288" fill="#00f3ff" fontSize="17" fontWeight="700" className="nad-math nad-glow-cyan">w₂</text>
            <text x="220" y="370" fill="#00f3ff" fontSize="17" fontWeight="700" className="nad-math nad-glow-cyan">wₙ</text>
            <text x="60" y="442" fill="#8fb3c1" fontSize="11.5">{copy.examples}</text>
          </g>

          <g className="nad-fade nad-d2" transform="translate(0, 14)">
            <path d="M 472 140 L 472 188" stroke="#ff007f" strokeWidth="3.4" fill="none" markerEnd="url(#nadArrowPink)" className="nad-draw-4 nad-glow-pink" />
            <circle cx="472" cy="110" r="29" fill="#210c21" stroke="#ff007f" strokeWidth="2.3" className="nad-pulse-pink nad-glow-pink" />
            <text x="472" y="119" textAnchor="middle" fill="#ffe7f3" fontSize="28" fontWeight="700" className="nad-math">b</text>
            <text x="510" y="114" fill="#ff9dcf" fontSize="15">{copy.bias}</text>
            <text x="498" y="162" fill="#ffb6d9" fontSize="12.5" textAnchor="start">{copy.biasNote}</text>
          </g>

          <g className="nad-float">
            <rect x="300" y="204" width="330" height="160" rx="82" fill="url(#nadGlassGrad)" stroke="#00f3ff" strokeWidth="2.2" className="nad-glow-cyan" />
            <line x1="465" y1="204" x2="465" y2="364" stroke="#00f3ff" strokeWidth="1.4" strokeDasharray="6 8" opacity="0.5" />

            <text x="380" y="274" textAnchor="middle" fill="#00f3ff" fontSize="56" fontWeight="700" className="nad-math nad-glow-cyan">∑</text>
            <text x="380" y="300" textAnchor="middle" fill="#b8d9f7" fontSize="15" fontWeight="700">{copy.weightedSum}</text>
            <text x="380" y="324" textAnchor="middle" fill="#d7e6f5" fontSize="18" className="nad-math">z = ∑(xᵢ · wᵢ) + b</text>

            <text x="548" y="272" textAnchor="middle" fill="#ff88c5" fontSize="40" fontWeight="700" className="nad-math nad-glow-pink">f(z)</text>
            <text x="548" y="300" textAnchor="middle" fill="#ffc3df" fontSize="15" fontWeight="700">{copy.activation}</text>
            <text x="548" y="324" textAnchor="middle" fill="#ffd8eb" fontSize="14" className="nad-math">ReLU, sigmoid, tanh</text>
          </g>

          <g className="nad-fade nad-d2">
            <path d="M 626 284 C 648 284, 662 284, 684 284" stroke="#00f3ff" strokeWidth="3.4" fill="none" markerEnd="url(#nadArrowCyan)" className="nad-draw-5 nad-glow-cyan" />
            <circle cx="738" cy="284" r="31" fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
            <text x="738" y="292" textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">y</text>
            <text x="738" y="324" textAnchor="middle" fill="#9beef5" fontSize="12.5">{copy.outputFinal}</text>
            <text x="655" y="246" textAnchor="middle" fill="#9beef5" fontSize="11.5">
              {copy.outputAfterActivation.map((line, index) => (
                <tspan key={line} x="655" dy={index === 0 ? 0 : 11}>{line}</tspan>
              ))}
            </text>
          </g>

          <text x="300" y="392" fill="#bac8d8" fontSize="12.5" className="nad-fade nad-d3">{copy.centerNote}</text>
        </g>

        <g className="nad-fade nad-d3">
          <rect x="198" y="452" width="504" height="56" rx="18" fill="rgba(17,16,35,0.94)" stroke="#00f3ff" strokeWidth="1.2" />
          <text x="450" y="487" textAnchor="middle" fill="#eef8ff" fontSize="28" className="nad-math nad-glow-cyan">
            y = <tspan fill="#ff9acb">f</tspan>(∑(xᵢ · wᵢ) + <tspan fill="#ff9acb">b</tspan>)
          </text>
        </g>

        </svg>
      </Box>

      <Box
        sx={{
          px: 1.2,
          py: 1,
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(12,16,29,0.72)',
        }}
      >
        <Box sx={{ color: '#b5c7d5', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', mb: 0.9 }}>
          {copy.legendTitle}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(6, minmax(0, 1fr))' },
            gap: 0.8,
          }}
        >
          {copy.legend.map((item) => (
            <Box
              key={item.symbol}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1,
                py: 0.8,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                minWidth: 0,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '999px',
                  bgcolor: 'rgba(255,255,255,0.04)',
                  color: item.color,
                  fontFamily: '"Cambria Math", "STIX Two Math", "Times New Roman", serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  flex: '0 0 auto',
                }}
              >
                {item.symbol}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ color: '#eef6ff', fontSize: '0.74rem', fontWeight: 800, lineHeight: 1.1 }}>
                  {item.title}
                </Box>
                <Box sx={{ color: '#8fb3c1', fontSize: '0.66rem', lineHeight: 1.15 }}>
                  {item.desc}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
