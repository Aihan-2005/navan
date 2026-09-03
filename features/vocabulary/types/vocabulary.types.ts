export type LeitnerBoxNumber =
  | 1
  | 2
  | 3
  | 4
  | 5;

export type VocabularyStatus =
  | "new"
  | "learning"
  | "review"
  | "mastered";

export type VocabularyDifficulty =
  | "easy"
  | "medium"
  | "hard";

export type VocabularyPartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase"
  | "other";

export type ReviewGrade =
  | "again"
  | "hard"
  | "good"
  | "easy";

export type VocabularyWord = {
  id: string;

  word: string;
  translation: string;

  phonetic?: string;

  definition?: string;

  example?: string;
  exampleTranslation?: string;

  partOfSpeech: VocabularyPartOfSpeech;

  difficulty: VocabularyDifficulty;

  status: VocabularyStatus;

  leitnerBox: LeitnerBoxNumber;

  tags: string[];

  collectionId?: string;

  reviewCount: number;

  correctCount: number;

  lapseCount?: number;

  nextReviewAt: string;

  lastReviewedAt?: string;

  createdAt: string;

  updatedAt?: string;
};

export type VocabularyCollection = {
  id: string;

  title: string;

  description: string;

  emoji: string;

  totalWords: number;

  learnedWords: number;
};

export type LeitnerBox = {
  box: LeitnerBoxNumber;

  title: string;

  description: string;

  intervalLabel: string;

  totalCards: number;

  dueCards: number;
};

export type VocabularyReviewLogEntry = {
  id: string;

  wordId: string;

  grade: ReviewGrade;

  previousBox: LeitnerBoxNumber;

  nextBox: LeitnerBoxNumber;

  reviewedAt: string;

  nextReviewAt: string;
};

export type VocabularyStats = {
  totalWords: number;

  dueToday: number;

  masteredWords: number;

  learningWords: number;

  weeklyAdded: number;

  weeklyReviewed: number;

  currentStreak: number;

  dailyGoal: number;

  dailyReviewed: number;

  masteryPercent: number;
};

export type AddVocabularyWordInput = {
  word: string;

  translation: string;

  phonetic?: string;

  definition?: string;

  example?: string;

  exampleTranslation?: string;

  partOfSpeech: VocabularyPartOfSpeech;

  difficulty: VocabularyDifficulty;

  tags?: string[];

  collectionId?: string;
};

export type UpdateVocabularyWordInput =
  Partial<
    Omit<
      VocabularyWord,
      | "id"
      | "createdAt"
      | "reviewCount"
      | "correctCount"
    >
  >;

export type AddWordResult =
  | {
      ok: true;
      id: string;
    }
  | {
      ok: false;
      reason:
        | "duplicate"
        | "invalid";
    };