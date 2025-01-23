import { Lesson } from "../../types";

export const cssQuiz: Lesson = {
  id: 9,
  title: "CSS Knowledge Quiz",
  content: `
# CSS Quiz

Test your CSS knowledge with this interactive quiz!

## Fill in the Blank
Complete the CSS property to center text:
\`text-____: center;\`

<quiz-answer type="fill-blank" correct="align" />

## Multiple Choice
Which CSS property is used to change the text color?
- [ ] \`text-style\`
- [ ] \`font-color\`
- [x] \`color\`
- [ ] \`text-color\`

<quiz-answer type="multiple-choice" correct="2" />

## True/False
The \`margin: auto\` property centers elements horizontally.
- [x] True
- [ ] False

<quiz-answer type="true-false" correct="true" />

## Property Matching
Match the CSS properties with their correct values:
1. \`display\` ↔ A. \`relative\`
2. \`position\` ↔ B. \`flex\`
3. \`justify-content\` ↔ C. \`center\`

<quiz-answer type="matching" correct="1-B,2-A,3-C" />

## Interactive Styling
Apply the correct CSS to make the text red and bold:
\`\`\`css
.highlight {
  /* Add your CSS here */
}
\`\`\`

<quiz-answer type="code" correct=".highlight {
  color: red;
  font-weight: bold;
}" />
`,
  language: "css",
  initialCode: `.highlight {
    /* Add your CSS here */
}`
};