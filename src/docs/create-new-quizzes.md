# Creating New Quizzes

This document outlines the process for creating new interactive quizzes in the learning platform.

## Quiz Structure

Each quiz should contain:
1. 5 questions using different formats
2. Clear instructions
3. Immediate feedback
4. Proper answer validation

## Available Question Types

1. Fill in the Blank
   - Simple text input
   - Case-sensitive answers
   - Single correct answer

2. Multiple Choice
   - 4 options recommended
   - Single correct answer
   - Clear, unambiguous choices

3. True/False
   - Binary choice questions
   - Clear, unambiguous statements
   - No "trick" questions

4. Matching
   - 3-5 pairs recommended
   - Clear relationships
   - Unique answers

5. Code Correction
   - Simple code snippets
   - Single error to fix
   - Clear expected output

## Implementation Steps

1. Create a new quiz file in the appropriate lesson category folder
2. Import the Lesson type from types.ts
3. Define the quiz with all required properties
4. Add questions following the QuizQuestion interface
5. Update the lessons index to include the new quiz
6. Test all questions and answers thoroughly

## Example Quiz Implementation

```typescript
import { Lesson } from "../../types";

export const newQuiz: Lesson = {
  id: [unique_number],
  title: "Quiz Title",
  content: "# Quiz Description\n\nInstructions for the quiz:",
  language: "html", // or css, javascript, etc.
  initialCode: "",
  isQuiz: true,
  questions: [
    {
      id: 1,
      type: "fillInBlank",
      question: "Question text...",
      correctAnswer: "correct answer"
    },
    // Add more questions...
  ]
};
```

## Best Practices

1. Keep questions clear and concise
2. Provide specific feedback
3. Test edge cases in answers
4. Maintain consistent difficulty
5. Update documentation when adding new question types

Remember to update the lessons index after creating a new quiz!