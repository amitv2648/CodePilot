import type { TutorConversationMessage } from "./TutorContextService";

class ConversationManager {
  private messages: TutorConversationMessage[] = [];
  private readonly messageLimit: number;

  constructor(messageLimit = 10) {
    this.messageLimit = messageLimit;
  }

  addMessage(message: TutorConversationMessage) {
    this.messages = [...this.messages, message].slice(
      -this.messageLimit,
    );
  }

  getRecentMessages() {
    return [...this.messages];
  }

  clear() {
    this.messages = [];
  }
}

export default ConversationManager;
