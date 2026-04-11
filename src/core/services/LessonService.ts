import type { Lesson } from '../interfaces/Lesson';

export interface LessonRepository {
  getLessonById(id: string): Lesson | undefined;
  getAllLessons(): Lesson[];
}

export class LessonService {
  constructor(private readonly repository: LessonRepository) {}

  public getLesson(id: string): Lesson {
    const lesson = this.repository.getLessonById(id);

    if (!lesson) {
      throw new Error(`Lesson not found: ${id}`);
    }

    return lesson;
  }

  public listLessons(): Lesson[] {
    return this.repository.getAllLessons();
  }
}