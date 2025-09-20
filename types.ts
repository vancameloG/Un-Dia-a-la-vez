
export enum ExerciseCategory {
  Masajes = "Masajes",
  Frente = "Frente",
  Ojos = "Ojos",
  Mejillas = "Mejillas y Nariz",
  Boca = "Boca y Labios",
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  description: string;
  instructions: string[];
  duration: number; // in seconds
  reps: number;
  imageUrl: string;
}

export enum ArticleCategory {
  PrimerosPasos = "Primeros Pasos",
  CuidadosDiarios = "Cuidados Diarios",
  Tratamientos = "Tratamientos",
  PreguntasFrecuentes = "Preguntas Frecuentes",
  Implementos = "Implementos",
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  imageUrl: string;
}

export interface ProgressPhoto {
  id: string;
  date: Date;
  imageUrl: string;
  tags: string[];
}

export interface CompletedExercise {
  date: Date;
  exerciseId: string;
}

export enum ZenMode {
  Breathing = "Respiración Guiada",
  Meditation = "Meditaciones Cortas",
}

export interface ZenActivity {
    id: string;
    type: ZenMode;
    title: string;
    duration: number; // in minutes
    description: string;
}

export interface Reminder {
  enabled: boolean;
  time: string; // HH:mm
}

export interface ReminderSettings {
  exercise: Reminder;
  zen: Reminder;
}

export type View = 'DASHBOARD' | 'EXERCISES' | 'EXERCISE_DETAIL' | 'ENCYCLOPEDIA' | 'ARTICLE_DETAIL' | 'ZEN' | 'PROGRESS' | 'REMINDERS';