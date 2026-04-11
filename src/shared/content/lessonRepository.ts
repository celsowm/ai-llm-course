import type { Lesson } from '../../core/interfaces/Lesson';
import type { Locale } from '../../i18n/types';
import type { LessonRepository } from '../../core/services/LessonService';
import { getLessonOne } from '../../modules/aula-1/content';
import { getSetupLesson } from '../../modules/setup/content';

function buildLessons(locale: Locale): Lesson[] {
  return [getLessonOne(locale), getSetupLesson(locale)];
}

export class InMemoryLessonRepository implements LessonRepository {
  constructor(private readonly locale: Locale = 'pt-BR') {}

  public getLessonById(id: string): Lesson | undefined {
    return buildLessons(this.locale).find((lesson) => lesson.id === id);
  }

  public getAllLessons(): Lesson[] {
    return buildLessons(this.locale);
  }
}
