import { create } from "zustand";
import { type Editor } from "@tiptap/react";

type SaveStatus = "saved" | "saving" | "unsaved";

interface EditorState {
  export: Editor | null;
  setEditor: (editor: Editor | null) => void;
  saveStatus: SaveStatus;
  setSaveStatus: (status: SaveStatus) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  export: null,
  setEditor: (editor) => set({ export: editor }),
    
  saveStatus: "saved",
  setSaveStatus: (status) => set({ saveStatus: status }),
}));
