"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
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
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";

interface DocumentPreviewCardProps {
  content: string;
}

const EDITOR_WIDTH = 816;
const PREVIEW_WIDTH = 205;
const SCALE = PREVIEW_WIDTH / EDITOR_WIDTH;
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * (1054 / EDITOR_WIDTH));

export const DocumentPreviewCard = ({ content }: DocumentPreviewCardProps) => {
  const editor = useEditor({
    editable: false,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none bg-white flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 pointer-events-none select-none",
      },
    },
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),
      TaskItem.configure({ nested: true }),
      TaskList,
      Image,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      FontFamily,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      FontSizeExtension,
      LineHeightExtension,
    ],
  });

  return (
    <div
      style={{
        width: PREVIEW_WIDTH,
        height: PREVIEW_HEIGHT,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          width: EDITOR_WIDTH,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
