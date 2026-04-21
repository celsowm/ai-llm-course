import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CodeBlock } from '../../code-block/CodeBlock';
import {
  LinearRegressionModel,
  LinearSnapshot,
  LogisticCircleClassifier,
  Point,
  SigmoidSnapshot,
  formatLinearEquation,
  formatRadialEquation,
  formatValue,
} from '../models';
import { PanelTab, Variant } from '../types';
import { MetricRow } from './MetricRow';
import { MiniConsole } from './MiniConsole';
import { ModelCanvas } from './ModelCanvas';
import { PanelTabs } from './PanelTabs';
import { COPY } from '../copy';

export function ComparisonPanel({
  variant,
  title,
  subtitle,
  accent,
  badgeColor,
  model,
  snapshot,
  dataset,
  consoleTitle,
  code,
  labels,
  localeCopy,
  consoleLines,
  renderTick,
}: {
  variant: Variant;
  title: string;
  subtitle: string;
  accent: string;
  badgeColor: string;
  model: LinearRegressionModel | LogisticCircleClassifier;
  snapshot: LinearSnapshot | SigmoidSnapshot;
  dataset: Point[];
  consoleTitle: string;
  code: string;
  labels: { graph: string; code: string };
  localeCopy: (typeof COPY)['pt-BR'] | (typeof COPY)['en'];
  consoleLines: string[];
  renderTick: number;
}) {
  const [tab, setTab] = useState<PanelTab>('graph');
  const isLinear = variant === 'linear';
  const consoleText = consoleLines.join('\n');

  return (
    <Box
      sx={{
        height: '100%',
        minWidth: 0,
        borderRadius: 4,
        border: `1px solid ${badgeColor}33`,
        background:
          variant === 'linear'
            ? 'linear-gradient(180deg, rgba(219,234,254,0.5), rgba(255,255,255,0.88))'
            : 'linear-gradient(180deg, rgba(233,213,255,0.45), rgba(255,255,255,0.88))',
        overflow: 'hidden',
        color: '#0f172a',
      }}
    >
      <Box
        sx={{
          p: 1.8,
          borderBottom: '1px solid rgba(15,23,42,0.08)',
          background: 'rgba(255,255,255,0.6)',
          color: '#0f172a',
        }}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="overline"
            sx={{
              color: accent,
              letterSpacing: '0.18em',
              fontWeight: 900,
              lineHeight: 1.1,
              display: 'block',
            }}
          >
            {variant === 'linear'
              ? localeCopy.linear.badge
              : localeCopy.sigmoid.badge}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.6rem', md: '2rem' },
              fontWeight: 950,
              lineHeight: 1.05,
              color: '#0f172a',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(15,23,42,0.72)' }}>
            {subtitle}
          </Typography>
        </Stack>
      </Box>

      <PanelTabs
        accent={accent}
        tab={tab}
        onTabChange={setTab}
        labels={labels}
        panelKey={variant}
      />

      {tab === 'graph' ? (
        <Box sx={{ p: 1.8 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 1.6,
              alignItems: 'start',
            }}
          >
            <ModelCanvas
              variant={variant}
              model={model}
              dataset={dataset}
              snapshotVersion={renderTick}
            />

            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                border: `1px solid ${badgeColor}33`,
                bgcolor: 'rgba(248,250,252,0.95)',
                color: '#0f172a',
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={900}
                sx={{ mb: 1, color: '#0f172a' }}
              >
                {localeCopy.graph.metrics}
              </Typography>
              <Stack spacing={1}>
                <MetricRow
                  label={localeCopy.linear.epoch}
                  value={String(snapshot.epoch)}
                  accent={accent}
                  testId={`${variant}-epoch`}
                  valueTestId={`${variant}-epoch-value`}
                />
                <MetricRow
                  label={localeCopy.linear.loss}
                  value={formatValue(snapshot.loss, 4)}
                  accent={accent}
                  testId={`${variant}-loss`}
                />
                <MetricRow
                  label={localeCopy.linear.acc}
                  value={
                    Number.isFinite(snapshot.acc)
                      ? `${(snapshot.acc * 100).toFixed(1)}%`
                      : '—'
                  }
                  accent={accent}
                  testId={`${variant}-acc`}
                  valueTestId={`${variant}-acc-value`}
                />
                <MetricRow
                  label={localeCopy.linear.equation}
                  value={
                    isLinear
                      ? formatLinearEquation(
                          (snapshot as LinearSnapshot).w1,
                          (snapshot as LinearSnapshot).w2,
                          (snapshot as LinearSnapshot).b,
                        )
                      : formatRadialEquation(
                          (snapshot as SigmoidSnapshot).w,
                          (snapshot as SigmoidSnapshot).b,
                        )
                  }
                  accent={accent}
                  testId={`${variant}-equation`}
                  valueTestId={`${variant}-equation-value`}
                />
              </Stack>

              <Box
                sx={{
                  mt: 1.5,
                  p: 1.35,
                  borderRadius: 2.5,
                  border: '1px dashed rgba(15,23,42,0.18)',
                  bgcolor: 'rgba(255,255,255,0.72)',
                  color: '#0f172a',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mb: 0.8, color: 'rgba(15,23,42,0.72)' }}
                >
                  {variant === 'linear'
                    ? localeCopy.linear.activation
                    : localeCopy.sigmoid.activation}
                </Typography>
                <Typography variant="body2" fontWeight={800} sx={{ color: '#0f172a' }}>
                  {variant === 'linear' ? 'ŷ = w1x1 + w2x2 + b' : 'ŷ = σ(w · r² + b)'}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 1.6,
              }}
            >
              <Box
                sx={{
                  p: 1.6,
                  borderRadius: 3,
                  border: `1px solid ${accent}33`,
                  bgcolor: 'rgba(255,255,255,0.74)',
                  color: '#0f172a',
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={900}
                  sx={{ mb: 1, color: '#0f172a' }}
                >
                  {localeCopy.graph.math}
                </Typography>
                <Stack spacing={0.75}>
                  {(variant === 'linear'
                    ? localeCopy.linear.mathLines
                    : localeCopy.sigmoid.mathLines
                  ).map((line) => (
                    <Typography
                      key={line}
                      variant="body2"
                      sx={{
                        fontFamily: 'Cambria Math, Georgia, serif',
                        fontSize: '1.02rem',
                        color: '#0f172a',
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Stack spacing={0.5} sx={{ mt: 1.5 }}>
                  {(variant === 'linear'
                    ? localeCopy.linear.defs
                    : localeCopy.sigmoid.defs
                  ).map((line) => (
                    <Typography
                      key={line}
                      variant="caption"
                      sx={{ color: 'rgba(15,23,42,0.72)' }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.6,
                  borderRadius: 3,
                  border: `1px solid ${accent}33`,
                  bgcolor: 'rgba(255,255,255,0.74)',
                  color: '#0f172a',
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={900}
                  sx={{ mb: 1, color: '#0f172a' }}
                >
                  {localeCopy.graph.interpretation}
                </Typography>
                <Stack spacing={1}>
                  {(variant === 'linear'
                    ? localeCopy.linear.bullets
                    : localeCopy.sigmoid.bullets
                  ).map((line) => (
                    <Typography
                      key={line}
                      variant="body2"
                      sx={{ lineHeight: 1.55, color: 'rgba(15,23,42,0.72)' }}
                    >
                      • {line}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <MiniConsole title={consoleTitle} text={consoleText} accent={accent} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 1.8 }}>
          <Stack spacing={1.6}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${accent}33`,
              }}
            >
              <CodeBlock
                language="python"
                caption={
                  variant === 'linear'
                    ? 'linear_regression_model.py'
                    : 'logistic_circle_classifier.py'
                }
                code={code}
              />
            </Box>
            <MiniConsole title={consoleTitle} text={consoleText} accent={accent} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
