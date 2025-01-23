import { Lesson } from "../../types";

export const cssQuiz: Lesson = {
  id: 9,
  title: "CSS Knowledge Quiz",
  content: "# CSS Quiz\n\nTest your knowledge of CSS basics with these questions:",
  language: "css",
  initialCode: "",
  isQuiz: true,
  questions: [
    {
      id: 1,
      type: "fillInBlank",
      question: "What CSS property is used to change text color? (just the property name)",
      correctAnswer: "color"
    },
    {
      id: 2,
      type: "multipleChoice",
      question: "Which CSS unit is relative to the font-size of the element?",
      options: ["px", "em", "vh", "vw"],
      correctAnswer: "em"
    },
    {
      id: 3,
      type: "trueFalse",
      question: "The display: none; property hides an element but keeps its space in the layout.",
      correctAnswer: "false"
    },
    {
      id: 4,
      type: "matching",
      question: "Match the CSS properties with their purposes:",
      matchingPairs: [
        { left: "margin", right: "outside spacing" },
        { left: "padding", right: "inside spacing" },
        { left: "border", right: "element outline" }
      ],
      correctAnswer: ["outside spacing", "inside spacing", "element outline"]
    },
    {
      id: 5,
      type: "codeCorrection",
      question: "Fix this CSS rule: color: red:;",
      correctAnswer: "color: red;"
    }
  ]
};