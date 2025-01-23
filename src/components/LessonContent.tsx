import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";
import { QuizQuestion, QuizAnswer } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

interface LessonContentProps {
  content: string;
  questions?: QuizQuestion[];
  isQuiz?: boolean;
}

const LessonContent = ({ content, questions = [], isQuiz = false }: LessonContentProps) => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const { toast } = useToast();

  // Configure marked to use synchronous parsing
  const rawHtml = marked.parse(content, { async: false }) as string;
  
  // Configure DOMPurify with security settings
  const purifyConfig = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'p', 'div', 'span', 'a', 'ul', 'ol', 
      'li', 'code', 'pre', 'strong', 'em',
      'blockquote', 'hr', 'input', 'label'
    ],
    ALLOWED_ATTR: ['class', 'id', 'href', 'type', 'value'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  };

  const sanitizedHtml = DOMPurify.sanitize(rawHtml, purifyConfig);

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const checkAnswers = () => {
    let correct = 0;
    questions.forEach(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      if (userAnswer) {
        if (Array.isArray(question.correctAnswer)) {
          if (Array.isArray(userAnswer.answer) && 
              question.correctAnswer.every((ans, idx) => ans === userAnswer.answer[idx])) {
            correct++;
          }
        } else if (userAnswer.answer === question.correctAnswer) {
          correct++;
        }
      }
    });

    toast({
      title: `Quiz Results`,
      description: `You got ${correct} out of ${questions.length} questions correct!`,
      duration: 5000,
    });
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'fillInBlank':
        return (
          <div key={question.id} className="mb-6">
            <Label>{question.question}</Label>
            <Input
              type="text"
              className="mt-2"
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              value={answers.find(a => a.questionId === question.id)?.answer as string || ''}
            />
          </div>
        );

      case 'multipleChoice':
        return (
          <div key={question.id} className="mb-6">
            <Label>{question.question}</Label>
            <RadioGroup
              className="mt-2"
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={answers.find(a => a.questionId === question.id)?.answer as string}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                  <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'trueFalse':
        return (
          <div key={question.id} className="mb-6">
            <Label>{question.question}</Label>
            <RadioGroup
              className="mt-2"
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={answers.find(a => a.questionId === question.id)?.answer as string}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id={`q${question.id}-true`} />
                <Label htmlFor={`q${question.id}-true`}>True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id={`q${question.id}-false`} />
                <Label htmlFor={`q${question.id}-false`}>False</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'matching':
        return (
          <div key={question.id} className="mb-6">
            <Label>{question.question}</Label>
            {question.matchingPairs?.map((pair, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                <div>{pair.left}</div>
                <Input
                  type="text"
                  onChange={(e) => {
                    const newAnswers = [...(answers.find(a => a.questionId === question.id)?.answer as string[] || [])];
                    newAnswers[index] = e.target.value;
                    handleAnswerChange(question.id, newAnswers);
                  }}
                  value={(answers.find(a => a.questionId === question.id)?.answer as string[] || [])[index] || ''}
                />
              </div>
            ))}
          </div>
        );

      case 'codeCorrection':
        return (
          <div key={question.id} className="mb-6">
            <Label>{question.question}</Label>
            <Input
              className="mt-2 font-mono"
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              value={answers.find(a => a.questionId === question.id)?.answer as string || ''}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
      {isQuiz && questions.length > 0 && (
        <div className="mt-8 space-y-6">
          {questions.map(renderQuestion)}
          <Button onClick={checkAnswers} className="mt-4">
            Submit Answers
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonContent;