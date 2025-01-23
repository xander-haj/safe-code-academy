import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LessonContentProps {
  content: string;
}

declare global {
  interface Window {
    handleQuizAnswer: (index: number, answer: string, correct: string) => void;
    checkAnswer: (index: number) => void;
  }
}

const LessonContent = ({ content }: LessonContentProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizSubmit = (questionIndex: number, answer: string, correctAnswer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    
    if (showResults) {
      const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect ? "Great job!" : `The correct answer was: ${correctAnswer}`,
        variant: isCorrect ? "default" : "destructive",
      });
    }
  };

  const processQuizContent = (content: string) => {
    let processedContent = content;
    const quizAnswers: Array<{ type: string; correct: string }> = [];
    
    // Extract quiz answers and remove them from content
    processedContent = processedContent.replace(
      /<quiz-answer type="([^"]+)" correct="([^"]+)" \/>/g,
      (_, type, correct) => {
        quizAnswers.push({ type, correct });
        return "";
      }
    );

    // Add interactive elements based on quiz type
    quizAnswers.forEach((answer, index) => {
      const placeholder = `[QUIZ-${index}]`;
      let interactiveElement = "";

      switch (answer.type) {
        case "fill-blank":
          interactiveElement = `
            <div class="my-4">
              <label class="block mb-2">Fill in the blank:</label>
              <input type="text" class="border p-2 rounded w-full" 
                     onchange="window.handleQuizAnswer(${index}, this.value, '${answer.correct}')" />
              <button onclick="window.checkAnswer(${index})" class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Check Answer
              </button>
            </div>
          `;
          break;
        case "multiple-choice":
          const options = answer.correct.split('|');
          const correctIndex = options.findIndex(opt => opt.startsWith('*'));
          const cleanOptions = options.map(opt => opt.replace('*', ''));
          
          interactiveElement = `
            <div class="my-4">
              <fieldset>
                <legend class="mb-2">Choose the correct answer:</legend>
                ${cleanOptions.map((opt, i) => `
                  <label class="flex items-center space-x-2 mb-2">
                    <input type="radio" name="q${index}" value="${i}"
                           onchange="window.handleQuizAnswer(${index}, '${i}', '${correctIndex}')" />
                    <span>${opt}</span>
                  </label>
                `).join("")}
              </fieldset>
              <button onclick="window.checkAnswer(${index})" class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Check Answer
              </button>
            </div>
          `;
          break;
        case "true-false":
          interactiveElement = `
            <div class="my-4">
              <fieldset>
                <legend class="mb-2">True or False:</legend>
                <label class="flex items-center space-x-2 mb-2">
                  <input type="radio" name="q${index}" value="true"
                         onchange="window.handleQuizAnswer(${index}, 'true', '${answer.correct}')" />
                  <span>True</span>
                </label>
                <label class="flex items-center space-x-2 mb-2">
                  <input type="radio" name="q${index}" value="false"
                         onchange="window.handleQuizAnswer(${index}, 'false', '${answer.correct}')" />
                  <span>False</span>
                </label>
              </fieldset>
              <button onclick="window.checkAnswer(${index})" class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Check Answer
              </button>
            </div>
          `;
          break;
        case "matching":
          const pairs = answer.correct.split(',');
          interactiveElement = `
            <div class="my-4">
              <div class="grid gap-4">
                ${pairs.map((pair, i) => {
                  const [question, answer] = pair.split('-');
                  return `
                    <div class="flex items-center gap-4">
                      <span class="min-w-[100px]">${question}</span>
                      <input type="text" class="border p-2 rounded flex-1" 
                             placeholder="Enter matching answer"
                             onchange="window.handleQuizAnswer(${index}_${i}, this.value, '${answer}')" />
                    </div>
                  `;
                }).join("")}
              </div>
              <button onclick="window.checkAnswer(${index})" class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Check Answers
              </button>
            </div>
          `;
          break;
        case "code":
          interactiveElement = `
            <div class="my-4">
              <label class="block mb-2">Write your code:</label>
              <textarea class="border p-2 rounded w-full min-h-[100px] font-mono"
                        onchange="window.handleQuizAnswer(${index}, this.value, '${answer.correct}')"
                        placeholder="Write your code here..."></textarea>
              <button onclick="window.checkAnswer(${index})" class="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Check Code
              </button>
            </div>
          `;
          break;
      }

      processedContent = processedContent.replace(/\n\n/g, `\n\n${placeholder}\n\n`);
      processedContent = processedContent.replace(placeholder, interactiveElement);
    });

    return processedContent;
  };

  useEffect(() => {
    // Add global handlers for quiz interactions
    window.handleQuizAnswer = (index: number, answer: string, correct: string) => {
      handleQuizSubmit(index, answer, correct);
    };

    window.checkAnswer = (index: number) => {
      setShowResults(true);
    };

    return () => {
      // Cleanup
      delete window.handleQuizAnswer;
      delete window.checkAnswer;
    };
  }, []);

  const sanitizedContent = DOMPurify.sanitize(marked(processQuizContent(content)), {
    ADD_TAGS: ["input", "button", "label", "fieldset", "legend", "textarea"],
    ADD_ATTR: ["type", "onchange", "onclick", "name", "value", "class", "placeholder"],
  });

  return (
    <div 
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default LessonContent;