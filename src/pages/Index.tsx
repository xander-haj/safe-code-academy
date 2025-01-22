import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CodePlayground from "@/components/CodePlayground";
import LessonContent from "@/components/LessonContent";
import { lessonCategories, getAllLessons } from "@/lib/lessons";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const allLessons = getAllLessons();
  const [code, setCode] = useState(allLessons[0].initialCode || "");

  const nextLesson = () => {
    if (currentLesson < allLessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setCode(allLessons[currentLesson + 1].initialCode || "");
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
      setCode(allLessons[currentLesson - 1].initialCode || "");
    }
  };

  const selectLesson = (lessonId: number) => {
    const index = allLessons.findIndex(lesson => lesson.id === lessonId);
    if (index !== -1) {
      setCurrentLesson(index);
      setCode(allLessons[index].initialCode || "");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Tabs defaultValue={lessonCategories[0].title} className="mb-6">
          <TabsList>
            {lessonCategories.map((category) => (
              <TabsTrigger key={category.title} value={category.title}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {lessonCategories.map((category) => (
            <TabsContent key={category.title} value={category.title}>
              <div className="mb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                      {allLessons[currentLesson].title}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    {category.lessons.map((lesson) => (
                      <DropdownMenuItem
                        key={lesson.id}
                        onClick={() => selectLesson(lesson.id)}
                      >
                        {lesson.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">
                {allLessons[currentLesson].title}
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={prevLesson}
                  disabled={currentLesson === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextLesson}
                  disabled={currentLesson === allLessons.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
            <LessonContent content={allLessons[currentLesson].content} />
          </Card>
          
          <Card className="p-6">
            <CodePlayground
              code={code}
              onChange={setCode}
              language={allLessons[currentLesson].language}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;