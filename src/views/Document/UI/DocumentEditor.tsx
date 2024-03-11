import { useUpdateDocument } from "@/features/documents/update";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Editor } from "@/widgets/Editor";
import { useEffect, useState } from "react";

export const DocumentEditor = ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const [editorContent, setContent] = useState<string | undefined>(
    content || undefined,
  );
  const { update } = useUpdateDocument({ id });

  const debounce = useDebounce(
    (content: string | undefined) => update({ content }),
    1000,
  );
  const onEditorChange = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    debounce(editorContent);
  }, [editorContent]);
  return <Editor editable initialContent={content} onChange={onEditorChange} />;
};
