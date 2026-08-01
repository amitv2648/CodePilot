export type TutorConversationMessage = {
  speaker: "AI Tutor" | "Student";
  text: string;
};

export type TutorContextInput = {
  language: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonExplanation: string;
  lessonChallenge: string;
  lessonHint: string;
  currentLessonNumber: number;
  totalLessons: number;
  completedLessons: number;
  studentProgress: number;
  studentCode: string;
};

export type TutorContext = TutorContextInput & {
  recentConversation: TutorConversationMessage[];
};

class TutorContextService {
  private context: TutorContext;

  constructor(initialContext: TutorContextInput) {
    this.context = {
      ...initialContext,
      recentConversation: [],
    };
  }

  updateEducationalContext(context: TutorContextInput) {
    this.context = {
      ...this.context,
      ...context,
    };
  }

  updateStudentCode(studentCode: string) {
    this.context = {
      ...this.context,
      studentCode,
    };
  }

  updateRecentConversation(
    recentConversation: TutorConversationMessage[],
  ) {
    this.context = {
      ...this.context,
      recentConversation: [...recentConversation],
    };
  }

  getContext(): TutorContext {
    return {
      ...this.context,
      recentConversation: [...this.context.recentConversation],
    };
  }
}

export default TutorContextService;
