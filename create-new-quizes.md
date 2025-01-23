# Creating New Quizzes

This guide explains how to create new quiz lessons for the learning platform.

## Quiz Structure

Each quiz should contain 5 different question formats:

1. **Fill in the Blank**
   - Use underscores (___) to indicate blank spaces
   - Provide clear context around the blank
   - Example: `The <___> tag defines a paragraph in HTML`

2. **Multiple Choice**
   - Provide 4 options
   - Mark correct answer with [x]
   - Mark incorrect answers with [ ]
   - Example:
     ```
     Which tag creates a link?
     - [ ] <p>
     - [x] <a>
     - [ ] <div>
     - [ ] <span>
     ```

3. **True/False**
   - Present a statement
   - Provide True/False options
   - Mark correct answer
   - Example:
     ```
     HTML is a programming language
     - [ ] True
     - [x] False
     ```

4. **Matching/Ordering**
   - Create pairs or sequences
   - Use clear symbols (↔, →) for matching
   - Use numbers for ordering
   - Example:
     ```
     1. <p> ↔ A. Paragraph
     2. <h1> ↔ B. Heading
     ```

5. **Interactive Coding**
   - Provide a code snippet to fix/complete
   - Include clear instructions
   - Example:
     ```
     Fix this HTML code:
     <p>Text<p>
     ```

## Implementation Steps

1. Create a new file in `src/lib/lessons/[category]/[quiz-name].ts`
2. Import the Lesson type
3. Export the quiz as a Lesson object
4. Include title, content, language, and initialCode
5. Add the quiz to the appropriate category in `src/lib/lessons/index.ts`

## Best Practices

- Keep questions clear and concise
- Provide enough context for each question
- Include a mix of basic and challenging questions
- Use proper markdown formatting
- Test the quiz thoroughly before deployment

## Example Quiz Implementation

```typescript
import { Lesson } from "../../types";

export const newQuiz: Lesson = {
  id: [unique_number],
  title: "Quiz Title",
  content: `
    # Quiz Title
    
    ## Question 1 (Fill in the Blank)
    Complete this sentence: ___
    
    ## Question 2 (Multiple Choice)
    Question text:
    - [ ] Option 1
    - [x] Option 2
    - [ ] Option 3
    - [ ] Option 4
    
    // ... Additional questions
  `,
  language: "html", // or css, javascript, etc.
  initialCode: `// Initial code for interactive portion`
};
```