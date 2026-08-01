export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    gradeLevel: string;
  
    careerFields: string[];
    languages: string[];
  
    updatedAt?: unknown;
  }