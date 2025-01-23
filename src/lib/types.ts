export interface Lesson {
  id: number;
  title: string;
  content: string;
  language: string;
  initialCode: string;
  isQuiz?: boolean;
  questions?: QuizQuestion[];
}

export interface LessonCategory {
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: number;
  type: 'fillInBlank' | 'multipleChoice' | 'trueFalse' | 'matching' | 'codeCorrection';
  question: string;
  correctAnswer: string | string[];
  options?: string[];
  matchingPairs?: { left: string; right: string; }[];
}

export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}