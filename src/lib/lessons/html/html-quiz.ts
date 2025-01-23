import { Lesson } from "../../types";

export const htmlQuiz: Lesson = {
  id: 5,
  title: "HTML Knowledge Quiz",
  content: "# HTML Quiz\n\nTest your knowledge of HTML basics with these questions:",
  language: "html",
  initialCode: "",
  isQuiz: true,
  questions: [
    {
      id: 1,
      type: "fillInBlank",
      question: "What HTML tag is used to create a hyperlink? (Write the complete opening tag including <>)",
      correctAnswer: "<a>"
    },
    {
      id: 2,
      type: "multipleChoice",
      question: "Which tag is used for the largest heading in HTML?",
      options: ["<h1>", "<h6>", "<heading>", "<head>"],
      correctAnswer: "<h1>"
    },
    {
      id: 3,
      type: "trueFalse",
      question: "The <br> tag needs a closing tag.",
      correctAnswer: "false"
    },
    {
      id: 4,
      type: "matching",
      question: "Match the HTML elements with their purposes:",
      matchingPairs: [
        { left: "<p>", right: "paragraph" },
        { left: "<ul>", right: "unordered list" },
        { left: "<img>", right: "image" }
      ],
      correctAnswer: ["paragraph", "unordered list", "image"]
    },
    {
      id: 5,
      type: "codeCorrection",
      question: "Fix this HTML tag: <imge src='photo.jpg'>",
      correctAnswer: "<img src='photo.jpg'>"
    }
  ]
};