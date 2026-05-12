import type { Lesson } from '../../core/interfaces/Lesson';
import type { Locale } from '../../i18n/types';

export function getSetupModule(locale: Locale): Lesson {
  const isPt = locale === 'pt-BR';

  return {
    id: 'setup',
    title: isPt ? 'Módulo 2 · Ambiente Local e Infraestrutura' : 'Module 2 · Local Environment and Infrastructure',
    durationLabel: isPt ? '1h45' : '1h45',
    summary: isPt
      ? 'O Módulo 2 organiza o setup em trilhas previsíveis: CUDA, ROCm, Metal, CPU e Colab. A meta é diagnóstico rápido e continuidade.'
      : 'Module 2 organizes setup into predictable tracks: CUDA, ROCm, Metal, CPU and Colab. The goal is fast diagnosis and continuity.',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        eyebrow: 'ai-llm-course',
        title: isPt ? 'Módulo 2 · Python, PyTorch e backends com caminho claro' : 'Module 2 · Python, PyTorch and backends with a clear path',
        body: isPt
          ? 'Depois da exploração teórica, preparamos a infraestrutura. O foco é reduzir atrito: você entende em qual trilha está e como continuar seu estudo sem barreiras.'
          : 'After the theoretical exploration, we prepare the infrastructure. The focus is reducing friction: you understand which track you are on and how to continue your study without barriers.',
        chips: ['Python', 'PyTorch', 'CUDA', 'ROCm', 'MPS', 'Colab'],
        visual: {
          kicker: isPt ? 'Ambiente' : 'Environment',
          figureTitle: isPt ? 'Infraestrutura de IA' : 'AI infrastructure',
          figureCaption: isPt ? 'Configuração base para rodar modelos locais.' : 'Basic setup to run local models.',
          callouts: isPt ? ['python', 'pytorch'] : ['python', 'pytorch'],
          figure: {
            kind: 'pillars-grid',
            pipeline: [
              { label: 'Python', icon: '🐍', tone: 'primary' },
              { label: 'Env', icon: '📦', tone: 'secondary' },
              { label: 'GPU', icon: '⚙️', tone: 'success' },
            ],
            grid: [
              { label: isPt ? 'linguagem' : 'language', icon: '⌨️', color: '#60a5fa' },
              { label: isPt ? 'pacotes' : 'packages', icon: '📚', color: '#a78bfa' },
              { label: isPt ? 'aceleração' : 'acceleration', icon: '🚀', color: '#34d399' },
              { label: isPt ? 'execução' : 'runtime', icon: '🧪', color: '#f59e0b' },
            ],
          },
        },
      },
      {
        id: 'installing-python',
        type: 'list',
        title: isPt ? 'Passo 0: Instalando o Python' : 'Step 0: Installing Python',
        items: isPt
          ? [
              '🪟 Windows: Baixe o instalador em python.org. Marque a caixa "Add Python to PATH" antes de clicar em Install.',
              '🍎 macOS: Use o comando "brew install python" ou baixe o instalador universal no site oficial.',
              '🐧 Linux: Geralmente já vem instalado. Use "sudo apt install python3-venv" para garantir que as ferramentas de ambiente virtual estejam lá.',
              '🔍 Verificação: Abra o terminal/prompt e digite "python --version". Deve aparecer 3.10 ou superior.',
            ]
          : [
              '🪟 Windows: Download the installer from python.org. Check the "Add Python to PATH" box before clicking Install.',
              '🍎 macOS: Use "brew install python" or download the universal installer from the official website.',
              '🐧 Linux: Usually pre-installed. Use "sudo apt install python3-venv" to ensure virtual environment tools are present.',
              '🔍 Verification: Open terminal/prompt and type "python --version". It should show 3.10 or higher.',
            ],
        visual: {
          kicker: isPt ? 'Requisito' : 'Requirement',
          figureTitle: isPt ? 'Base do ecossistema' : 'Ecosystem base',
          figureCaption: isPt ? 'Python continua sendo o eixo das bibliotecas de IA.' : 'Python remains the center of the AI tooling ecosystem.',
          callouts: isPt ? ['v3.10+', 'pip'] : ['v3.10+', 'pip'],
          figure: {
            kind: 'vertical-steps',
            steps: [
              { label: 'Python', icon: '🐍', active: true },
              { label: isPt ? 'Pacotes' : 'Packages', icon: '📦' },
              { label: 'PyTorch', icon: '🔥' },
              { label: isPt ? 'Modelo' : 'Model', icon: '🧠' },
            ],
          },
        },
      },
      {
        id: 'timeline',
        type: 'timeline',
        title: isPt ? 'Ordem sugerida do Módulo 2' : 'Suggested order for Module 2',
        items: isPt
          ? [
              { label: 'Ambiente base', minutes: '0–20 min', summary: 'Python 3.10+, venv e organização mínima do projeto.' },
              { label: 'PyTorch correto', minutes: '20–45 min', summary: 'Escolha do backend certo: CUDA, ROCm, Metal ou CPU.' },
              { label: 'Diagnóstico', minutes: '45–70 min', summary: 'Teste rápido para descobrir se a máquina enxerga GPU ou precisa de fallback.' },
              { label: 'Transformers e accelerate', minutes: '70–95 min', summary: 'Instalação das dependências que serão usadas nos próximos módulos.' },
              { label: 'Plano B', minutes: '95–105 min', summary: 'Colab entra como fallback oficial para ninguém ficar para trás.' },
            ]
          : [
              { label: 'Base environment', minutes: '0–20 min', summary: 'Python 3.10+, venv and minimal project organization.' },
              { label: 'Correct PyTorch', minutes: '20–45 min', summary: 'Choose the right backend: CUDA, ROCm, Metal or CPU.' },
              { label: 'Diagnosis', minutes: '45–70 min', summary: 'Quick test to discover whether the machine sees a GPU or needs a fallback.' },
              { label: 'Transformers and accelerate', minutes: '70–95 min', summary: 'Install the dependencies that will be used in the next modules.' },
              { label: 'Plan B', minutes: '95–105 min', summary: 'Colab becomes the official fallback so nobody gets left behind.' },
            ],
        visual: {
          kicker: isPt ? 'Mapa' : 'Map',
          figureTitle: isPt ? 'Sequência do setup' : 'Setup sequence',
          figureCaption: isPt ? 'A trilha vai de instalação básica até o ambiente completo de desenvolvimento.' : 'The path moves from basic installation to a complete development environment.',
          callouts: isPt ? ['instalação', 'diagnóstico'] : ['installation', 'diagnosis'],
          figure: {
            kind: 'vertical-steps',
            steps: [
              { label: 'Python', icon: '🐍', active: true },
              { label: 'PyTorch', icon: '🔥' },
              { label: 'Backend', icon: '⚙️' },
              { label: isPt ? 'Testes' : 'Tests', icon: '✅' },
              { label: 'Colab', icon: '☁️' },
            ],
          },
        },
      },
      {
        id: 'tracks',
        type: 'list',
        title: isPt ? 'Trilhas do setup' : 'Setup tracks',
        items: isPt
          ? ['**CUDA** para NVIDIA como fluxo principal.', '**ROCm** para AMD como trilha avançada.', '**Metal (MPS)** para Apple Silicon.', '**CPU** como fallback universal.', '**Colab** como continuidade garantida.']
          : ['**CUDA** for NVIDIA as the main flow.', '**ROCm** for AMD as an advanced track.', '**Metal (MPS)** for Apple Silicon.', '**CPU** as the universal fallback.', '**Colab** as guaranteed continuity.'],
        visual: {
          kicker: isPt ? 'Hardware' : 'Hardware',
          figureTitle: isPt ? 'Backends de execução' : 'Execution backends',
          figureCaption: isPt ? 'Escolha do backend muda desempenho, não o raciocínio do código.' : 'Backend choice changes performance, not the code\'s learning logic.',
          callouts: isPt ? ['cuda', 'metal'] : ['cuda', 'metal'],
          figure: {
            kind: 'dual-path',
            left: {
              title: 'CPU',
              caption: isPt ? 'mais lento, mais universal' : 'slower, more universal',
              tone: 'warning',
              steps: isPt ? ['interpreta', 'executa', 'depura'] : ['interprets', 'executes', 'debugs'],
            },
            right: {
              title: 'GPU',
              caption: isPt ? 'mais rápido, mais paralelo' : 'faster, more parallel',
              tone: 'success',
              steps: isPt ? ['lotes', 'matmul', 'treino'] : ['batches', 'matmul', 'training'],
            },
            centerLabel: 'vs',
          },
        },
      },
      {
        id: 'attention-backends',
        type: 'list',
        title: isPt ? 'Backends de Atenção: O motor por baixo' : 'Attention Backends: The engine underneath',
        items: isPt
          ? [
              { text: '**O que são Backends de Atenção?** Bibliotecas como Transformers e vLLM não processam tudo da mesma forma. Elas usam diferentes "motores" (backends) otimizados para o hardware, definindo a velocidade real.' },
              { text: '**1. Math (Eager):** A abordagem didática. Calcula a equação de atenção passo a passo com operações padrão do PyTorch. É ótima para entender e debugar, mas extremamente lenta e devora VRAM.' },
              { text: '**2. SDPA (Scaled Dot-Product Attention):** O salto do PyTorch 2.0. Ele reconhece a fórmula e funde as operações matemáticas (*kernel fusion*), reduzindo viagens de dados na memória. É rápido e vem de fábrica.' },
              { text: '**3. FlashAttention:** A revolução atual. Reescreve a matemática a nível de hardware (CUDA) para evitar ler/escrever na memória principal da GPU (HBM), operando direto nos registradores (SRAM). É o padrão-ouro de velocidade.', isEmphasis: true },
            ]
          : [
              { text: '**What are Attention Backends?** Libraries like Transformers and vLLM don’t process everything the same way. They use different hardware-optimized "engines" (backends), which define the actual speed.' },
              { text: '**1. Math (Eager):** The didactic approach. Computes the attention equation step-by-step using standard PyTorch operations. Great for understanding and debugging, but extremely slow and VRAM-hungry.' },
              { text: '**2. SDPA (Scaled Dot-Product Attention):** The PyTorch 2.0 leap. It recognizes the formula and fuses the mathematical operations (*kernel fusion*), reducing memory data trips. It is fast and comes out-of-the-box.' },
              { text: '**3. FlashAttention:** The current revolution. Rewrites the math at the hardware level (CUDA) to avoid reading/writing to the main GPU memory (HBM), operating directly on registers (SRAM). It is the gold standard of speed.', isEmphasis: true },
            ],
        visual: {
          kicker: isPt ? 'Otimização' : 'Optimization',
          figureTitle: isPt ? 'Evolução da Atenção' : 'Attention Evolution',
          figureCaption: isPt ? 'A mesma matemática pode rodar muito mais rápido com a estratégia de memória correta.' : 'The exact same math can run much faster with the correct memory strategy.',
          callouts: isPt ? ['eager vs flash', 'sram'] : ['eager vs flash', 'sram'],
          figure: {
            kind: 'vertical-steps',
            steps: [
              { label: 'Math (Eager)', icon: '🐢', active: false },
              { label: 'SDPA', icon: '⚡', active: false },
              { label: 'FlashAttention', icon: '🚀', active: true },
            ],
          },
        },
      },
      {
        id: 'venv',
        type: 'code',
        title: isPt ? 'Criando o ambiente virtual' : 'Creating the virtual environment',
        language: 'bash',
        caption: 'setup_env.sh',
        code: `python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / macOS
source .venv/bin/activate

# PyTorch com CUDA 12.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128

# Dependências do curso
pip install -U transformers accelerate`,
        visual: {
          kicker: isPt ? 'Isolamento' : 'Isolation',
          figureTitle: isPt ? 'Separar dependências' : 'Separate dependencies',
          figureCaption: isPt ? 'Cada projeto mantém o próprio conjunto de versões.' : 'Each project keeps its own dependency set.',
          callouts: isPt ? ['venv', 'reprodutibilidade'] : ['venv', 'reproducibility'],
          figure: {
            kind: 'dual-path',
            left: {
              title: isPt ? 'Sistema global' : 'Global system',
              caption: isPt ? 'conflitos de versão' : 'version conflicts',
              tone: 'warning',
              steps: isPt ? ['numpy 1', 'torch 2', 'quebra'] : ['numpy 1', 'torch 2', 'breaks'],
            },
            right: {
              title: isPt ? 'Projeto isolado' : 'Isolated project',
              caption: isPt ? 'dependências previsíveis' : 'predictable dependencies',
              tone: 'success',
              steps: isPt ? ['venv', 'pip install', 'ok'] : ['venv', 'pip install', 'ok'],
            },
            centerLabel: 'vs',
          },
        },
      },
      {
        id: 'backend-check',
        type: 'code',
        title: isPt ? 'Teste simples do backend' : 'Simple backend check',
        language: 'python',
        caption: 'backend_check.py',
        code: `import torch

print("PyTorch:", torch.__version__)
print("CUDA disponível:", torch.cuda.is_available())
print("MPS disponível:", torch.backends.mps.is_available())

if torch.cuda.is_available():
    print("GPU:", torch.cuda.get_device_name(0))`,
        visual: {
          kicker: isPt ? 'Teste' : 'Test',
          figureTitle: isPt ? 'Diagnóstico do runtime' : 'Runtime diagnostic',
          figureCaption: isPt ? 'Confirme cedo se o backend está visível para o código.' : 'Confirm early whether the backend is visible to the code.',
          callouts: isPt ? ['is_available()', 'device'] : ['is_available()', 'device'],
          figure: {
            kind: 'loop',
            topRow: [
              { label: 'torch', tone: 'primary' },
              { label: isPt ? 'device' : 'device', tone: 'secondary' },
              { label: isPt ? 'teste' : 'test', tone: 'success' },
            ],
            bottomRow: [
              { label: 'cuda?', tone: 'warning' },
              { label: 'mps?', tone: 'warning' },
              { label: 'cpu', tone: 'primary' },
            ],
            footer: isPt ? 'diagnóstico rápido antes do treino real' : 'quick diagnostic before real training',
          },
        },
      },
      {
        id: 'warning',
        type: 'callout',
        title: isPt ? 'Regra de ouro' : 'Golden rule',
        tone: 'warning',
        body: isPt
          ? 'O setup local é importante, mas ele não pode interromper o progresso. Quando o ambiente local travar, o estudo continua em **Colab**.'
          : 'Local setup matters, but it cannot interrupt progress. When the local environment fails, study continues in **Colab**.',
        visual: {
          kicker: isPt ? 'Contingência' : 'Contingency',
          figureTitle: isPt ? 'Plano B de execução' : 'Execution fallback',
          figureCaption: isPt ? 'Se o ambiente local falhar, troque o runtime sem perder o ritmo.' : 'If local setup fails, switch runtime without losing momentum.',
          callouts: isPt ? ['colab', 'seguir aula'] : ['colab', 'keep moving'],
          figure: {
            kind: 'vertical-steps',
            steps: [
              { label: isPt ? 'Local' : 'Local', icon: '💻', active: true },
              { label: isPt ? 'Diagnóstico' : 'Diagnose', icon: '🔎' },
              { label: 'Colab', icon: '☁️' },
              { label: isPt ? 'Continuar' : 'Continue', icon: '▶️' },
            ],
          },
        },
      },
      {
        id: 'goals',
        type: 'checkpoint',
        title: isPt ? 'Pronto para os próximos módulos' : 'Ready for next modules',
        items: isPt
          ? ['Python e ambiente virtual funcionando.', 'PyTorch instalado com o backend mais adequado para a máquina.', 'Transformers e accelerate instalados.', 'Diagnóstico claro de CUDA, MPS ou CPU.']
          : ['Python and virtual environment working.', 'PyTorch installed with the backend that best fits the machine.', 'Transformers and accelerate installed.', 'Clear diagnosis of CUDA, MPS or CPU.'],
        visual: {
          kicker: isPt ? 'Pronto' : 'Ready',
          figureTitle: isPt ? 'Base operacional' : 'Operational baseline',
          figureCaption: isPt ? 'Ambiente pronto para os próximos exemplos e experimentos.' : 'Environment ready for the next examples and experiments.',
          callouts: isPt ? ['setup ok', 'seguir curso'] : ['setup ok', 'continue course'],
          figure: {
            kind: 'pillars-grid',
            pipeline: [
              { label: 'Python', icon: '🐍', tone: 'primary' },
              { label: 'Torch', icon: '🔥', tone: 'secondary' },
              { label: isPt ? 'Pronto' : 'Ready', icon: '✅', tone: 'success' },
            ],
            grid: [
              { label: isPt ? 'pacotes' : 'packages', icon: '📦', color: '#60a5fa' },
              { label: isPt ? 'device' : 'device', icon: '🖥️', color: '#a78bfa' },
              { label: isPt ? 'teste' : 'test', icon: '🧪', color: '#f59e0b' },
              { label: isPt ? 'execução' : 'run', icon: '🚀', color: '#34d399' },
            ],
          },
        },
      },
    ],
  };
}
