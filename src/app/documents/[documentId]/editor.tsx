"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useEditor,
  EditorContent,
  Editor as TiptapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { useStorage } from "@liveblocks/react/suspense";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditorStore } from "@/store/use-editor-store";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { ButtonExtension } from "@/extensions/add-button";
import { Ruler } from "./ruler";
import { Threads } from "./threads";
import { BubbleMenuBar, FloatingMenuBar } from "./toolbar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface EditorProps {
  initialContent?: string | undefined;
  documentId: Id<"documents">;
}

export const Editor = ({ initialContent, documentId }: EditorProps) => {
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const { setEditor, setSaveStatus } = useEditorStore();

  const updateContent = useMutation(api.documents.updateContent);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();
  const lastSavedContent = useRef<string>("");
  const isReady = useRef(false);

  const handleUpdate = useCallback(
    ({ editor }: { editor: TiptapEditor }) => {
      if (!isReady.current) return;
      setEditor(editor);
      setSaveStatus("unsaved");
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        const html = editor.getHTML();
        if (html === "<p></p>" || html === "") return;
        if (html === lastSavedContent.current) {
          setSaveStatus("saved");
          return;
        }
        setSaveStatus("saving");
        await updateContent({ id: documentId, content: html });
        lastSavedContent.current = html;
        setSaveStatus("saved");
      }, 3000);
    },
    [documentId, updateContent, setEditor, setSaveStatus],
  );

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
      setTimeout(() => {
        lastSavedContent.current = editor.getHTML();
        isReady.current = true;
      }, 1000);
    },
    onDestroy: () => {
      setEditor(null);
      isReady.current = false;
    },
    onUpdate: handleUpdate,
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        undoRedo: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        },
      }),
      Youtube,
      Image,
      ImageResize,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      TaskItem.configure({ nested: true }),
      TaskList,
      FontFamily,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      FontSizeExtension,
      LineHeightExtension,
      ButtonExtension,
    ],
    immediatelyRender: false,
    autofocus: true,
  });

  useEffect(() => {
    return () => {
      clearTimeout(saveTimer.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible">
      <div className="px-4 flex-shrink-0 print:hidden">
        <Ruler />
      </div>
      <ScrollArea className="flex-1 print:h-auto print:overflow-visible">
        <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
          <EditorContent editor={editor} />
          <ScrollBar orientation="horizontal" className="print:hidden" />
          <Threads editor={editor} />
        </div>
      </ScrollArea>
      <BubbleMenuBar />
      <FloatingMenuBar />
    </div>
  );
};
