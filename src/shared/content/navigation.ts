import type { Locale } from '../../i18n/types';
import type { NavItem } from '../../core/models/NavItem';
import { getTopics } from './topics';

export function getNavigationItems(locale: Locale): NavItem[] {
  const topics = getTopics(locale);

  return topics.map((topic) => ({
    id: topic.id,
    label: topic.title,
    path: topic.path,
    helper: topic.helper || '',
    progress: 0,
  }));
}
