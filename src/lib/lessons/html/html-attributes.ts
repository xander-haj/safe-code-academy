import { Lesson } from "../../types";

export const htmlAttributes: Lesson = {
  id: 3,
  title: "HTML Attributes",
  content: `
# HTML Attributes

Learn how to use HTML attributes to provide additional information about elements.

## Challenge

Create a webpage with:
- An image with src and alt attributes
- A link with href attribute
- A button with disabled attribute

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Attributes</title>
</head>
<body>
    <img src="https://placekitten.com/200/200" alt="A cute kitten">
    <p>
        <a href="https://www.example.com">Visit Example.com</a>
    </p>
    <button disabled>This button is disabled</button>
</body>
</html>
\`\`\`

Try changing the attributes to see how they affect the elements!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>HTML Attributes</title>
</head>
<body>
    <!-- Add elements with attributes -->
    
</body>
</html>`
};