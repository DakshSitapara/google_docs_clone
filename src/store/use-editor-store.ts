import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorState {
    export: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    export: null,
    setEditor: (editor) => set({ export: editor }),
}));