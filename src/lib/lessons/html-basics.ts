import { Lesson } from "../types";

export const htmlBasics: Lesson = {
  id: 1,
  title: "Introduction to HTML",
  content: `
# Welcome to HTML Basics!

"Hello World!" in HTML is a simple program that outputs text to the screen.

## Challenge

Use the code editor to write HTML that displays "Hello World!" on the screen.

Note: Remember to use proper HTML structure with \`<html>\`, \`<head>\`, and \`<body>\` tags.
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <!-- Write your code here -->
    
</body>
</html>`,
};