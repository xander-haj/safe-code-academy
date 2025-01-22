import { Lesson } from "../../types";

export const htmlIntroduction: Lesson = {
  id: 1,
  title: "Introduction to HTML",
  content: `
# Welcome to HTML Basics!

HTML (HyperText Markup Language) is the standard markup language for creating web pages.

## Challenge

Create a simple HTML page with a heading that says "My First Webpage".

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>My First Webpage</h1>
</body>
</html>
\`\`\`

Try modifying the heading text to something else!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <!-- Write your code here -->
    
</body>
</html>`,
};