import { useState } from "react";
import { useParams } from "react-router-dom";

import { courses } from "../data/courses";

import LessonSidebar from "../components/courses/LessonSidebar";
import LessonViewer from "../components/courses/LessonViewer";
import ProgressHeader from "../components/courses/ProgressHeader";

function CoursePage() {
  const { language } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(1);

  if (!language) {
    return (
      <div className="p-10 text-white">
        Course not found.
      </div>
    );
  }

  const course = courses[decodeURIComponent(language)];

  if (!course) {
    return (
      <div className="p-10 text-white">
        Course not found.
      </div>
    );
  }

  const lesson =
    course.lessons.find(
      (lesson) => lesson.id === selectedLesson
    ) ?? course.lessons[0];

  const completedLessons =
    course.lessons.filter(
      (lesson) => lesson.completed
    ).length;

  return (
    <div className="space-y-8">

      <ProgressHeader
        language={course.language}
        icon={course.icon}
        description={course.description}
        completed={completedLessons}
        total={course.lessons.length}
      />

      <div className="grid gap-6 lg:grid-cols-12">

        <div className="lg:col-span-4 xl:col-span-3">

          <LessonSidebar
            lessons={course.lessons}
            selectedLesson={selectedLesson}
            onSelectLesson={setSelectedLesson}
          />

        </div>

        <div className="lg:col-span-8 xl:col-span-9">

          <LessonViewer
            lesson={lesson}
          />

        </div>

      </div>

    </div>
  );
}

export default CoursePage;