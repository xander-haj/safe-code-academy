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

## Multiple Choice
Which CSS property is used to change the text color?
- [ ] \`text-style\`
- [ ] \`font-color\`
- [x] \`color\`
- [ ] \`text-color\`

## Ordering
Arrange these CSS specificity selectors from lowest to highest priority:
1. Element selector
2. Class selector
3. ID selector
4. Inline styles

## Interactive Styling
Apply the correct CSS to make the text red and bold:
\`\`\`css
.highlight {
  /* Add your CSS here */
}
\`\`\`

## Property Matching
Match the CSS properties with their correct values:
1. \`display\` ↔ A. \`relative\`
2. \`position\` ↔ B. \`flex\`
3. \`justify-content\` ↔ C. \`center\`
`,
  language: "css",
  initialCode: `.highlight {
    /* Add your CSS here */
}`
};