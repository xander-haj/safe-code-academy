import { Lesson } from "../../types";

export const cssIntroduction: Lesson = {
  id: 5,
  title: "Introduction to CSS",
  content: `
# Welcome to CSS!

CSS (Cascading Style Sheets) is used to style and layout web pages.

## Challenge

Style a paragraph with:
- Blue text color
- Larger font size
- Center alignment
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Introduction</title>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <p>Style me with CSS!</p>
</body>
</html>`,
};