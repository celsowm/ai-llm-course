import { Tab, Tabs } from '@mui/material';
import { PanelTab, Variant } from '../types';

export function PanelTabs({
  accent,
  tab,
  onTabChange,
  labels,
  panelKey,
}: {
  accent: string;
  tab: PanelTab;
  onTabChange: (value: PanelTab) => void;
  labels: { graph: string; code: string };
  panelKey: Variant;
}) {
  return (
    <Tabs
      value={tab}
      onChange={(_, value: PanelTab) => onTabChange(value)}
      variant="fullWidth"
      sx={{
        minHeight: 48,
        bgcolor: 'rgba(15,23,42,0.03)',
        borderBottom: '1px solid rgba(15,23,42,0.08)',
        '& .MuiTabs-indicator': {
          backgroundColor: accent,
          height: 3,
        },
      }}
    >
      <Tab
        label={labels.graph}
        value="graph"
        data-testid={`${panelKey}-tab-graph`}
        sx={{
          minHeight: 48,
          fontWeight: 800,
          color: 'rgba(15,23,42,0.65)',
          '&.Mui-selected': { color: accent },
        }}
      />
      <Tab
        label={labels.code}
        value="code"
        data-testid={`${panelKey}-tab-code`}
        sx={{
          minHeight: 48,
          fontWeight: 800,
          color: 'rgba(15,23,42,0.65)',
          '&.Mui-selected': { color: accent },
        }}
      />
    </Tabs>
  );
}
