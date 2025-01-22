export interface Lesson {
  id: number;
  title: string;
  content: string;
  language: string;
  initialCode: string;
}

export interface LessonCategory {
  title: string;
  lessons: Lesson[];
}