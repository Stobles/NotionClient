import { useUpdateDocument } from "@/features/documents/update";
import { Input } from "@/shared/UI/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";

export const DocumentTitle = ({ id, title }: { id: string; title: string }) => {
  const [text, setText] = useState(title);
  const { update } = useUpdateDocument({ id });

  const debounce = useDebounce(
    (text: string) => update({ title: text || "Untitled" }),
    300,
  );

  useEffect(() => {
    if (text != title) debounce(text);
  }, [text]);

  useEffect(() => {
    setText(title);
  }, [title]);

  return (
    <div className="relative text-4xl font-bold">
      <h1 className="absolute opacity-0 pointer-events-none">{title}</h1>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        value={text}
        className="border-0 text-3xl md:text-[40px] h-[45px] rounded-sm px-1"
      />
    </div>
  );
};
