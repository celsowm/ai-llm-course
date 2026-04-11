# ai-llm-course v0.0.8

Base do curso em React + TypeScript + MUI 7, pronta para GitHub Pages e agora com i18n para `pt-BR` e `en`.

## O que já vem
- Layout tipo app com sidebar e conteúdo principal
- Aula 1 com narrativa da LLM cedo + rede neural pequena com backprop real
- Aula 2 com ambiente local, CUDA, ROCm, Metal, CPU e Colab
- Bloco de código com syntax highlight em React
- Playground de prompt para demonstração offline
- Estrutura preparada para i18n sem dependência extra

## Idiomas
- `pt-BR`
- `en`

O idioma é salvo em `localStorage` e também tenta respeitar o idioma do navegador na primeira carga.

## Rodando localmente
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Publicação no GitHub Pages
O projeto já usa:

```ts
base: '/ai-llm-course/'
```

## Estrutura
```txt
src/
  app/
  core/
  features/
  i18n/
  modules/
  shared/
```


## PDF export

The app can export the current lesson blocks marked as slides to a multi-page PDF using html2canvas + jsPDF.
