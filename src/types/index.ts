import { LucideIcon } from 'lucide-react';

export type MnemonicMode = 'acrostic' | 'story' | 'rhyme' | 'chunking';

export interface Mode {
  id: MnemonicMode;
  name: string;
  icon: LucideIcon;
  desc: string;
}

export interface AIResponse {
  success: boolean;
  content: string;
  model: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}