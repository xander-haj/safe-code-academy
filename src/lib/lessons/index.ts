import { LessonCategory } from "../types";
import { htmlIntroduction } from "./html/html-introduction";
import { htmlElements } from "./html/html-elements";
import { htmlAttributes } from "./html/html-attributes";
import { htmlForms } from "./html/html-forms";
import { cssIntroduction } from "./css/css-introduction";
import { cssSelectors } from "./css/css-selectors";
import { cssBoxModel } from "./css/css-box-model";
import { cssLayout } from "./css/css-layout";

export const lessonCategories: LessonCategory[] = [
  {
    title: "HTML",
    lessons: [
      htmlIntroduction,
      htmlElements,
      htmlAttributes,
      htmlForms,
    ],
  },
  {
    title: "CSS",
    lessons: [
      cssIntroduction,
      cssSelectors,
      cssBoxModel,
      cssLayout,
    ],
  },
];

export const getAllLessons = () => {
  return lessonCategories.flatMap(category => category.lessons);
};