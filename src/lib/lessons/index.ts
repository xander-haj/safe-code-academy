import { htmlBasics } from "./html-basics";
import { cssBasics } from "./css-basics";
import { LessonCategory } from "../types";

export const lessonCategories: LessonCategory[] = [
  {
    title: "HTML",
    lessons: [htmlBasics],
  },
  {
    title: "CSS",
    lessons: [cssBasics],
  },
];

export const getAllLessons = () => {
  return lessonCategories.flatMap(category => category.lessons);
};