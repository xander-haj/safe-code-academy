import { Lesson } from "../types";

export const cssBasics: Lesson = {
  id: 2,
  title: "Basic CSS Styling",
  content: `
# Introduction to CSS

Let's style our Hello World text to make it more appealing!

## Challenge

Add CSS to style the text with:
- A different color
- Larger font size
- Center alignment
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Styled Hello World</title>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
};