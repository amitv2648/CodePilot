type Lesson = {
    id: number;
    title: string;
    completed: boolean;
  };
  
  type LessonSidebarProps = {
    lessons: Lesson[];
    selectedLesson: number;
    onSelectLesson: (id: number) => void;
  };
  
  function LessonSidebar({
    lessons,
    selectedLesson,
    onSelectLesson,
  }: LessonSidebarProps) {
    return (
      <div className="h-full rounded-2xl border border-slate-700 bg-slate-900 p-5">
  
        <h2 className="mb-6 text-lg font-bold text-white">
          Lessons
        </h2>
  
        <div className="space-y-2">
  
          {lessons.map((lesson) => (
  
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full rounded-xl p-3 text-left transition
                ${
                  selectedLesson === lesson.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
            >
  
              <div className="flex items-center gap-3">
  
                <div>
                  {lesson.completed ? "✅" : "○"}
                </div>
  
                <div>
  
                  <p className="text-xs opacity-70">
                    Lesson {lesson.id}
                  </p>
  
                  <p className="font-medium">
                    {lesson.title}
                  </p>
  
                </div>
  
              </div>
  
            </button>
  
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default LessonSidebar;