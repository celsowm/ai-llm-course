import { Box, Chip, Stack, Typography } from '@mui/material';
import { CodeBlock } from '../../../features/code-block/CodeBlock';
import type { CalloutSection, CheckpointSection, CodeSection, HeroSection, ListSection, TextSection, TimelineSection } from '../../../core/interfaces/Lesson';
import { SlideScaffold } from './SlideScaffold';
import { FormattedText } from './FormattedText';

// DRY Helper for 2-column list layouts
function TwoColumnLayout<T>({ items, renderItem, id }: { items: T[]; renderItem: (item: T, index: number) => React.ReactNode; id: string }) {
  const midpoint = Math.ceil(items.length / 2);
  const primary = items.slice(0, midpoint);
  const secondary = items.slice(midpoint);
  const columns = [primary, secondary].filter(c => c.length > 0);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: columns.length > 1 ? '1fr 1fr' : '1fr' }, gap: 1.5 }}>
      {columns.map((column, colIdx) => (
        <Stack key={`${id}-col-${colIdx}`} spacing={1.5}>
          {column.map((item, itemIdx) => renderItem(item, colIdx * primary.length + itemIdx))}
        </Stack>
      ))}
    </Box>
  );
}

export function SlideHero({ s }: { s: HeroSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} eyebrow={s.eyebrow} visual={s.visual}>
      <Stack spacing={2.25}>
        <FormattedText 
          text={s.body} 
          sx={{ fontSize: { xs: '0.98rem', md: '1.06rem' }, lineHeight: 1.62, maxWidth: 800 }} 
        />
        {s.chips && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {s.chips.map((c) => <Chip key={c} label={c} color="primary" variant="outlined" />)}
          </Stack>
        )}
      </Stack>
    </SlideScaffold>
  );
}

export function SlideList({ s }: { s: ListSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <TwoColumnLayout 
        id={s.id}
        items={s.items}
        renderItem={(item, idx) => {
          const text = typeof item === 'string' ? item : item.text;
          const isEmphasis = typeof item === 'string' ? false : !!item.isEmphasis;
          
          return (
            <Box
              key={idx}
              sx={{
                p: 1.5,
                borderRadius: 3,
                border: isEmphasis ? '1px solid rgba(139,92,246,0.34)' : '1px solid rgba(255,255,255,0.08)',
                bgcolor: isEmphasis ? 'rgba(139,92,246,0.08)' : 'rgba(2,6,23,0.34)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  minWidth: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'rgba(139,92,246,0.16)',
                  border: '1px solid rgba(139,92,246,0.34)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'primary.light',
                }}
              >
                {idx + 1}
              </Box>
              <FormattedText text={text} color="text.primary" sx={{ fontSize: { xs: '0.98rem', md: '1.06rem' }, mt: 0.3 }} />
            </Box>
          );
        }}
      />
    </SlideScaffold>
  );
}

export function SlideText({ s }: { s: TextSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <FormattedText 
        text={s.body} 
        sx={{ fontSize: { xs: '0.96rem', md: '1.03rem' }, lineHeight: 1.62, maxWidth: 820 }} 
      />
    </SlideScaffold>
  );
}

export function SlideCheckpoint({ s }: { s: CheckpointSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <TwoColumnLayout 
        id={s.id}
        items={s.items}
        renderItem={(item, idx) => (
          <Box
            key={idx}
            sx={{
              p: 1.25,
              borderRadius: 2.75,
              border: '1px solid rgba(52,211,153,0.25)',
              bgcolor: 'rgba(52,211,153,0.08)',
            }}
          >
            <Box sx={{ fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.45, fontWeight: 600 }}>
              <FormattedText text={`✅ ${item}`} color="inherit" sx={{ fontWeight: 'inherit' }} />
            </Box>
          </Box>
        )}
      />
    </SlideScaffold>
  );
}

export function SlideCode({ s }: { s: CodeSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <CodeBlock language={s.language} caption={s.caption} code={s.code} />
    </SlideScaffold>
  );
}

export function SlideTimeline({ s }: { s: TimelineSection }) {
  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <Stack spacing={1.5}>
        {s.items.map((item) => (
          <Box
            key={`${item.label}-${item.minutes}`}
            sx={{
              p: 1.5,
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'rgba(2,6,23,0.34)',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" fontWeight={800}>
                {item.label}
              </Typography>
              <Chip label={item.minutes} size="small" color="secondary" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {item.summary}
            </Typography>
          </Box>
        ))}
      </Stack>
    </SlideScaffold>
  );
}

export function SlideCallout({ s }: { s: CalloutSection }) {
  const toneColors = {
    info: { border: 'rgba(96,165,250,0.35)', bg: 'rgba(96,165,250,0.12)' },
    success: { border: 'rgba(52,211,153,0.35)', bg: 'rgba(52,211,153,0.12)' },
    warning: { border: 'rgba(251,191,36,0.35)', bg: 'rgba(251,191,36,0.12)' },
  };
  const colors = toneColors[s.tone];

  return (
    <SlideScaffold sectionId={s.id} title={s.title} visual={s.visual}>
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
          bgcolor: colors.bg,
        }}
      >
        <FormattedText text={s.body} sx={{ fontSize: { xs: '0.98rem', md: '1.08rem' }, lineHeight: 1.7 }} />
      </Box>
    </SlideScaffold>
  );
}
