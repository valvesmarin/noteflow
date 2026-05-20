import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote {
  id: string;
  title: string;
  items: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaNote {
  id: string;
  title: string;
  tags: string[];
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

type AnyNote = Note | ChecklistNote | IdeaNote;

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];

  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  addItemToChecklist: (checklistId: string, text: string) => void;

  deleteNote: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),

      addChecklist: (checklist) =>
        set((state) => ({
          checklists: [...state.checklists, checklist],
        })),

      addIdea: (idea) =>
        set((state) => ({
          ideas: [...state.ideas, idea],
        })),

      // Nova função para adicionar item em uma checklist
      addItemToChecklist: (checklistId, text) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === checklistId
              ? {
                  ...c,
                  items: [
                    ...c.items,
                    {
                      id: Date.now().toString(),
                      text: text.trim(),
                      isCompleted: false,
                    },
                  ],
                  updatedAt: new Date(),
                }
              : c
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
          checklists: state.checklists.filter((c) => c.id !== id),
          ideas: state.ideas.filter((i) => i.id !== id),
        })),

      toggleChecklistItem: (checklistId, itemId) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === checklistId
              ? {
                  ...c,
                  items: c.items.map((item) =>
                    item.id === itemId
                      ? { ...item, isCompleted: !item.isCompleted }
                      : item
                  ),
                  updatedAt: new Date(),
                }
              : c
          ),
        })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);