
export interface ClassroomInputs {
  grade: string;
  subject: string;
  standard: string;
}

export interface TranscriptState {
  content: string;
  isLoading: boolean;
  error: string | null;
}
