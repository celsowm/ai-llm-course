import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../app/meta';
import { ExportPdfButton } from '../../features/pdf-export/ExportPdfButton';
import { useI18n } from '../../i18n/I18nProvider';
import { getNavigationItems } from '../content/navigation';
import { SlideNavProvider, useSlideNav } from '../components/SlideNavContext';

const drawerWidth = 260;

function NavigationPanel({ onCollapse }: { onCollapse: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, setLocale, t } = useI18n();
  const navigationItems = useMemo(() => getNavigationItems(locale), [locale]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <MenuBookRoundedIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" fontWeight={800}>
                {t('layout.sidebarTitle')}
              </Typography>
            </Stack>
            <Tooltip title="Recolher">
              <IconButton size="small" onClick={onCollapse} sx={{ color: 'text.secondary' }}>
                <ChevronLeftRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="row" spacing={1}>
            {(['pt-BR', 'en'] as const).map((value) => (
              <Button
                key={value}
                variant={locale === value ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setLocale(value)}
              >
                {value === 'pt-BR' ? 'PT' : 'EN'}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 1 }}>
        {navigationItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton key={item.id} selected={selected} onClick={() => navigate(item.path)} sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemText
                primary={item.label}
                secondary={item.helper}
                primaryTypographyProps={{ fontWeight: 700, variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

function SlideNavControls() {
  const { nav } = useSlideNav();
  const { t } = useI18n();
  if (!nav) return null;

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Tooltip title={t('common.previous')}>
        <span>
          <IconButton
            size="small"
            onClick={nav.onPrev}
            disabled={nav.activeStep === 0}
            color="primary"
            aria-label={t('common.previous')}
          >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ minWidth: 48, textAlign: 'center' }}>
        {nav.activeStep + 1} / {nav.maxSteps}
      </Typography>
      <Tooltip title={t('common.next')}>
        <span>
          <IconButton
            size="small"
            onClick={nav.onNext}
            disabled={nav.activeStep === nav.maxSteps - 1}
            color="primary"
            aria-label={t('common.next')}
          >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}

const drawerPaperSx = {
  boxSizing: 'border-box',
  borderRight: '1px solid rgba(255,255,255,0.08)',
  bgcolor: 'background.paper',
  backgroundImage: 'linear-gradient(180deg, rgba(139,92,246,0.12), rgba(18,26,47,0.94) 32%, rgba(18,26,47,1) 100%)',
};

export function CourseLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const sidebarWidth = collapsed ? 0 : drawerWidth;

  return (
    <SlideNavProvider>
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          width: { lg: `calc(100% - ${sidebarWidth}px)` },
          ml: { lg: `${sidebarWidth}px` },
          transition: theme.transitions.create(['width', 'margin-left'], { duration: 200 }),
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: '52px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
            {!isDesktop ? (
              <IconButton size="small" color="inherit" onClick={() => setMobileOpen(true)}>
                <MenuRoundedIcon fontSize="small" />
              </IconButton>
            ) : collapsed ? (
              <Tooltip title="Expandir menu">
                <IconButton size="small" color="inherit" onClick={() => setCollapsed(false)}>
                  <MenuRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : null}

            <Stack direction="row" spacing={1} alignItems="center">
              <SmartToyRoundedIcon color="primary" fontSize="small" />
              <Typography variant="body1" fontWeight={700}>
                {APP_NAME}
              </Typography>
            </Stack>
          </Box>

          <SlideNavControls />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-end' }}>
            <ExportPdfButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, ...drawerPaperSx },
          }}
        >
          <Toolbar sx={{ minHeight: '52px !important' }} />
          <NavigationPanel onCollapse={() => setMobileOpen(false)} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', lg: 'block' },
            width: sidebarWidth,
            flexShrink: 0,
            transition: theme.transitions.create('width', { duration: 200 }),
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              ...drawerPaperSx,
              transform: collapsed ? `translateX(-${drawerWidth}px)` : 'translateX(0)',
              transition: theme.transitions.create('transform', { duration: 200 }),
              visibility: collapsed ? 'hidden' : 'visible',
            },
          }}
        >
          <Toolbar sx={{ minHeight: '52px !important' }} />
          <NavigationPanel onCollapse={() => setCollapsed(true)} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          transition: theme.transitions.create('margin-left', { duration: 200 }),
        }}
      >
        <Toolbar sx={{ minHeight: '52px !important' }} />
        <Container maxWidth={false} sx={{ py: 1.5 }} data-export-root="true">
          <Outlet />
        </Container>
      </Box>
    </Box>
    </SlideNavProvider>
  );
}
