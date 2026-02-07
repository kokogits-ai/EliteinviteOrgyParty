
export enum AppState {
  LANDING = 'LANDING',
  SCREENING = 'SCREENING',
  RESULT = 'RESULT',
  FINAL = 'FINAL'
}

export interface FormData {
  ageVerified: boolean;
  agreedToConduct: boolean;
  name: string;
  email: string;
  phone: string;
  role: 'Top' | 'Bottom' | 'Switch/Vers' | '';
  interestType: string;
  selectedDate: string;
  aboutMe: string;
}

export interface StepProps {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}