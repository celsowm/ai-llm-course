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
      },
      {
        id: 'tracks',
        type: 'list',
        title: isPt ? 'Trilhas do setup' : 'Setup tracks',
        items: isPt
          ? ['**CUDA** para NVIDIA como fluxo principal.', '**ROCm** para AMD como trilha avançada.', '**Metal (MPS)** para Apple Silicon.', '**CPU** como fallback universal.', '**Colab** como continuidade garantida.']
          : ['**CUDA** for NVIDIA as the main flow.', '**ROCm** for AMD as an advanced track.', '**Metal (MPS)** for Apple Silicon.', '**CPU** as the universal fallback.', '**Colab** as guaranteed continuity.'],
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
      },
      {
        id: 'warning',
        type: 'callout',
        title: isPt ? 'Regra de ouro' : 'Golden rule',
        tone: 'warning',
        body: isPt
          ? 'O setup local é importante, mas ele não pode interromper o progresso. Quando o ambiente local travar, o estudo continua em **Colab**.'
          : 'Local setup matters, but it cannot interrupt progress. When the local environment fails, study continues in **Colab**.',
      },
      {
        id: 'goals',
        type: 'checkpoint',
        title: isPt ? 'Pronto para os próximos módulos' : 'Ready for next modules',
        items: isPt
          ? ['Python e ambiente virtual funcionando.', 'PyTorch instalado com o backend mais adequado para a máquina.', 'Transformers e accelerate instalados.', 'Diagnóstico claro de CUDA, MPS ou CPU.']
          : ['Python and virtual environment working.', 'PyTorch installed with the backend that best fits the machine.', 'Transformers and accelerate installed.', 'Clear diagnosis of CUDA, MPS or CPU.'],
      },
    ],
  };
}
