import { create } from "zustand";
import { type Editor } from "@tiptap/react";

type SaveStatus = "saved" | "saving" | "unsaved";

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),

  saveStatus: "saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
}));
