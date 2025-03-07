export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostInput {
  title: string;
  body: string;
  userId: number;
}

export type Theme = 'orange' | 'purple' | 'blue' | 'green' | 'rainbow';

export interface ThemeColors {
  primary: string;
  accent: string;
  hover: string;
  text: string;
  border: string;
  shadow: string;
}