export interface Lesson {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface Course {
    language: string;
    icon: string;
    color: string;
    description: string;
  
    lessons: Lesson[];
  }
  
  export const courses: Record<string, Course> = {
  
    Python: {
      language: "Python",
      icon: "🐍",
      color: "from-green-500 to-emerald-600",
      description: "Learn Python from beginner to advanced.",
  
      lessons: [
        { id: 1, title: "Introduction to Python", completed: false },
        { id: 2, title: "Variables", completed: false },
        { id: 3, title: "Data Types", completed: false },
        { id: 4, title: "Loops", completed: false },
        { id: 5, title: "Functions", completed: false },
      ],
    },
  
    Java: {
      language: "Java",
      icon: "☕",
      color: "from-orange-500 to-red-600",
  
      description:
        "Master Java programming.",
  
      lessons: [
        { id: 1, title: "Introduction to Java", completed: false },
        { id: 2, title: "Variables", completed: false },
        { id: 3, title: "Methods", completed: false },
        { id: 4, title: "Classes", completed: false },
      ],
    },
  
    React: {
      language: "React",
      icon: "⚛️",
      color: "from-cyan-500 to-blue-600",
  
      description:
        "Build modern web apps with React.",
  
      lessons: [
        { id: 1, title: "What is React?", completed: false },
        { id: 2, title: "JSX", completed: false },
        { id: 3, title: "Components", completed: false },
        { id: 4, title: "Props", completed: false },
      ],
    },
  
  };