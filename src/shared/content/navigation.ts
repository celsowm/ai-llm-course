import type { Locale } from '../../i18n/types';
import type { NavItem } from '../../core/models/NavItem';
import { getMessages } from '../../i18n/messages';

export function getNavigationItems(locale: Locale): NavItem[] {
  const m = getMessages(locale);

  return [
    {
      id: 'lesson-1',
      label: m.navigation.lesson1.label,
      path: '/lesson-1',
      helper: m.navigation.lesson1.helper,
      progress: 25,
    },
    {
      id: 'setup',
      label: m.navigation.setup.label,
      path: '/setup',
      helper: m.navigation.setup.helper,
      progress: 10,
    },
  ];
}
