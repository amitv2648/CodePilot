import type { TutorContext } from "./TutorContextService";

export interface AiTutorEngine {
  generateResponse(
    context: TutorContext,
    studentMessage: string,
  ): Promise<string>;
}

const lessonResponses: Array<{
  matches: string[];
  response: string;
}> = [
  {
    matches: ["variable"],
    response:
      "Great! Variables let us store information under a useful name so we can use it later.",
  },
  {
    matches: ["loop"],
    response:
      "Good thinking. Loops help us repeat instructions without writing the same code again.",
  },
  {
    matches: ["function", "method"],
    response:
      "Exactly. Functions group reusable instructions into a task we can call whenever we need it.",
  },
  {
    matches: ["data type"],
    response:
      "That's close. Data types describe the kind of value a program is working with.",
  },
  {
    matches: ["class"],
    response:
      "Good connection. A class defines the data and behavior that its objects can use.",
  },
  {
    matches: ["component"],
    response:
      "Exactly. Components let us build an interface from small, reusable pieces.",
  },
  {
    matches: ["jsx"],
    response:
      "Good thinking. JSX lets React describe interface markup alongside JavaScript logic.",
  },
  {
    matches: ["prop"],
    response:
      "That's right. Props pass information from a parent component into a child component.",
  },
];

class PlaceholderAiTutorEngine implements AiTutorEngine {
  async generateResponse(
    context: TutorContext,
    studentMessage: string,
  ) {
    const lessonName = context.lessonTitle.toLowerCase();
    const contextualResponse = lessonResponses.find(({ matches }) =>
      matches.some((keyword) => lessonName.includes(keyword)),
    );

    if (contextualResponse) {
      return contextualResponse.response;
    }

    if (studentMessage.toLowerCase().includes("not sure")) {
      return `That's okay. Here is a useful hint: ${context.lessonHint}`;
    }

    return `You're thinking about ${context.lessonTitle} in the right direction. ${context.lessonDescription}`;
  }
}

export default PlaceholderAiTutorEngine;
