import { Lesson } from "../../types";

export const htmlQuiz: Lesson = {
  id: 5,
  title: "HTML Knowledge Quiz",
  content: `
# HTML Quiz

Test your HTML knowledge with this interactive quiz!

## Fill in the Blank
Complete the HTML tag to create a hyperlink:
\`<a ___="https://example.com">Click here</a>\`

<quiz-answer type="fill-blank" correct="href" />

## Multiple Choice
Which HTML tag is used to create an unordered list?
- [ ] \`<ol>\`
- [ ] \`<li>\`
- [x] \`<ul>\`
- [ ] \`<list>\`

<quiz-answer type="multiple-choice" correct="2" />

## True/False
The \`<br>\` tag needs a closing tag.
- [ ] True
- [x] False

<quiz-answer type="true-false" correct="false" />

## Matching
Match the HTML elements with their purposes:
1. \`<h1>\` ↔ A. Create a table
2. \`<table>\` ↔ B. Main heading
3. \`<p>\` ↔ C. Paragraph text

<quiz-answer type="matching" correct="1-B,2-A,3-C" />

## Code Correction
Fix the errors in this HTML code:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</head>
<body>
    <h1>Welcome</h2>
    <p>This is a paragraph
    <ul>
        <li>Item 1
        <li>Item 2
    </ul>
</body>
\`\`\`

<quiz-answer type="code" correct="<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</body>
</html>" />
`,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <!-- Fix the HTML errors above -->
    
</body>
</html>`
};