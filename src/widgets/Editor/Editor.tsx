"use client";

import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

export const Editor = ({
  initialContent,
  editable,
  onChange,
}: {
  initialContent: string;
  editable: boolean;
  onChange: (content: string) => void;
}) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document));
      }}
    />
  );
};
