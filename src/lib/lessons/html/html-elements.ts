import { Lesson } from "../../types";

export const htmlElements: Lesson = {
  id: 2,
  title: "HTML Elements",
  content: `
# HTML Elements

Learn about basic HTML elements like paragraphs, headings, and lists.

## Challenge

Create a webpage with:
- A main heading (h1)
- A paragraph (p)
- An unordered list (ul) with 3 items

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Elements</title>
</head>
<body>
    <h1>Learning HTML Elements</h1>
    <p>This is a paragraph about HTML elements. They are the building blocks of web pages.</p>
    <ul>
        <li>First item in my list</li>
        <li>Second item in my list</li>
        <li>Third item in my list</li>
    </ul>
</body>
</html>
\`\`\`

Try modifying the content of the elements to create your own webpage!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>HTML Elements</title>
</head>
<body>
    <!-- Add your elements here -->
    
</body>
</html>`
};