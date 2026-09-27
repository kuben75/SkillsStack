export type LocalizedString = Record<"pl" | "en", string>
export type LocalizedStringArray = Record<"pl" | "en", string[]>

export interface Hint {
    level: number;
    content: LocalizedString
}
export interface LessonContent {
    businessBrief: LocalizedString;
    guidedSteps: LocalizedStringArray;
}
export interface Workspace {
    initialCode: string;
    validationLogic?: string;
}

export interface Lesson {
    id: string;
    type: 'console' | 'ui';
    title: LocalizedString;
    description?: LocalizedString;
    content: LessonContent;
    workspace: Workspace;
    hints?: Hint[];
}